from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routes.user_routes import router as user_router
from .routes.canteen_routes import router as canteen_router
from .routes.meal_routes import router as meal_router
from .routes.order_routes import router as order_router
from .routes.complaint_routes import router as complaint_router
from .routes.booking_routes import router as booking_router
from .routes.invoice_routes import router as invoice_router
from .config import FRONTEND_URL

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="University Meal System API")

# ✅ CORS setup
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    FRONTEND_URL,
]

origins = [o for o in origins if o]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Meal System API is running. Go to /docs for Swagger UI."}

# Routers
app.include_router(user_router)
app.include_router(canteen_router)
app.include_router(meal_router)
app.include_router(order_router)
app.include_router(complaint_router)
app.include_router(booking_router)
app.include_router(invoice_router)
