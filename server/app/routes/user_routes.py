from typing import Literal, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from ..auth.auth_bearer import JWTBearer
from ..controllers.user_controller import (
    delete_user,
    get_all_users,
    get_me,
    get_users_by_role,
    login_user,
    register_user,
    update_me,
)
from ..database import get_db
from ..schemas.user_schema import AuthToken, UserLogin, UserOut, UserRegister, UserUpdate

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/register", response_model=AuthToken, status_code=201)
def register(payload: UserRegister, db: Session = Depends(get_db)):
    return register_user(payload, db)


@router.post("/login", response_model=AuthToken)
def login(payload: UserLogin, db: Session = Depends(get_db)):
    return login_user(payload, db)


@router.get("/me", response_model=UserOut)
def read_me(token_data=Depends(JWTBearer()), db: Session = Depends(get_db)):
    return get_me(token_data["id"], db)


@router.patch("/me", response_model=UserOut)
def update_me_endpoint(
    payload: UserUpdate,
    token_data=Depends(JWTBearer()),
    db: Session = Depends(get_db),
):
    return update_me(token_data["id"], payload, db)


@router.get("/", response_model=list[UserOut])
def list_users(
    role: Optional[Literal["student", "canteen", "admin"]] = None,
    offset: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=200),
    token_data=Depends(JWTBearer("admin")),
    db: Session = Depends(get_db),
):
    if role:
        return get_users_by_role(role, db, offset, limit)
    return get_all_users(db, offset, limit)


@router.delete("/{user_id}")
def delete_user_endpoint(
    user_id: int,
    token_data=Depends(JWTBearer("admin")),
    db: Session = Depends(get_db),
):
    return delete_user(user_id, db)
