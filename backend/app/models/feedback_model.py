from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Feedback(BaseModel):
    id: Optional[str]
    student_id: str
    meal_id: str
    canteen_id: str
    rating: float
    comment: Optional[str]
    created_at: Optional[datetime]
