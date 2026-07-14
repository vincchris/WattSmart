from pydantic import BaseModel
from typing import Optional

class HistoryRecord(BaseModel):
  id: str
  user_id: Optional[str]
  tanggal: str
  prediksi_kwh: float
  prediksi_tagihan: int
  kategori: str
  input_data: dict