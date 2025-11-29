from sqlalchemy.orm import Session
from fastapi import HTTPException
from ..models.invoice import Invoice
from ..models.order import Order


def create_invoice_for_order(canteen_id: int, order_id: int, db: Session):
    order = db.query(Order).get(order_id)
    if not order:
        raise HTTPException(404, "Order not found")
    if order.canteen_id != canteen_id:
        raise HTTPException(403, "Cannot create invoice for this order")

    existing = db.query(Invoice).filter(Invoice.order_id == order_id).first()
    if existing:
        return existing

    invoice = Invoice(
        canteen_id=canteen_id,
        order_id=order_id,
        total_amount=order.total_price,
    )
    db.add(invoice)
    db.commit()
    db.refresh(invoice)
    return invoice


def get_invoices_for_canteen(canteen_id: int, db: Session):
    return db.query(Invoice).filter(Invoice.canteen_id == canteen_id).all()
