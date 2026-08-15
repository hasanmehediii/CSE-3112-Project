from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from ..auth.auth_bearer import JWTBearer
from ..controllers.order_controller import (
    create_order,
    get_all_orders,
    get_orders_for_canteen,
    get_orders_for_student,
    update_order_status,
)
from ..database import get_db
from ..models.canteen import Canteen
from ..schemas.order_schema import OrderCreate, OrderOut, OrderStatusUpdate

router = APIRouter(prefix="/orders", tags=["Orders"])


def _get_canteen_for_owner(owner_id: int, db: Session) -> Canteen:
    canteen = db.query(Canteen).filter(Canteen.owner_id == owner_id).first()
    if not canteen:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Canteen not found for this owner")
    return canteen


@router.post("/", response_model=OrderOut, status_code=201)
def create_order_endpoint(
    payload: OrderCreate,
    token_data=Depends(JWTBearer("student")),
    db: Session = Depends(get_db),
):
    return create_order(token_data["id"], payload, db)


@router.get("/me", response_model=list[OrderOut])
def get_my_orders(
    offset: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=200),
    token_data=Depends(JWTBearer("student")),
    db: Session = Depends(get_db),
):
    return get_orders_for_student(token_data["id"], db, offset, limit)


@router.get("/canteen", response_model=list[OrderOut])
def get_canteen_orders(
    offset: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=200),
    token_data=Depends(JWTBearer("canteen")),
    db: Session = Depends(get_db),
):
    canteen = _get_canteen_for_owner(token_data["id"], db)
    return get_orders_for_canteen(canteen.id, db, offset, limit)


@router.patch("/{order_id}/status", response_model=OrderOut)
def update_order_status_endpoint(
    order_id: int,
    payload: OrderStatusUpdate,
    token_data=Depends(JWTBearer("canteen")),
    db: Session = Depends(get_db),
):
    canteen = _get_canteen_for_owner(token_data["id"], db)
    return update_order_status(order_id, canteen.id, payload.status, db)


@router.get("/all", response_model=list[OrderOut])
def list_all_orders(
    offset: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=200),
    token_data=Depends(JWTBearer("admin")),
    db: Session = Depends(get_db),
):
    return get_all_orders(db, offset, limit)
