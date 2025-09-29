from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from datetime import datetime, date


class MenuMealItem(BaseModel):
    meal_id: str
    name: Optional[str]
    price: Optional[float]
    image_url: Optional[HttpUrl]


class MenuDay(BaseModel):
    day: str
    items: List[MenuMealItem]
    combo_price: Optional[float]


class Menu(BaseModel):
    id: Optional[str]
    canteen_id: str
    title: str
    description: Optional[str]
    start_date: date
    end_date: date
    image_url: Optional[HttpUrl]
    meals: List[MenuDay]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
