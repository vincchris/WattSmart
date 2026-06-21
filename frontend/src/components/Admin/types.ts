export type NavKey = "overview" | "predictions" | "users" | "dataset" | "settings";

export type Prediction = {
  id: string;
  user: string;
  email: string;
  tanggal: string;
  kwh: number;
  tagihan: number;
  kategori: "Hemat" | "Normal" | "Boros" | "Sangat Boros";
};

export type User = {
  id: string;
  nama: string;
  email: string;
  prediksi: number;
  bergabung: string;
  status: "Aktif" | "Nonaktif";
};