const mongoose = require("mongoose");

const variableSchema = new mongoose.Schema({
  phase: { type: String, required: true },
  hormoneLevel: Number,
  energyLevel: Number,
  moodScore: Number,
  crampsLevel: Number,
  temperature: Number,
  sleepHours: Number,
  hydrationLevel: Number
});

module.exports = mongoose.model("PhaseVariable", variableSchema);
