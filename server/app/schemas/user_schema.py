from pydantic import BaseModel, ConfigDict
from typing import Optional


class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    role: str  # "student" | "canteen" | "admin"
    phone: Optional[str] = None
    registration_no: Optional[str] = None
    dept: Optional[str] = None
    address: Optional[str] = None
    canteen_name: Optional[str] = None
    location: Optional[str] = None
    image_url: Optional[str] = None


class UserLogin(BaseModel):
    email: str
    password: str


class UserUpdate(BaseModel):
    # All optional so PATCH can send partial data
    name: Optional[str] = None
    phone: Optional[str] = None
    dept: Optional[str] = None
    address: Optional[str] = None
    image_url: Optional[str] = None

    model_config = ConfigDict(extra="ignore")  # ignore unexpected fields


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: str
    phone: Optional[str] = None
    registration_no: Optional[str] = None
    dept: Optional[str] = None
    address: Optional[str] = None
    image_url: Optional[str] = None
    canteen_name: Optional[str] = None
    location: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
