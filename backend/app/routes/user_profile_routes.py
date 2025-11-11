from fastapi import APIRouter, Depends, HTTPException
from app.services.auth_dependencies import get_current_user
from app.core.database import get_db
from bson import ObjectId

router = APIRouter()

@router.get("/profile")
def get_profile(current_user = Depends(get_current_user)):
    return current_user

@router.patch("/update-profile")
def update_profile(data: dict, current_user = Depends(get_current_user)):
    db = get_db()
    user_id = current_user["_id"]

    # Prepare update dictionary
    update_data = {}
    if "name" in data:
        update_data["name"] = data["name"]
    if "profile_image" in data:
        update_data["profile_image"] = data["profile_image"]
    if "preferences" in data:
        prefs = data["preferences"]
        if "diet" in prefs:
            update_data["preferences.diet"] = prefs["diet"]
        if "allergies" in prefs:
            update_data["preferences.allergies"] = prefs["allergies"]

    if not update_data:
        raise HTTPException(status_code=400, detail="No valid fields to update")

    # Update MongoDB
    db["users"].update_one({"_id": ObjectId(user_id)}, {"$set": update_data})

    # Fetch updated user
    updated_user = db["users"].find_one({"_id": ObjectId(user_id)})
    updated_user["_id"] = str(updated_user["_id"])
    return updated_user
