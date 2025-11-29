from pydantic import BaseModel, ConfigDict
from typing import Optional

class MealCreate(BaseModel):
    name: str
    price: float
    quantity: int
    image_url: Optional[str] = None


class MealUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None
    image_url: Optional[str] = None
    is_available: Optional[bool] = None


class MealOut(BaseModel):
    id: int
    canteen_id: int
    name: str
    price: float
    quantity: int
    image_url: Optional[str]
    is_available: bool

    model_config = ConfigDict(from_attributes=True)
