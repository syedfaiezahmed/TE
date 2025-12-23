from typing import List, Dict
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import SiteContent, AdminUser
from auth import get_current_user

router = APIRouter(prefix="/content", tags=["Site Content"])

@router.get("/", response_model=Dict[str, str])
def read_content(session: Session = Depends(get_session)):
    content_items = session.exec(select(SiteContent)).all()
    # Convert list of objects to a simple dict {key: value}
    return {item.key: item.value for item in content_items}

@router.post("/", response_model=SiteContent)
def create_or_update_content(content_item: SiteContent, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    existing_item = session.get(SiteContent, content_item.key)
    if existing_item:
        existing_item.value = content_item.value
        session.add(existing_item)
        session.commit()
        session.refresh(existing_item)
        return existing_item
    else:
        session.add(content_item)
        session.commit()
        session.refresh(content_item)
        return content_item

@router.delete("/{key}")
def delete_content(key: str, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    item = session.get(SiteContent, key)
    if not item:
        raise HTTPException(status_code=404, detail="Content key not found")
    session.delete(item)
    session.commit()
    return {"ok": True}
