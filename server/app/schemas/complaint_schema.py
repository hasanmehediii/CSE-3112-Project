from pydantic import BaseModel, ConfigDict
from typing import Optional


class ComplaintCreate(BaseModel):
    canteen_id: int
    meal_id: Optional[int] = None
    order_id: Optional[int] = None
    message: str


# ✅ This is what routes/controller are trying to import
class ComplaintUpdateStatus(BaseModel):
    status: str


class ComplaintOut(BaseModel):
    id: int
    student_id: int
    canteen_id: Optional[int] = None
    meal_id: Optional[int] = None
    order_id: Optional[int] = None
    message: str
    status: str

    model_config = ConfigDict(from_attributes=True)
