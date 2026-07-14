from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import predict, history, auth, recommendations

app = FastAPI(
  title="WattSmart API",
  description="API Prediksi Konsumsi Listrik Rumah Tangga",
  version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(predict.router, prefix="/predict", tags=["Prediksi"])
app.include_router(recommendations.router, prefix="/recommendations", tags=["Rekomendasi"])
app.include_router(history.router, prefix="/history", tags=["Riwayat"])

@app.get("/")
def root():
  return {"message": "WattSmart API aktif", "version": "1.0.0"}

@app.get("/health")
def health():
  return {"status": "ok"}