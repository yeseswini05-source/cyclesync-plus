const mongoose = require("mongoose");

const SurveyLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    energy: { type: String, enum: ["low", "medium", "high"], required: false },
    mood: { type: String },
    cramps: { type: String },
    sleepHours: { type: Number },
    foodRating: { type: String },
    meal1: { type: Boolean },
    meal2: { type: Boolean },
    meal3: { type: Boolean },
    note: { type: String },
    date: {
  type: Date,
  default: Date.now
},

},

  
  { timestamps: true }
  
);

module.exports = mongoose.model("SurveyLog", SurveyLogSchema);
