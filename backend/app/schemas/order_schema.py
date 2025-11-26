from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class OrderCreate(BaseModel):
    student_id: str
    canteen_id: str
    meal_id: str
    quantity: int
    total_price: float
    status: str = "pending"

class OrderUpdate(BaseModel):
    status: Optional[str] = None

class OrderOut(BaseModel):
    id: str
    student_id: str
    canteen_id: str
    meal_id: str
    order_date: datetime
    status: str
    quantity: int
    total_price: float
    payment_id: Optional[str] = None

    class Config:
        from_attributes = True
