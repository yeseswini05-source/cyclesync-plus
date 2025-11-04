import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";

/* ============================
   Animation variant constants
============================ */

const hiddenCommon = {
  opacity: 0,
  scale: 0,
  y: 40,
  filter: "blur(8px)",
};

const burstLeft = {
  opacity: 1,
  scale: 1,
  x: -120,
  y: -40,
  rotate: -15,
  filter: "blur(0px)",
  transition: { duration: 0.5, ease: "easeOut", delay: 0.05 },
};

const burstRight = {
  opacity: 1,
  scale: 1,
  x: 140,
  y: -20,
  rotate: 20,
  filter: "blur(0px)",
  transition: { duration: 0.5, ease: "easeOut", delay: 0.12 },
};

const burstDiag = {
  opacity: 1,
  scale: 1,
  x: 30,
  y: 120,
  rotate: 45,
  filter: "blur(0px)",
  transition: { duration: 0.5, ease: "easeOut", delay: 0.18 },
};

/* ============================
   Hero Section
============================ */

export default function HeroSection({ isLoggedIn }) {
  const heroRef = useRef(null);
  const inView = useInView(heroRef, { amount: 0.4 });

  const ctrlLeft = useAnimation();
  const ctrlRight = useAnimation();
  const ctrlDiag = useAnimation();

  useEffect(() => {
    if (inView) {
      ctrlLeft.start(burstLeft);
      ctrlRight.start(burstRight);
      ctrlDiag.start(burstDiag);
    } else {
      const hideTransition = { duration: 0.4, ease: "easeIn" };
      ctrlLeft.start({ ...hiddenCommon, transition: hideTransition });
      ctrlRight.start({ ...hiddenCommon, transition: hideTransition });
      ctrlDiag.start({ ...hiddenCommon, transition: hideTransition });
    }
  }, [inView, ctrlLeft, ctrlRight, ctrlDiag]);

  return (
    <section className="flex-1 flex items-center overflow-visible bg-[#F8F3DF]">
      <div className="w-full max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <motion.div
          className="flex flex-col justify-center max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {!isLoggedIn ? (
            <>
              <div className="inline-flex items-center gap-2 text-[11px] font-medium text-[#4B5320] bg-[#F8F3DF]/80 border border-[#8A9A5B]/30 rounded-full px-3 py-1 w-fit mb-4">
                <span>CycleSync Plus</span>
                <span className="text-[#4B5320]/60">Beta</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-semibold text-[#3A3F1D] leading-tight">
                Your Healthy Life
                <br className="hidden sm:block" />
                Grows Here
              </h1>

              <p className="text-[#3A3F1D]/70 text-[15px] leading-relaxed mt-4 max-w-md">
                One stop for food, rest, and movement — guided by your body.
                Support your natural rhythm with mindful nutrition and balance.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 text-sm font-medium">
                <Link
                  to="/signup"
                  className="flex-1 sm:flex-none text-center rounded-full bg-[#8A9A5B] text-[#F8F3DF] py-3 px-6 hover:bg-[#6F7C46] active:scale-[0.98] transition-transform"
                >
                  Get Started
                </Link>
              </div>

              <div className="text-[11px] text-[#3A3F1D]/60 mt-6">
                Private tracking • Cycle-aligned nutrition • Mindful recovery
              </div>
            </>
          ) : (
            // 🟩 LOGGED-IN VIEW: square dashboard tab instead of marketing text
            <Link
              to="/dashboard"
              className="
                w-64 h-64
                rounded-2xl
                bg-[#FCFAF4]
                border border-[#D4C7A6]
                shadow-[0_10px_25px_rgba(0,0,0,0.12)]
                p-4
                hover:shadow-[0_14px_30px_rgba(0,0,0,0.16)]
                transition-shadow
                flex flex-col
              "
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-[#3C3424]">
                  Today&apos;s Dashboard
                </h2>
                <span className="text-[10px] px-2 py-1 rounded-full bg-[#E5DFC7] text-[#5F4F2E]">
                  Live
                </span>
              </div>

              <div className="text-xs text-[#7B6A4D] mb-3">
                Phase: <span className="font-semibold">Luteal</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px] flex-1">
                <div className="rounded-xl bg-[#F3EAD3] p-2">
                  <p className="text-[10px] text-[#6A5B3A]">Mood</p>
                  <p className="font-semibold text-[#3C3424] mt-1">
                    Balanced
                  </p>
                </div>
                <div className="rounded-xl bg-[#E9F0D7] p-2">
                  <p className="text-[10px] text-[#5C6A39]">Energy</p>
                  <p className="font-semibold text-[#3C4A1E] mt-1">
                    Medium
                  </p>
                </div>
                <div className="rounded-xl bg-[#E5F0F0] p-2 col-span-2">
                  <p className="text-[10px] text-[#3D4F4F]">
                    Tonight&apos;s suggestion
                  </p>
                  <p className="font-semibold text-[#223131] mt-1">
                    Early wind-down + warm herbal tea
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-[#6A5B3A]">
                <span>Tap to open full dashboard</span>
                <span className="text-lg leading-none">↗</span>
              </div>
            </Link>
          )}
        </motion.div>

        {/* RIGHT SIDE: broccoli visuals */}
        <div
          ref={heroRef}
          className="flex items-center justify-center relative overflow-visible"
        >
          <div className="relative w-full max-w-xl flex items-center justify-center overflow-visible">
            {/* MAIN BROCCOLI (1.5× bigger) */}
            <div className="relative z-20">
              <img
                src="/hero/broccoli.png"
                alt="Healthy broccoli"
                className="relative z-20 w-[620px] sm:w-[720px] md:w-[860px] scale-[1.3] origin-center select-none pointer-events-none"
              />
            </div>

            {/* SMOL BROCCOLIS (2× bigger) */}
            <motion.div
              className="absolute z-10"
              style={{
                top: "30%",
                left: "45%",
                translateX: "-50%",
                translateY: "-50%",
              }}
              initial={hiddenCommon}
              animate={ctrlLeft}
            >
              <img
                src="/hero/smolbroccoli.png"
                alt=""
                className="relative z-10 w-[400px] sm:w-[480px] md:w-[520px] scale-[2] origin-center select-none pointer-events-none"
              />
            </motion.div>

            <motion.div
              className="absolute z-10"
              style={{
                top: "40%",
                left: "50%",
                translateX: "-50%",
                translateY: "-50%",
              }}
              initial={hiddenCommon}
              animate={ctrlRight}
            >
              <img
                src="/hero/smolbroccoli.png"
                alt=""
                className="relative z-10 w-[480px] sm:w-[560px] md:w-[640px] scale-[2] origin-center select-none pointer-events-none"
              />
            </motion.div>

            <motion.div
              className="absolute z-10"
              style={{
                top: "55%",
                left: "52%",
                translateX: "-50%",
                translateY: "-50%",
              }}
              initial={hiddenCommon}
              animate={ctrlDiag}
            >
              <img
                src="/hero/smolbroccoli.png"
                alt=""
                className="relative z-10 w-[360px] sm:w-[420px] md:w-[460px] scale-[2] origin-center select-none pointer-events-none"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
