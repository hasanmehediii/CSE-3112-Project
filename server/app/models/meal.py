from sqlalchemy import Column, Integer, String, Numeric, Boolean, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base


class Meal(Base):
    __tablename__ = "meals"

    id = Column(Integer, primary_key=True, index=True)
    canteen_id = Column(Integer, ForeignKey("canteens.id"), nullable=False)
    name = Column(String(120), nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    image_url = Column(Text)
    quantity = Column(Integer, default=0)
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    canteen = relationship("Canteen", back_populates="meals")
    order_items = relationship("OrderItem", back_populates="meal")
    complaints = relationship("Complaint", back_populates="meal")
    bookings = relationship("Booking", back_populates="meal")
