from app.core.database import get_db
from app.core.security import hash_password, verify_password
from app.utils.jwt_handler import create_access_token
from app.models.user_model import UserModel # Import UserModel
from bson import ObjectId
from fastapi import HTTPException, status


async def create_user(user_data: dict):
    db = get_db()
    existing_user = await db["users"].find_one({"email": user_data["email"]})
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    # Hash the password before creating the UserModel instance
    password = user_data.pop("password")
    user_data["password_hash"] = hash_password(password)

    # Create a UserModel instance to apply defaults and validation
    user_model_instance = UserModel(**user_data)

    # Convert the UserModel instance back to a dictionary for MongoDB insertion
    # Exclude 'id' as MongoDB will generate '_id'
    user_to_insert = user_model_instance.model_dump(exclude_none=True, exclude={"id"})

    result = await db["users"].insert_one(user_to_insert)
    user_model_instance.id = str(result.inserted_id) # Assign the generated ID back to the model
    return user_model_instance.model_dump(exclude_none=True) # Return the dictionary representation with defaults and ID


async def authenticate_user(email: str, password: str):
    db = get_db()
    user = await db["users"].find_one({"email": email})
    if not user or not verify_password(password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token({"sub": str(user["_id"]), "email": user["email"]})
    return {"access_token": token, "token_type": "bearer"}
