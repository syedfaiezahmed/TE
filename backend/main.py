from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_db_and_tables
from routers import auth, products, inquiries, content, coverage

app = FastAPI(
    title="Trans Emirates Backend",
    description="Simple corporate backend for Trans Emirates Company",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:3000", # Next.js frontend
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

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"message": "Welcome to Trans Emirates Backend API"}
