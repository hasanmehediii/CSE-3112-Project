from fastapi import APIRouter, HTTPException, Body, status, Depends
from app.core.database import get_db
from bson import ObjectId
from app.core.utils import serialize_list, serialize_doc
from app.schemas.menu_schema import MenuCreate, MenuUpdate
from typing import List
from app.models.menu_model import Menu


router = APIRouter()

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_menu(menu: MenuCreate, db=Depends(get_db)):
    canteen = db.canteens.find_one({"_id": ObjectId(menu.canteen_id)})
    if not canteen:
        raise HTTPException(status_code=404, detail="Canteen not found")
    
    menu_dict = menu.model_dump()
    result = db.menus.insert_one(menu_dict)
    return {"message": "Menu created successfully", "menu_id": str(result.inserted_id)}

@router.get("/{canteen_id}", response_model=List[Menu])
def get_menus_by_canteen(canteen_id: str, db=Depends(get_db)):
    canteen = db.canteens.find_one({"_id": ObjectId(canteen_id)})
    if not canteen:
        raise HTTPException(status_code=404, detail="Canteen not found")
        
    menus = list(db.menus.find({"canteen_id": canteen_id}))
    return serialize_list(menus)

@router.put("/{menu_id}", response_model=Menu)
def update_menu(menu_id: str, menu: MenuUpdate, db=Depends(get_db)):
    
    update_data = {k: v for k, v in menu.model_dump().items() if v is not None}

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = db.menus.update_one(
        {"_id": ObjectId(menu_id)},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Menu not found")

    updated_menu = db.menus.find_one({"_id": ObjectId(menu_id)})
    return serialize_doc(updated_menu)

@router.delete("/{menu_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_menu(menu_id: str, db=Depends(get_db)):
    result = db.menus.delete_one({"_id": ObjectId(menu_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Menu not found")
    return