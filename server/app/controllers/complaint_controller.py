from fastapi import HTTPException
from sqlalchemy.orm import Session

from ..models.complaint import Complaint
from ..models.canteen import Canteen
from ..models.meal import Meal
from ..models.order import Order
from ..schemas.complaint_schema import ComplaintCreate, ComplaintUpdateStatus


def create_complaint(student_id: int, data: ComplaintCreate, db: Session):
    canteen = db.get(Canteen, data.canteen_id)
    if not canteen:
        raise HTTPException(status_code=404, detail="Canteen not found")
    if data.meal_id:
        meal = db.get(Meal, data.meal_id)
        if not meal or meal.canteen_id != data.canteen_id:
            raise HTTPException(status_code=400, detail="Meal does not belong to this canteen")
    if data.order_id:
        order = db.get(Order, data.order_id)
        if not order or order.student_id != student_id or order.canteen_id != data.canteen_id:
            raise HTTPException(status_code=400, detail="Order does not belong to this student and canteen")
    complaint = Complaint(
        student_id=student_id,
        canteen_id=data.canteen_id,
        meal_id=data.meal_id,
        order_id=data.order_id,
        message=data.message.strip(),
        status="pending",
    )
    db.add(complaint)
    db.commit()
    db.refresh(complaint)
    return complaint


def get_student_complaints(student_id: int, db: Session):
    return (
        db.query(Complaint)
        .filter(Complaint.student_id == student_id)
        .order_by(Complaint.created_at.desc(), Complaint.id.desc())
        .all()
    )


def get_all_complaints(db: Session):
    return db.query(Complaint).order_by(Complaint.created_at.desc(), Complaint.id.desc()).all()


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
    return (
        db.query(Complaint)
        .filter(Complaint.canteen_id == canteen.id)
        .order_by(Complaint.created_at.desc(), Complaint.id.desc())
        .all()
    )


def update_complaint_status(complaint_id: int, data: ComplaintUpdateStatus, db: Session):
    complaint = db.get(Complaint, complaint_id)
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    complaint.status = data.status
    db.commit()
    db.refresh(complaint)
    return complaint

def delete_complaint(complaint_id: int, student_id: int, db: Session):
    complaint = db.get(Complaint, complaint_id)
    if not complaint or complaint.student_id != student_id:
        raise HTTPException(status_code=404, detail="Complaint not found")

    db.delete(complaint)
    db.commit()
    return {"detail": "Complaint deleted successfully"}

def admin_delete_complaint(complaint_id: int, db: Session):
    complaint = db.get(Complaint, complaint_id)
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    db.delete(complaint)
    db.commit()
    return {"detail": "Complaint deleted successfully"}
