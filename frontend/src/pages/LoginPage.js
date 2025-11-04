import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser({ email, password });

      if (res.data?.token) {
localStorage.setItem("cyclesync_token", res.data.token);

        // ✅ Go to Survey first
        navigate("/survey");
      } else {
        setError("Invalid server response");
      }
    } catch (err) {
      console.error(err?.response?.data);
      setError(err?.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-pink-50 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-10">
        <h2 className="text-2xl font-bold text-pink-600 mb-1">Welcome back</h2>
        <p className="text-sm text-gray-500 mb-6">Sign in to continue.</p>

        {error && (
          <div className="bg-red-100 text-red-700 py-2 px-3 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg bg-blue-50 mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-full font-semibold"
          >
            Sign In
          </button>
        </form>

        <div className="flex justify-between text-sm mt-4">
          <button onClick={() => navigate("/forgot-password")} className="text-pink-500">
            Forgot password?
          </button>
          <button onClick={() => navigate("/register")} className="text-pink-500">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
