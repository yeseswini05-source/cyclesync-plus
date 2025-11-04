import React from "react";
import { Link } from "react-router-dom";

export default function DailyCheckinPage() {
  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        px-4 py-10
        bg-[#4F5D2C]  /* olive green background */
      "
    >
      <div className="relative max-w-3xl w-full">
        <div
          className="
            border border-[#D3C1A4]
            rounded-[32px]
            shadow-[0_24px_60px_rgba(0,0,0,0.22)]
            px-8 sm:px-10 py-10 sm:py-12
            bg-[#F9F2E3]/95
          "
          style={{
            backgroundImage: "url('/home/coffee-paper.jpg')",
            backgroundSize: "auto 100%", // vertical sheet
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
          }}
        >
          {/* header */}
          <div className="text-center">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#7C6A4A]">
              DAILY CHECK-IN
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl tracking-[0.22em] text-[#2F321D]">
              JOURNAL
            </h1>

            <p className="mt-4 text-[13px] sm:text-[14px] leading-relaxed text-[#3F3222] max-w-xl mx-auto">
              One minute a day to pour out how your body and mind are doing.
              We turn those tiny entries into patterns — so you can see
              when your energy, mood, sleep and cravings shift across your cycle.
            </p>
          </div>

          {/* decorative journal lines */}
          <div className="mt-8 space-y-6 text-[11px] sm:text-xs tracking-[0.22em] text-[#6D5A3A] uppercase">
            <section>
              <p className="text-center">HIGHLIGHTS OF TODAY</p>
              <div className="mt-4 space-y-3 text-[13px] text-[#3C2E1F]">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex items-center gap-3">
                    <span className="w-4 text-[11px] text-[#927B56]">{n}</span>
                    <div className="flex-1 border-b border-[#D8C7AA] h-[1.6rem]" />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <p className="text-center">WHAT IS YOUR BODY TELLING YOU?</p>
              <div className="mt-3 border-b border-[#D8C7AA] h-[2.4rem]" />
              <div className="mt-2 border-b border-[#D8C7AA] h-[2.4rem]" />
            </section>

            <section>
              <p className="text-center">
                ONE KIND THING YOU CAN DO FOR YOURSELF
              </p>
              <div className="mt-3 border-b border-[#D8C7AA] h-[2.4rem]" />
              <div className="mt-2 border-b border-[#D8C7AA] h-[2.4rem]" />
            </section>
          </div>

          {/* CTA → survey (which now posts to backend & goes to /dashboard) */}
          <div className="mt-10 flex justify-center">
            <Link
              to="/survey"
              className="
                inline-flex items-center justify-center
                px-7 py-3
                rounded-full
                text-[12px] font-semibold tracking-[0.18em] uppercase
                bg-[#4F5D2C]
                text-[#FDF7EA]
                shadow-[0_16px_40px_rgba(0,0,0,0.35)]
                hover:bg-[#424C24]
                transition-colors
              "
            >
              Log today&apos;s check-in
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-[#E5D9BF] tracking-[0.14em] uppercase">
          You&apos;re allowed to change. Your journal will prove it.
        </p>
      </div>
    </div>
  );
}
