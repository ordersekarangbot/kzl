import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("https://your-backend.vercel.app/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } else {
      setError("Login gagal");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-orange-50">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold text-orange-600 mb-4">Login Admin</h2>
        <input className="border p-2 w-full mb-3" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
        <input type="password" className="border p-2 w-full mb-3" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        <button className="bg-orange-600 text-white w-full py-2 rounded hover:bg-orange-700">Login</button>
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </form>
    </div>
  );
}
