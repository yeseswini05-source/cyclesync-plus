// frontend/src/pages/PhaseTrackerPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import FeaturePageLayout from "../components/FeaturePageLayout";
import { useNavigate } from "react-router-dom";

const PHASES = ["menstrual", "follicular", "ovulation", "luteal"];

export default function PhaseTrackerPage() {
  const [phaseData, setPhaseData] = useState(null);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const token =
    localStorage.getItem("cyclesync_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("cs_auth_token");

  const navigate = useNavigate();

  useEffect(() => {
    async function loadPhase() {
      if (!token) {
        setCheckedAuth(true);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/survey/phase", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("No phase data");

        const data = await res.json();

        // If user logged in but has **no cycle data**, redirect to survey
        if (!data?.phase) {
          navigate("/survey-phase"); // ✅ NEW redirect for cycle survey
          return;
        }

        setPhaseData(data);
      } catch (err) {
        console.log("phase fetch failed", err?.message);
        navigate("/survey-phase"); // ✅ directly redirect to survey
      } finally {
        setCheckedAuth(true);
        setLoading(false);
      }
    }
    loadPhase();
  }, [token, navigate]);

  if (!checkedAuth && loading) {
    return <div className="p-6">Loading…</div>;
  }

  // ✅ If user NOT logged in → show marketing content (no redirect)
  if (!token) {
    return (
      <FeaturePageLayout
        eyebrow="Phase Tracker"
        title="See which phase you're in right now — and what it means"
        blurb={`Track your menstrual cycle phases with insights for energy, mood, and focus.`}
        ctaLabel="Log in to start tracking"
        ctaTo="/login"
      >
        <div className="text-sm leading-relaxed text-[#3a2326] space-y-4">
          <p>• Live status like “You’re in luteal,” not averages</p>
          <p>• Personalized symptoms, energy & focus insights</p>
          <p>• Forecast what’s next so you can plan higher-energy days</p>
        </div>
      </FeaturePageLayout>
    );
  }

  // ✅ If user already logged and has phase data → show tracker UI
  if (phaseData) {
    const [reminders, setReminders] = useState([]);
    const [newReminder, setNewReminder] = useState("");
    const [savingReminder, setSavingReminder] = useState(false);

    const hormoneCurve = useMemo(() => {
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

    function buildPolyline(points, width = 600, height = 140, padding = 12) {
      const innerW = width - padding * 2;
      const innerH = height - padding * 2;
      return points
        .map((p, i) => {
          const x = padding + (i / (points.length - 1)) * innerW;
          const y = padding + (1 - p) * innerH;
          return `${x},${y}`;
        })
        .join(" ");
    }

    const poly = buildPolyline(hormoneCurve, 760, 160, 12);

    return (
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Phase Tracker</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white shadow rounded-lg p-4">
              <div className="text-sm text-gray-500">Current phase</div>
              <div className="text-xl font-semibold capitalize">{phaseData.phase}</div>
              <div className="text-sm text-gray-600">Day {phaseData.cycleDay}</div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white shadow rounded-lg p-4">
            <svg width="100%" viewBox="0 0 760 160" preserveAspectRatio="none" style={{ height: 160 }}>
              <rect width="760" height="160" fill="#fff" />
              <polyline fill="none" stroke="#ec4899" strokeWidth="3" points={poly} />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return <div>Redirecting…</div>;
}
