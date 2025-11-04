const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Recommendation", recommendationSchema);

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
exports.submitSurvey = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mood, pain, cravings, energy } = req.body;

    const log = await SurveyLog.create({
      user: userId,
      mood,
      pain,
      cravings,
      energy,
      date: new Date()
    });

    res.json({ success: true, message: "Survey saved", log });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

