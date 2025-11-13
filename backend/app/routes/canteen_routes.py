from app.routes.common_template import make_simple_router
from fastapi import APIRouter, HTTPException
from app.core.database import get_db
from bson import ObjectId
from app.core.utils import serialize_list

# Create the simple canteens router
router = make_simple_router("canteens")

# Add custom route to the same router
@router.get("/{canteen_id}/meals", summary="Get all meals for a specific canteen")
async def get_canteen_meals(canteen_id: str):
    db = get_db()
    try:
        meals = list(db["meals"].find({"canteen_id": canteen_id}))
        if not meals:
            raise HTTPException(status_code=404, detail="No meals found")
        return serialize_list(meals)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
