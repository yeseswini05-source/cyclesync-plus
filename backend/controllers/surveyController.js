const SurveyLog = require("../models/SurveyLog");
const Recommendation = require("../models/recommendation");
const UserCycle = require("../models/UserCycle");
const { calculateCyclePhase } = require("../utils/cycleMath");

// --- Phase Detection Logic ---
function mapSurveyToPhase(survey) {
  const { mood, cramps, flow, energy, sleep, appetite, motivation } = survey;

  if (flow > 6 && cramps > 5) return "Menstrual";
  if (energy > 7 && motivation > 6 && flow < 3) return "Follicular";
  if (mood > 6 && energy > 7 && cramps < 3) return "Ovulatory";
  if (mood < 5 && energy < 5 && appetite > 6) return "Luteal";

  return "Follicular";
}

// ✅ Analyze survey & return phase + recommendations
const analyzeSurvey = async (req, res) => {
  try {
    const survey = req.body;
    if (!survey)
      return res.status(400).json({ message: "Survey data missing" });

    const phase = mapSurveyToPhase(survey);
    const recs = await Recommendation.find({ phase });

    res.json({
      detectedPhase: phase,
      recommendations: recs,
    });
  } catch (err) {
    console.error("Survey analysis error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Submit phase survey log & update cycle
const logPhaseFromSurvey = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    await SurveyLog.create({
      userId,
      ...data,
      date: new Date(),
    });

    // If period logged → update cycle start date
    if (data.flow && data.flow > 5) {
      await UserCycle.findOneAndUpdate(
        { userId },
        { lastPeriodDate: new Date() },
        { upsert: true }
      );
    }

    const cycle = await UserCycle.findOne({ userId });

    let calc = null;
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

    res.json({
      success: true,
      message: "Phase survey logged ✅",
      ...(calc ? { phase: calc.phase, day: calc.day } : {}),
    });
  } catch (err) {
    console.error("Survey log error:", err);
    res.status(500).json({ message: "Error logging phase" });
  }
};

// ✅ Export all
module.exports = {
  analyzeSurvey,
  logPhaseFromSurvey,
};
