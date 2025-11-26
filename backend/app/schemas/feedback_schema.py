from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class FeedbackCreate(BaseModel):
    student_id: str
    meal_id: str
    canteen_id: str
    rating: float
    comment: Optional[str] = None

class FeedbackUpdate(BaseModel):
    rating: Optional[float] = None
    comment: Optional[str] = None

class FeedbackOut(BaseModel):
    id: str
    student_id: str
    meal_id: str
    canteen_id: str
    rating: float
    comment: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
