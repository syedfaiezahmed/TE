from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select
from database import get_session
from models import Category, Product, AdminUser
from auth import get_current_user

router = APIRouter(tags=["Products & Categories"])

# --- Categories ---

@router.get("/categories", response_model=List[Category])
def read_categories(session: Session = Depends(get_session)):
    categories = session.exec(select(Category)).all()
    return categories

@router.post("/categories", response_model=Category)
def create_category(category: Category, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    session.add(category)
    session.commit()
    session.refresh(category)
    return category

@router.put("/categories/{category_id}", response_model=Category)
def update_category(category_id: int, category_data: Category, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    category = session.get(Category, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    category_data_dict = category_data.dict(exclude_unset=True)
    for key, value in category_data_dict.items():
        setattr(category, key, value)
    
    session.add(category)
    session.commit()
    session.refresh(category)
    return category

@router.delete("/categories/{category_id}")
def delete_category(category_id: int, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    category = session.get(Category, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    session.delete(category)
    session.commit()
    return {"ok": True}

# --- Products ---

@router.get("/products", response_model=List[Product])
def read_products(category_id: Optional[int] = None, session: Session = Depends(get_session)):
    query = select(Product)
    if category_id:
        query = query.where(Product.category_id == category_id)
    products = session.exec(query).all()
    return products

@router.get("/products/{product_id}", response_model=Product)
def read_product(product_id: int, session: Session = Depends(get_session)):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/products", response_model=Product)
def create_product(product: Product, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    session.add(product)
    session.commit()
    session.refresh(product)
    return product

@router.put("/products/{product_id}", response_model=Product)
def update_product(product_id: int, product_data: Product, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product_data_dict = product_data.dict(exclude_unset=True)
    for key, value in product_data_dict.items():
        setattr(product, key, value)
        
    session.add(product)
    session.commit()
    session.refresh(product)
    return product

@router.delete("/products/{product_id}")
def delete_product(product_id: int, session: Session = Depends(get_session), current_user: AdminUser = Depends(get_current_user)):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    session.delete(product)
    session.commit()
    return {"ok": True}
