import React from "react";

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-roseMain/10 via-roseBg to-cream p-6">
      <div className="bg-white rounded-2xl shadow-card border border-roseMain/20 p-4 max-w-md">
        <div className="text-xl font-semibold text-roseDeep mb-2">
          Care Recommendations
        </div>
        <p className="text-night/70 text-sm">
          Food suggestions, cravings meaning, activity ideas, and sleep
          guidance from /api/recommendations.
        </p>
      </div>
    </main>
  );
}
