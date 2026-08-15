from datetime import datetime
from typing import List, Literal, Optional

from pydantic import BaseModel, ConfigDict, Field, model_validator

OrderStatus = Literal[
    "pending", "accepted", "rejected", "preparing", "ready", "completed", "cancelled"
]


class OrderItemCreate(BaseModel):
    meal_id: int = Field(gt=0)
    quantity: int = Field(gt=0, le=100)


class OrderCreate(BaseModel):
    canteen_id: int = Field(gt=0)
    mode: Literal["pickup", "delivery"]
    delivery_address: Optional[str] = Field(default=None, max_length=500)
    items: List[OrderItemCreate] = Field(min_length=1, max_length=50)

    @model_validator(mode="after")
    def validate_delivery(self):
        if self.mode == "delivery" and not (self.delivery_address or "").strip():
            raise ValueError("Delivery address is required for delivery orders")
        if self.mode == "pickup":
            self.delivery_address = None
        if len({item.meal_id for item in self.items}) != len(self.items):
            raise ValueError("Each meal may appear only once")
        return self


class OrderStatusUpdate(BaseModel):
    status: OrderStatus


class OrderOut(BaseModel):
    id: int
    student_id: int | None
    canteen_id: int | None
    total_price: float
    status: OrderStatus
    mode: Literal["pickup", "delivery"] | None
    delivery_address: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
