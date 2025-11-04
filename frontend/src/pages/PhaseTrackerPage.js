import React, { useEffect, useState } from "react";
import FeaturePageLayout from "../components/FeaturePageLayout";

export default function PhaseTrackerPage() {
  const [phaseData, setPhaseData] = useState(null);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchPhase() {
      if (!token) {
        setCheckedAuth(true);
        return;
      }

      try {
        const res = await fetch("/api/survey/phase", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        console.log("phase data:", data); // ✅ Debug helper

        if (data?.phase) {
          setPhaseData(data);
        }
      } catch (err) {
        console.error("Phase fetch error", err);
      } finally {
        setCheckedAuth(true);
      }
    }

    fetchPhase();
  }, [token]);

  // Wait until we know if user has token or not
  if (!checkedAuth) return <div className="p-6">Loading...</div>;

  // ✅ Logged in + has phase data
  if (phaseData) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Your Phase Tracker</h1>
        <p className="text-gray-600 mb-6">
          Based on your cycle logs & symptoms
        </p>

        <div className="bg-pink-50 border border-pink-200 rounded-lg p-5">
          <h2 className="text-xl font-bold text-pink-700 mb-2">
            You're in the <span className="capitalize">{phaseData.phase}</span> phase
          </h2>

          <p className="text-gray-700 mb-2">Cycle day: {phaseData.cycleDay}</p>
          <p className="text-gray-700 mb-2">
            Next period:{" "}
            {new Date(phaseData.nextPeriod).toLocaleDateString()}
          </p>

          <p className="mt-4 text-sm text-gray-500">
            These predictions improve as you log more surveys
          </p>
        </div>
      </div>
    );
  }

  // ❗ Not logged in OR no phase logs yet → show hero page
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
        <p>• Forecast your next phases to plan your life better</p>
      </div>
    </FeaturePageLayout>
  );
}
