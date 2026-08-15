from fastapi import HTTPException
from sqlalchemy.orm import Session

from ..models.meal import Meal
from ..models.order import Order, OrderItem
from ..schemas.order_schema import OrderCreate, OrderStatus

VALID_TRANSITIONS: dict[str, set[str]] = {
    "pending": {"accepted", "rejected", "cancelled"},
    "accepted": {"preparing", "rejected", "cancelled"},
    "preparing": {"ready", "cancelled"},
    "ready": {"completed", "cancelled"},
    "completed": set(),
    "rejected": set(),
    "cancelled": set(),
}
RESERVED_STATUSES = {"accepted", "preparing", "ready"}


def create_order(student_id: int, data: OrderCreate, db: Session):
    total = 0.0
    order_items_data: list[tuple[Meal, int]] = []
    try:
        for item in data.items:
            meal = (
                db.query(Meal)
                .filter(Meal.id == item.meal_id)
                .with_for_update()
                .one_or_none()
            )
            if not meal or meal.canteen_id != data.canteen_id:
                raise HTTPException(400, f"Meal {item.meal_id} does not belong to this canteen")
            if not meal.is_available or meal.quantity < item.quantity:
                raise HTTPException(409, f"Meal {item.meal_id} does not have enough stock")
            total += float(meal.price) * item.quantity
            order_items_data.append((meal, item.quantity))

        order = Order(
            student_id=student_id,
            canteen_id=data.canteen_id,
            total_price=round(total, 2),
            status="pending",
            mode=data.mode,
            delivery_address=data.delivery_address,
        )
        db.add(order)
        db.flush()
        db.add_all(
            [
                OrderItem(
                    order_id=order.id,
                    meal_id=meal.id,
                    quantity=quantity,
                    price_each=meal.price,
                )
                for meal, quantity in order_items_data
            ]
        )
        db.commit()
        db.refresh(order)
        return order
    except Exception:
        db.rollback()
        raise


def get_orders_for_student(student_id: int, db: Session, offset: int = 0, limit: int = 100):
    return (
        db.query(Order)
        .filter(Order.student_id == student_id)
        .order_by(Order.created_at.desc(), Order.id.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )


def get_orders_for_canteen(canteen_id: int, db: Session, offset: int = 0, limit: int = 100):
    return (
        db.query(Order)
        .filter(Order.canteen_id == canteen_id)
        .order_by(Order.created_at.desc(), Order.id.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )


def _change_reserved_stock(order: Order, db: Session, reserve: bool) -> None:
    items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
    for item in items:
        meal = db.query(Meal).filter(Meal.id == item.meal_id).with_for_update().one_or_none()
        if not meal:
            raise HTTPException(409, "An ordered meal no longer exists")
        if reserve:
            if not meal.is_available or meal.quantity < item.quantity:
                raise HTTPException(409, f"Not enough stock for {meal.name}")
            meal.quantity -= item.quantity
        else:
            meal.quantity += item.quantity
        meal.is_available = meal.quantity > 0


def update_order_status(order_id: int, canteen_id: int, new_status: OrderStatus, db: Session):
    try:
        order = db.query(Order).filter(Order.id == order_id).with_for_update().one_or_none()
        if not order:
            raise HTTPException(404, "Order not found")
        if order.canteen_id != canteen_id:
            raise HTTPException(403, "Cannot update this order")
        if new_status not in VALID_TRANSITIONS.get(order.status, set()):
            raise HTTPException(409, f"Cannot move order from {order.status} to {new_status}")

        if order.status == "pending" and new_status == "accepted":
            _change_reserved_stock(order, db, reserve=True)
        elif order.status in RESERVED_STATUSES and new_status in {"cancelled", "rejected"}:
            _change_reserved_stock(order, db, reserve=False)

        order.status = new_status
        db.commit()
        db.refresh(order)
        return order
    except Exception:
        db.rollback()
        raise


def get_all_orders(db: Session, offset: int = 0, limit: int = 100):
    return db.query(Order).order_by(Order.created_at.desc()).offset(offset).limit(limit).all()
