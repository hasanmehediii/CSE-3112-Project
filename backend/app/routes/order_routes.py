from app.routes.common_template import make_simple_router
from fastapi import APIRouter, HTTPException, status
from app.models.order_model import Order
from app.core.database import get_db

router = make_simple_router("orders")


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_order(order: Order):
    db = get_db()
    coll = db["orders"]
    result = await coll.insert_one(order.dict())
    created = await coll.find_one({"_id": result.inserted_id})
    return {"message": "Order created", "order": created}   


@router.get("/{order_id}")
async def get_order(order_id: str):
    db = get_db()
    coll = db["orders"]
    order = await coll.find_one({"_id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order    


@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_order(order_id: str):
    db = get_db()
    coll = db["orders"]
    result = await coll.delete_one({"_id": order_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"message": "Order deleted"}


@router.put("/{order_id}")
async def update_order(order_id: str, order: Order):
    db = get_db()
    coll = db["orders"]
    result = await coll.update_one({"_id": order_id}, {"$set": order.dict()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    updated = await coll.find_one({"_id": order_id})
    return {"message": "Order updated", "order": updated}


@router.get("/")
async def list_orders():
    db = get_db()
    coll = db["orders"]
    orders = []
    async for order in coll.find():
        orders.append(order)
    return orders

