from sqlalchemy.orm import Session
from fastapi import HTTPException
from passlib.hash import pbkdf2_sha256

from ..models.canteen import Canteen
from ..models.user import User
from ..schemas.canteen_schema import CanteenCreate, CanteenProfileUpdate


def create_canteen(owner_id: int, data: CanteenCreate, db: Session):
    canteen = Canteen(
        owner_id=owner_id,
        name=data.name,
        image_url=data.image_url,
        location=data.location,
        category=data.category,
    )
    db.add(canteen)
    db.commit()
    db.refresh(canteen)
    return canteen


def get_canteens(db: Session, category: str | None = None):
    query = db.query(Canteen)
    if category:
        query = query.filter(Canteen.category == category)
    return query.all()


def get_canteen_by_id(canteen_id: int, db: Session):
    canteen = db.query(Canteen).get(canteen_id)
    if not canteen:
        raise HTTPException(404, "Canteen not found")
    return canteen


# 🔽 helper: find canteen for owner
def _get_canteen_for_owner(owner_id: int, db: Session) -> Canteen:
    canteen = db.query(Canteen).filter(Canteen.owner_id == owner_id).first()
    if not canteen:
        raise HTTPException(404, "Canteen not found for this owner")
    return canteen


# ✅ GET profile for canteen owner (user + canteen info)
def get_canteen_profile(owner_id: int, db: Session):
    user = db.query(User).get(owner_id)
    if not user or user.role != "canteen":
        raise HTTPException(403, "Not a canteen owner")

    canteen = _get_canteen_for_owner(owner_id, db)

    return {
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,   # read-only
            "phone": user.phone,
            "image_url": user.image_url,
            "canteen_name": user.canteen_name,
            "location": user.location,
        },
        "canteen": {
            "id": canteen.id,
            "name": canteen.name,
            "image_url": canteen.image_url,
            "location": canteen.location,
            "category": canteen.category,
        },
    }


# ✅ UPDATE profile (no email)
def update_canteen_profile(owner_id: int, data: CanteenProfileUpdate, db: Session):
    user = db.query(User).get(owner_id)
    if not user or user.role != "canteen":
        raise HTTPException(403, "Not a canteen owner")

    canteen = _get_canteen_for_owner(owner_id, db)

    # update owner-level fields
    if data.name is not None:
        user.name = data.name
    if data.phone is not None:
        user.phone = data.phone
    if data.canteen_name is not None:
        user.canteen_name = data.canteen_name
        canteen.name = data.canteen_name  # keep in sync
    if data.location is not None:
        user.location = data.location
        canteen.location = data.location
    if data.image_url is not None:
        user.image_url = data.image_url
        canteen.image_url = data.image_url
    if data.category is not None:
        canteen.category = data.category
    if data.password is not None and data.password.strip():
        user.password_hash = pbkdf2_sha256.hash(data.password)

    db.commit()
    db.refresh(user)
    db.refresh(canteen)

    # return updated combined profile
    return get_canteen_profile(owner_id, db)
