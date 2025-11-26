from fastapi import APIRouter, Depends, HTTPException, status
from app.core.database import get_db
from app.models.meal_model import Meal
from typing import List
from bson import ObjectId
from app.core.utils import serialize_list, serialize_doc

router = APIRouter()

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_meal(meal: Meal, db=Depends(get_db)):
    meal_dict = meal.model_dump()
    result = db.meals.insert_one(meal_dict)
    created_meal = db.meals.find_one({"_id": result.inserted_id})
    return {"message": "Meal created successfully", "meal": serialize_doc(created_meal)}

@router.get("/{canteen_id}", response_model=List[Meal])
def get_meals_by_canteen(canteen_id: str, db=Depends(get_db)):
    meals = list(db.meals.find({"canteen_id": canteen_id}))
    return serialize_list(meals)

@router.get("/meal/{meal_id}", response_model=Meal)
def get_meal(meal_id: str, db=Depends(get_db)):
    meal = db.meals.find_one({"_id": ObjectId(meal_id)})
    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")
    return serialize_doc(meal)
