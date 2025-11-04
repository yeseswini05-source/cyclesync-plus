const mongoose = require("mongoose");
const Recommendation = require("../models/recommendation");

const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cyclesync_plus";

const recommendations = [
  // 🩸 MENSTRUAL PHASE
  {
    phase: "Menstrual",
    category: "Nutrition",
    title: "Iron-Rich Foods",
    description: "Eat spinach, lentils, and red meat to replenish iron lost during menstruation."
  },
  {
    phase: "Menstrual",
    category: "Activity",
    title: "Gentle Yoga & Rest",
    description: "Try light yoga or stretching; avoid high-intensity workouts."
  },
  {
    phase: "Menstrual",
    category: "Sleep",
    title: "Extra Rest",
    description: "Aim for 8–9 hours of sleep to help your body recover."
  },

  // 🌱 FOLLICULAR PHASE
  {
    phase: "Follicular",
    category: "Nutrition",
    title: "Protein & Greens",
    description: "Eat leafy vegetables, eggs, and lean meats to boost estrogen levels naturally."
  },
  {
    phase: "Follicular",
    category: "Activity",
    title: "Cardio & Strength Training",
    description: "You’ll have higher energy — great time for endurance and muscle workouts."
  },
  {
    phase: "Follicular",
    category: "Sleep",
    title: "Consistent Schedule",
    description: "Stick to a steady bedtime to keep energy balanced."
  },

  // 🌸 OVULATORY PHASE
  {
    phase: "Ovulatory",
    category: "Nutrition",
    title: "Antioxidant Foods",
    description: "Eat berries, citrus, and fiber-rich foods to support hormonal balance."
  },
  {
    phase: "Ovulatory",
    category: "Activity",
    title: "High-Intensity Workouts",
    description: "Energy peaks — perfect for HIIT or social workouts."
  },
  {
    phase: "Ovulatory",
    category: "Sleep",
    title: "Calm Wind-Down",
    description: "Your body temperature is slightly higher; cool your room before bed."
  },

  // 🌙 LUTEAL PHASE
  {
    phase: "Luteal",
    category: "Nutrition",
    title: "Magnesium-Rich Foods",
    description: "Eat nuts, seeds, and dark chocolate to ease PMS symptoms."
  },
  {
    phase: "Luteal",
    category: "Activity",
    title: "Moderate Exercise",
    description: "Try pilates or walks; avoid overexertion as fatigue may increase."
  },
  {
    phase: "Luteal",
    category: "Sleep",
    title: "Relaxation Routine",
    description: "Incorporate warm baths or meditation to improve sleep quality."
  }
];

mongoose
  .connect(MONGO)
  .then(async () => {
    console.log("✅ MongoDB connected...");
    await Recommendation.deleteMany({});
    await Recommendation.insertMany(recommendations);
    console.log("🌿 Recommendations seeded successfully!");
    process.exit();
  })
  .catch((err) => console.error("❌ Seed error:", err));
