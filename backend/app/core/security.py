from passlib.context import CryptContext
import bcrypt

# Force pure-python backend for Windows safety
bcrypt.__about__ = type("about", (), {"__version__": "4.0.1"})

pwd_context = CryptContext(
    schemes=["bcrypt"],
    bcrypt__ident="2b",
    deprecated="auto",
)

def hash_password(password: str) -> str:
    """Hash password (safe for Windows)."""
    truncated_password = password[:72]
    return pwd_context.hash(truncated_password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password (safe for Windows)."""
    truncated_password = plain_password[:72]
    return pwd_context.verify(truncated_password, hashed_password)
