from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from database import get_session
from models import Inquiry, AdminUser
from auth import get_current_user

router = APIRouter(prefix="/inquiries", tags=["Inquiries"])

@router.post("/", response_model=Inquiry, status_code=status.HTTP_201_CREATED)
def create_inquiry(inquiry: Inquiry, session: Session = Depends(get_session)):
    session.add(inquiry)
    session.commit()
    session.refresh(inquiry)
    return inquiry

@router.get("/", response_model=List[Inquiry])
def read_inquiries(session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    inquiries = session.exec(select(Inquiry).order_by(Inquiry.created_at.desc())).all()
    return inquiries

@router.delete("/{inquiry_id}")
def delete_inquiry(inquiry_id: int, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    inquiry = session.get(Inquiry, inquiry_id)
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    session.delete(inquiry)
    session.commit()
    return {"ok": True}
