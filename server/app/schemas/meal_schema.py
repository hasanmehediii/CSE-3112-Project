from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class MealCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    price: float = Field(gt=0, le=100000)
    quantity: int = Field(ge=0, le=100000)
    image_url: Optional[str] = Field(default=None, max_length=2048)


class MealUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=2, max_length=120)
    price: Optional[float] = Field(default=None, gt=0, le=100000)
    quantity: Optional[int] = Field(default=None, ge=0, le=100000)
    image_url: Optional[str] = Field(default=None, max_length=2048)
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
