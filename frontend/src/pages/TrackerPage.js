import React from "react";

export default function TrackerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-roseMain/10 via-roseBg to-cream p-6">
      <div className="bg-white rounded-2xl shadow-card border border-roseMain/20 p-4 max-w-md">
        <div className="text-xl font-semibold text-roseDeep mb-2">
          Phase Tracker
        </div>
        <p className="text-night/70 text-sm">
          Displays cycle phase, cycle day, days until next period.
        </p>
      </div>
    </main>
  );
}
