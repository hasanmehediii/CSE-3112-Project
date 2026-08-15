from fastapi import HTTPException
from passlib.hash import pbkdf2_sha256
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..auth.auth_handler import create_access_token
from ..models.canteen import Canteen
from ..models.user import User
from ..schemas.user_schema import AdminUserCreate, UserLogin, UserRegister, UserUpdate


def _normalized_email(email: str) -> str:
    return email.strip().lower()


def _ensure_unique_user(data, db: Session) -> None:
    email = _normalized_email(str(data.email))
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=409, detail="Email already registered")
    registration_no = getattr(data, "registration_no", None)
    if registration_no and db.query(User).filter(User.registration_no == registration_no).first():
        raise HTTPException(status_code=409, detail="Registration number already registered")


def _create_user(data, role: str, db: Session) -> User:
    _ensure_unique_user(data, db)
    user = User(
        name=data.name.strip(),
        email=_normalized_email(str(data.email)),
        role=role,
        phone=data.phone,
        password_hash=pbkdf2_sha256.hash(data.password),
        registration_no=getattr(data, "registration_no", None),
        dept=getattr(data, "dept", None),
        address=getattr(data, "address", None),
        canteen_name=getattr(data, "canteen_name", None),
        location=getattr(data, "location", None),
        image_url=getattr(data, "image_url", None),
    )
    db.add(user)
    db.flush()

    if role == "canteen":
        canteen_name = (getattr(data, "canteen_name", None) or data.name).strip()
        db.add(
            Canteen(
                owner_id=user.id,
                name=canteen_name,
                image_url=getattr(data, "image_url", None),
                location=getattr(data, "location", None),
                category=None,
            )
        )
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="Account data already exists") from exc
    db.refresh(user)
    return user


def register_user(data: UserRegister, db: Session):
    user = _create_user(data, "student", db)
    token = create_access_token({"id": user.id, "role": user.role})
    return {"access_token": token, "token_type": "bearer"}


def admin_create_user(data: AdminUserCreate, db: Session) -> User:
    if data.role == "canteen" and not data.canteen_name:
        raise HTTPException(status_code=422, detail="Canteen name is required")
    return _create_user(data, data.role, db)


def login_user(data: UserLogin, db: Session):
    user = db.query(User).filter(User.email == _normalized_email(str(data.email))).first()
    if not user or not pbkdf2_sha256.verify(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token({"id": user.id, "role": user.role})
    return {"access_token": token, "token_type": "bearer"}


def get_me(user_id: int, db: Session):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def update_me(user_id: int, data: UserUpdate, db: Session):
    user = get_me(user_id, db)
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return user


def get_all_users(db: Session, offset: int = 0, limit: int = 100):
    return db.query(User).order_by(User.id.asc()).offset(offset).limit(limit).all()


def get_users_by_role(role: str, db: Session, offset: int = 0, limit: int = 100):
    return (
        db.query(User)
        .filter(User.role == role)
        .order_by(User.id.asc())
        .offset(offset)
        .limit(limit)
        .all()
    )


def delete_user(user_id: int, db: Session):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.role == "admin":
        raise HTTPException(status_code=400, detail="Admin accounts cannot be deleted here")
    db.delete(user)
    db.commit()
    return {"detail": "User deleted successfully"}
