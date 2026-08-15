from fastapi import HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from .auth_handler import decode_token


class JWTBearer(HTTPBearer):
    def __init__(self, required_role: str | None = None, auto_error: bool = True):
        super().__init__(auto_error=auto_error)
        self.required_role = required_role

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials | None = await super().__call__(request)
        if not credentials:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication required",
                headers={"WWW-Authenticate": "Bearer"},
            )

        payload = decode_token(credentials.credentials)
        if not payload or "id" not in payload or "role" not in payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token",
                headers={"WWW-Authenticate": "Bearer"},
            )
        if self.required_role and payload.get("role") != self.required_role:
            raise HTTPException(status_code=403, detail="Access denied for this role")
        return payload
