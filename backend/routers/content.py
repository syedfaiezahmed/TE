from typing import List, Dict
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import SiteContent, AdminUser, Page
from auth import get_current_user

router = APIRouter(prefix="/content", tags=["Site Content"])

# --- Key-Value Content (for static sections like Hero) ---

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

# --- CMS Pages ---

@router.get("/pages", response_model=List[Page])
def read_pages(session: Session = Depends(get_session)):
    return session.exec(select(Page)).all()

@router.get("/pages/{slug}", response_model=Page)
def read_page(slug: str, session: Session = Depends(get_session)):
    page = session.get(Page, slug)
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    return page

@router.post("/pages", response_model=Page)
def create_page(page: Page, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    existing = session.get(Page, page.slug)
    if existing:
        raise HTTPException(status_code=400, detail="Page with this slug already exists")
    session.add(page)
    session.commit()
    session.refresh(page)
    return page

@router.put("/pages/{slug}", response_model=Page)
def update_page(slug: str, page_data: Page, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    page = session.get(Page, slug)
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    page_data_dict = page_data.dict(exclude_unset=True)
    # Don't update slug if it's the primary key, or handle it carefully (usually not recommended to change PK)
    # If we need to change slug, we'd need to delete and recreate or cascade. 
    # For now, let's assume slug is immutable or we just update other fields.
    if "slug" in page_data_dict and page_data_dict["slug"] != slug:
         # If slug change is requested, check if new slug exists
         if session.get(Page, page_data_dict["slug"]):
             raise HTTPException(status_code=400, detail="New slug already exists")
         
         # Creating new page with new slug and deleting old one is one way, 
         # but updating PK in SQLModel/SQLAlchemy is tricky.
         # Let's just update non-PK fields for simplicity in this MVP.
         del page_data_dict["slug"]

    for key, value in page_data_dict.items():
        setattr(page, key, value)
    
    session.add(page)
    session.commit()
    session.refresh(page)
    return page

@router.delete("/pages/{slug}")
def delete_page(slug: str, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    page = session.get(Page, slug)
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    session.delete(page)
    session.commit()
    return {"ok": True}
