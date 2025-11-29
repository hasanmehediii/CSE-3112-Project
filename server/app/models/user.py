from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from ..database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    role = Column(String(20), nullable=False)  # 'student', 'canteen', 'admin'

    name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, nullable=False, index=True)
    phone = Column(String(20))
    password_hash = Column(Text, nullable=False)
    image_url = Column(Text)

    registration_no = Column(String(40), unique=True, nullable=True)
    dept = Column(String(100))
    address = Column(Text)

    canteen_name = Column(String(120))
    location = Column(Text)

    # relationships
    owned_canteens = relationship("Canteen", back_populates="owner")
    orders = relationship("Order", back_populates="student")
    complaints = relationship("Complaint", back_populates="student")
    bookings = relationship("Booking", back_populates="student")
