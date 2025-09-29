from app.routes.common_template import make_simple_router
from fastapi import APIRouter, HTTPException, status
from app.models.notification_model import Notification
from app.core.database import get_db

router = make_simple_router("notifications")


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_notification(notification: Notification):
    db = get_db()
    coll = db["notifications"]
    result = await coll.insert_one(notification.dict())
    created = await coll.find_one({"_id": result.inserted_id})
    return {"message": "Notification created", "notification": created}


@router.get("/{notification_id}")
async def get_notification(notification_id: str):   
    db = get_db()
    coll = db["notifications"]
    notification = await coll.find_one({"_id": notification_id})
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification


@router.delete("/{notification_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_notification(notification_id: str):
    db = get_db()
    coll = db["notifications"]
    result = await coll.delete_one({"_id": notification_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"message": "Notification deleted"}


@router.put("/{notification_id}")
async def update_notification(notification_id: str, notification: Notification):
    db = get_db()
    coll = db["notifications"]
    result = await coll.update_one({"_id": notification_id}, {"$set": notification.dict()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Notification not found")   
    updated = await coll.find_one({"_id": notification_id})
    return {"message": "Notification updated", "notification": updated} 


@router.get("/")
async def list_notifications():
    db = get_db()
    coll = db["notifications"]
    notifications = []
    async for notification in coll.find():
        notifications.append(notification)
    return notifications