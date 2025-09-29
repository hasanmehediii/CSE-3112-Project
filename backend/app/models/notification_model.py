from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Notification(BaseModel):
    id: Optional[str]
    user_id: str
    title: str
    message: str
    is_read: bool = False
    created_at: Optional[datetime]
