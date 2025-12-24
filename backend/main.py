from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_db_and_tables, engine
from sqlmodel import Session, select
from models import SiteContent, Product
from routers import auth, products, inquiries, content, coverage, chatbot
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
    title="Trans Emirates Backend",
    description="Simple corporate backend for Trans Emirates Company",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:3000", # Next.js frontend
    "http://localhost:3001", # Next.js frontend (alternative port)
    "https://your-frontend-domain.com", # Production domain
    "*" # Allow all for development if needed, but restrict in prod
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(inquiries.router)
app.include_router(content.router)
app.include_router(coverage.router)
app.include_router(chatbot.router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    with Session(engine) as session:
        about = session.get(SiteContent, "about")
        if not about:
            session.add(SiteContent(
                key="about",
                value="Trans Emirates (TE) is a trusted trading and consulting partner operating in Saudi Arabia, providing high-quality products and professional services to industrial and commercial clients."
            ))
        tagline = session.get(SiteContent, "tagline")
        if not tagline:
            session.add(SiteContent(
                key="tagline",
                value="Trusted Trading and Consulting Partner in Saudi Arabia"
            ))
        session.commit()

@app.get("/")
def read_root():
    return {"message": "Welcome to Trans Emirates Backend API"}
