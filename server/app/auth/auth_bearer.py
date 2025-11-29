from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .auth_handler import decode_token


class JWTBearer(HTTPBearer):
    def __init__(self, required_role: str | None = None, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)
        self.required_role = required_role

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super().__call__(request)
        if credentials:
            token = credentials.credentials
            payload = decode_token(token)
            if not payload:
                raise HTTPException(status_code=403, detail="Invalid or expired token")

            if self.required_role and payload.get("role") != self.required_role:
                raise HTTPException(status_code=403, detail="Access denied for this role")

            return payload
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code")
