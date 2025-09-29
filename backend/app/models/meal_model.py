from pydantic import BaseModel, HttpUrl
from typing import Optional, List


class Meal(BaseModel):
    id: Optional[str]
    canteen_id: str
    name: str
    category: str
    price: float
    calories: Optional[int]
    ingredients: Optional[List[str]] = []
    diet_type: str  # "veg" | "non-veg" | "vegan"
    image_url: Optional[HttpUrl]
    is_available: bool = True
