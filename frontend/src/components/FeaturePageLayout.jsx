import React from "react";
import { Link } from "react-router-dom";

export default function FeaturePageLayout({
  eyebrow,
  title,
  blurb,
  children,
  ctaLabel,
  ctaTo,
}) {
  return (
    <section
      className="min-h-screen w-full bg-gradient-to-b from-[#fff9f9] to-[#fff1f4] flex justify-center px-4 py-12 text-[#2a1a1a]"
      style={{
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif",
      }}
    >
      <div className="w-full max-w-3xl flex flex-col gap-8">
        {/* header card */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#f2d5d9] shadow-[0_30px_60px_rgba(255,0,90,0.08)] p-6">
          <div className="text-xs font-medium text-[#d4145a] tracking-wide uppercase mb-2">
            {eyebrow}
          </div>

          <h1 className="text-2xl font-semibold text-[#241313] leading-tight mb-3">
            {title}
          </h1>

          <p className="text-[15px] leading-relaxed text-[#4a3034]">
            {blurb}
          </p>

          {ctaLabel && ctaTo && (
            <Link
              to={ctaTo}
              className="mt-6 block text-center text-sm font-semibold text-[#d4145a] border border-[#f6a6c0] rounded-lg py-3 hover:bg-[#fff4f7] transition"
            >
              {ctaLabel}
            </Link>
          )}
        </div>

        {/* body card */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-[#f2d5d9] shadow-[0_20px_40px_rgba(210,0,70,0.05)] p-6">
          {children}
        </div>

        {/* footer nav */}
        <div className="text-center text-[13px] text-[#815b61]">
          <p>
            Want to see other features?{" "}
            <Link
              to="/landing#features"
              className="underline text-[#c51a5a] font-medium hover:text-[#e0266a]"
            >
              Explore them here
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
