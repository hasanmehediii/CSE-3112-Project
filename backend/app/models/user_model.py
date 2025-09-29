from pydantic import BaseModel, HttpUrl, EmailStr
from typing import Optional, List
from datetime import datetime

class UserPreferences(BaseModel):
    diet: Optional[str]
    allergies: Optional[List[str]] = []


class UserModel(BaseModel):
    id: Optional[str]
    name: str
    email: EmailStr
    password_hash: str
    role: str  # "admin" | "owner" | "student"
    profile_image: Optional[HttpUrl]
    canteen_id: Optional[str]
    preferences: Optional[UserPreferences]
    created_at: Optional[datetime]