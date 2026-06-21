import type { Prediction, User } from "./types";

export const PREDICTIONS: Prediction[] = [
  { id: "P001", user: "Budi Santoso",  email: "budi@mail.com",   tanggal: "2026-06-10", kwh: 285.4, tagihan: 412200, kategori: "Hemat"        },
  { id: "P002", user: "Siti Rahayu",   email: "siti@mail.com",   tanggal: "2026-06-10", kwh: 312.8, tagihan: 451700, kategori: "Normal"       },
  { id: "P003", user: "Ahmad Fauzi",   email: "ahmad@mail.com",  tanggal: "2026-06-09", kwh: 478.2, tagihan: 690600, kategori: "Boros"        },
  { id: "P004", user: "Dewi Lestari",  email: "dewi@mail.com",   tanggal: "2026-06-09", kwh: 156.3, tagihan: 225700, kategori: "Hemat"        },
  { id: "P005", user: "Rizky Pratama", email: "rizky@mail.com",  tanggal: "2026-06-08", kwh: 621.5, tagihan: 897600, kategori: "Sangat Boros" },
  { id: "P006", user: "Nurul Hidayah", email: "nurul@mail.com",  tanggal: "2026-06-08", kwh: 298.1, tagihan: 430400, kategori: "Normal"       },
  { id: "P007", user: "Hendra Wijaya", email: "hendra@mail.com", tanggal: "2026-06-07", kwh: 189.7, tagihan: 273900, kategori: "Hemat"        },
  { id: "P008", user: "Maya Putri",    email: "maya@mail.com",   tanggal: "2026-06-07", kwh: 402.3, tagihan: 580900, kategori: "Boros"        },
];

export const USERS: User[] = [
  { id: "U001", nama: "Budi Santoso",  email: "budi@mail.com",  prediksi: 12, bergabung: "Jan 2026", status: "Aktif"    },
  { id: "U002", nama: "Siti Rahayu",   email: "siti@mail.com",  prediksi: 8,  bergabung: "Feb 2026", status: "Aktif"    },
  { id: "U003", nama: "Ahmad Fauzi",   email: "ahmad@mail.com", prediksi: 5,  bergabung: "Mar 2026", status: "Aktif"    },
  { id: "U004", nama: "Dewi Lestari",  email: "dewi@mail.com",  prediksi: 20, bergabung: "Jan 2026", status: "Nonaktif" },
  { id: "U005", nama: "Rizky Pratama", email: "rizky@mail.com", prediksi: 3,  bergabung: "Mei 2026", status: "Aktif"    },
];

export const BAR_DATA = [
  { label: "Sen", value: 42 },
  { label: "Sel", value: 58 },
  { label: "Rab", value: 35 },
  { label: "Kam", value: 71 },
  { label: "Jum", value: 63 },
  { label: "Sab", value: 29 },
  { label: "Min", value: 48 },
];

export const DONUT_DATA = [
  { label: "Hemat",        value: 32, color: "#10b981" },
  { label: "Normal",       value: 41, color: "#3b82f6" },
  { label: "Boros",        value: 18, color: "#f59e0b" },
  { label: "Sangat Boros", value: 9,  color: "#ef4444" },
];