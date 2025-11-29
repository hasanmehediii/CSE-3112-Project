from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth.auth_bearer import JWTBearer
from ..schemas.order_schema import OrderCreate, OrderOut
from ..controllers.order_controller import (
    create_order,
    get_orders_for_student,
    get_orders_for_canteen,
    update_order_status,
)

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("/", response_model=OrderOut, dependencies=[Depends(JWTBearer("student"))])
def create_order_endpoint(
    payload: OrderCreate,
    token_data=Depends(JWTBearer("student")),
    db: Session = Depends(get_db),
):
    student_id = token_data["id"]
    return create_order(student_id, payload, db)


@router.get("/me", response_model=list[OrderOut], dependencies=[Depends(JWTBearer("student"))])
def get_my_orders(token_data=Depends(JWTBearer("student")), db: Session = Depends(get_db)):
    student_id = token_data["id"]
    return get_orders_for_student(student_id, db)


@router.get("/canteen", response_model=list[OrderOut], dependencies=[Depends(JWTBearer("canteen"))])
def get_canteen_orders(token_data=Depends(JWTBearer("canteen")), db: Session = Depends(get_db)):
    canteen_id = token_data["id"]  # in your logic, you might map user->canteen differently
    return get_orders_for_canteen(canteen_id, db)


@router.patch("/{order_id}/status", response_model=OrderOut, dependencies=[Depends(JWTBearer("canteen"))])
def update_order_status_endpoint(
    order_id: int,
    new_status: str = Body(...),
    token_data=Depends(JWTBearer("canteen")),
    db: Session = Depends(get_db),
):
    # here I assumed canteen_id == user.id; if not, adjust mapping
    canteen_id = token_data["id"]
    return update_order_status(order_id, canteen_id, new_status, db)
