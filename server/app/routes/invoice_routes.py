from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth.auth_bearer import JWTBearer
from ..schemas.invoice_schema import InvoiceOut
from ..controllers.invoice_controller import (
    create_invoice_for_order,
    delete_invoice,
    delete_invoices_for_order,
    get_invoices_for_canteen,
    get_invoices_for_order,
    mark_invoices_as_paid_for_order,
)

router = APIRouter(prefix="/invoices", tags=["Invoices"])


@router.post("/{order_id}", response_model=InvoiceOut, dependencies=[Depends(JWTBearer("canteen"))])
def create_invoice_endpoint(
    order_id: int,
    token_data=Depends(JWTBearer("canteen")),
    db: Session = Depends(get_db),
):
    canteen_id = token_data["id"]
    return create_invoice_for_order(canteen_id, order_id, db)


@router.get("/me", response_model=list[InvoiceOut], dependencies=[Depends(JWTBearer("canteen"))])
def get_my_invoices(
    token_data=Depends(JWTBearer("canteen")),
    db: Session = Depends(get_db),
):
    canteen_id = token_data["id"]
    return get_invoices_for_canteen(canteen_id, db)


@router.get("/canteen/{canteen_id}", response_model=list[InvoiceOut])
def get_invoices_by_canteen(canteen_id: int, db: Session = Depends(get_db)):
    """
    Get all invoices for a specific canteen.
    """
    return get_invoices_for_canteen(canteen_id, db)

@router.get("/order/{order_id}", response_model=list[InvoiceOut])
def get_invoices_by_order(order_id: int, db: Session = Depends(get_db)):
    """
    Get all invoices for a specific order.
    """
    return get_invoices_for_order(order_id, db)

@router.delete("/{invoice_id}", dependencies=[Depends(JWTBearer("canteen"))])
def delete_invoice_endpoint(
    invoice_id: int,
    token_data=Depends(JWTBearer("canteen")),
    db: Session = Depends(get_db),
):
    canteen_id = token_data["id"]
    return delete_invoice(invoice_id, canteen_id, db)


@router.delete("/canteen/{canteen_id}/order/{order_id}", dependencies=[Depends(JWTBearer("canteen"))])
def delete_invoices_by_order_endpoint(
    canteen_id: int,
    order_id: int,
    db: Session = Depends(get_db),
):
    """
    Delete all invoices for a specific order under the canteen.
    """
    invoices = get_invoices_for_order(order_id, db)
    deleted_count = 0
    for invoice in invoices:
        if invoice.canteen_id == canteen_id:
            delete_invoice(invoice.id, canteen_id, db)
            deleted_count += 1
    return {"detail": f"Deleted {deleted_count} invoices for order {order_id}."}

@router.delete("/canteen/me/order/{order_id}", dependencies=[Depends(JWTBearer("canteen"))])
def delete_my_invoices_by_order_endpoint(
    order_id: int,
    token_data=Depends(JWTBearer("canteen")),
    db: Session = Depends(get_db),
):
    """
    Delete all invoices for a specific order under the canteen of the logged-in canteen owner.
    """
    canteen_id = token_data["id"]
    invoices = get_invoices_for_order(order_id, db)
    deleted_count = 0
    for invoice in invoices:
        if invoice.canteen_id == canteen_id:
            delete_invoice(invoice.id, canteen_id, db)
            deleted_count += 1
    return {"detail": f"Deleted {deleted_count} invoices for order {order_id}."}    

@router.delete("/order/{order_id}", dependencies=[Depends(JWTBearer("canteen"))])
def delete_invoices_for_order_endpoint( 
    order_id: int,
    db: Session = Depends(get_db),
):
    """
    Delete all invoices for a specific order.
    """
    return delete_invoices_for_order(order_id, db)


@router.post("/order/{order_id}/pay", dependencies=[Depends(JWTBearer("canteen"))])
def mark_invoices_as_paid_endpoint( 
    order_id: int,
    db: Session = Depends(get_db),
):
    """
    Mark all invoices for a specific order as paid.
    """
    return mark_invoices_as_paid_for_order(order_id, db)