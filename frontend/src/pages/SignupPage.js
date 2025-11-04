import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

export default function SignupPage() {
  const nav = useNavigate();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "avatar1",
  });

  // placeholder avatar labels; can later become URLs or SVG icons
  const avatars = ["avatar1", "avatar2", "avatar3", "avatar4", "avatar5"];

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await registerUser(form); // POST /auth/register

      // if backend returns a token on signup, store it (optional)
      if (res && res.token) {
        localStorage.setItem("cs_auth_token", res.token);
      }

      // after successful signup, send them to login (or /dashboard if you prefer)
      nav("/login");
    } catch (error) {
      setErr(error.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-roseBg p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-soft border border-roseMain/20 p-6">
        <h2 className="text-xl font-semibold text-roseDeep mb-1">
          Create Account
        </h2>
        <p className="text-sm text-night/60 mb-4">
          Choose your display avatar and start tracking.
        </p>

        {err && (
          <div className="text-red-600 text-xs bg-red-50 border border-red-200 rounded p-2 mb-3">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block font-medium text-night text-xs mb-1">
              Name
            </label>
            <input
              className="w-full rounded-xl border border-roseMain/30 px-3 py-3 bg-white shadow-soft"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block font-medium text-night text-xs mb-1">
              Email
            </label>
            <input
              className="w-full rounded-xl border border-roseMain/30 px-3 py-3 bg-white shadow-soft"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block font-medium text-night text-xs mb-1">
              Password
            </label>
            <input
              className="w-full rounded-xl border border-roseMain/30 px-3 py-3 bg-white shadow-soft"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block font-medium text-night text-xs mb-2">
              Select Avatar
            </label>
            <div className="flex gap-2 flex-wrap">
              {avatars.map((a, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setForm({ ...form, avatar: a })}
                  className={
                    "w-10 h-10 flex items-center justify-center rounded-full text-[11px] font-semibold shadow-soft border " +
                    (form.avatar === a
                      ? "bg-roseMain text-white border-roseMain shadow-card"
                      : "bg-white text-night border-roseMain/30")
                  }
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-roseMain text-white font-semibold py-3 shadow-card text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? "Signing you up..." : "Sign Up"}
          </button>
        </form>

        <div className="text-[11px] text-night/60 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-roseDeep font-medium">
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
}
