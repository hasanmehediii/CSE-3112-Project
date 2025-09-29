from fastapi import APIRouter, Depends
from pydantic import BaseModel, EmailStr
from app.services.auth_service import create_user, authenticate_user

router = APIRouter()


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "student"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/signup")
async def signup(request: SignupRequest):
    user_data = request.dict()
    created_user = await create_user(user_data)
    return {"message": "User created successfully", "user": created_user}


@router.post("/login")
async def login(request: LoginRequest):
    token = await authenticate_user(request.email, request.password)
    return token

@router.get("/me")
async def get_current_user(user=Depends(authenticate_user)):
    return user

