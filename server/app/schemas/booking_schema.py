from datetime import datetime
from pydantic import BaseModel, ConfigDict

class BookingCreate(BaseModel):
    meal_id: int
    scheduled_time: datetime


class BookingOut(BaseModel):
    id: int
    student_id: int
    meal_id: int
    scheduled_time: datetime
    status: str

    model_config = ConfigDict(from_attributes=True)