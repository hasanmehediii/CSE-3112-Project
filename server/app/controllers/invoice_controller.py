from sqlalchemy import func
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

def get_invoice_by_id(invoice_id: int, canteen_id: int, db: Session):
    invoice = db.query(Invoice).get(invoice_id)
    if not invoice:
        raise HTTPException(404, "Invoice not found")
    if invoice.canteen_id != canteen_id:
        raise HTTPException(403, "Cannot access this invoice")
    return invoice

def mark_invoice_as_paid(invoice_id: int, canteen_id: int, db: Session):
    invoice = db.query(Invoice).get(invoice_id)
    if not invoice:
        raise HTTPException(404, "Invoice not found")
    if invoice.canteen_id != canteen_id:
        raise HTTPException(403, "Cannot update this invoice")

    invoice.is_paid = True
    db.commit()
    db.refresh(invoice)
    return invoice

def get_invoices_for_order(order_id: int, db: Session):
    return db.query(Invoice).filter(Invoice.order_id == order_id).all()

def delete_invoice(invoice_id: int, canteen_id: int, db: Session):
    invoice = db.query(Invoice).get(invoice_id)
    if not invoice:
        raise HTTPException(404, "Invoice not found")
    if invoice.canteen_id != canteen_id:
        raise HTTPException(403, "Cannot delete this invoice")

    db.delete(invoice)
    db.commit()
    return {"detail": "Invoice deleted successfully"}

def update_invoice_amount(invoice_id: int, canteen_id: int, new_amount: float, db: Session):
    invoice = db.query(Invoice).get(invoice_id)
    if not invoice:
        raise HTTPException(404, "Invoice not found")
    if invoice.canteen_id != canteen_id:
        raise HTTPException(403, "Cannot update this invoice")

    invoice.total_amount = new_amount
    db.commit()
    db.refresh(invoice)
    return invoice

def get_unpaid_invoices(canteen_id: int, db: Session):
    invoices = db.query(Invoice).filter(
        Invoice.canteen_id == canteen_id,
        Invoice.is_paid == False  # noqa: E712
    ).all()
    return invoices

def get_paid_invoices(canteen_id: int, db: Session):
    invoices = db.query(Invoice).filter(
        Invoice.canteen_id == canteen_id,
        Invoice.is_paid == True  # noqa: E712
    ).all()
    return invoices

def get_all_invoices(db: Session):
    return db.query(Invoice).all()

def get_invoices_for_student(student_id: int, db: Session):
    return (
        db.query(Invoice)
        .join(Invoice.order)
        .filter(Order.student_id == student_id)
        .all()
    )

def get_unpaid_invoices_for_student(student_id: int, db: Session):
    return (
        db.query(Invoice)
        .join(Invoice.order)
        .filter(
            Order.student_id == student_id,
            Invoice.is_paid == False  # noqa: E712
        )
        .all()
    )

def get_paid_invoices_for_student(student_id: int, db: Session):
    return (
        db.query(Invoice)
        .join(Invoice.order)
        .filter(
            Order.student_id == student_id,
            Invoice.is_paid == True  # noqa: E712
        )
        .all()
    )

def delete_invoices_for_order(order_id: int, db: Session):
    invoices = db.query(Invoice).filter(Invoice.order_id == order_id).all()
    for invoice in invoices:
        db.delete(invoice)
    db.commit()
    return {"detail": f"Deleted {len(invoices)} invoices for order {order_id}"} 

def mark_invoices_as_paid_for_order(order_id: int, db: Session):
    invoices = db.query(Invoice).filter(Invoice.order_id == order_id).all()
    for invoice in invoices:
        invoice.is_paid = True
    db.commit()
    return {"detail": f"Marked {len(invoices)} invoices as paid for order {order_id}"}

def update_invoices_amount_for_order(order_id: int, new_amount: float, db: Session):
    invoices = db.query(Invoice).filter(Invoice.order_id == order_id).all()
    for invoice in invoices:
        invoice.total_amount = new_amount
    db.commit()
    return {"detail": f"Updated amount for {len(invoices)} invoices for order {order_id}"}

def get_invoice_summary_for_canteen(canteen_id: int, db: Session):
    total_invoices = db.query(Invoice).filter(Invoice.canteen_id == canteen_id).count()
    paid_invoices = db.query(Invoice).filter(
        Invoice.canteen_id == canteen_id,
        Invoice.is_paid == True  # noqa: E712
    ).count()
    unpaid_invoices = total_invoices - paid_invoices
    total_revenue = db.query(Invoice).filter(
        Invoice.canteen_id == canteen_id,
        Invoice.is_paid == True  # noqa: E712
    ).with_entities(func.sum(Invoice.total_amount)).scalar() or 0.0

    return {
        "total_invoices": total_invoices,
        "paid_invoices": paid_invoices,
        "unpaid_invoices": unpaid_invoices,
        "total_revenue": total_revenue,
    }

def get_invoice_summary_for_student(student_id: int, db: Session):
    total_invoices = (
        db.query(Invoice)
        .join(Invoice.order)
        .filter(Order.student_id == student_id)
        .count()
    )
    paid_invoices = (
        db.query(Invoice)
        .join(Invoice.order)
        .filter(
            Order.student_id == student_id,
            Invoice.is_paid == True  # noqa: E712
        )
        .count()
    )
    unpaid_invoices = total_invoices - paid_invoices
    total_spent = (
        db.query(Invoice)
        .join(Invoice.order)
        .filter(
            Order.student_id == student_id,
            Invoice.is_paid == True  # noqa: E712
        )
        .with_entities(func.sum(Invoice.total_amount))
        .scalar() or 0.0
    )

    return {
        "total_invoices": total_invoices,
        "paid_invoices": paid_invoices,
        "unpaid_invoices": unpaid_invoices,
        "total_spent": total_spent,
    }

def get_total_revenue_for_canteen(canteen_id: int, db: Session):
    total_revenue = db.query(Invoice).filter(
        Invoice.canteen_id == canteen_id,
        Invoice.is_paid == True  # noqa: E712
    ).with_entities(func.sum(Invoice.total_amount)).scalar() or 0.0
    return total_revenue

def get_total_expenditure_for_student(student_id: int, db: Session):
    total_expenditure = (
        db.query(Invoice)
        .join(Invoice.order)
        .filter(
            Order.student_id == student_id,
            Invoice.is_paid == True  # noqa: E712
        )
        .with_entities(func.sum(Invoice.total_amount))
        .scalar() or 0.0
    )
    return total_expenditure

def get_average_invoice_amount_for_canteen(canteen_id: int, db: Session):
    average_amount = db.query(Invoice).filter(
        Invoice.canteen_id == canteen_id
    ).with_entities(func.avg(Invoice.total_amount)).scalar() or 0.0
    return average_amount

def get_average_invoice_amount_for_student(student_id: int, db: Session):
    average_amount = (
        db.query(Invoice)
        .join(Invoice.order)
        .filter(Order.student_id == student_id)
        .with_entities(func.avg(Invoice.total_amount))
        .scalar() or 0.0
    )
    return average_amount


def get_invoice_count_for_canteen(canteen_id: int, db: Session):
    count = db.query(Invoice).filter(Invoice.canteen_id == canteen_id).count()
    return count


def get_invoice_count_for_student(student_id: int, db: Session):
    count = (
        db.query(Invoice)
        .join(Invoice.order)
        .filter(Order.student_id == student_id)
        .count()
    )
    return count