from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..auth.auth_bearer import JWTBearer
from ..schemas.order_schema import OrderCreate, OrderOut, OrderStatusUpdate
from ..controllers.order_controller import (
    create_order,
    get_orders_for_student,
    get_orders_for_canteen,
    update_order_status,
)
from ..models.canteen import Canteen

router = APIRouter(prefix="/orders", tags=["Orders"])


def _get_canteen_for_owner(owner_id: int, db: Session) -> Canteen:
    canteen = db.query(Canteen).filter(Canteen.owner_id == owner_id).first()
    if not canteen:
        from fastapi import HTTPException

        raise HTTPException(status_code=404, detail="Canteen not found for this owner")
    return canteen


@router.post(
    "/", response_model=OrderOut, dependencies=[Depends(JWTBearer("student"))]
)
def create_order_endpoint(
    payload: OrderCreate,
    token_data=Depends(JWTBearer("student")),
    db: Session = Depends(get_db),
):
    student_id = token_data["id"]
    return create_order(student_id, payload, db)


@router.get(
    "/me",
    response_model=list[OrderOut],
    dependencies=[Depends(JWTBearer("student"))],
)
def get_my_orders(
    token_data=Depends(JWTBearer("student")),
    db: Session = Depends(get_db),
):
    student_id = token_data["id"]
    return get_orders_for_student(student_id, db)


@router.get(
    "/canteen",
    response_model=list[OrderOut],
    dependencies=[Depends(JWTBearer("canteen"))],
)
def get_canteen_orders(
    token_data=Depends(JWTBearer("canteen")),
    db: Session = Depends(get_db),
):
    owner_id = token_data["id"]
    canteen = _get_canteen_for_owner(owner_id, db)
    # ✅ use canteen.id, not user id
    return get_orders_for_canteen(canteen.id, db)


@router.patch(
    "/{order_id}/status",
    response_model=OrderOut,
    dependencies=[Depends(JWTBearer("canteen"))],
)
def update_order_status_endpoint(
    order_id: int,
    payload: OrderStatusUpdate,
    token_data=Depends(JWTBearer("canteen")),
    db: Session = Depends(get_db),
):
    owner_id = token_data["id"]
    canteen = _get_canteen_for_owner(owner_id, db)
    # ✅ pass canteen.id and payload.status
    return update_order_status(order_id, canteen.id, payload.status, db)
