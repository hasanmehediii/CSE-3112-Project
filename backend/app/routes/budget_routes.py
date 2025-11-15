# app/routes/budget_routes.py

from fastapi import APIRouter, Depends, HTTPException
from datetime import date
import calendar
from bson import ObjectId

from app.core.database import get_db
from app.services.auth_dependencies import get_current_user

router = APIRouter()


@router.post("/set-budget")
async def set_monthly_budget(data: dict, user=Depends(get_current_user)):
    db = get_db()  # FIXED
    user_id = user["_id"]

    monthly_budget = data.get("monthly_budget")
    if not monthly_budget or monthly_budget <= 0:
        raise HTTPException(status_code=400, detail="Invalid budget amount")

    today = date.today()
    last_day = calendar.monthrange(today.year, today.month)[1]
    end_date = date(today.year, today.month, last_day)

    days_left = (end_date - today).days + 1
    daily_budget = monthly_budget / days_left

    budget_data = {
        "monthly_budget": monthly_budget,
        "remaining_budget": monthly_budget,
        "daily_budget": round(daily_budget, 2),
        "budget_start_date": today.isoformat(),
        "budget_end_date": end_date.isoformat(),
        "overspent_amount": 0.0
    }

    db["users"].update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"budget": budget_data}}
    )

    return {"message": "Budget set successfully", "budget": budget_data}


@router.get("/get-budget")
async def get_budget(user=Depends(get_current_user)):
    db = get_db()
    user_id = user["_id"]

    user_data = db["users"].find_one({"_id": ObjectId(user_id)})

    if not user_data or "budget" not in user_data:
        raise HTTPException(status_code=404, detail="No budget set")

    budget = user_data["budget"]

    today = date.today()
    end_date = date.fromisoformat(budget["budget_end_date"])

    if today > end_date:
        return {"message": "Budget period ended. Please set a new budget."}

    days_left = (end_date - today).days + 1
    if days_left <= 0:
        days_left = 1

    new_daily_budget = budget["remaining_budget"] / days_left

    db["users"].update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"budget.daily_budget": round(new_daily_budget, 2)}}
    )

    budget["daily_budget"] = round(new_daily_budget, 2)

    return {"budget": budget}


async def deduct_budget(student_id, amount):
    db = get_db()
    student = db["users"].find_one({"_id": ObjectId(student_id)})

    if not student or "budget" not in student:
        return

    budget = student["budget"]
    new_remaining = budget["remaining_budget"] - amount

    overspent = 0
    if new_remaining < 0:
        overspent = abs(new_remaining)
        new_remaining = 0

    today = date.today()
    end_date = date.fromisoformat(budget["budget_end_date"])
    days_left = (end_date - today).days + 1

    if days_left <= 0:
        days_left = 1

    new_daily_budget = new_remaining / days_left

    db["users"].update_one(
        {"_id": ObjectId(student_id)},
        {
            "$set": {
                "budget.remaining_budget": new_remaining,
                "budget.overspent_amount": overspent,
                "budget.daily_budget": round(new_daily_budget, 2),
            }
        }
    )
