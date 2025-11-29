from sqlalchemy import Column, Integer, String, Numeric, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    canteen_id = Column(Integer, ForeignKey("canteens.id"))
    total_price = Column(Numeric(10, 2), nullable=False)
    status = Column(String(30), nullable=False)  # pending, accepted, rejected, completed...
    mode = Column(String(20))  # pickup / delivery
    delivery_address = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("User", back_populates="orders")
    canteen = relationship("Canteen", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")
    complaints = relationship("Complaint", back_populates="order")
    invoice = relationship("Invoice", back_populates="order", uselist=False)


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    meal_id = Column(Integer, ForeignKey("meals.id"))
    quantity = Column(Integer, nullable=False)
    price_each = Column(Numeric(10, 2), nullable=False)

    order = relationship("Order", back_populates="items")
    meal = relationship("Meal", back_populates="order_items")
