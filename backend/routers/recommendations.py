from fastapi import APIRouter
from schemas.input_schema import PredictRequest
from typing import List

router = APIRouter()


def build_recommendations(data: dict) -> List[dict]:
    recs = []

    # AC
    if data.get("jumlah_ac", 0) > 0 and data.get("jam_ac_per_hari", 0) > 6:
        hemat_kwh = data["jumlah_ac"] * 900 * 2 * 30 / 1000
        recs.append({
            "id": "rec_ac",
            "kategori": "Pendingin Udara",
            "judul": "Kurangi Jam Pemakaian AC",
            "deskripsi": f"AC Anda menyala {data['jam_ac_per_hari']} jam/hari. Mengurangi 2 jam bisa menghemat signifikan.",
            "potensi_hemat_kwh": round(hemat_kwh, 1),
            "potensi_hemat_rupiah": round(hemat_kwh * 1444.70),
            "prioritas": "Tinggi",
            "icon": "❄️",
            "tips": [
                "Set suhu AC di 24–26°C",
                "Gunakan timer agar mati otomatis",
                "Bersihkan filter AC tiap bulan",
                "Mode sleep di malam hari",
            ],
        })

    # Lampu
    if data.get("jumlah_lampu", 0) > 8:
        hemat_kwh = data["jumlah_lampu"] * 10 * 2 * 30 / 1000
        recs.append({
            "id": "rec_lampu",
            "kategori": "Pencahayaan",
            "judul": "Optimalkan Penggunaan Lampu",
            "deskripsi": "Matikan lampu di ruangan yang tidak digunakan dan manfaatkan cahaya alami.",
            "potensi_hemat_kwh": round(hemat_kwh, 1),
            "potensi_hemat_rupiah": round(hemat_kwh * 1444.70),
            "prioritas": "Sedang",
            "icon": "💡",
            "tips": [
                "Matikan lampu saat meninggalkan ruangan",
                "Manfaatkan cahaya alami di siang hari",
                "Pasang sensor gerak di area jarang dipakai",
                "Ganti semua lampu ke LED jika belum",
            ],
        })

    # Water heater
    if data.get("water_heater"):
        hemat_kwh = 20.0
        recs.append({
            "id": "rec_wh",
            "kategori": "Pemanas Air",
            "judul": "Atur Jadwal Water Heater",
            "deskripsi": "Water heater menyumbang konsumsi besar. Atur timer agar hanya menyala saat dibutuhkan.",
            "potensi_hemat_kwh": hemat_kwh,
            "potensi_hemat_rupiah": round(hemat_kwh * 1444.70),
            "prioritas": "Sedang",
            "icon": "🚿",
            "tips": [
                "Nyalakan water heater 15 menit sebelum digunakan",
                "Matikan setelah selesai mandi",
                "Gunakan mode hemat energi jika tersedia",
            ],
        })

    # Mesin cuci
    if data.get("jumlah_mesin_cuci", 0) > 0 and data.get("frekuensi_cuci_per_minggu", 0) > 3:
        hemat_kwh = data["jumlah_mesin_cuci"] * 500 * 2 * 4 / 1000
        recs.append({
            "id": "rec_mc",
            "kategori": "Mesin Cuci",
            "judul": "Kurangi Frekuensi Mencuci",
            "deskripsi": f"Mencuci {data['frekuensi_cuci_per_minggu']}x/minggu bisa dioptimalkan dengan mencuci kapasitas penuh.",
            "potensi_hemat_kwh": round(hemat_kwh, 1),
            "potensi_hemat_rupiah": round(hemat_kwh * 1444.70),
            "prioritas": "Rendah",
            "icon": "🌀",
            "tips": [
                "Cuci saat kapasitas penuh",
                "Gunakan mode air dingin",
                "Aktifkan mode eco jika tersedia",
            ],
        })

    # Standby devices
    recs.append({
        "id": "rec_standby",
        "kategori": "Kebiasaan",
        "judul": "Matikan Perangkat Standby",
        "deskripsi": "Perangkat dalam mode standby tetap mengonsumsi listrik hingga 10% dari total tagihan.",
        "potensi_hemat_kwh": 15.0,
        "potensi_hemat_rupiah": round(15.0 * 1444.70),
        "prioritas": "Rendah",
        "icon": "🔌",
        "tips": [
            "Cabut charger saat tidak digunakan",
            "Gunakan power strip berswitch",
            "Matikan TV sepenuhnya, bukan standby",
        ],
    })

    # Urutkan: Tinggi → Sedang → Rendah
    urutan = {"Tinggi": 0, "Sedang": 1, "Rendah": 2}
    recs.sort(key=lambda r: urutan.get(r["prioritas"], 3))

    return recs


@router.post("", response_model=List[dict])
def get_recommendations(req: PredictRequest):
    return build_recommendations(req.model_dump())