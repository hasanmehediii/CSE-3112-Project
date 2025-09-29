from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Order(BaseModel):
    id: Optional[str]
    student_id: str
    canteen_id: str
    meal_id: str
    order_date: Optional[datetime]
    status: str  # "pending" | "prepared" | "delivered" | "cancelled"
    quantity: int
    total_price: float
    payment_id: Optional[str]
