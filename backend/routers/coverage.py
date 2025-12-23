from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import Region, City, AdminUser
from auth import get_current_user

router = APIRouter(tags=["Market Coverage"])

# --- Regions ---

@router.get("/regions", response_model=List[Region])
def read_regions(session: Session = Depends(get_session)):
    regions = session.exec(select(Region)).all()
    return regions

@router.post("/regions", response_model=Region)
def create_region(region: Region, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    session.add(region)
    session.commit()
    session.refresh(region)
    return region

@router.delete("/regions/{region_id}")
def delete_region(region_id: int, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    region = session.get(Region, region_id)
    if not region:
        raise HTTPException(status_code=404, detail="Region not found")
    session.delete(region)
    session.commit()
    return {"ok": True}

# --- Cities ---

@router.get("/cities", response_model=List[City])
def read_cities(region_id: int = None, session: Session = Depends(get_session)):
    query = select(City)
    if region_id:
        query = query.where(City.region_id == region_id)
    cities = session.exec(query).all()
    return cities

@router.post("/cities", response_model=City)
def create_city(city: City, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    session.add(city)
    session.commit()
    session.refresh(city)
    return city

@router.delete("/cities/{city_id}")
def delete_city(city_id: int, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    city = session.get(City, city_id)
    if not city:
        raise HTTPException(status_code=404, detail="City not found")
    session.delete(city)
    session.commit()
    return {"ok": True}
