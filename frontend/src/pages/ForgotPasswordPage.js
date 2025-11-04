import React, { useState } from "react";
import api from "../services/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/forgot", { email });
      setMsg(res.data?.message || "Check your inbox for a reset link.");
    } catch {
      setMsg("If this email exists, you will receive a reset link.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-roseBg p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-soft border border-roseMain/20 p-6 text-sm">
        <h2 className="text-xl font-semibold text-roseDeep mb-1">
          Reset Password
        </h2>
        <p className="text-night/60 text-xs mb-4">
          Enter your email to request a reset link.
        </p>

        {msg && (
          <div className="text-green-600 text-xs bg-green-50 border border-green-200 rounded p-2 mb-3">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block font-medium text-night text-xs mb-1">
              Email
            </label>
            <input
              className="w-full rounded-xl border border-roseMain/30 px-3 py-3 bg-white shadow-soft"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-roseMain text-white font-semibold py-3 shadow-card text-sm"
          >
            Send reset link
          </button>
        </form>
      </div>
    </main>
  );
}
