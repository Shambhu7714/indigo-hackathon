from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.db.database import Base, engine
from app.routers import auth, campaign
from app.models import campaign as campaign_models

# ─── Create all DB tables on startup ─────────────────────────────────────────
Base.metadata.create_all(bind=engine)

# ─── App ─────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="6E Creative Studio API",
    description="Backend API for IndiGo 6E Creative Studio — login, signup, auth.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── CORS — allow the Vite dev server ────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev
        "http://127.0.0.1:5173",
        "http://localhost:4173",   # Vite preview
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ─────────────────────────────────────────────────────────────────
app.include_router(auth.router, prefix="/api/v1")
app.include_router(campaign.router, prefix="/api/v1")

# ─── Serve Generated Images ──────────────────────────────────────────────────
os.makedirs("generations", exist_ok=True)
app.mount("/generations", StaticFiles(directory="generations"), name="generations")


@app.get("/", tags=["Health"])
def health():
    return {"status": "ok", "service": "6E Creative Studio API"}
