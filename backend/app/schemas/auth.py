from datetime import datetime
from pydantic import BaseModel, EmailStr


# ─── Request Schemas ─────────────────────────────────────────────────────────

class SignUpRequest(BaseModel):
    email: EmailStr
    full_name: str
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ─── Response Schemas ────────────────────────────────────────────────────────

class UserOut(BaseModel):
    id: str
    email: str
    full_name: str
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class MessageOut(BaseModel):
    message: str
