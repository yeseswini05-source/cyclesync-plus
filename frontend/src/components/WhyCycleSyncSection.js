import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhyCycleSyncSection({ setIsDark }) {
  // true = right (light mode / sun), false = left (dark mode / moon)
  const [isSyncView, setIsSyncView] = useState(true);

  const bgStyle = {
    backgroundImage: "url('/home/toggle.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  // toggle site mode globally
  useEffect(() => {
    if (typeof setIsDark === "function") {
      setIsDark(!isSyncView); // dark when circle is left
    }
  }, [isSyncView, setIsDark]);

  const isDark = !isSyncView;

  return (
    <section
      className={`transition-colors duration-700 ${
        isDark
          ? "bg-[#1E1E1A]/90 text-[#EEE7C9]"
          : "bg-[#F8F3DF]/90 text-[#3A3F1D]"
      } py-16 px-4`}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* headline */}
        <motion.h2
          className={`text-2xl sm:text-3xl font-semibold leading-tight tracking-[-0.02em] ${
            isDark ? "text-[#EEE7C9]" : "text-[#3A3F1D]"
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          "Don't Live Like a Man"
        </motion.h2>

        {/* main intro paragraph */}
        <motion.p
          className="mt-4 text-[15px] leading-relaxed max-w-2xl mx-auto tracking-[-0.01em]"
          style={{
            color: isDark ? "#EEE7C9B0" : "#3A3F1DB0",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          Your body doesn’t follow a 24-hour clock — and that’s not a flaw.
          Most of the world is designed around a male rhythm, but you move
          differently. You have your own beautiful cycle, and we’re here to
          help you listen to it, honor it, and live in tune with it.
        </motion.p>

        {/* === TOGGLE goes here === */}
        <motion.div
          className="mt-10 w-full flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
        >
          <div
            className={`
              relative
              w-[400px] max-w-[90vw]
              h-[180px]
              rounded-full
              border border-[#8A9A5B]/40
              shadow-[0_40px_120px_rgba(0,0,0,0.25)]
              backdrop-blur-xl
              overflow-hidden
              transition-shadow duration-700
              ${
                isDark
                  ? "shadow-[0_0_50px_10px_rgba(255,210,110,0.25),0_20px_80px_rgba(255,230,140,0.15)]"
                  : ""
              }
            `}
            style={{
              ...bgStyle,
              filter: isDark
                ? "brightness(0.8) saturate(0.9)"
                : "brightness(1) saturate(1.1)",
            }}
          >
            {/* golden halo for moon (dark) mode */}
            {isDark && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 60% 40%, rgba(255,220,130,0.18), rgba(0,0,0,0) 70%)",
                  filter: "blur(25px)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            )}

            {/* olive orb (150px, moves left/right) */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 h-[150px] w-[150px] rounded-full border-2"
              style={{
                backgroundColor: "#5B6B2F",
                borderColor: "#6B7D38",
                boxShadow:
                  "0 0 25px rgba(107,125,56,0.6), 0 30px 80px rgba(0,0,0,0.45)",
              }}
              animate={{
                left: isSyncView ? "calc(100% - 160px)" : "6px",
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
            />

            {/* click area */}
            <button
              className="absolute inset-0 cursor-pointer"
              onClick={() => setIsSyncView((v) => !v)}
              aria-label="toggle cycle mode"
            />
          </div>

          {/* helper text */}
          <div
            className={`text-[11px] mt-3 max-w-[400px] transition-colors duration-700 ${
              isDark ? "text-[#EEE7C9]/80" : "text-[#3A3F1D]/80"
            }`}
          >
            Toggle to know more.
          </div>
          <div
            className={`text-[10px] mt-1 max-w-[400px] transition-colors duration-700 ${
              isDark ? "text-[#EEE7C9]/60" : "text-[#3A3F1D]/60"
            }`}
          >
            Tap the orb and admit it — you’re not a robot. You’re rhythmic.
          </div>
        </motion.div>

        {/* === CONDITIONAL CONTENT under toggle === */}
        <AnimatePresence>
          {isDark && (
            <motion.div
              key="dark-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-10 text-[15px] leading-relaxed max-w-2xl mx-auto tracking-[-0.01em] text-[#EEE7C9B0]"
            >
              <p className="mb-5">
                Maybe no one ever told you this — but you’re not meant to
                power through every day the same way. When your body whispers
                “slow down,” it isn’t weakness. It’s wisdom. The dips in energy,
                the need for softness, the craving for stillness — they’re all
                part of your natural rhythm.
              </p>
              <p>
                When you start syncing with your cycle instead of pushing
                against it, everything begins to make sense. Your moods, your
                hunger, your drive — they shift with purpose. We’ll help you
                work with those changes so you can move, eat, and rest in ways
                that feel aligned — not forced.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* === CARDS (CLICKABLE LINKS) === */}
        <div
          className="
            mt-12 grid sm:grid-cols-2 gap-6 text-left text-sm
            w-full max-w-4xl
          "
        >
          {/* Old way → research about 24-hour male model */}
          <a
            href="https://www.google.com/search?q=women+health+research+based+on+male+24+hour+cycle"
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border border-[#8A9A5B]/30 bg-[#EEE7C9]/70 p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform"
          >
            <div className="text-[12px] font-semibold text-[#4B5320] uppercase tracking-wide mb-1">
              Old way
            </div>
            <div className="text-[#3A3F1D] font-semibold text-base leading-snug mb-2">
              “Why can’t I just push through?”
            </div>
            <div className="text-[#3A3F1D]/70 text-[13px] leading-relaxed">
              The system expects you to live on a 24-hour loop. Most studies,
              workdays, and fitness plans are built around a male hormonal
              pattern — not yours. Explore how that gap has affected women’s
              health for decades.
            </div>
          </a>

          {/* Syncing way → cycle-syncing resources */}
          <a
            href="https://www.google.com/search?q=cycle+syncing+research+and+benefits"
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border border-[#8A9A5B]/40 bg-[#F8F3DF] p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform"
          >
            <div className="text-[12px] font-semibold text-[#5B6B2F] uppercase tracking-wide mb-1">
              Syncing way
            </div>
            <div className="text-[#3A3F1D] font-semibold text-base leading-snug mb-2">
              “I’m allowed to cycle.”
            </div>
            <div className="text-[#3A3F1D]/70 text-[13px] leading-relaxed">
              Learn about infradian rhythms, phase-based training, nutrition,
              and rest. Articles, studies, and videos that show you how syncing
              with your cycle can support energy, mood, focus, and long-term
              health.
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
