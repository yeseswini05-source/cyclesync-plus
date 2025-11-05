// frontend/src/pages/PhaseTrackerPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import FeaturePageLayout from "../components/FeaturePageLayout";
import { useNavigate } from "react-router-dom";

export default function PhaseTrackerPage() {
  // Always declare hooks at the top
  const [phaseData, setPhaseData] = useState(null);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ✅ Load from storage (no backend call)
  useEffect(() => {
    const token =
      localStorage.getItem("cyclesync_token") ||
      localStorage.getItem("token") ||
      localStorage.getItem("cs_auth_token");

    if (!token) {
      setCheckedAuth(true);
      setLoading(false);
      return;
    }

    const stored = localStorage.getItem("phase_tracking_data");
    
    if (!stored) {
      navigate("/survey-phase");
      return;
    }

    try {
      const data = JSON.parse(stored);
      setPhaseData({
        phase: calculatePhase(data),
        cycleDay: calculateCycleDay(data),
        cycleLength: data.cycleLength,
      });
    } catch (e) {
      navigate("/survey-phase");
    }

    setCheckedAuth(true);
    setLoading(false);
  }, [navigate]);

  // ✅ Helpers
  function calculateCycleDay(data) {
    const start = new Date(data.cycleStartDate);
    const today = new Date();
    const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    return (diff % data.cycleLength) + 1;
  }

  function calculatePhase(data) {
    const day = calculateCycleDay(data);
    const len = data.cycleLength;
    
    if (day <= 5) return "menstrual";
    if (day <= len * 0.45) return "follicular";
    if (day <= len * 0.55) return "ovulation";
    return "luteal";
  }

  // ✅ hormone curve (always safe)
  const hormoneCurve = useMemo(() => {
    if (!phaseData) return [];
    const len = phaseData.cycleLength || 28;
    const arr = [];

    for (let d = 0; d < len; d++) {
      const t = d / (len - 1);
      let v = 0;
      if (t < 0.25) v = 0.2 + 1.6 * (t / 0.25);
      else if (t < 0.35) {
        const p = (t - 0.25) / 0.1;
        v = 1.8 + 0.6 * Math.sin(p * Math.PI);
      } else {
        const p = (t - 0.35) / (1 - 0.35);
        v = 2.1 - 1.2 * p;
      }
      arr.push(Math.max(0, Math.min(2.1, v)) / 2.1);
    }
    return arr;
  }, [phaseData]);

  function buildPolyline(points, width = 760, height = 160, padding = 12) {
    const iw = width - padding * 2;
    const ih = height - padding * 2;
    return points
      .map((p, i) => `${padding + (i / (points.length - 1)) * iw},${padding + (1 - p) * ih}`)
      .join(" ");
  }

  if (loading) return <div className="p-6">Loading…</div>;

  // ✅ no token → ask to log in
  const token =
    localStorage.getItem("cyclesync_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("cs_auth_token");

  if (!token) {
    return (
      <FeaturePageLayout
        eyebrow="Phase Tracker"
        title="Understand your current cycle phase"
        blurb="Track phases, symptoms, energy — designed for women's physiology."
        ctaLabel="Log in to start"
        ctaTo="/login"
      />
    );
  }

  // ✅ no phase data → go to survey
  if (!phaseData) return <div>Redirecting…</div>;

  // ✅ main UI
  const poly = buildPolyline(hormoneCurve);

  return (
  <div className="p-6 max-w-5xl mx-auto space-y-6 animate-fadeIn">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
      Your Cycle Phase 🌸
    </h1>

    <div className="grid md:grid-cols-3 gap-6">

      {/* Left Panel */}
      <div className="md:col-span-1 space-y-4">
        <div className="bg-white shadow-lg rounded-2xl p-5 border border-pink-100 animate-pop">
          <div className="text-sm text-gray-500">Current Phase</div>

          <div className="flex items-center gap-3 mt-1">
            <div className="text-2xl font-semibold capitalize">{phaseData.phase}</div>
            <span className="px-2 py-1 rounded-lg bg-pink-100 text-pink-700 text-xs font-semibold">
              Day {phaseData.cycleDay}
            </span>
          </div>

          <div className="text-sm text-gray-600 mt-2 italic">
            {phaseData.phase === "menstrual" && "Rest ✨ — treat yourself gently"}
            {phaseData.phase === "follicular" && "Energy rising 🚀 — ideal for planning & workouts"}
            {phaseData.phase === "ovulation" && "Peak energy 💥 — social, confident, magnetic"}
            {phaseData.phase === "luteal" && "Focus inward 🧘‍♀️ — prioritize calm & routine"}
          </div>

          <button
            onClick={() => navigate("/cycle-insights")}
            className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-xl text-sm font-semibold shadow-md transition"
          >
            View Cycle Insights →
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="md:col-span-2 bg-white shadow-xl rounded-2xl p-4 border border-pink-100 overflow-hidden">
        <svg width="100%" viewBox="0 0 760 160" preserveAspectRatio="none"
          className="animate-fadeInSlow"
          style={{ height: 160 }}>
          <rect width="760" height="160" fill="#fff" />
          <polyline fill="none" stroke="#ec4899" strokeWidth="3" points={poly} />
        </svg>
      </div>
    </div>
  </div>
);}
