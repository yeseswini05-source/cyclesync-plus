import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Typography } from "./Typography";

export default function AppFeaturesSection() {
  const features = [
    {
      title: "Phase Tracker",
      desc:
        "See which phase you're in right now (menstrual, follicular, ovulation, luteal), how long it tends to last for you, and what that phase usually does to your energy, focus, mood, and appetite.",
      cta: "Open tracker",
      href: "/phase-tracker",
      icon: "/home/Phase Tracker.png",
    },
    {
      title: "Daily Check-in",
      desc:
        "One-minute survey for mood, pain, sleep, stress, cravings, and energy. We turn it into trends, not judgment, so you finally see your own patterns.",
      cta: "Log today’s check-in",
      href: "/daily-checkin",
      icon: "/home/Daily Check-in.png",
    },
    {
      title: "Food & Recipe Recs",
      desc:
        "You tell us budget, location, and what you’re craving. We respond with nutrient-supportive meals (iron, magnesium, B6, protein, etc.) appropriate for your current phase.",
      cta: "See food ideas",
      href: "/food-recs",
      icon: "/home/Food & Recipe Recs.png",
    },
    {
      title: "Activity & Rest Guidance",
      desc:
        "We’ll nudge you toward heavy training in high-energy phases and low-impact recovery in low-energy phases. Includes sleep/rest suggestions when you’re run down.",
      cta: "View today’s guidance",
      href: "/activity-rest",
      icon: "/home/Activity & Rest Guidance.png",
    },
    {
      title: "Nutrient Signals",
      desc:
        "Craving chocolate every luteal phase? Feeling puffy and drained? We surface likely micronutrient needs (iron, omega-3, magnesium) so you can respond instead of blaming yourself.",
      cta: "See nutrient tips",
      href: "/nutrient-signals",
      icon: "/home/Nutrient Signals.png",
    },
    {
      title: "Your Dashboard",
      desc:
        "A private homepage that pulls everything together so you can see your week at a glance — how you’re sleeping, feeling, eating, and where your energy is heading.",
      cta: "Go to dashboard",
      href: "/dashboard",
      icon: "/home/Your Dashboard.png",
    },
  ];

  const cardBase =
    "relative overflow-hidden rounded-3xl bg-[#FBF7EE] border border-[#D8C5A8] shadow-[0_18px_45px_rgba(0,0,0,0.08)] p-6 sm:p-7 pb-16 sm:pb-20 flex flex-col justify-between";

  const getLayoutClasses = (title) => {
    switch (title) {
      case "Phase Tracker":
        return "md:col-start-1 md:row-start-1 md:col-span-2";
      case "Daily Check-in":
        return "md:col-start-3 md:row-start-1";
      case "Food & Recipe Recs":
        return "md:col-start-1 md:row-start-2";
      case "Activity & Rest Guidance":
        return "md:col-start-2 md:row-start-2";
      case "Nutrient Signals":
        return "md:col-start-1 md:row-start-3 md:col-span-2";
      case "Your Dashboard":
        return "md:col-start-3 md:row-start-2 md:row-span-2";
      default:
        return "";
    }
  };

  return (
    <section
      id="features"
      className="
        py-20 px-4
        bg-gradient-to-b
        from-[#E5D0B3] via-[#EDE2CF] to-[#E2D2B7]
        border-t border-[#D6C1A0]/70
        backdrop-blur-xl
      "
    >
      <div className="max-w-6xl mx-auto">
        {/* Top heading - BIGGER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <Typography
            variant="sectionTitle"
            className="text-[#223021] text-3xl sm:text-4xl md:text-5xl"
          >
            It&apos;s not just tracking.
            <br className="hidden sm:block" />
            <span>
              It&apos;s <span className="text-[#7B8A4C]">CycleSync</span>
            </span>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <Typography
            variant="body"
            className="mt-4 text-center text-[15px] leading-relaxed max-w-2xl mx-auto text-[#3A3F27]"
          >
            This isn’t just “track your period.” It’s “here’s what your body is
            asking for today, and here’s how to work with it instead of fighting
            it.”
          </Typography>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-3 auto-rows-[minmax(0,1fr)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className={`${cardBase} ${getLayoutClasses(f.title)}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.06 * i,
              }}
            >
              {/* Text content */}
              <div className="relative z-10">
                <Typography
                  variant="subTitle"
                  className="text-[#7B8A4C] text-[10px] tracking-[0.18em]"
                >
                  Feature
                </Typography>

                {/* FEATURE TITLE - SMALLER */}
                <Typography
                  variant="sectionTitle"
                  as="h3"
                  className="mt-3 text-lg sm:text-xl text-[#22281A] leading-snug"
                >
                  {f.title}
                </Typography>

                <Typography
                  variant="body"
                  className="mt-3 text-[13px] sm:text-[14px] leading-relaxed text-[#454733]"
                >
                  {f.desc}
                </Typography>

                {f.title === "Your Dashboard" && (
                  <>
                    <ul className="mt-4 text-[12px] sm:text-[13px] leading-relaxed text-[#424733] space-y-1">
                      <li>• Current phase snapshot</li>
                      <li>• Sleep graph for this week</li>
                      <li>• Mood graph across days</li>
                      <li>• Meal frequency this week</li>
                      <li>• Overall health score / credits this week</li>
                    </ul>

                    {f.icon && (
                      <img
                        src={f.icon}
                        alt={f.title}
                        className="mt-6 w-24 h-24 sm:w-28 sm:h-28 object-contain mx-auto"
                      />
                    )}
                  </>
                )}
              </div>

              {f.icon && f.title !== "Your Dashboard" && (
                <img
                  src={f.icon}
                  alt={f.title}
                  className="pointer-events-none select-none w-24 h-24 sm:w-28 sm:h-28 object-contain absolute bottom-4 right-4"
                />
              )}

              <Link
                to={f.href}
                className="mt-5 inline-flex items-center gap-1 relative z-10 hover:text-[#182014] transition-colors"
              >
                <Typography
                  variant="button"
                  className="text-[#2B3A23] text-[13px]"
                >
                  {f.cta}
                </Typography>
                <span aria-hidden="true">↗</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
        >
          <Link
            to="/demo"
            className="
              inline-flex items-center gap-2
              rounded-full px-8 py-3
              bg-[#273721] text-[#FDF7EA]
              shadow-[0_16px_40px_rgba(0,0,0,0.35)]
              hover:bg-[#1F2C1A]
              transition-colors
            "
          >
            <Typography variant="button" className="text-[#FDF7EA]">
              Play demo
            </Typography>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#C9D86D] text-[11px] text-[#1C2412]">
              ▶
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
