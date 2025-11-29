from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth.auth_bearer import JWTBearer
from ..schemas.booking_schema import BookingCreate, BookingOut
from ..controllers.booking_controller import (
    create_booking,
    get_bookings_for_student,
    cancel_booking,
)

router = APIRouter(prefix="/bookings", tags=["Bookings"])


@router.post("/", response_model=BookingOut, dependencies=[Depends(JWTBearer("student"))])
def create_booking_endpoint(
    payload: BookingCreate,
    token_data=Depends(JWTBearer("student")),
    db: Session = Depends(get_db),
):
    student_id = token_data["id"]
    return create_booking(student_id, payload, db)


@router.get("/me", response_model=list[BookingOut], dependencies=[Depends(JWTBearer("student"))])
def get_my_bookings(token_data=Depends(JWTBearer("student")), db: Session = Depends(get_db)):
    student_id = token_data["id"]
    return get_bookings_for_student(student_id, db)


@router.patch("/{booking_id}/cancel", response_model=BookingOut, dependencies=[Depends(JWTBearer("student"))])
def cancel_booking_endpoint(
    booking_id: int,
    token_data=Depends(JWTBearer("student")),
    db: Session = Depends(get_db),
):
    student_id = token_data["id"]
    booking = cancel_booking(booking_id, student_id, db)
    if not booking:
        from fastapi import HTTPException
        raise HTTPException(404, "Booking not found")
    return booking
