from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..auth.auth_bearer import JWTBearer
from ..controllers.user_controller import admin_create_user
from ..database import get_db
from ..schemas.user_schema import AdminUserCreate, UserOut

router = APIRouter(prefix="/admin", tags=["Administration"])


@router.post("/users", response_model=UserOut, status_code=201)
def create_managed_user(
    payload: AdminUserCreate,
    token_data=Depends(JWTBearer("admin")),
    db: Session = Depends(get_db),
):
    return admin_create_user(payload, db)

