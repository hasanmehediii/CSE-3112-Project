from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Payment(BaseModel):
    id: Optional[str]
    student_id: str
    order_id: str
    amount: float
    method: str  # "bkash" | "nagad" | "cash"
    status: str  # "paid" | "failed" | "pending"
    timestamp: Optional[datetime]
