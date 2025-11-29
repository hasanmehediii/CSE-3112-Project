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
