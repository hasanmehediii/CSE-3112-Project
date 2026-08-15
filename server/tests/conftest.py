import os
import tempfile

import pytest
from fastapi.testclient import TestClient
from passlib.hash import pbkdf2_sha256

database_fd, database_path = tempfile.mkstemp(suffix=".sqlite3")
os.close(database_fd)

os.environ["ENVIRONMENT"] = "test"
os.environ["DATABASE_URL"] = f"sqlite:///{database_path}"
os.environ["JWT_SECRET"] = "test-secret-that-is-long-enough-for-tests"
os.environ["FRONTEND_URLS"] = "http://localhost:5173"

from app.database import Base, SessionLocal, engine  # noqa: E402
from app.main import app  # noqa: E402
from app.models.user import User  # noqa: E402


def pytest_sessionfinish(session, exitstatus):
    engine.dispose()
    if os.path.exists(database_path):
        os.unlink(database_path)


@pytest.fixture(autouse=True)
def clean_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield


@pytest.fixture()
def client():
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture()
def admin_credentials():
    with SessionLocal() as db:
        db.add(
            User(
                role="admin",
                name="Pilot Admin",
                email="admin@example.com",
                password_hash=pbkdf2_sha256.hash("Admin123"),
            )
        )
        db.commit()
    return {"email": "admin@example.com", "password": "Admin123"}


def login(client: TestClient, email: str, password: str) -> str:
    response = client.post("/users/login", json={"email": email, "password": password})
    assert response.status_code == 200, response.text
    return response.json()["access_token"]


def auth(token: str) -> dict[str, str]:
    return {"Authorization": f"Bearer {token}"}
