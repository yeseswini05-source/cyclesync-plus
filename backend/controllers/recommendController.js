// controllers/recommendController.js
const Recommendation = require('../models/recommendation');
const User = require('../models/User'); // make sure your User model path matches

// 🔹 Get recommendations dynamically by phase + location, and cache for user
exports.getRecommendationsByPhase = async (req, res) => {
  try {
    const userId = req.user?._id || req.body.userId; // from JWT or request body
    const { phase } = req.params;
    const { location } = req.query; // ?location=India or ?location=US

    if (!phase)
      return res.status(400).json({ message: 'Phase is required' });

    // 🔹 Default location if not provided
    const userLocation = location || 'India';

    // 1️⃣ Try to find cached data
    if (userId) {
      const user = await User.findById(userId);
      if (user?.lastRecommendations && user.lastRecommendations.detectedPhase === phase) {
        const cached = user.lastRecommendations;
        const isRecent = (Date.now() - new Date(cached.updatedAt)) < 6 * 60 * 60 * 1000; // 6 hr cache
        if (isRecent) {
          return res.json({
            detectedPhase: cached.detectedPhase,
            source: 'cache',
            recommendations: cached.data
          });
        }
      }
    }

    // 2️⃣ Query recommendations from DB by phase + location
    const recommendations = await Recommendation.find({ phase, location: userLocation });

    if (!recommendations.length)
      return res.status(404).json({ message: `No recommendations found for phase ${phase} in ${userLocation}` });

    // 3️⃣ Structure response (food, exercise, medication, sleep)
    const structured = {
      food: recommendations.filter(r => r.category === 'food').flatMap(r => r.items),
      exercise: recommendations.filter(r => r.category === 'exercise').flatMap(r => r.items),
      medication: recommendations.filter(r => r.category === 'medication').flatMap(r => r.items),
      sleep: recommendations.filter(r => r.category === 'sleep').flatMap(r => r.items)[0] || "7-8 hours recommended sleep"
    };

    // 4️⃣ Cache this for user
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        lastRecommendations: {
          detectedPhase: phase,
          data: structured,
          updatedAt: new Date()
        }
      });
    }

    // 5️⃣ Return
    res.json({
      detectedPhase: phase,
      location: userLocation,
      source: 'live',
      recommendations: structured
    });

  } catch (error) {
    console.error("❌ Error in getRecommendationsByPhase:", error);
    res.status(500).json({ message: error.message });
  }
};
