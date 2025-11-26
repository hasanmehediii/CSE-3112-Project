from fastapi import APIRouter, HTTPException, Body, status
from app.core.database import get_db
from bson import ObjectId
from app.core.utils import serialize_list, serialize_doc
from app.schemas.feedback_schema import FeedbackCreate, FeedbackUpdate
from datetime import datetime

router = APIRouter()

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_feedback(feedback: FeedbackCreate):
    db = get_db()
    feedback_data = feedback.model_dump()
    feedback_data["created_at"] = datetime.now()
    result = db["feedback"].insert_one(feedback_data)
    return {"message": "Feedback created", "feedback_id": str(result.inserted_id)}

@router.get("/", summary="Get all feedback")
def get_all_feedback():
    db = get_db()
    feedback = list(db["feedback"].find())
    return serialize_list(feedback)

@router.get("/{feedback_id}", summary="Get a single feedback")
def get_feedback(feedback_id: str):
    db = get_db()
    feedback = db["feedback"].find_one({"_id": ObjectId(feedback_id)})
    if feedback:
        return serialize_doc(feedback)
    raise HTTPException(status_code=404, detail="Feedback not found")

@router.put("/{feedback_id}", summary="Update a feedback")
def update_feedback(feedback_id: str, feedback: FeedbackUpdate = Body(...)):
    db = get_db()
    feedback_data = feedback.model_dump(exclude_unset=True)
    result = db["feedback"].update_one({"_id": ObjectId(feedback_id)}, {"$set": feedback_data})
    if result.modified_count == 1:
        return {"message": "Feedback updated successfully"}
    raise HTTPException(status_code=404, detail="Feedback not found")

@router.delete("/{feedback_id}", summary="Delete a feedback")
def delete_feedback(feedback_id: str):
    db = get_db()
    result = db["feedback"].delete_one({"_id": ObjectId(feedback_id)})
    if result.deleted_count == 1:
        return {"message": "Feedback deleted successfully"}
    raise HTTPException(status_code=404, detail="Feedback not found")

@router.get("/canteen/{canteen_id}", summary="Get all feedback for a specific canteen")
def get_canteen_feedback(canteen_id: str):
    db = get_db()
    feedback = list(db["feedback"].find({"canteen_id": canteen_id}))
    return serialize_list(feedback)

@router.get("/pending/{canteen_id}")
def get_pending_feedback_count(canteen_id: str):
    db = get_db()
    coll = db["feedback"]
    
    # Assuming all feedback is pending for now
    count = coll.count_documents({"canteen_id": canteen_id})
    
    return {"pending_complaints": count}