from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..auth.auth_bearer import JWTBearer
from ..schemas.invoice_schema import InvoiceOut
from ..controllers.invoice_controller import (
    create_invoice_for_order,
    get_invoices_for_canteen,
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
