from pydantic import BaseModel, ConfigDict
from typing import Optional

class CanteenCreate(BaseModel):
    name: str
    image_url: Optional[str] = None
    location: Optional[str] = None
    category: Optional[str] = None


class CanteenOut(BaseModel):
    id: int
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
    password: Optional[str] = None     # change password if provided

    model_config = ConfigDict(from_attributes=True)
