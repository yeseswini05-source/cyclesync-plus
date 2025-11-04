const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  phase: { type: String, required: true },
  location: { type: String, enum: ['India', 'US'], default: 'India' },
  category: { type: String, enum: ['food', 'exercise', 'medication', 'sleep'], required: true },
  items: [String]
});

module.exports = mongoose.models.Recommendation || mongoose.model('Recommendation', recommendationSchema);

