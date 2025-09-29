from pydantic import BaseModel
from typing import List, Optional
from datetime import date


class SelectedMeal(BaseModel):
    date: date
    meal_id: str


class MealPlan(BaseModel):
    id: Optional[str]
    student_id: str
    plan_type: str  # "daily" | "weekly"
    start_date: date
    end_date: date
    selected_meals: List[SelectedMeal]
    total_cost: float
    status: str  # "active" | "completed"
