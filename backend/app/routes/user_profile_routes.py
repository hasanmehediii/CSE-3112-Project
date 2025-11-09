from fastapi import APIRouter, Depends
from app.services.auth_dependencies import get_current_user

router = APIRouter()

@router.get("/profile")
def get_profile(current_user = Depends(get_current_user)):
    return current_user


@router.patch("/update-profile")
def update_profile(data: dict, current_user = Depends(get_current_user)):
    return {"message": "Update logic here", "data_received": data}
