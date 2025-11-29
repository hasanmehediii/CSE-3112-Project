from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    meal_id = Column(Integer, ForeignKey("meals.id"), nullable=False)

    scheduled_time = Column(DateTime, nullable=False)
    status = Column(String(20), default="booked")  # booked, cancelled
    created_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("User", back_populates="bookings")
    meal = relationship("Meal", back_populates="bookings")
