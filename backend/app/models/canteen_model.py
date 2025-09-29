from pydantic import BaseModel
from typing import List, Optional


class OpenHours(BaseModel):
    start: str
    end: str


class Canteen(BaseModel):
    id: Optional[str]
    name: str
    location: str
    owner_id: str
    contact: str
    description: Optional[str]
    menu_ids: Optional[List[str]] = []
    open_hours: Optional[OpenHours]
