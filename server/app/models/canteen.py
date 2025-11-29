from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base


class Canteen(Base):
    __tablename__ = "canteens"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String(120), nullable=False)
    image_url = Column(Text)
    location = Column(Text)
    category = Column(String(60))
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="owned_canteens")
    meals = relationship("Meal", back_populates="canteen")
    orders = relationship("Order", back_populates="canteen")
    complaints = relationship("Complaint", back_populates="canteen")
    invoices = relationship("Invoice", back_populates="canteen")
