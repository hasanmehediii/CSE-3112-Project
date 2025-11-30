from typing import List
from pydantic import BaseModel, ConfigDict


class OrderItemCreate(BaseModel):
    meal_id: int
    quantity: int


class OrderCreate(BaseModel):
    canteen_id: int
    mode: str  # 'pickup' or 'delivery'
    delivery_address: str | None = None
    items: List[OrderItemCreate]


class OrderStatusUpdate(BaseModel):
    status: str

class OrderOut(BaseModel):
    id: int
    student_id: int | None
    canteen_id: int | None
    total_price: float
    status: str
    mode: str | None
    delivery_address: str | None

    model_config = ConfigDict(from_attributes=True)
