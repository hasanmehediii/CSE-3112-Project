from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import (
    user_routes,
    canteen_routes,
    meal_routes,
    menu_routes,
    order_routes,
    payment_routes,
    feedback_routes,
    notification_routes,
    mealplan_routes,
    auth_routes
)

from app.routes.auth_routes import router as auth_router
from app.routes.user_profile_routes import router as profile_router
from app.routes.user_routes import router as user_crud_router
from app.routes.budget_routes import router as budget_router


app = FastAPI(title="KhaiKhai Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(user_routes.router, prefix="/users", tags=["users"])
app.include_router(canteen_routes.router, prefix="/canteens", tags=["canteens"])
app.include_router(meal_routes.router, prefix="/meals", tags=["meals"])
app.include_router(menu_routes.router, prefix="/menu", tags=["menu"])
app.include_router(order_routes.router, prefix="/orders", tags=["orders"])
app.include_router(payment_routes.router, prefix="/payments", tags=["payments"])
app.include_router(feedback_routes.router, prefix="/feedback", tags=["feedback"])
app.include_router(notification_routes.router, prefix="/notifications", tags=["notifications"])
app.include_router(mealplan_routes.router, prefix="/mealplans", tags=["meal plans"])
app.include_router(profile_router, prefix="/user", tags=["User Profile"])
app.include_router(auth_routes.router, prefix="/auth", tags=["auth"])
app.include_router(budget_router, prefix="/budget", tags=["budget"])


@app.get("/")
def root():
    return {"message": "KhaiKhai API running🚀.... Waiting for Khadok :)"}
