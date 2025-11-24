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

from app.models.canteen_model import Canteen


def create_owner(user_data: dict):
    db = get_db()

    # Check if email already exists
    if db["users"].find_one({"email": user_data["email"]}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Hash the password and set role
    password = user_data.pop("password")
    user_data["password_hash"] = hash_password(password)
    user_data["role"] = "owner"

    # Create user model for validation and defaults
    user_model_instance = UserModel(**user_data)
    user_to_insert = user_model_instance.model_dump(exclude_none=True, exclude={"id"})
    user_to_insert = convert_for_mongo(user_to_insert)

    # Insert user and get ID
    user_result = db["users"].insert_one(user_to_insert)
    user_id = user_result.inserted_id
    user_model_instance.id = str(user_id)

    # Create a canteen for the owner
    canteen_data = {
        "name": f"{user_data['name']}'s Canteen",
        "location": "Not specified",
        "owner_id": str(user_id),
        "contact": user_data['email'],
        "description": "Welcome to your new canteen! Please update your details."
    }
    canteen_model_instance = Canteen(**canteen_data)
    canteen_to_insert = canteen_model_instance.model_dump(exclude_none=True, exclude={"id"})
    
    # Insert canteen and get ID
    canteen_result = db["canteens"].insert_one(canteen_to_insert)
    canteen_id = canteen_result.inserted_id

    # Update user with canteen_id
    db["users"].update_one(
        {"_id": user_id},
        {"$set": {"canteen_id": str(canteen_id)}}
    )
    user_model_instance.canteen_id = str(canteen_id)

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

