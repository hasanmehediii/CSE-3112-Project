from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..auth.auth_bearer import JWTBearer
from ..schemas.meal_schema import MealCreate, MealUpdate, MealOut
from ..controllers.meal_controller import (
    create_meal,
    get_meals_by_canteen,
    get_available_meals,
    get_budget_deals,
    update_meal,
)
from ..models.canteen import Canteen

router = APIRouter(prefix="/meals", tags=["Meals"])


def _get_canteen_for_owner(owner_id: int, db: Session) -> Canteen:
    """Helper: find canteen row for a given owner (user.id)."""
    canteen = db.query(Canteen).filter(Canteen.owner_id == owner_id).first()
    if not canteen:
        raise HTTPException(status_code=404, detail="Canteen not found for this owner")
    return canteen


@router.post(
    "/", response_model=MealOut, dependencies=[Depends(JWTBearer("canteen"))]
)
def create_meal_endpoint(
    payload: MealCreate,
    token_data=Depends(JWTBearer("canteen")),
    db: Session = Depends(get_db),
):
    """
    Canteen owner creates a meal.
    Request body: { name, price, quantity, image_url }
    """
    owner_id = token_data["id"]
    canteen = _get_canteen_for_owner(owner_id, db)
    return create_meal(canteen.id, payload, db)


@router.get("/canteen/{canteen_id}", response_model=list[MealOut])
def list_meals_by_canteen(canteen_id: int, db: Session = Depends(get_db)):
    """
    List meals for a specific canteen.
    """
    return get_meals_by_canteen(canteen_id, db)


@router.get("/available", response_model=list[MealOut])
def list_available_meals(db: Session = Depends(get_db)):
    """
    List all available meals (is_available = true).
    Used for student's 'today's meals' dashboard.
    """
    return get_available_meals(db)


@router.get("/budget", response_model=list[MealOut])
def list_budget_deals(db: Session = Depends(get_db)):
    """
    List all available meals ordered by price ascending.
    Used for 'budget deal' feature.
    """
    return get_budget_deals(db)


@router.patch(
    "/{meal_id}",
    response_model=MealOut,
    dependencies=[Depends(JWTBearer("canteen"))],
)
def update_meal_endpoint(
    meal_id: int,
    payload: MealUpdate,
    token_data=Depends(JWTBearer("canteen")),
    db: Session = Depends(get_db),
):
    """
    Canteen owner updates one of their meals.
    Can change name, price, quantity, image_url, is_available.
    Quantity changes auto-toggle is_available.
    """
    owner_id = token_data["id"]
    canteen = _get_canteen_for_owner(owner_id, db)
    return update_meal(meal_id, payload, db, canteen.id)
