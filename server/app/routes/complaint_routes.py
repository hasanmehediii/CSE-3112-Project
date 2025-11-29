from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..auth.auth_bearer import JWTBearer
from ..schemas.complaint_schema import ComplaintCreate, ComplaintOut, ComplaintUpdateStatus
from ..controllers.complaint_controller import (
    create_complaint,
    get_student_complaints,
    get_all_complaints,
    get_complaints_for_canteen_owner,
    update_complaint_status,
)

router = APIRouter(prefix="/complaints", tags=["Complaints"])


@router.post("/", response_model=ComplaintOut, dependencies=[Depends(JWTBearer("student"))])
def create_complaint_endpoint(
    payload: ComplaintCreate,
    token_data=Depends(JWTBearer("student")),
    db: Session = Depends(get_db),
):
    student_id = token_data["id"]
    return create_complaint(student_id, payload, db)


@router.get("/me", response_model=list[ComplaintOut], dependencies=[Depends(JWTBearer("student"))])
def get_my_complaints(
    token_data=Depends(JWTBearer("student")),
    db: Session = Depends(get_db),
):
    student_id = token_data["id"]
    return get_student_complaints(student_id, db)


# ✅ Canteen owner – see only complaints about *their* canteen
@router.get("/canteen", response_model=list[ComplaintOut], dependencies=[Depends(JWTBearer("canteen"))])
def get_canteen_owner_complaints(
    token_data=Depends(JWTBearer("canteen")),
    db: Session = Depends(get_db),
):
    owner_id = token_data["id"]
    return get_complaints_for_canteen_owner(owner_id, db)


# ✅ Admin – see all complaints
@router.get("/all", response_model=list[ComplaintOut], dependencies=[Depends(JWTBearer("admin"))])
def get_all_complaints_endpoint(
    db: Session = Depends(get_db),
):
    return get_all_complaints(db)


# ✅ Admin – update status
@router.patch(
    "/{complaint_id}/status",
    response_model=ComplaintOut,
    dependencies=[Depends(JWTBearer("admin"))],
)
def update_complaint_status_endpoint(
    complaint_id: int,
    payload: ComplaintUpdateStatus,
    db: Session = Depends(get_db),
):
    return update_complaint_status(complaint_id, payload, db)
