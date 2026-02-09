from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from datetime import timedelta
from database import get_session
from models import AdminUser, Token, AdminLogin
from auth import verify_password, create_access_token, get_password_hash, ACCESS_TOKEN_EXPIRE_MINUTES, get_current_user
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/auth", tags=["Auth"])

class AdminUpdate(BaseModel):
    current_password: str
    new_email: Optional[str] = None
    new_password: Optional[str] = None

@router.post("/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    statement = select(AdminUser).where(AdminUser.email == form_data.username)
    user = session.exec(statement).first()
    
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Endpoint to create the first admin user (use with caution, maybe disable in prod or check if empty)
@router.post("/setup", status_code=status.HTTP_201_CREATED)
async def create_initial_admin(admin_data: AdminLogin, session: Session = Depends(get_session)):
    # Check if any admin exists
    statement = select(AdminUser)
    results = session.exec(statement).first()
    if results:
        raise HTTPException(status_code=400, detail="Admin user already exists")
    
    hashed_password = get_password_hash(admin_data.password)
    new_admin = AdminUser(email=admin_data.email, password_hash=hashed_password)
    session.add(new_admin)
    session.commit()
    session.refresh(new_admin)
    return {"message": "Admin created successfully"}

@router.get("/me", response_model=AdminUser)
async def read_users_me(current_user: AdminUser = Depends(get_current_user)):
    return current_user

@router.put("/profile", status_code=status.HTTP_200_OK)
async def update_admin_profile(
    update_data: AdminUpdate,
    current_user: AdminUser = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Verify current password
    if not verify_password(update_data.current_password, current_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password"
        )
    
    # Update email if provided
    if update_data.new_email:
        # Check if email is already taken by another user (though we likely only have one admin for now)
        statement = select(AdminUser).where(AdminUser.email == update_data.new_email)
        existing_user = session.exec(statement).first()
        if existing_user and existing_user.id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        current_user.email = update_data.new_email
        
    # Update password if provided
    if update_data.new_password:
        current_user.password_hash = get_password_hash(update_data.new_password)
        
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    
    return {"message": "Profile updated successfully"}
