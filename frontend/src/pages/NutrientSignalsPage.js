import React from "react";
import FeaturePageLayout from "../components/FeaturePageLayout";

export default function NutrientSignalsPage() {
  return (
    <FeaturePageLayout
      eyebrow="Nutrient Signals"
      title="What your cravings and symptoms are trying to tell you"
      blurb={`We surface likely micronutrient gaps (iron, omega-3, magnesium, etc.)
based on cycle phase + symptoms. So instead of “why am I like this,”
you get “I probably need minerals and salt today, not shame.”`}
      ctaLabel="See nutrient tips"
      ctaTo="/login"
    >
      <div className="text-sm leading-relaxed text-[#3a2326] space-y-4">
        <p>
          • Puffy / bloated every luteal? We flag mineral imbalance /
          hydration, not “you’re fat lol”.
        </p>
        <p>
          • Headaches before bleed? We'll point to magnesium / electrolytes.
        </p>
        <p>
          • Intense fatigue? We warn you early so you don't plan a 10-task day
          on your lowest-energy day.
        </p>

        <div className="bg-[#fff7fa] border border-[#ffd3e2] rounded-lg p-4 text-[13px] leading-relaxed text-[#512835]">
          <div className="font-semibold text-[#c51a5a] mb-1">
            Why this matters:
          </div>
          <ul className="list-disc pl-4 space-y-1">
            <li>Cycle symptoms are not “random mood.”</li>
            <li>They're biology messaging you.</li>
            <li>We translate, so you can respond.</li>
          </ul>
        </div>
      </div>
    </FeaturePageLayout>
  );
}
