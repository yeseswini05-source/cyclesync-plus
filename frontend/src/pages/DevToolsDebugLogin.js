import React, { useState } from "react";

export default function DevToolsDebugLogin() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Contacting backend...");

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: pw,
        }),
      });

      const textBody = await res.text();

      if (!res.ok) {
        setStatus(
          [
            `Backend replied ${res.status} ${res.statusText}`,
            "---------",
            textBody,
          ].join("\n")
        );
        return;
      }

      let data;
      try {
        data = JSON.parse(textBody);
      } catch {
        data = null;
      }

      if (data?.token) {
        localStorage.setItem("cyclesync_token", data.token);
      }

      setStatus(
        data
          ? `Success.\nUser: ${data.user?.name || data.user?.email}\nToken saved.`
          : `Success.\nRaw response:\n${textBody}`
      );
    } catch (err) {
      setStatus("Network / CORS / crash: " + err.message);
    }
  }

  return (
    <main className="min-h-screen bg-yellow-100 text-black flex flex-col items-center p-8">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-700 mb-4">
        TEMP: Backend wiring test box (POST /auth/login)
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-gray-300 rounded-lg p-4 flex flex-col gap-3 shadow"
      >
        <input
          className="border border-gray-400 rounded px-2 py-1 text-sm"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border border-gray-400 rounded px-2 py-1 text-sm"
          type="password"
          placeholder="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />

        <button
          type="submit"
          className="bg-black text-white text-sm font-medium rounded px-3 py-2 hover:opacity-80 transition"
        >
          Login (POST /auth/login)
        </button>
      </form>

      <div className="text-xs text-gray-800 mt-3 bg-white border border-gray-300 rounded px-3 py-2 max-w-sm w-full break-words whitespace-pre-wrap">
        <strong>Response:</strong>
        <div className="mt-1">{status}</div>
      </div>

      <p className="text-[10px] text-gray-700 mt-4 max-w-sm text-center leading-snug">
        If you get JSON with token+user → backend works.  
        If you get 401/400 with "invalid credentials", backend still works.  
        If you get CORS error in the browser console, tweak server.js CORS.
      </p>
    </main>
  );
}
