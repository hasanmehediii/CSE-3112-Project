import time
import jwt
from ..config import JWT_SECRET, JWT_ALGORITHM, ACCESS_TOKEN_EXPIRE_SECONDS


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    to_encode["exp"] = int(time.time()) + ACCESS_TOKEN_EXPIRE_SECONDS
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(token: str):
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded
    except Exception:
        return None
