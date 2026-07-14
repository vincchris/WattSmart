from fastapi import APIRouter, HTTPException
from schemas.input_schema import PredictRequest, PredictResponse
from ml.model import (
  build_features, calculate_breakdown,
  get_kategori, get_confidence,
  model_day, model_jam, scaler,
  TARIF, THRESHOLDS
)
import numpy as np

router = APIRouter()

@router.post("", response_model=PredictResponse)
def predict(req: PredictRequest):
  try:
    data = req.model_dump()

    # Build & Scale Feature
    X = build_features(data)
    X_scaled = scaler.transform(X)

    # Prediksi kWh/hari dari model_day
    kwh_hari = float(model_jam.predict(X_scaled)[0])
    kw_jam = max(kw_jam, 0)

    kwh_bulan = round(kwh_hari * 30, 2)

    hist = [h for h in (req.hist or []) if h is not None]
    if len(hist) >= 3:
      kwh_hist = float(np.mean(hist)) * 30
      kwh_bulan = round(kwh_bulan * 0.65 + kwh_hist * 0.35, 2)

    tarif = TARIF.get(req.golongan_tarif, 1444.70)
    tagihan = int(kwh_bulan * tarif)

    kategori = get_kategori(kwh_bulan, req.jumlah_penghuni)
    pct_vs = round(((kwh_bulan - RATA_RATA_NASIONAL) / RATA_RATA_NASIONAL) * 100, 1)

    breakdown = calculate_breakdown(data, kwh_bulan)

    return Predict