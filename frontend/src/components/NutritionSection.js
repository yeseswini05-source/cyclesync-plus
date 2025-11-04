import React from "react";
import { motion } from "framer-motion";

export default function NutritionSection() {
  return (
    <section
      className="
        py-16 px-4
        bg-gradient-to-b
        from-[#F5EFE3] via-[#F0E4CF] to-[#E6D5BB]
        border-t border-[#E0CFB3]/60
        backdrop-blur-xl
      "
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-2xl sm:text-3xl font-semibold text-[#6B7D38] leading-tight tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Your cravings are not “lack of control.”
        </motion.h2>

        <motion.p
          className="
            mt-4
            text-[15px] leading-relaxed
            max-w-2xl mx-auto
            text-black
            tracking-[-0.01em]
          "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          In luteal phase your metabolism literally increases. You often need
          more calories, more complex carbs, more magnesium, more B6-rich
          foods, more iron. Of course your hunger goes up. That’s not “falling
          off.” That’s physiology.
        </motion.p>

        <motion.p
          className="
            mt-6
            text-[15px] leading-relaxed
            max-w-2xl mx-auto
            text-black
            tracking-[-0.01em]
          "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          During menstrual phase your body wants warmth, minerals, and comfort
          (soups, broths, cooked vegetables, iron-heavy foods). During
          follicular/ovulation it’s easier to digest lighter foods, greens,
          fresh fiber. During luteal, slower carbs and grounding, heavier meals
          stabilize mood and reduce extreme PMS.
        </motion.p>

        {/* === Video strip instead of small cards === */}
        <motion.div
          className="
            mt-10
            grid md:grid-cols-3 gap-6
            text-left text-sm
            max-w-4xl mx-auto
          "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          {/* Menstrual video */}
          <div
            className="
              rounded-2xl overflow-hidden
              border border-[#D5C4A8]
              bg-[#F5ECDD]/80
              shadow-[0_18px_40px_rgba(0,0,0,0.12)]
              flex flex-col
            "
          >
            <div className="aspect-video w-full bg-[#D5C4A8]/60 flex items-center justify-center text-xs text-black/80">
              {/* video element – swap src/poster with your real files in /public/home/ */}
              <video
                className="w-full h-full object-cover"
                controls
                poster="/home/menstrual-placeholder.jpg"
              >
                <source
                  src="/home/menstrual-cravings-story.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="px-4 py-3">
              <div className="text-[13px] font-semibold text-black leading-snug">
                Menstrual phase · warmth & cravings
              </div>
              <div className="text-[12px] text-black mt-1">
                A real person sharing how they honour warmth, rest and heavier
                meals without guilt.
              </div>
            </div>
          </div>

          {/* Follicular / Ovulation video */}
          <div
            className="
              rounded-2xl overflow-hidden
              border border-[#D5C4A8]
              bg-[#F8F1E5]
              shadow-[0_18px_40px_rgba(0,0,0,0.12)]
              flex flex-col
            "
          >
            <div className="aspect-video w-full bg-[#D5C4A8]/60 flex items-center justify-center text-xs text-black/80">
              <video
                className="w-full h-full object-cover"
                controls
                poster="/home/follicular-placeholder.jpg"
              >
                <source
                  src="/home/follicular-fresh-foods-story.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="px-4 py-3">
              <div className="text-[13px] font-semibold text-black leading-snug">
                Follicular / ovulation · light & fresh
              </div>
              <div className="text-[12px] text-black mt-1">
                Someone talking about feeling lighter, more social, and
                gravitating towards greens and fresher foods.
              </div>
            </div>
          </div>

          {/* Luteal video */}
          <div
            className="
              rounded-2xl overflow-hidden
              border border-[#D5C4A8]
              bg-[#F5ECDD]/80
              shadow-[0_18px_40px_rgba(0,0,0,0.12)]
              flex flex-col
            "
          >
            <div className="aspect-video w-full bg-[#D5C4A8]/60 flex items-center justify-center text-xs text-black/80">
              <video
                className="w-full h-full object-cover"
                controls
                poster="/home/luteal-placeholder.jpg"
              >
                <source
                  src="/home/luteal-grounding-meals-story.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="px-4 py-3">
              <div className="text-[13px] font-semibold text-black leading-snug">
                Luteal phase · grounding & carb-supportive
              </div>
              <div className="text-[12px] text-black mt-1">
                A story on leaning into slower carbs and fullness instead of
                labeling it as “lack of discipline.”
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="
            mt-10
            text-[13px] leading-relaxed
            max-w-xl mx-auto
            text-black
          "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          CycleSync Plus links cravings (“need salt”, “need chocolate”, “feel
          puffy”) to likely nutrient gaps and shows budget-friendly food ideas.
          Not diet rules. Support.
        </motion.p>
      </div>
    </section>
  );
}
