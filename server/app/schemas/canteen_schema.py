from pydantic import BaseModel, ConfigDict, Field, field_validator
from typing import Optional

class CanteenCreate(BaseModel):
    name: str
    image_url: Optional[str] = None
    location: Optional[str] = None
    category: Optional[str] = None


class CanteenOut(BaseModel):
    id: int
    owner_id: int
    name: str
    image_url: Optional[str]
    location: Optional[str]
    category: Optional[str]

    model_config = ConfigDict(from_attributes=True)


# ✅ NEW: for profile update (no email field here)
class CanteenProfileUpdate(BaseModel):
    name: Optional[str] = None         # owner name
    phone: Optional[str] = None
    canteen_name: Optional[str] = None
    location: Optional[str] = None
    image_url: Optional[str] = None
    category: Optional[str] = None
    password: Optional[str] = Field(default=None, min_length=8, max_length=128)

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str | None) -> str | None:
        if value and (not any(character.isalpha() for character in value) or not any(character.isdigit() for character in value)):
            raise ValueError("Password must contain a letter and number")
        return value

    model_config = ConfigDict(from_attributes=True)
