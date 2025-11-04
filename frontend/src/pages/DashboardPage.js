// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ added

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const navigate = useNavigate(); // ✅ added

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/dashboard", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, [token]);

  if (loading) return <div>Loading your dashboard…</div>;
  if (!data) return <div>Couldn’t load dashboard.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Your CycleSync Dashboard</h1>

      {/* example existing dashboard values */}
      <div>Current phase: {data.currentPhase}</div>
      <div>Today’s mood: {data.today?.mood}</div>

      {/* ✅ Phase Tracker Feature Card */}
      <div className="bg-white shadow-md rounded-lg p-5 mt-6 border">
        <p className="text-sm text-gray-500 uppercase tracking-wide">Feature</p>
        <h2 className="text-xl font-bold mt-1 mb-2">Phase Tracker</h2>
        <p className="text-gray-600 mb-4">
          See which phase you're in (menstrual, follicular, ovulation, luteal),
          how long it lasts, and how it affects your energy, mood, and appetite.
        </p>

        <button
          onClick={() => navigate("/phase-tracker")} // ✅ redirect on click
          className="text-green-700 font-medium hover:underline flex items-center gap-1"
        >
          Open tracker ↗
        </button>
      </div>
    </div>
  );
}
