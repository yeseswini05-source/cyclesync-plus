import React from "react";
import FeaturePageLayout from "../components/FeaturePageLayout";

export default function PhaseTrackerPage() {
  return (
    <FeaturePageLayout
      eyebrow="Phase Tracker"
      title="See which phase you're in right now — and what it means"
      blurb={`We map menstrual, follicular, ovulation, and luteal phases; how long
they usually last for you; and what each phase tends to do to energy,
focus, mood, and appetite. No guessing, no “just push through.”`}
      ctaLabel="Log in to start tracking"
      ctaTo="/login"
    >
      <div className="text-sm leading-relaxed text-[#3a2326] space-y-4">
        <p>
          • Live status like “You’re in luteal,” not generic averages.
        </p>
        <p>
          • We highlight what's normal for you (cravings, brain fog, pain)
          so you stop thinking you're broken every month.
        </p>
        <p>
          • Forecast what’s next so you can plan high-energy days and low-energy
          days instead of forcing same output every single day.
        </p>

        <div className="bg-[#fff7fa] border border-[#ffd3e2] rounded-lg p-4 text-[13px] leading-relaxed text-[#512835]">
          <div className="font-semibold text-[#c51a5a] mb-1">Coming soon:</div>
          <ul className="list-disc pl-4 space-y-1">
            <li>Cycle drift alerts (your timing is shifting)</li>
            <li>PMS window prediction</li>
            <li>“Chill, you’re probably not pregnant” reassurance mode</li>
          </ul>
        </div>
      </div>
    </FeaturePageLayout>
  );
}
