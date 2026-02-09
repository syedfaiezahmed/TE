from typing import List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from fastapi.responses import FileResponse
from sqlmodel import Session, select
from database import get_session
from models import MediaAsset, AdminUser
from auth import get_current_user
import shutil
import os
import uuid
from datetime import datetime

router = APIRouter(prefix="/media", tags=["Media Library"])

UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload", response_model=MediaAsset)
async def upload_file(
    file: UploadFile = File(...), 
    session: Session = Depends(get_session),
    current_user: AdminUser = Depends(get_current_user)
):
    # Generate unique filename
    file_ext = os.path.splitext(file.filename)[1]
    filename = f"{uuid.uuid4()}{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # Create DB entry
    # URL construction: Assuming backend runs on port 8000
    url = f"http://localhost:8000/static/uploads/{filename}"
    
    media_asset = MediaAsset(
        filename=file.filename,
        url=url,
        file_type=file.content_type or "application/octet-stream"
    )
    
    session.add(media_asset)
    session.commit()
    session.refresh(media_asset)
    
    return media_asset

@router.get("/", response_model=List[MediaAsset])
def read_media_assets(session: Session = Depends(get_session)):
    return session.exec(select(MediaAsset).order_by(MediaAsset.uploaded_at.desc())).all()

@router.delete("/{asset_id}")
def delete_media_asset(asset_id: int, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    asset = session.get(MediaAsset, asset_id)
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    
    # Try to delete file from disk
    try:
        filename = asset.url.split("/")[-1]
        file_path = os.path.join(UPLOAD_DIR, filename)
        if os.path.exists(file_path):
            os.remove(file_path)
    except Exception as e:
        print(f"Error deleting file: {e}")
        
    session.delete(asset)
    session.commit()
    return {"ok": True}
