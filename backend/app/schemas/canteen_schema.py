from pydantic import BaseModel
from typing import List, Optional

class OpenHours(BaseModel):
    start: str
    end: str

class CanteenCreate(BaseModel):
    name: str
    location: str
    owner_id: str
    contact: str
    description: Optional[str] = None
    menu_ids: Optional[List[str]] = []
    open_hours: Optional[OpenHours] = None

class CanteenUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    contact: Optional[str] = None
    description: Optional[str] = None
    menu_ids: Optional[List[str]] = None
    open_hours: Optional[OpenHours] = None

class CanteenOut(BaseModel):
    id: str
    name: str
    location: str
    owner_id: str
    contact: str
    description: Optional[str]
    menu_ids: Optional[List[str]]
    open_hours: Optional[OpenHours]

    class Config:
        from_attributes = True
