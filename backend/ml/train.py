"""
Jalankan: python -m ml.train
"""
from ml.model import train_and_save

if __name__ == "__main__":
    print("🔄 Melatih model regresi linear berganda...")
    model, scaler = train_and_save()
    print("✅ Selesai.")