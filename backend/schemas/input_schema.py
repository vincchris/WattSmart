from pydantic import BaseModel, Field
from typing import Optional, List

class PredictRequest(BaseModel):
  # Parameter
  tanggal : Optional[str] = None
  jam: int = Field(19, ge=0, le=23)
  suhu: float = Field(30.0, ge=15.0, le=42.0)
  hari_libur: bool = False

  # House Information
  luas_rumah: float = Field(..., ge=10)
  jumlah_penghui: int = Field(..., ge=1, le=20)
  daya_listrik: int = Field(1300)
  golongan_tarif: str = "R-1/TR"

  # Main Devices
  jumlah_ac: int = Field(0, ge=0)
  jam_ac_per_hari: float = Field(0.0, ge=0, le=24)
  jumlah_kulkas: int = Field(0, ge=0)
  jumlah_tv: int = Field(0, ge=0)
  jam_tv_per_hari: float = Field(0.0, ge=0, le=24)
  jumlah_lampu: int = Field(0, ge=0)
  jam_lampu_per_hari: float = Field(0.0, ge=0, le=24)
  jumlah_mesin_cuci: int = Field(0, ge=0)
  frekuensi_cuci_per_minggu: int = Field(0, ge=0, le=14)
  jumlah_komputer: int = Field(0, ge=0)
  jam_komputer_per_hari: float = Field(0.0, ge=0, le=24)

  # Add Devices
  water_heater: bool = False
  dispenser: bool = False
  microwave: bool = False

class PredictResponse(BaseModel):
  prediksi_kwh: float
  prediksi_tagihan: int
  confidence: float
  kategori: str
  persentase_vs_rata_rata: float
  breakdown: List[dict]
  