const Recommendation = require("../models/recommendation");

// --- Simple ML-like mapping (can be tuned later) ---
function mapSurveyToPhase(survey) {
  const { mood, cramps, flow, energy, sleep, appetite, motivation } = survey;

  // Example rule-based mapping (you can replace with ML model later)
  if (flow > 6 && cramps > 5) return "Menstrual";
  if (energy > 7 && motivation > 6 && flow < 3) return "Follicular";
  if (mood > 6 && energy > 7 && cramps < 3) return "Ovulatory";
  if (mood < 5 && energy < 5 && appetite > 6) return "Luteal";
  return "Follicular"; // default fallback
}

// --- Controller: get phase + recommendations ---
exports.analyzeSurvey = async (req, res) => {
  try {
    const survey = req.body;
    if (!survey) return res.status(400).json({ message: "Survey data missing" });

    const phase = mapSurveyToPhase(survey);

    const recs = await Recommendation.find({ phase });
    res.json({ detectedPhase: phase, recommendations: recs });
  } catch (err) {
    console.error("Survey analysis error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
