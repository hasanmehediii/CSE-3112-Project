from app.routes.common_template import make_simple_router
from fastapi import APIRouter, HTTPException, status
from app.models.payment_model import Payment
from app.core.database import get_db

router = make_simple_router("payments")


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_payment(payment: Payment):
    db = get_db()
    coll = db["payments"]
    result = await coll.insert_one(payment.dict())
    created = await coll.find_one({"_id": result.inserted_id})
    return {"message": "Payment created", "payment": created}


@router.get("/{payment_id}")
async def get_payment(payment_id: str): 
    db = get_db()
    coll = db["payments"]
    payment = await coll.find_one({"_id": payment_id})
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment


@router.delete("/{payment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_payment(payment_id: str):
    db = get_db()
    coll = db["payments"]
    result = await coll.delete_one({"_id": payment_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Payment not found")
    return {"message": "Payment deleted"}


@router.put("/{payment_id}")
async def update_payment(payment_id: str, payment: Payment):
    db = get_db()
    coll = db["payments"]
    result = await coll.update_one({"_id": payment_id}, {"$set": payment.dict()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Payment not found")
    updated = await coll.find_one({"_id": payment_id})
    return {"message": "Payment updated", "payment": updated}   


@router.get("/")
async def list_payments():
    db = get_db()
    coll = db["payments"]
    payments = []
    async for payment in coll.find():
        payments.append(payment)
    return payments

