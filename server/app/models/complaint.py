from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    canteen_id = Column(Integer, ForeignKey("canteens.id"), nullable=True)
    meal_id = Column(Integer, ForeignKey("meals.id"), nullable=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=True)

    message = Column(Text, nullable=False)
    status = Column(String(30), default="pending")  # pending, reviewing, resolved
    created_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("User", back_populates="complaints")
    canteen = relationship("Canteen", back_populates="complaints")
    meal = relationship("Meal", back_populates="complaints")
    order = relationship("Order", back_populates="complaints")
