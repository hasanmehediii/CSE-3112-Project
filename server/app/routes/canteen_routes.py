from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth.auth_bearer import JWTBearer
from ..schemas.canteen_schema import CanteenCreate, CanteenOut, CanteenProfileUpdate
from ..controllers.canteen_controller import (
    create_canteen,
    get_canteens,
    get_canteen_by_id,
    get_canteen_profile,
    update_canteen_profile,
)

router = APIRouter(prefix="/canteens", tags=["Canteens"])


@router.post("/", response_model=CanteenOut, dependencies=[Depends(JWTBearer("canteen"))])
def create_canteen_endpoint(
    payload: CanteenCreate,
    token_data=Depends(JWTBearer("canteen")),
    db: Session = Depends(get_db),
):
    owner_id = token_data["id"]
    return create_canteen(owner_id, payload, db)


@router.get("/", response_model=list[CanteenOut])
def list_canteens(
    category: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    return get_canteens(db, category)


# 🔹 PUT THESE BEFORE /{canteen_id}
@router.get("/me", dependencies=[Depends(JWTBearer("canteen"))])
def get_my_canteen_profile(
    token_data=Depends(JWTBearer("canteen")),
    db: Session = Depends(get_db),
):
    owner_id = token_data["id"]
    return get_canteen_profile(owner_id, db)


@router.patch("/me", dependencies=[Depends(JWTBearer("canteen"))])
def update_my_canteen_profile(
    payload: CanteenProfileUpdate,
    token_data=Depends(JWTBearer("canteen")),
    db: Session = Depends(get_db),
):
    owner_id = token_data["id"]
    return update_canteen_profile(owner_id, payload, db)


# 🔹 KEEP THIS AFTER /me, so it doesn't eat "me"
@router.get("/{canteen_id}", response_model=CanteenOut)
def get_canteen_endpoint(canteen_id: int, db: Session = Depends(get_db)):
    return get_canteen_by_id(canteen_id, db)
