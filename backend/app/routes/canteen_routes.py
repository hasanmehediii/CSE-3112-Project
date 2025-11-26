from fastapi import APIRouter, HTTPException, Body
from app.core.database import get_db
from bson import ObjectId
from app.core.utils import serialize_list, serialize_doc
from app.schemas.canteen_schema import CanteenUpdate

# Create the simple canteens router
router = APIRouter()

@router.get("/", summary="Get all canteens")
async def get_all_canteens():
    db = get_db()
    canteens = list(db["canteens"].find())
    return serialize_list(canteens)

@router.get("/{canteen_id}", summary="Get a single canteen")
async def get_canteen(canteen_id: str):
    db = get_db()
    canteen = db["canteens"].find_one({"_id": ObjectId(canteen_id)})
    if canteen:
        return serialize_doc(canteen)
    raise HTTPException(status_code=404, detail="Canteen not found")

@router.put("/{canteen_id}", summary="Update a canteen")
async def update_canteen(canteen_id: str, canteen: CanteenUpdate = Body(...)):
    db = get_db()
    canteen_data = canteen.model_dump(exclude_unset=True)
    result = db["canteens"].update_one({"_id": ObjectId(canteen_id)}, {"$set": canteen_data})
    if result.modified_count == 1:
        return {"message": "Canteen updated successfully"}
    raise HTTPException(status_code=404, detail="Canteen not found")

@router.delete("/{canteen_id}", summary="Delete a canteen")
async def delete_canteen(canteen_id: str):
    db = get_db()
    result = db["canteens"].delete_one({"_id": ObjectId(canteen_id)})
    if result.deleted_count == 1:
        return {"message": "Canteen deleted successfully"}
    raise HTTPException(status_code=404, detail="Canteen not found")

@router.patch("/{canteen_id}", summary="Partially update a canteen")
async def patch_canteen(canteen_id: str, canteen: CanteenUpdate = Body(...)):
    db = get_db()
    canteen_data = canteen.model_dump(exclude_unset=True)
    result = db["canteens"].update_one({"_id": ObjectId(canteen_id)}, {"$set": canteen_data})
    if result.modified_count == 1:
        return {"message": "Canteen updated successfully"}
    raise HTTPException(status_code=404, detail="Canteen not found")
    
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
