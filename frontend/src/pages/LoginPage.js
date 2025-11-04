import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/api";

export default function LoginPage() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      // loginUser → POST /api/auth/login → returns { token, user }
      const res = await loginUser(form);

      const { token, user } = res || {};
      if (!token || !user) {
        throw new Error("Invalid response from server");
      }

      // store token (same key apiClient can read)
      localStorage.setItem("cyclesync_token", token);

      // update global auth context
      login(token, user);

      // go to dashboard
      nav("/survey");
    } catch (error) {
      setErr(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-roseBg p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-soft border border-roseMain/20 p-6">
        <h2 className="text-xl font-semibold text-roseDeep mb-1">
          Welcome back
        </h2>
        <p className="text-sm text-night/60 mb-4">
          Sign in to access your dashboard.
        </p>

        {err && (
          <div className="text-red-600 text-xs bg-red-50 border border-red-200 rounded p-2 mb-3">
            {err}
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
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block font-medium text-night text-xs mb-1">
              Password
            </label>
            <input
              className="w-full rounded-xl border border-roseMain/30 px-3 py-3 bg-white shadow-soft"
              type="password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-full bg-roseMain text-white font-semibold py-3 shadow-card text-sm transition-transform ${
              loading
                ? "opacity-60 cursor-not-allowed"
                : "hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {loading ? "Signing you in..." : "Sign In"}
          </button>
        </form>

        <div className="text-[11px] text-night/60 flex items-center justify-between mt-4">
          <Link to="/forgot-password" className="text-roseDeep font-medium">
            Forgot password?
          </Link>
          <Link to="/signup" className="text-roseDeep font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
