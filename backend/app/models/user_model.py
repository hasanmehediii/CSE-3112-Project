from pydantic import BaseModel, HttpUrl, EmailStr, Field
from typing import Optional, List
from datetime import datetime

class UserPreferences(BaseModel):
    diet: Optional[str] = None  # Default to None
    allergies: List[str] = Field(default_factory=list) # Default to empty list


class UserModel(BaseModel):
    id: Optional[str] = None # Default to None
    name: str
    email: EmailStr
    password_hash: str
    role: str  # "admin" | "owner" | "student"
    profile_image: Optional[HttpUrl] = None # Default to None
    canteen_id: Optional[str] = None # Default to None
    preferences: UserPreferences = Field(default_factory=UserPreferences) # Default to an empty UserPreferences object
    created_at: datetime = Field(default_factory=datetime.now) # Default to current datetime