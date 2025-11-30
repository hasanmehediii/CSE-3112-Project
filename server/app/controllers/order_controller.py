from sqlalchemy.orm import Session
from fastapi import HTTPException
from ..models.order import Order, OrderItem
from ..models.meal import Meal
from ..schemas.order_schema import OrderCreate


def create_order(student_id: int, data: OrderCreate, db: Session):
    # Calculate total
    total = 0
    order_items_data = []
    for item in data.items:
        meal = db.query(Meal).get(item.meal_id)
        if not meal or not meal.is_available:
            raise HTTPException(400, f"Meal {item.meal_id} not available")

        total += float(meal.price) * item.quantity
        order_items_data.append((meal, item.quantity))

    order = Order(
        student_id=student_id,
        canteen_id=data.canteen_id,
        total_price=total,
        status="pending",
        mode=data.mode,
        delivery_address=data.delivery_address,
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    for meal, qty in order_items_data:
        oi = OrderItem(
            order_id=order.id,
            meal_id=meal.id,
            quantity=qty,
            price_each=meal.price,
        )
        db.add(oi)

    db.commit()
    db.refresh(order)
    return order


def get_orders_for_student(student_id: int, db: Session):
    return db.query(Order).filter(Order.student_id == student_id).all()


def get_orders_for_canteen(canteen_id: int, db: Session):
    return db.query(Order).filter(Order.canteen_id == canteen_id).all()


def update_order_status(order_id: int, canteen_id: int, new_status: str, db: Session):
    order = db.query(Order).get(order_id)
    if not order:
        raise HTTPException(404, "Order not found")
    if order.canteen_id != canteen_id:
        raise HTTPException(403, "Cannot update this order")

    order.status = new_status
    db.commit()
    db.refresh(order)
    return order


def get_order_details(order_id: int, db: Session):
    order = db.query(Order).get(order_id)
    if not order:
        raise HTTPException(404, "Order not found")
    return order

def delete_order(order_id: int, student_id: int, db: Session):
    order = db.query(Order).get(order_id)
    if not order:
        raise HTTPException(404, "Order not found")
    if order.student_id != student_id:
        raise HTTPException(403, "Cannot delete this order")

    db.delete(order)
    db.commit()
    return {"detail": "Order deleted successfully"}
    order.status = new_status
    db.commit()
