import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from database import users_col, students_col, canteens_col, orders_col, complaints_col, weather_col, mealplans_col
from bson import ObjectId
import json
from datetime import datetime

# Custom JSON encoder to handle ObjectId and datetime
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime):
            return o.isoformat()
        return json.JSONEncoder.default(self, o)

# Load environment variables from .env
load_dotenv()

app = FastAPI(
    title="KhaiKhai Meal Planner API",
    description="Backend API for hybrid meal planner app (Flutter + React)",
    version="1.0.0"
)

# Allow CORS for frontend apps
origins = ["*"]  # Replace "*" with frontend URLs for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
def root():
    return {"message": "KhaiKhai Meal Planner API is running!"}

# Health check
@app.get("/health")
def health_check():
    return {"status": "ok"}

# Routes for all collections
@app.get("/users")
def get_users():
    users = list(users_col.find())
    return json.loads(JSONEncoder().encode(users))

@app.get("/students")
def get_students():
    students = list(students_col.find())
    return json.loads(JSONEncoder().encode(students))

@app.get("/canteens")
def get_canteens():
    canteens = list(canteens_col.find())
    return json.loads(JSONEncoder().encode(canteens))

@app.get("/orders")
def get_orders():
    orders = list(orders_col.find())
    return json.loads(JSONEncoder().encode(orders))

@app.get("/complaints")
def get_complaints():
    complaints = list(complaints_col.find())
    return json.loads(JSONEncoder().encode(complaints))

@app.get("/weather")
def get_weather():
    weather = list(weather_col.find())
    return json.loads(JSONEncoder().encode(weather))

@app.get("/mealplans")
def get_mealplans():
    mealplans = list(mealplans_col.find())
    return json.loads(JSONEncoder().encode(mealplans))


# ---------------------
if __name__ == "__main__":
    HOST = os.getenv("HOST", "127.0.0.1")  # Default for local
    PORT = int(os.getenv("PORT", 8000))    # Default for local
    import uvicorn
    uvicorn.run("main:app", host=HOST, port=PORT, reload=True)
