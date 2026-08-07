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

RATA_RATA_NASIONAL = 288.0


@router.post("", response_model=PredictResponse)
def predict(req: PredictRequest):
    try:
        data = req.model_dump()

        # Build & scale fitur
        X        = build_features(data)
        X_scaled = scaler.transform(X)

        # ── Prediksi kWh/hari dari model_day ──
        kwh_hari = float(model_day.predict(X_scaled)[0])
        kwh_hari = max(kwh_hari, 0)

        # ── Prediksi kW sesaat dari model_jam (opsional, untuk info) ──
        kw_jam = float(model_jam.predict(X_scaled)[0])
        kw_jam = max(kw_jam, 0)

        # ── Konversi kWh/hari → kWh/bulan ──
        kwh_bulan = round(kwh_hari * 30, 2)

        # ── Koreksi dengan histori jika ada ──
        hist = [h for h in (req.hist or []) if h is not None]
        if len(hist) >= 3:
            # Histori sudah dalam kWh/hari, rata-rata lalu × 30
            kwh_hist  = float(np.mean(hist)) * 30
            kwh_bulan = round(kwh_bulan * 0.65 + kwh_hist * 0.35, 2)

        # ── Tagihan ──
        tarif   = TARIF.get(req.golongan_tarif, 1444.70)
        tagihan = int(kwh_bulan * tarif)

        # ── Kategori & persentase vs nasional ──
        kategori  = get_kategori(kwh_bulan, req.jumlah_penghuni)
        pct_vs    = round(((kwh_bulan - RATA_RATA_NASIONAL) / RATA_RATA_NASIONAL) * 100, 1)

        # ── Breakdown ──
        breakdown = calculate_breakdown(data, kwh_bulan)

        return PredictResponse(
            prediksi_kwh=kwh_bulan,
            prediksi_tagihan=tagihan,
            confidence=get_confidence(),
            kategori=kategori,
            persentase_vs_rata_rata=pct_vs,
            breakdown=breakdown,
        )

    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/model-info")
def model_info():
    """Info model yang sedang aktif."""
    from ml.model import metadata
    return {
        "features":        metadata.get("features"),
        "metrics":         metadata.get("metrics"),
        "best_iterations": metadata.get("best_iterations"),
        "data_stats":      metadata.get("data_stats"),
        "thresholds":      metadata.get("thresholds_kwh_hari"),
    }