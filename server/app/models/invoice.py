from sqlalchemy import Column, Integer, Numeric, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base


class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)
    canteen_id = Column(Integer, ForeignKey("canteens.id"), nullable=False)
    order_id = Column(Integer, ForeignKey("orders.id"), unique=True, nullable=False)
    total_amount = Column(Numeric(10, 2), nullable=False)
    issued_at = Column(DateTime, default=datetime.utcnow)

    canteen = relationship("Canteen", back_populates="invoices")
    order = relationship("Order", back_populates="invoice")
