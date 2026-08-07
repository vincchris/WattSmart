from fastapi import APIRouter, HTTPException
from schemas.history_schema import HistoryRecord
from typing import List
from datetime import datetime
import uuid

router = APIRouter()

# In-memory store (ganti dengan database di production)
_store: List[dict] = []


@router.get("", response_model=List[HistoryRecord])
def get_history():
    return sorted(_store, key=lambda x: x["tanggal"], reverse=True)


@router.post("", response_model=HistoryRecord)
def save_history(record: dict):
    new_record = {
        "id":               str(uuid.uuid4())[:8].upper(),
        "user_id":          record.get("user_id"),
        "tanggal":          datetime.now().isoformat(),
        "prediksi_kwh":     record.get("prediksi_kwh"),
        "prediksi_tagihan": record.get("prediksi_tagihan"),
        "kategori":         record.get("kategori"),
        "input_data":       record.get("input_data", {}),
    }
    _store.append(new_record)
    return new_record


@router.delete("/{record_id}")
def delete_history(record_id: str):
    global _store
    before = len(_store)
    _store = [r for r in _store if r["id"] != record_id]
    if len(_store) == before:
        raise HTTPException(status_code=404, detail="Record tidak ditemukan")
    return {"message": "Berhasil dihapus", "id": record_id}


@router.get("/stats")
def get_stats():
    if not _store:
        return {
            "rata_rata_kwh":   0,
            "total_prediksi":  0,
            "potensi_hemat":   0,
            "tren":            "stabil",
            "persentase_tren": 0,
        }

    kwh_list = [r["prediksi_kwh"] for r in _store]
    rata     = sum(kwh_list) / len(kwh_list)

    tren = "stabil"
    pct  = 0.0
    if len(kwh_list) >= 2:
        delta = kwh_list[-1] - kwh_list[-2]
        pct   = round(abs(delta) / kwh_list[-2] * 100, 1)
        tren  = "naik" if delta > 0 else "turun"

    return {
        "rata_rata_kwh":   round(rata, 1),
        "total_prediksi":  len(_store),
        "potensi_hemat":   round(rata * 0.15 * 1444.70),
        "tren":            tren,
        "persentase_tren": pct,
    }