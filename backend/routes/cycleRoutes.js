const express = require("express");
const { logPhaseFromSurvey, analyzeSurvey } = require("../controllers/surveyController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/phase-log", protect, logPhaseFromSurvey);
router.post("/analyze", protect, analyzeSurvey);

module.exports = router;
