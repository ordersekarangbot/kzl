import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function Home() {
  const [produk, setProduk] = useState([]);
  const [nomor, setNomor] = useState("");
  const [kode, setKode] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("https://your-backend.vercel.app/api/produk")
      .then(res => res.json())
      .then(data => setProduk(data.data || []))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Memproses...");
    const res = await fetch("https://your-backend.vercel.app/api/topup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomor, kode_produk: kode }),
    });
    const data = await res.json();
    setStatus(data.message || JSON.stringify(data));
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center p-6">
      <img src={logo} alt="SIPEDIA" className="w-32 mb-4" />
      <h1 className="text-2xl font-bold text-orange-600 mb-6">SIPEDIA Pulsa</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
        <input
          value={nomor}
          onChange={(e) => setNomor(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
          placeholder="Nomor HP"
        />
        <select
          onChange={(e) => setKode(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        >
          <option value="">Pilih Produk</option>
          {produk.map((p) => (
            <option key={p.kode_produk} value={p.kode_produk}>
              {p.nama_produk} - Rp {p.harga}
            </option>
          ))}
        </select>
        <button className="bg-orange-600 text-white w-full py-2 rounded hover:bg-orange-700">
          Beli Sekarang
        </button>
      </form>
      <p className="mt-4 text-gray-700">{status}</p>
    </div>
  );
}
