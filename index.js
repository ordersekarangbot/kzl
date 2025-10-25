import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.QIOSPAY_API_KEY;
const ADMIN_USER = process.env.ADMIN_USER || "syohril";
const ADMIN_PASS = process.env.ADMIN_PASS || "Gunung2023";
const BASE_URL = "https://api.qiospay.id/v1";

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ success: true, token: "sipedia-admin-token" });
  }
  res.status(401).json({ success: false, message: "Login gagal" });
});

app.get("/api/saldo", async (req, res) => {
  try {
    const r = await fetch(`${BASE_URL}/saldo`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/produk", async (req, res) => {
  try {
    const r = await fetch(`${BASE_URL}/produk`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/topup", async (req, res) => {
  const { nomor, kode_produk } = req.body;
  try {
    const r = await fetch(`${BASE_URL}/topup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ nomor, kode_produk }),
    });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("✅ SIPEDIA Backend Aktif");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server aktif di port ${PORT}`));
