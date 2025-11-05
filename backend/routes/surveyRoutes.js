// routes/surveyRoutes.js
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const SurveyLog = require("../models/SurveyLog");
const UserCycle = require("../models/UserCycle");
const { calculateCyclePhase } = require("../utils/cycleMath");

// ✅ require controller properly
const { logPhaseFromSurvey } = require("../controllers/surveyController");

// ✅ Log Phase from Survey (Survey onboarding)
router.post("/phase-log", protect, logPhaseFromSurvey);

// ✅ Submit Daily Survey
router.post("/log", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    await SurveyLog.create({
      userId,
      ...data,
      date: new Date()
    });

    await SurveyLog.find({ userId })
      .sort({ createdAt: -1 })
      .skip(30)
      .deleteMany();

    if (data.bleedingLevel && data.bleedingLevel !== "none") {
      await UserCycle.findOneAndUpdate(
        { userId },
        { lastPeriodDate: new Date() },
        { upsert: true }
      );
    }

    const cycle = await UserCycle.findOne({ userId });
    let calc = null;

    if (cycle?.lastPeriodDate) {
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

    res.json({
      success: true,
      message: "Survey saved ✅",
      ...(calc ? { phase: calc.phase, cycleDay: calc.day } : {})
    });

  } catch (err) {
    console.error("Survey Save Error", err);
    res.status(500).json({
      success: false,
      message: err.message || "Server error"
    });
  }
});

// ✅ Phase results endpoint
router.get("/results", protect, async (req, res) => {
  try {
    const userId = req.user.id;

    const logs = await SurveyLog.find({ userId }).sort({ date: -1 }).limit(7);
    const cycle = await UserCycle.findOne({ userId });

    res.json({ success: true, logs, cycle });

  } catch (err) {
    console.error("Results Error", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Phase status endpoint
router.get("/phase", protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const cycle = await UserCycle.findOne({ userId });

    if (!cycle?.lastPeriodDate) {
      return res.json({ message: "No cycle data yet" });
    }

    const calc = calculateCyclePhase(cycle.lastPeriodDate, cycle.cycleLength);

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
