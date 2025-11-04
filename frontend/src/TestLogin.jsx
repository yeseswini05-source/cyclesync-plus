import React, { useState } from "react";

export default function TestLogin() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Logging in...");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // send email/password in JSON
        body: JSON.stringify({
          email,
          password: pw,
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        setStatus("Login failed: " + txt);
        return;
      }

      const data = await res.json();

      // save token for later protected requests
      if (data.token) {
        localStorage.setItem("cyclesync_token", data.token);
      }

      setStatus("Logged in as: " + (data.user?.name || data.user?.email));
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  }

  return (
    <div className="p-4 max-w-sm mx-auto">
      <form
        className="flex flex-col gap-3 border p-4 rounded"
        onSubmit={handleSubmit}
      >
        <input
          className="border px-2 py-1 rounded"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border px-2 py-1 rounded"
          type="password"
          placeholder="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <button
          className="bg-black text-white rounded py-2 hover:opacity-80"
          type="submit"
        >
          Login
        </button>
      </form>

      <div className="text-sm text-gray-600 mt-2">{status}</div>
    </div>
  );
}
