from fastapi import HTTPException
from sqlalchemy.orm import Session
from passlib.hash import pbkdf2_sha256

from ..models.user import User
from ..models.canteen import Canteen
from ..auth.auth_handler import create_access_token
from ..schemas.user_schema import UserRegister, UserLogin


def register_user(data: UserRegister, db: Session):
    # check duplicate email
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # hash password
    hashed = pbkdf2_sha256.hash(data.password)

    user = User(
        name=data.name,
        email=data.email,
        role=data.role,
        phone=data.phone,
        password_hash=hashed,
        registration_no=data.registration_no,
        dept=data.dept,
        address=data.address,
        canteen_name=data.canteen_name,
        location=data.location,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    # ✅ AUTO-CREATE CANTEEN ROW IF ROLE == "canteen"
    if data.role == "canteen":
        canteen_name = data.canteen_name or data.name

        canteen = Canteen(
            owner_id=user.id,
            name=canteen_name,
            image_url=None,
            location=data.location,
            category=None,
        )
        db.add(canteen)
        db.commit()
        db.refresh(canteen)

    token = create_access_token({"id": user.id, "role": user.role})
    return {"access_token": token, "token_type": "bearer"}


def login_user(data: UserLogin, db: Session):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not pbkdf2_sha256.verify(data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token({"id": user.id, "role": user.role})
    return {"access_token": token, "token_type": "bearer"}


def get_me(user_id: int, db: Session):
    user = db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
