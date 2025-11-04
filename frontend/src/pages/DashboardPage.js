// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

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
      {/* whatever cards/graphs you already have – use data from API */}
      <h1 className="text-2xl font-semibold mb-4">Your CycleSync Dashboard</h1>
      {/* example: */}
      <div>Current phase: {data.currentPhase}</div>
      <div>Today’s mood: {data.today?.mood}</div>
      {/* ... */}
    </div>
  );
}
