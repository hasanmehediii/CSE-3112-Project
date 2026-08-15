import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()


def _required(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        raise RuntimeError(f"{name} must be configured")
    return value


@dataclass(frozen=True)
class Settings:
    environment: str
    database_url: str
    jwt_secret: str
    frontend_urls: tuple[str, ...]
    access_token_expire_seconds: int


def load_settings() -> Settings:
    environment = os.getenv("ENVIRONMENT", "development").strip().lower()
    jwt_secret = _required("JWT_SECRET")
    if environment == "production" and len(jwt_secret) < 32:
        raise RuntimeError("JWT_SECRET must contain at least 32 characters in production")

    frontend_urls = tuple(
        origin.strip().rstrip("/")
        for origin in _required("FRONTEND_URLS").split(",")
        if origin.strip()
    )
    if not frontend_urls:
        raise RuntimeError("FRONTEND_URLS must contain at least one origin")

    return Settings(
        environment=environment,
        database_url=_required("DATABASE_URL"),
        jwt_secret=jwt_secret,
        frontend_urls=frontend_urls,
        access_token_expire_seconds=int(
            os.getenv("ACCESS_TOKEN_EXPIRE_SECONDS", "86400")
        ),
    )


settings = load_settings()
DATABASE_URL = settings.database_url
JWT_SECRET = settings.jwt_secret
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = settings.access_token_expire_seconds
FRONTEND_URLS = settings.frontend_urls
