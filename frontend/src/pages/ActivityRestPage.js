import React from "react";
import FeaturePageLayout from "../components/FeaturePageLayout";

export default function ActivityRestPage() {
  return (
    <FeaturePageLayout
      eyebrow="Activity & Rest Guidance"
      title="Train hard when you can. Recover when you should."
      blurb={`We nudge heavier training in naturally high-energy phases,
and low-impact recovery in low-energy phases. Also: sleep / rest
suggestions when you're clearly running on fumes.`}
      ctaLabel="View today's guidance"
      ctaTo="/login"
    >
      <div className="text-sm leading-relaxed text-[#3a2326] space-y-4">
        <p>
          • “You're ovulating: high power. Good time to lift / sprint / present.”
        </p>
        <p>
          • “You're late luteal: cortisol touchy. Keep it low-impact, hydrate,
          don't bully yourself.”
        </p>
        <p>
          • We are literally trying to break the ‘just push through’ culture
          built for 24h male hormone rhythm, not your ~28d rhythm.
        </p>

        <div className="bg-[#fff7fa] border border-[#ffd3e2] rounded-lg p-4 text-[13px] leading-relaxed text-[#512835]">
          <div className="font-semibold text-[#c51a5a] mb-1">Also inside:</div>
          <ul className="list-disc pl-4 space-y-1">
            <li>Sleep debt warnings</li>
            <li>“You’re doing too much” alerts</li>
            <li>Recovery reminders that aren't toxic hustle quotes</li>
          </ul>
        </div>
      </div>
    </FeaturePageLayout>
  );
}
