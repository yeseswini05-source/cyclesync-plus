const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const SurveyLog = require("../models/SurveyLog");
const UserCycle = require("../models/UserCycle");
const Notification = require("../models/Notification");
const { calculateCyclePhase } = require("../utils/cycleMath");

// ---------- POST /api/survey/submit ----------
router.post("/survey/submit", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    await SurveyLog.create({ userId, ...data });

    // Keep only latest 30 logs
    await SurveyLog.find({ userId }).sort({ date: -1 }).skip(30).deleteMany();

    // Update cycle state if bleeding recorded
    if (data.bleedingLevel && data.bleedingLevel !== "none") {
      await UserCycle.findOneAndUpdate(
        { userId },
        { lastPeriodDate: new Date() },
        { upsert: true }
      );
    }

    // Recalculate phase
    const cycle = await UserCycle.findOne({ userId });
    const calc = calculateCyclePhase(
      cycle?.lastPeriodDate,
      cycle?.cycleLength
    );

    await UserCycle.findOneAndUpdate(
      { userId },
      {
        currentPhase: calc.phase,
        cycleDay: calc.day,
        predictedNextPeriod: calc.nextPeriod,
        updatedAt: new Date(),
      },
      { upsert: true }
    );

    return res.json({
      status: "success",
      message: "Survey saved",
      phase: calc.phase,
      cycleDay: calc.day,
    });
  } catch (err) {
    console.error("Survey Submit Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------- GET /api/survey/results ----------
router.get("/survey/results", protect, async (req, res) => {
  try {
    const userId = req.user.id;

    const logs = await SurveyLog.find({ userId })
      .sort({ date: -1 })
      .limit(7);

    const cycle = await UserCycle.findOne({ userId });

    return res.json({ logs, cycle });
  } catch (err) {
    console.error("Get Survey Results Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------- GET /api/phase ----------
router.get("/phase", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const cycle = await UserCycle.findOne({ userId });

    const calc = calculateCyclePhase(
      cycle?.lastPeriodDate,
      cycle?.cycleLength
    );

    return res.json({
      phase: calc.phase,
      cycleDay: calc.day,
      nextPeriod: calc.nextPeriod,
    });
  } catch (err) {
    console.error("Phase Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------- GET /api/notifications ----------
router.get("/notifications", protect, async (req, res) => {
  try {
    const list = await Notification.find({
      $or: [{ user: req.user.id }, { user: null }],
    })
      .sort({ time: -1 })
      .limit(50);

    return res.json(
      list.map((n) => ({
        icon: n.icon,
        title: n.title,
        body: n.body,
        time: n.time,
        read: n.read,
      }))
    );
  } catch (err) {
    console.error("Notification Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ---------- Dummy recommendations ----------
router.get("/recommendations", protect, (req, res) => {
  res.json({
    foodToday: [
      {
        title: "Spinach + Paneer Wrap",
        why: "Iron + Protein",
        notes: "Good for menstrual fatigue recovery",
      },
    ],
    activity: ["Light walk", "Warm bath"],
    sleepTips: ["Avoid caffeine post 4PM", "Warm tea before bed"],
  });
});

module.exports = router;
