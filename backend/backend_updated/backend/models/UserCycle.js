const mongoose = require("mongoose");

const UserCycleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  lastPeriodDate: Date,
  cycleLength: { type: Number, default: 28 },
  predictedNextPeriod: Date,
  currentPhase: String,
  cycleDay: Number,

  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserCycle", UserCycleSchema);
