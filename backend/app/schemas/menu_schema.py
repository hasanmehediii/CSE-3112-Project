from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from datetime import datetime, date

class MenuMealItem(BaseModel):
    meal_id: str
    name: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[HttpUrl] = None

class MenuDay(BaseModel):
    day: str
    items: List[MenuMealItem]
    combo_price: Optional[float] = None

class MenuCreate(BaseModel):
    canteen_id: str
    title: str
    description: Optional[str] = None
    start_date: date
    end_date: date
    image_url: Optional[HttpUrl] = None
    meals: List[MenuDay]

class MenuUpdate(BaseModel):
    canteen_id: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    image_url: Optional[HttpUrl] = None
    meals: Optional[List[MenuDay]] = None

class MenuOut(BaseModel):
    id: str
    canteen_id: str
    title: str
    description: Optional[str] = None
    start_date: date
    end_date: date
    image_url: Optional[HttpUrl] = None
    meals: List[MenuDay]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
