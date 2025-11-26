from fastapi import APIRouter, HTTPException, Body, status
from app.core.database import get_db
from bson import ObjectId
from app.core.utils import serialize_list, serialize_doc
from app.schemas.order_schema import OrderCreate, OrderUpdate
from datetime import datetime, time

router = APIRouter()

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_order(order: OrderCreate):
    db = get_db()
    order_data = order.model_dump()
    order_data["order_date"] = datetime.now()
    result = db["orders"].insert_one(order_data)
    return {"message": "Order created", "order_id": str(result.inserted_id)}

@router.get("/", summary="Get all orders")
def get_all_orders():
    db = get_db()
    orders = list(db["orders"].find())
    return serialize_list(orders)

@router.get("/{order_id}", summary="Get a single order")
def get_order(order_id: str):
    db = get_db()
    order = db["orders"].find_one({"_id": ObjectId(order_id)})
    if order:
        return serialize_doc(order)
    raise HTTPException(status_code=404, detail="Order not found")

@router.put("/{order_id}", summary="Update an order")
def update_order(order_id: str, order: OrderUpdate = Body(...)):
    db = get_db()
    order_data = order.model_dump(exclude_unset=True)
    result = db["orders"].update_one({"_id": ObjectId(order_id)}, {"$set": order_data})
    if result.modified_count == 1:
        return {"message": "Order updated successfully"}
    raise HTTPException(status_code=404, detail="Order not found")

@router.delete("/{order_id}", summary="Delete an order")
def delete_order(order_id: str):
    db = get_db()
    result = db["orders"].delete_one({"_id": ObjectId(order_id)})
    if result.deleted_count == 1:
        return {"message": "Order deleted successfully"}
    raise HTTPException(status_code=404, detail="Order not found")

@router.get("/canteen/{canteen_id}", summary="Get all orders for a specific canteen")
def get_canteen_orders(canteen_id: str):
    db = get_db()
    orders = list(db["orders"].find({"canteen_id": canteen_id}))
    return serialize_list(orders)

@router.get("/stats/{canteen_id}")
def get_order_stats(canteen_id: str):
    db = get_db()
    coll = db["orders"]
    
    # Total orders
    total_orders = coll.count_documents({"canteen_id": canteen_id})
    
    # Today's revenue
    today = datetime.now().date()
    start_of_day = datetime.combine(today, time.min)
    end_of_day = datetime.combine(today, time.max)
    
    revenue_pipeline = [
        {"$match": {
            "canteen_id": canteen_id,
            "order_date": {
                "$gte": start_of_day,
                "$lt": end_of_day
            }
        }},
        {"$group": {
            "_id": None,
            "total_revenue": {"$sum": "$total_price"}
        }}
    ]
    
    revenue_result = list(coll.aggregate(revenue_pipeline))
    todays_revenue = revenue_result[0]["total_revenue"] if revenue_result else 0
    
    return {
        "total_orders": total_orders,
        "todays_revenue": todays_revenue
    }
