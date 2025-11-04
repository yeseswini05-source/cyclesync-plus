import React, { useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "./Typography";

export default function PhasesSection() {
  const phases = [
    {
      name: "Menstrual",
      range: "≈ 5–7 days",
      hormones:
        "Estrogen and progesterone are lowest. The uterine lining starts to shed.",
      feel:
        "Low energy, cramping, wanting warmth, quiet, softness. Your body is literally doing repair work.",
      care:
        "Warm cooked foods, mineral-rich soups, magnesium, gentle stretching, and longer sleep. Cancel non-urgent stuff.",
    },
    {
      name: "Follicular",
      range: "≈ 7–10 days",
      hormones:
        "Estrogen rises and follicles mature. Brain clarity and physical energy start climbing.",
      feel:
        "You feel clearer, sharper, more social, more optimistic. Creative work and ‘new ideas’ feel easier.",
      care:
        "Lean protein, fiber, fermented foods, leafy greens. Plan brainstorming, deep work, problem-solving here.",
    },
    {
      name: "Ovulation",
      range: "≈ 3–5 days",
      hormones:
        "Hormone surge (LH/FSH). Egg release. Skin/glow/confidence often peak.",
      feel:
        "High energy, high drive, talkative, magnetic. You’re expressive — but can also feel overstimulated or ‘too on’.",
      care:
        "Cooling / lighter foods, hydration, boundaries. You don’t need to say yes to every plan just because you can.",
    },
    {
      name: "Luteal",
      range: "≈ 10–14 days",
      hormones:
        "Progesterone is high. Your body is preparing to either support pregnancy or start shedding the lining.",
      feel:
        "More inward, mood can dip, you crave more food and more sleep. This is not ‘being lazy’; it’s metabolic load.",
      care:
        "Complex carbs (sweet potato, brown rice), magnesium, B6, iron. Lower-intensity workouts. Admin / tidy / organize mode.",
    },
  ];

  const [active, setActive] = useState(0);

  function nextCard() {
    setActive((i) => (i + 1) % phases.length);
  }
  function prevCard() {
    setActive((i) => (i - 1 + phases.length) % phases.length);
  }

  function slotFor(index) {
    const len = phases.length;
    return (index - active + len) % len;
  }

  return (
    <section
      id="how-it-works"
      className="
        py-20 px-4
        bg-gradient-to-b
        from-[#F5EFE3] via-[#F0E4CF] to-[#E6D5BB]
      "
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ wordBreak: "keep-all" }}
        >
          <Typography
            variant="sectionTitle"
            as="h2"
            className="
              font-heading text-[#3F3A2C]
              text-[1.6rem] sm:text-[2rem] md:text-[2.3rem]
              leading-[1.25] tracking-[-0.02em]
              max-w-[40rem]
            "
          >
            <span className="text-[#6B7D38]">
              Your body changes across four phases.
            </span>
            <br className="hidden sm:block" />
            Not just “on your period / off your period.”
          </Typography>
        </motion.div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <Typography
            variant="body"
            className="
              mt-5
              text-[15px] leading-relaxed
              max-w-[36rem] mx-auto
              tracking-[-0.01em]
              text-[#5A4A37]
            "
          >
            Menstrual · Follicular · Ovulation · Luteal. Each phase has
            different hormones, different fuel needs, and different ideal
            workloads. When you stop forcing yourself to be “the same every
            day,” your body calms.
          </Typography>
        </motion.div>

        {/* === circular carousel area === */}
        <div className="relative w-full mt-16 flex flex-col items-center">
          {/* buttons left/right */}
          <div className="w-full flex items-center justify-between max-w-[700px] mb-6 px-4">
            <button
              onClick={prevCard}
              className="
                h-10 w-10 rounded-full
                bg-[#F7EDDC]/90 backdrop-blur-xl
                border border-[#E0CFB3]
                shadow-[0_20px_40px_rgba(0,0,0,0.12)]
                text-[#3F3A2C] text-sm font-semibold
                hover:scale-[1.05] active:scale-[0.97] transition-transform
              "
              aria-label="Previous phase"
            >
              ‹
            </button>

            <Typography
              variant="bodySm"
              className="text-[12px] text-[#8C7A61] select-none"
            >
              tap / click arrows to move
            </Typography>

            <button
              onClick={nextCard}
              className="
                h-10 w-10 rounded-full
                bg-[#F7EDDC]/90 backdrop-blur-xl
                border border-[#E0CFB3]
                shadow-[0_20px_40px_rgba(0,0,0,0.12)]
                text-[#3F3A2C] text-sm font-semibold
                hover:scale-[1.05] active:scale-[0.97] transition-transform
              "
              aria-label="Next phase"
            >
              ›
            </button>
          </div>

          {/* 3D ring container */}
          <div
            className="relative h-[560px] w-full flex items-center justify-center overflow-visible"
            style={{ perspective: "1600px" }}
          >
            {phases.map((phase, index) => {
              const slot = slotFor(index);

              let rotateY = 0,
                translateZ = 0,
                translateX = 0,
                blur = "0px",
                opacity = 1,
                scale = 1,
                zIndex = 10,
                shadow =
                  "0 70px 160px rgba(0,0,0,0.22), 0 16px 36px rgba(0,0,0,0.14)";

              if (slot === 0) {
                translateZ = 250;
                zIndex = 30;
              } else if (slot === 1) {
                rotateY = -35;
                translateZ = 100;
                translateX = 260;
                blur = "3px";
                opacity = 0.45;
                scale = 0.9;
                zIndex = 5;
                shadow = "0 30px 60px rgba(0,0,0,0.07)";
              } else if (slot === 2) {
                rotateY = 180;
                translateZ = -200;
                opacity = 0.2;
                scale = 0.8;
                zIndex = 1;
                shadow = "0 10px 20px rgba(0,0,0,0.04)";
              } else if (slot === 3) {
                rotateY = 35;
                translateZ = 100;
                translateX = -260;
                blur = "3px";
                opacity = 0.45;
                scale = 0.9;
                zIndex = 5;
                shadow = "0 30px 60px rgba(0,0,0,0.07)";
              }

              return (
                <CarouselCard
                  key={phase.name}
                  phase={phase}
                  styleConfig={{
                    rotateY,
                    translateZ,
                    translateX,
                    blur,
                    opacity,
                    scale,
                    shadow,
                    zIndex,
                  }}
                />
              );
            })}
          </div>

          {/* phase dots indicator */}
          <div className="flex gap-2 mt-8">
            {phases.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`
                  h-2.5 rounded-full transition-all
                  ${
                    i === active
                      ? "w-6 bg-[#6B7D38]"
                      : "w-2.5 bg-[#CBB89A] hover:bg-[#B6A37F]"
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* one visible card in the 3D ring */
/* one visible card in the 3D ring */
function CarouselCard({ phase, styleConfig }) {
  const olive = "#6b7d38";

  return (
    <motion.div
      className="
        absolute
        w-[500px] max-w-[90vw]
        h-[520px]
        rounded-[2rem]
        border border-[#E0CFB3]
        bg-[rgba(248,241,229,0.9)]
        backdrop-blur-2xl
        p-10
        flex flex-col items-center justify-center text-center
      "
      style={{
        transformStyle: "preserve-3d",
        transform: `
          translateX(${styleConfig.translateX}px)
          translateZ(${styleConfig.translateZ}px)
          rotateY(${styleConfig.rotateY}deg)
          scale(${styleConfig.scale})
        `,
        filter: `blur(${styleConfig.blur})`,
        opacity: styleConfig.opacity,
        boxShadow: styleConfig.shadow,
        zIndex: styleConfig.zIndex,
        transition:
          "all 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease",
      }}
    >
      {/* soft beige + olive glow */}
      <div
        className="absolute inset-0 rounded-[2rem] pointer-events-none opacity-[0.75] blur-3xl -z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 0%, rgba(245, 231, 209, 0.9) 0%, rgba(245, 231, 209, 0) 55%),
            radial-gradient(circle at 75% 90%, rgba(107, 125, 56, 0.28) 0%, rgba(107, 125, 56, 0) 65%)
          `,
        }}
      />

      {/* header */}
      <div className="mb-6">
        <Typography
          variant="sectionTitle"
          as="h3"
          className="font-heading text-[#3F3A2C] text-[1.2rem] leading-snug tracking-[-0.03em]"
        >
          {phase.name} phase
        </Typography>

        <Typography
          variant="bodySm"
          className="
            inline-block mt-3
            text-[12px] leading-none font-medium
            px-3 py-[5px] rounded-full
            border border-[#D5C4A8]
            bg-[#F5ECDD]/80
            text-[#6B7D38]
            shadow-soft
          "
        >
          {phase.range}
        </Typography>
      </div>

      {/* content */}
      <div className="space-y-5 text-[14px] leading-relaxed text-[#4F4334] w-full px-6">
        {/* hormones */}
        <section>
          <Typography
            variant="subTitle"
            className="uppercase text-[11px] tracking-[0.18em] mb-1 text-[#6B7D38] font-semibold"
          >
            What your body is doing
          </Typography>
          <Typography variant="body" className="text-[#4F4334] text-[14px]">
            {phase.hormones}
          </Typography>
        </section>

        {/* feel */}
        <section>
          <Typography
            variant="subTitle"
            className="uppercase text-[11px] tracking-[0.18em] mb-1 text-[#3F3A2C] font-semibold"
          >
            How you might feel
          </Typography>
          <Typography variant="body" className="text-[#4F4334] text-[14px]">
            {phase.feel}
          </Typography>
        </section>

        {/* care */}
        <section>
          <Typography
            variant="subTitle"
            className="uppercase text-[11px] tracking-[0.18em] mb-1 font-semibold"
            style={{ color: olive }}
          >
            How to support it
          </Typography>
          <Typography variant="body" className="text-[#4F4334] text-[14px]">
            {phase.care}
          </Typography>
        </section>
      </div>
    </motion.div>
  );
}


