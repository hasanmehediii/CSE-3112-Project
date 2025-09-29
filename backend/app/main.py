from fastapi import FastAPI
from app.core.database import init_db
from app.routes import (
    user_routes, canteen_routes, meal_routes,
    menu_routes, order_routes, payment_routes,
    feedback_routes, notification_routes, mealplan_routes
)

app = FastAPI(title="Meal Planner Backend", version="1.0.0")

@app.on_event("startup")
async def startup_db_client():
    await init_db()

# Register routers
app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(canteen_routes.router, prefix="/canteens", tags=["Canteens"])
app.include_router(meal_routes.router, prefix="/meals", tags=["Meals"])
app.include_router(menu_routes.router, prefix="/menus", tags=["Menus"])
app.include_router(order_routes.router, prefix="/orders", tags=["Orders"])
app.include_router(payment_routes.router, prefix="/payments", tags=["Payments"])
app.include_router(feedback_routes.router, prefix="/feedback", tags=["Feedback"])
app.include_router(notification_routes.router, prefix="/notifications", tags=["Notifications"])
app.include_router(mealplan_routes.router, prefix="/mealplans", tags=["Meal Plans"])

@app.get("/")
def root():
    return {"message": "KhaiKhai API running🚀.... Waiting for Khadok :)"}
