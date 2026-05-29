# ⚡ Household Electricity Consumption Prediction & Energy Efficiency Recommendation using XGBoost

## 🛠 Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS

### Backend

* FastAPI
* Python
* Uvicorn

### Machine Learning

* XGBoost
* Scikit-Learn
* Pandas
* NumPy
* Joblib

---

## 📂 Project Structure

```text
project-root/
│── frontend/                              # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   ├── package.json
│   ├── yarn.lock
│   └── .env.local
│
│── backend/                              # FastAPI Backend
│   ├── app/
│   │   ├── routes/                      # API routes
│   │   ├── controllers/                 # Logic controller
│   │   ├── services/                    # Business logic
│   │   ├── schemas/                     # Pydantic schema
│   │   ├── config/
│   │   └── main.py                      # Entry point FastAPI
│   │
│   ├── ml/                              # Machine Learning Module
│   │   ├── dataset/
│   │   │   ├── raw/                     # Dataset mentah
│   │   │   └── processed/               # Dataset hasil preprocessing
│   │   │
│   │   ├── notebooks/                   # Eksperimen & EDA
│   │   │   ├── eda.ipynb
│   │   │   └── training.ipynb
│   │   │
│   │   ├── preprocessing/
│   │   │   ├── clean_data.py
│   │   │   ├── feature_engineering.py
│   │   │   └── scaler.py
│   │   │
│   │   ├── training/
│   │   │   ├── train_model.py
│   │   │   ├── hyperparameter_tuning.py
│   │   │   └── evaluate_model.py
│   │   │
│   │   ├── inference/
│   │   │   └── predict.py               # Prediksi model
│   │   │
│   │   ├── recommendation/
│   │   │   └── recommendation_engine.py
│   │   │
│   │   ├── saved_models/
│   │   │   ├── xgboost_model.pkl
│   │   │   └── scaler.pkl
│   │   │
│   │   └── utils/
│   │       └── helper.py
│   │
│   ├── requirements.txt
│   └── .env
│
│── README.md
│── .gitignore
```

---

## 🚀 Installation

Clone repository:

```bash
git clone https://github.com/username/repository-name.git
cd repository-name
```

---

# ▶️ Running Project

## 1. Menjalankan Frontend (Next.js)

Masuk ke folder frontend:

```bash
cd frontend
```

### Menggunakan NPM

Install dependencies:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

---

### Menggunakan Yarn

Install dependencies:

```bash
yarn install
```

Jalankan development server:

```bash
yarn dev
```

Frontend berjalan di:

```text
http://localhost:3000
```

---

## 2. Menjalankan Backend (FastAPI)

Masuk ke folder backend:

```bash
cd backend
```

Buat virtual environment:

```bash
python -m venv venv
```

### Aktivasi Virtual Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Mac/Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Jalankan server FastAPI:

```bash
uvicorn app.main:app --reload
```

Backend berjalan di:

```text
http://localhost:8000
```

Swagger API:

```text
http://localhost:8000/docs
```

ReDoc:

```text
http://localhost:8000/redoc
```

---

## 3. Menjalankan Machine Learning (Training Model)

Masuk ke folder backend:

```bash
cd backend
```

Aktifkan virtual environment:

#### Windows

```bash
venv\Scripts\activate
```

#### Mac/Linux

```bash
source venv/bin/activate
```

Menjalankan preprocessing data:

```bash
python ml/preprocessing/clean_data.py
```

Training model XGBoost:

```bash
python ml/training/train_model.py
```

Evaluasi model:

```bash
python ml/training/evaluate_model.py
```

Melakukan prediksi:

```bash
python ml/inference/predict.py
```

Model hasil training akan tersimpan di:

```text
backend/ml/saved_models/
```

---

# 🌱 Git Workflow & Contribution Rules

## ❌ Jangan Push Langsung ke `development`

**Dilarang push langsung ke branch `development`.**

Selalu gunakan branch baru sebelum development.

---

## ✅ Workflow Git yang Benar

### 1. Selalu Pull Terlebih Dahulu

```bash
git checkout development
git pull origin development
```

---

### 2. Buat Branch Baru

Format branch:

```text
feature/nama-fitur
fix/nama-bug
experiment/nama-eksperimen
```

Contoh:

```bash
git checkout -b feature/xgboost-training
```

atau

```bash
git checkout -b feature/frontend-dashboard
```

---

### 3. Commit Perubahan

Gunakan commit message yang jelas:

```bash
git add .
git commit -m "feat: add electricity prediction model"
```

---

### 4. Push ke Branch Sendiri

```bash
git push origin nama-branch
```

Contoh:

```bash
git push origin feature/xgboost-training
```

---

### 5. Create Pull Request

Setelah development selesai:

* Buat Pull Request ke branch `development`
* Pastikan tidak ada conflict
* Lakukan testing sebelum merge

---

## ⚠️ Important Rules

* Selalu `git pull` sebelum mulai kerja
* Jangan push langsung ke `development`
* Gunakan branch terpisah
* Gunakan commit message yang jelas
* Pastikan code sudah diuji sebelum PR
* Jangan upload file yang tidak diperlukan
