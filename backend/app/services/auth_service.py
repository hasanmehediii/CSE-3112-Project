from app.core.database import get_db
from app.core.security import hash_password, verify_password
from app.utils.jwt_handler import create_access_token
from bson import ObjectId
from fastapi import HTTPException, status


async def create_user(user_data: dict):
    db = get_db()
    existing_user = await db["users"].find_one({"email": user_data["email"]})
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    user_data["password_hash"] = hash_password(user_data.pop("password"))
    result = await db["users"].insert_one(user_data)
    user_data["_id"] = str(result.inserted_id)
    return user_data


async def authenticate_user(email: str, password: str):
    db = get_db()
    user = await db["users"].find_one({"email": email})
    if not user or not verify_password(password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token({"sub": str(user["_id"]), "email": user["email"]})
    return {"access_token": token, "token_type": "bearer"}
