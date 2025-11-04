import React from "react";
import FeaturePageLayout from "../components/FeaturePageLayout";

export default function FoodRecsPage() {
  return (
    <FeaturePageLayout
      eyebrow="Food & Recipe Recs"
      title="Phase-supportive meals that match budget and cravings"
      blurb={`You tell us budget, location, and what you’re craving. We respond with
foods rich in the micronutrients you actually need in that phase (iron,
magnesium, B6, protein, etc.). No “clean girl” nonsense.`}
      ctaLabel="See food ideas"
      ctaTo="/login"
    >
      <div className="text-sm leading-relaxed text-[#3a2326] space-y-4">
        <p>
          • Luteal phase cravings for chocolate? We explain why that’s literally
          your body asking for magnesium and B6 — and we give options.
        </p>
        <p>
          • Menstrual phase iron-loss? We’ll nudge iron + vitamin C combos,
          stuff you can actually afford / get nearby.
        </p>
        <p>
          • Vegetarian / hostel mess / parents’ kitchen / Swiggy life? You can
          filter.
        </p>

        <div className="bg-[#fff7fa] border border-[#ffd3e2] rounded-lg p-4 text-[13px] leading-relaxed text-[#512835]">
          <div className="font-semibold text-[#c51a5a] mb-1">
            Roadmap:
          </div>
          <ul className="list-disc pl-4 space-y-1">
            <li>Cheap grocery lists per phase</li>
            <li>“I only have a microwave” mode</li>
            <li>Anti-bloat meal suggestions</li>
          </ul>
        </div>
      </div>
    </FeaturePageLayout>
  );
}
