from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.user_schema import UserRegister, UserLogin, UserOut, UserUpdate
from ..controllers.user_controller import register_user, login_user, get_me, update_me
from ..auth.auth_bearer import JWTBearer

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/register")
def register(payload: UserRegister, db: Session = Depends(get_db)):
    return register_user(payload, db)


@router.post("/login")
def login(payload: UserLogin, db: Session = Depends(get_db)):
    return login_user(payload, db)


@router.get("/me", response_model=UserOut)
def read_me(token_data=Depends(JWTBearer()), db: Session = Depends(get_db)):
    user_id = token_data["id"]
    return get_me(user_id, db)


@router.get("/", response_model=list[UserOut])
def list_users(db: Session = Depends(get_db)):
    from ..models.user import User
    return db.query(User).all()

@router.patch("/me", response_model=UserOut)
def update_me_endpoint(
    payload: UserUpdate,
    token_data=Depends(JWTBearer()),
    db: Session = Depends(get_db),
):
    user_id = token_data["id"]
    return update_me(user_id, payload, db)
