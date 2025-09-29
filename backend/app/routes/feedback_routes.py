from fastapi import APIRouter, HTTPException, status
from app.models.feedback_model import Feedback
from app.core.database import get_db
from app.routes.common_template import make_simple_router

router = make_simple_router("feedback")

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_feedback(feedback: Feedback):
    db = get_db()
    coll = db["feedback"]
    result = await coll.insert_one(feedback.dict())
    created = await coll.find_one({"_id": result.inserted_id})
    return {"measage": "Feedback created", "feedback": created}

@router.get("/{feedback_id}")
async def get_feedback(feedback_id: str):
    db = get_db()
    coll = db["feedback"]
    feedback = await coll.find_one({"_id": feedback_id})
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    return feedback

@router.delete("/{feedback_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_feedback(feedback_id: str):
    db = get_db()
    coll = db["feedback"]
    result = await coll.delete_one({"_id": feedback_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Feedback not found")
    return {"message": "Feedback deleted"}

@router.put("/{feedback_id}")
async def update_feedback(feedback_id: str, feedback: Feedback):
    db = get_db()
    coll = db["feedback"]
    result = await coll.update_one({"_id": feedback_id}, {"$set": feedback.dict()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Feedback not found")
    updated = await coll.find_one({"_id": feedback_id})
    return {"message": "Feedback updated", "feedback": updated}

@router.get("/")
async def list_feedbacks():
    db = get_db()
    coll = db["feedback"]
    feedbacks = []
    async for feedback in coll.find():
        feedbacks.append(feedback)
    return feedbacks