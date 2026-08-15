from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict, Field


class ComplaintCreate(BaseModel):
    canteen_id: int = Field(gt=0)
    meal_id: Optional[int] = Field(default=None, gt=0)
    order_id: Optional[int] = Field(default=None, gt=0)
    message: str = Field(min_length=10, max_length=2000)


class ComplaintUpdateStatus(BaseModel):
    status: Literal["pending", "reviewing", "resolved"]


class ComplaintOut(BaseModel):
    id: int
    student_id: int
    canteen_id: Optional[int] = None
    meal_id: Optional[int] = None
    order_id: Optional[int] = None
    message: str
    status: Literal["pending", "reviewing", "resolved"]

    model_config = ConfigDict(from_attributes=True)
