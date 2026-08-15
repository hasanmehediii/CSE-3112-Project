from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class PasswordMixin(BaseModel):
    password: str = Field(min_length=8, max_length=128)

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        if not any(character.isalpha() for character in value):
            raise ValueError("Password must contain a letter")
        if not any(character.isdigit() for character in value):
            raise ValueError("Password must contain a number")
        return value


class UserRegister(PasswordMixin):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=20)
    registration_no: Optional[str] = Field(default=None, max_length=40)
    dept: Optional[str] = Field(default=None, max_length=100)
    address: Optional[str] = Field(default=None, max_length=500)
    image_url: Optional[str] = Field(default=None, max_length=2048)

    model_config = ConfigDict(extra="ignore")


class AdminUserCreate(PasswordMixin):
    role: Literal["student", "canteen"]
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=20)
    registration_no: Optional[str] = Field(default=None, max_length=40)
    dept: Optional[str] = Field(default=None, max_length=100)
    address: Optional[str] = Field(default=None, max_length=500)
    canteen_name: Optional[str] = Field(default=None, max_length=120)
    location: Optional[str] = Field(default=None, max_length=500)
    image_url: Optional[str] = Field(default=None, max_length=2048)

    @field_validator("canteen_name")
    @classmethod
    def trim_canteen_name(cls, value: str | None) -> str | None:
        return value.strip() if value else value


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class UserUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=2, max_length=100)
    phone: Optional[str] = Field(default=None, max_length=20)
    dept: Optional[str] = Field(default=None, max_length=100)
    address: Optional[str] = Field(default=None, max_length=500)
    image_url: Optional[str] = Field(default=None, max_length=2048)

    model_config = ConfigDict(extra="forbid")


class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: Literal["student", "canteen", "admin"]
    phone: Optional[str] = None
    registration_no: Optional[str] = None
    dept: Optional[str] = None
    address: Optional[str] = None
    image_url: Optional[str] = None
    canteen_name: Optional[str] = None
    location: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class AuthToken(BaseModel):
    access_token: str
    token_type: Literal["bearer"] = "bearer"
