import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [saldo, setSaldo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return (window.location.href = "/admin");
    fetch("https://your-backend.vercel.app/api/saldo")
      .then((res) => res.json())
      .then((data) => setSaldo(data.data || null));
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-orange-600 mb-4">Dashboard Admin</h1>
      <div className="bg-white p-6 rounded-lg shadow w-96 text-center">
        <h2 className="text-lg text-gray-600 mb-2">Saldo Akun</h2>
        <p className="text-2xl font-semibold text-green-600">
          {saldo ? `Rp ${saldo.saldo}` : "Loading..."}
        </p>
      </div>
    </div>
  );
  }
