"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError(true);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-200 max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-slate-900">Accès Admin</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          placeholder="Mot de passe"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
        {error && (
          <p className="text-red-500 text-sm mb-4">Mot de passe incorrect</p>
        )}
        <button
          onClick={handleLogin}
          className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-700 transition-colors"
        >
          Se connecter
        </button>
      </div>
    </div>
  );
}
