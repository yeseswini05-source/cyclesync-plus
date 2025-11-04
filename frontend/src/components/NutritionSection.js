import React from "react";
import { motion } from "framer-motion";
import { Typography } from "./Typography";

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
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Typography
            variant="heroTitle"
            as="h2"
            className="font-heading text-[#6B7D38] text-3xl sm:text-4xl md:text-5xl leading-tight"
          >
            Your cravings are not “lack of control.”
          </Typography>
        </motion.div>

        {/* Paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <Typography
            variant="body"
            className="font-body mt-4 text-[15px] max-w-2xl mx-auto text-[#2D261C]/90"
          >
            In luteal phase your metabolism literally increases. You often need
            more calories, more complex carbs, more magnesium, more B6-rich
            foods, more iron. Of course your hunger goes up. That’s not “falling
            off.” That’s physiology.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <Typography
            variant="body"
            className="font-body mt-6 text-[15px] max-w-2xl mx-auto text-[#2D261C]/90"
          >
            During menstrual phase your body wants warmth, minerals, and comfort
            (soups, broths, cooked vegetables, iron-heavy foods). During
            follicular/ovulation it’s easier to digest lighter foods, greens,
            fresh fiber. During luteal, slower carbs and grounding, heavier
            meals stabilize mood and reduce extreme PMS.
          </Typography>
        </motion.div>

        {/* Video Stories */}
        <motion.div
          className="mt-12 grid md:grid-cols-3 gap-6 text-left text-sm max-w-4xl mx-auto items-stretch"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          {/* Menstrual video */}
          <div className="rounded-3xl overflow-hidden border border-[#D5C4A8] bg-[#F5ECDD]/80 shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex flex-col">
            <div className="aspect-video w-full bg-[#D5C4A8]/60">
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
            <div className="px-5 pt-4 pb-4">
              <Typography
                variant="body"
                as="h3"
                className="font-heading text-[15px] sm:text-[16px] text-[#22160D] leading-snug"
              >
                Menstrual phase · warmth & cravings
              </Typography>
              <Typography
                variant="bodySm"
                className="font-body text-[12px] text-[#5A5244] mt-2 leading-relaxed"
              >
                A real person sharing how they honour warmth, rest and heavier
                meals without guilt.
              </Typography>
            </div>
          </div>

          {/* Follicular / Ovulation video */}
          <div className="rounded-3xl overflow-hidden border border-[#D5C4A8] bg-[#F8F1E5] shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex flex-col">
            <div className="aspect-video w-full bg-[#D5C4A8]/60">
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
            <div className="px-5 pt-4 pb-4">
              <Typography
                variant="body"
                as="h3"
                className="font-heading text-[15px] sm:text-[16px] text-[#22160D] leading-snug"
              >
                Follicular / ovulation · light & fresh
              </Typography>
              <Typography
                variant="bodySm"
                className="font-body text-[12px] text-[#5A5244] mt-2 leading-relaxed"
              >
                Someone talking about feeling lighter, more social, and
                gravitating towards greens and fresher foods.
              </Typography>
            </div>
          </div>

          {/* Luteal video */}
          <div className="rounded-3xl overflow-hidden border border-[#D5C4A8] bg-[#F5ECDD]/80 shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex flex-col">
            <div className="aspect-video w-full bg-[#D5C4A8]/60">
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
            <div className="px-5 pt-4 pb-4">
              <Typography
                variant="body"
                as="h3"
                className="font-heading text-[15px] sm:text-[16px] text-[#22160D] leading-snug"
              >
                Luteal phase · grounding & carb-supportive
              </Typography>
              <Typography
                variant="bodySm"
                className="font-body text-[12px] text-[#5A5244] mt-2 leading-relaxed"
              >
                A story on leaning into slower carbs and fullness instead of
                labeling it as “lack of discipline.”
              </Typography>
            </div>
          </div>
        </motion.div>

        {/* Closing paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          <Typography
            variant="bodySm"
            className="font-body mt-10 text-[13px] max-w-xl mx-auto text-[#3A3225]"
          >
            CycleSync Plus links cravings (“need salt”, “need chocolate”, “feel
            puffy”) to likely nutrient gaps and shows budget-friendly food
            ideas. Not diet rules. Support.
          </Typography>
        </motion.div>
      </div>
    </section>
  );
}
