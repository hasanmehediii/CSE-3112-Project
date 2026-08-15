import logging
import time
import uuid

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from .config import FRONTEND_URLS
from .database import database_is_ready
from .routes.admin_routes import router as admin_router
from .routes.booking_routes import router as booking_router
from .routes.canteen_routes import router as canteen_router
from .routes.complaint_routes import router as complaint_router
from .routes.invoice_routes import router as invoice_router
from .routes.meal_routes import router as meal_router
from .routes.order_routes import router as order_router
from .routes.user_routes import router as user_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("khaikhai.api")

app = FastAPI(title="KhaiKhai API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=list(FRONTEND_URLS),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "X-Request-ID"],
)


@app.middleware("http")
async def request_context(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
    started = time.perf_counter()
    response = await call_next(request)
    duration_ms = (time.perf_counter() - started) * 1000
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Response-Time-Ms"] = f"{duration_ms:.1f}"
    logger.info(
        "%s %s %s %.1fms request_id=%s",
        request.method,
        request.url.path,
        response.status_code,
        duration_ms,
        request_id,
    )
    return response


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": {"message": str(exc.detail), "code": "http_error"}},
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    details = [
        {"location": error.get("loc"), "message": error.get("msg"), "type": error.get("type")}
        for error in exc.errors()
    ]
    return JSONResponse(
        status_code=422,
        content={
            "error": {
                "message": "Request validation failed",
                "code": "validation_error",
                "details": details,
            }
        },
    )


@app.get("/")
def root():
    return {"message": "KhaiKhai API is running", "docs": "/docs"}


@app.get("/health", tags=["Operations"])
def health():
    return {"status": "ok"}


@app.get("/ready", tags=["Operations"])
def ready():
    if not database_is_ready():
        return JSONResponse(status_code=503, content={"status": "not_ready"})
    return {"status": "ready"}


app.include_router(user_router)
app.include_router(admin_router)
app.include_router(canteen_router)
app.include_router(meal_router)
app.include_router(order_router)
app.include_router(complaint_router)
app.include_router(booking_router)
app.include_router(invoice_router)
