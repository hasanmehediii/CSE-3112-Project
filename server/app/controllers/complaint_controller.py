from fastapi import HTTPException
from sqlalchemy.orm import Session

from ..models.complaint import Complaint
from ..models.canteen import Canteen
from ..schemas.complaint_schema import ComplaintCreate, ComplaintUpdateStatus


def create_complaint(student_id: int, data: ComplaintCreate, db: Session):
    complaint = Complaint(
        student_id=student_id,
        canteen_id=data.canteen_id,
        meal_id=data.meal_id,
        order_id=data.order_id,
        message=data.message,
        status="open",
    )
    db.add(complaint)
    db.commit()
    db.refresh(complaint)
    return complaint


def get_student_complaints(student_id: int, db: Session):
    return db.query(Complaint).filter(Complaint.student_id == student_id).all()


def get_all_complaints(db: Session):
    return db.query(Complaint).all()


def _get_canteen_for_owner(owner_id: int, db: Session) -> Canteen:
    canteen = db.query(Canteen).filter(Canteen.owner_id == owner_id).first()
    if not canteen:
        raise HTTPException(status_code=404, detail="Canteen not found for this owner")
    return canteen


def get_complaints_for_canteen_owner(owner_id: int, db: Session):
    """
    Return complaints only for the canteen that belongs to this owner.
    This ensures a canteen owner can't see other canteens' complaints.
    """
    canteen = _get_canteen_for_owner(owner_id, db)
    return db.query(Complaint).filter(Complaint.canteen_id == canteen.id).all()


def update_complaint_status(complaint_id: int, data: ComplaintUpdateStatus, db: Session):
    complaint = db.query(Complaint).get(complaint_id)
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    complaint.status = data.status
    db.commit()
    db.refresh(complaint)
    return complaint

def delete_complaint(complaint_id: int, student_id: int, db: Session):
    complaint = db.query(Complaint).get(complaint_id)
    if not complaint or complaint.student_id != student_id:
        raise HTTPException(status_code=404, detail="Complaint not found")

    db.delete(complaint)
    db.commit()
    return {"detail": "Complaint deleted successfully"}