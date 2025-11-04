const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const User = require("../models/User");
const Recommendation = require("../models/Recommendation");

router.get("/phase", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recs = await Recommendation.findOne({ phaseName: user.currentPhase });
    res.json({
      phase: user.currentPhase,
      recommendations: recs
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
