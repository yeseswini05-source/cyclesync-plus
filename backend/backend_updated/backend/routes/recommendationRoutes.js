// routes/recommendRoutes.js
const express = require('express');
const { getRecommendationsByPhase } = require('../controllers/recommendController');
const router = express.Router();

router.get('/:phase', getRecommendationsByPhase);

module.exports = router;
