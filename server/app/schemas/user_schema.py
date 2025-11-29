from pydantic import BaseModel, EmailStr, ConfigDict

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None
    password: str
    role: str  # 'student', 'canteen', 'admin'
    registration_no: str | None = None
    dept: str | None = None
    address: str | None = None
    canteen_name: str | None = None
    location: str | None = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    model_config = ConfigDict(from_attributes=True)
