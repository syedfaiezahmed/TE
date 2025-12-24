from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship
from datetime import datetime

# 1. Admin Authentication
class AdminUser(SQLModel, table=True):
    __tablename__ = "admin_users"
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    password_hash: str

# 2. Products & Categories
class Category(SQLModel, table=True):
    __tablename__ = "categories"
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: Optional[str] = None
    products: List["Product"] = Relationship(back_populates="category")

class Product(SQLModel, table=True):
    __tablename__ = "products"
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: Optional[str] = None
    image_url: Optional[str] = None
    is_active: bool = Field(default=True)
    category_id: Optional[int] = Field(default=None, foreign_key="categories.id")
    category: Optional[Category] = Relationship(back_populates="products")

# 3. Inquiries System
class Inquiry(SQLModel, table=True):
    __tablename__ = "inquiries"
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    inquiry_type: str  # Contact, Quote, Supplier, Consulting
    created_at: datetime = Field(default_factory=datetime.utcnow)

# 4. Website Content (Key-Value Store)
class SiteContent(SQLModel, table=True):
    __tablename__ = "site_content"
    key: str = Field(primary_key=True)
    value: str

# 5. Market Coverage
class Region(SQLModel, table=True):
    __tablename__ = "regions"
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    cities: List["City"] = Relationship(back_populates="region")

class City(SQLModel, table=True):
    __tablename__ = "cities"
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    region_id: Optional[int] = Field(default=None, foreign_key="regions.id")
    region: Optional[Region] = Relationship(back_populates="cities")

# Schemas for Auth (Pydantic models for request/response)
# Note: SQLModel classes are also Pydantic models, but specialized schemas are better for auth
class Token(SQLModel):
    access_token: str
    token_type: str

class TokenData(SQLModel):
    email: Optional[str] = None

class AdminLogin(SQLModel):
    email: str
    password: str

# 6. Chatbot Knowledge Base
class ChatbotKnowledge(SQLModel, table=True):
    __tablename__ = "chatbot_knowledge"
    id: Optional[int] = Field(default=None, primary_key=True)
    question: str = Field(index=True) # The question or keywords
    answer: str
    is_active: bool = Field(default=True)

class EmbeddingDocument(SQLModel, table=True):
    __tablename__ = "embedding_documents"
    id: Optional[int] = Field(default=None, primary_key=True)
    source_type: str = Field(index=True)
    source_id: Optional[str] = Field(default=None, index=True)
    text: str
    embedding_json: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ChatSession(SQLModel, table=True):
    __tablename__ = "chat_sessions"
    id: Optional[int] = Field(default=None, primary_key=True)
    session_id: str = Field(index=True, unique=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ChatMessage(SQLModel, table=True):
    __tablename__ = "chat_messages"
    id: Optional[int] = Field(default=None, primary_key=True)
    session_id: str = Field(index=True)
    role: str
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
