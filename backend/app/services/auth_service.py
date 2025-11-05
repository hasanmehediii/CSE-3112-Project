from app.core.database import get_db
from app.core.security import hash_password, verify_password
from app.utils.jwt_handler import create_access_token
from app.models.user_model import UserModel
from pydantic import HttpUrl
from fastapi import HTTPException, status
import datetime
from bson import ObjectId

def convert_for_mongo(obj):
    """Recursively convert objects to Mongo-friendly types."""
    if isinstance(obj, HttpUrl):
        return str(obj)
    elif isinstance(obj, datetime.datetime):
        return obj  # MongoDB supports datetime natively
    elif isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, dict):
        return {k: convert_for_mongo(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_for_mongo(i) for i in obj]
    return obj

def create_user(user_data: dict):
    db = get_db()
    
    # Check if email already exists
    existing_user = db["users"].find_one({"email": user_data["email"]})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Email already registered"
        )

    # Hash the password
    password = user_data.pop("password")
    user_data["password_hash"] = hash_password(password)

    # Create UserModel instance for defaults and validation
    user_model_instance = UserModel(**user_data)

    # Convert to dictionary for Mongo insertion
    user_to_insert = user_model_instance.model_dump(exclude_none=True, exclude={"id"})
    user_to_insert = convert_for_mongo(user_to_insert)

    # Insert into MongoDB
    result = db["users"].insert_one(user_to_insert)
    user_model_instance.id = str(result.inserted_id)

    # Return the final user dictionary with ID
    return user_model_instance.model_dump(exclude_none=True)

def authenticate_user(email: str, password: str):
    db = get_db()
    user = db["users"].find_one({"email": email})
    
    if not user or not verify_password(password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid credentials"
        )

    # Generate JWT token
    token = create_access_token({"sub": str(user["_id"]), "email": user["email"]})
    return {"access_token": token, "token_type": "bearer"}
