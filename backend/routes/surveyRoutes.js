// routes/surveyRoutes.js
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const SurveyLog = require("../models/SurveyLog");
const UserCycle = require("../models/UserCycle");
const { calculateCyclePhase } = require("../utils/cycleMath");

// ✅ Save survey
router.post("/submit", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    // 1) Save survey log
    await SurveyLog.create({ userId, ...data });

    // 2) Keep only last 30 logs (sort by createdAt if you use timestamps)
    await SurveyLog.find({ userId })
      .sort({ createdAt: -1 })
      .skip(30)
      .deleteMany();

    // 3) If bleeding recorded, update lastPeriodDate
    if (data.bleedingLevel && data.bleedingLevel !== "none") {
      await UserCycle.findOneAndUpdate(
        { userId },
        { lastPeriodDate: new Date() },
        { upsert: true }
      );
    }

    // 4) Re-load cycle doc
    const cycle = await UserCycle.findOne({ userId });

    let calc = null;

    // 🔐 IMPORTANT:
    // Only call calculateCyclePhase if we actually have a lastPeriodDate.
    if (cycle && cycle.lastPeriodDate) {
      calc = calculateCyclePhase(cycle.lastPeriodDate, cycle.cycleLength);

      await UserCycle.findOneAndUpdate(
        { userId },
        {
          currentPhase: calc.phase,
          cycleDay: calc.day,
          predictedNextPeriod: calc.nextPeriod,
        },
        { upsert: true }
      );
    }

    // 5) Respond safely – even if we don't have cycle yet
    return res.json({
      message: "Survey saved ✅",
      ...(calc ? { phase: calc.phase, cycleDay: calc.day } : {}),
    });
  } catch (err) {
    console.error("Survey Save Error", err);
    // ⬇️ send real error message so frontend sees what went wrong
    return res.status(500).json({ message: err.message || "Server error" });
  }
});

// ✅ Get dashboard data
router.get("/results", protect, async (req, res) => {
  try {
    const userId = req.user.id;

    const logs = await SurveyLog.find({ userId })
      .sort({ date: -1 })
      .limit(7);

    const cycle = await UserCycle.findOne({ userId });

    res.json({ logs, cycle });
  } catch (err) {
    console.error("Results Error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get phase info
router.get("/phase", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const cycle = await UserCycle.findOne({ userId });

    const calc = calculateCyclePhase(
      cycle?.lastPeriodDate,
      cycle?.cycleLength
    );

    res.json({
      phase: calc.phase,
      cycleDay: calc.day,
      nextPeriod: calc.nextPeriod
    });
  } catch (err) {
    console.error("Phase Error", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
