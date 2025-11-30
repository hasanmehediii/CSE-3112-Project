from http.client import HTTPException
from sqlalchemy.orm import Session
from ..models.booking import Booking
from ..schemas.booking_schema import BookingCreate


def create_booking(student_id: int, data: BookingCreate, db: Session):
    booking = Booking(
        student_id=student_id,
        meal_id=data.meal_id,
        scheduled_time=data.scheduled_time,
        status="booked",
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking


def get_bookings_for_student(student_id: int, db: Session):
    return db.query(Booking).filter(Booking.student_id == student_id).all()


def cancel_booking(booking_id: int, student_id: int, db: Session):
    booking = db.query(Booking).get(booking_id)
    if not booking or booking.student_id != student_id:
        return None
    booking.status = "cancelled"
    db.commit()
    db.refresh(booking)
    return booking


def get_bookings_for_canteen(canteen_id: int, db: Session):
    return (
        db.query(Booking)
        .join(Booking.meal)
        .filter(Booking.meal.has(canteen_id=canteen_id))
        .all()
    )   

def update_booking_status(booking_id: int, canteen_id: int, new_status: str, db: Session):
    booking = db.query(Booking).get(booking_id)
    if not booking:
        raise HTTPException(404, "Booking not found")
    if booking.meal.canteen_id != canteen_id:
        raise HTTPException(403, "Cannot update this booking")
    booking.status = new_status
    db.commit()
    db.refresh(booking)
    return booking