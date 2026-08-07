from fastapi import APIRouter, HTTPException
from schemas.auth_schema import RegisterRequest, LoginRequest, TokenResponse
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import uuid
from typing import List

router  = APIRouter()
pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "wattsmart-secret-key-ganti-di-production"
ALGORITHM  = "HS256"
EXPIRE_MINUTES = 60 * 24  # 1 hari

# In-memory user store (ganti dengan database di production)
_users: List[dict] = []

def create_token(data: dict) -> str:
    payload = {**data, "exp": datetime.utcnow() + timedelta(minutes=EXPIRE_MINUTES)}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


@router.post("/register", response_model=TokenResponse)
def register(req: RegisterRequest):
    if any(u["email"] == req.email for u in _users):
        raise HTTPException(status_code=400, detail="Email sudah terdaftar")

    user = {
        "id":       str(uuid.uuid4()),
        "nama":     req.nama,
        "email":    req.email,
        "password": pwd_ctx.hash(req.password),
        "role":     "user",
    }
    _users.append(user)

    token = create_token({"sub": user["id"], "email": user["email"], "role": user["role"]})
    return TokenResponse(
        access_token=token,
        user={"id": user["id"], "nama": user["nama"], "email": user["email"], "role": user["role"]},
    )


@router.post("/login", response_model=TokenResponse)
def login(req: LoginRequest):
    user = next((u for u in _users if u["email"] == req.email), None)
    if not user or not pwd_ctx.verify(req.password, user["password"]):
        raise HTTPException(status_code=401, detail="Email atau kata sandi salah")

    token = create_token({"sub": user["id"], "email": user["email"], "role": user["role"]})
    return TokenResponse(
        access_token=token,
        user={"id": user["id"], "nama": user["nama"], "email": user["email"], "role": user["role"]},
    )


@router.get("/me")
def me():
    # TODO: decode JWT dari header Authorization
    return {"message": "Endpoint /auth/me — tambahkan JWT middleware"}