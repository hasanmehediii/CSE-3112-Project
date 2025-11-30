from fastapi import HTTPException
from sqlalchemy.orm import Session

from ..models.meal import Meal
from ..schemas.meal_schema import MealCreate, MealUpdate


def create_meal(canteen_id: int, data: MealCreate, db: Session):
    """Create a meal for a given canteen."""
    meal = Meal(
        canteen_id=canteen_id,
        name=data.name,
        price=data.price,
        quantity=data.quantity,
        image_url=data.image_url,
        is_available=data.quantity > 0,  # ✅ auto: available if quantity > 0
    )
    db.add(meal)
    db.commit()
    db.refresh(meal)
    return meal


def get_meals_by_canteen(canteen_id: int, db: Session):
    """Return all meals for a specific canteen."""
    return db.query(Meal).filter(Meal.canteen_id == canteen_id).all()


def get_available_meals(db: Session):
    """Return all meals that are marked available."""
    return db.query(Meal).filter(Meal.is_available == True).all()  # noqa: E712


def get_budget_deals(db: Session):
    """Return all available meals sorted by price (low to high)."""
    return (
        db.query(Meal)
        .filter(Meal.is_available == True)  # noqa: E712
        .order_by(Meal.price.asc())
        .all()
    )


def update_meal(meal_id: int, data: MealUpdate, db: Session, canteen_id: int):
    """Update a meal, ensuring it belongs to the given canteen."""
    meal = db.query(Meal).get(meal_id)
    if not meal or meal.canteen_id != canteen_id:
        raise HTTPException(status_code=404, detail="Meal not found")

    if data.name is not None:
        meal.name = data.name
    if data.price is not None:
        meal.price = data.price
    if data.image_url is not None:
        meal.image_url = data.image_url
    if data.quantity is not None:
        meal.quantity = data.quantity
        # ✅ auto toggle availability when quantity changes
        if meal.quantity <= 0:
            meal.is_available = False
        else:
            meal.is_available = True

    # Allow manual override too, if needed
    if data.is_available is not None:
        meal.is_available = data.is_available

    db.commit()
    db.refresh(meal)
    return meal

def delete_meal(meal_id: int, db: Session, canteen_id: int):
    """Delete a meal, ensuring it belongs to the given canteen."""
    meal = db.query(Meal).get(meal_id)
    if not meal or meal.canteen_id != canteen_id:
        raise HTTPException(status_code=404, detail="Meal not found")

    db.delete(meal)
    db.commit()
    return {"detail": "Meal deleted successfully"}