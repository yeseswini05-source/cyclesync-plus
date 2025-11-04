const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,

  profile: {
    age: Number,
    lifestyle: String,
    cycleLength: { type: Number, default: 28 },
    lastPeriodDate: Date
  },

  // ✅ Added inside the schema
  lastRecommendations: {
    detectedPhase: String,
    data: Object,
    updatedAt: Date
  }

}, { timestamps: true });

// 🔹 Hash password before save
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// 🔹 Compare password method
UserSchema.methods.comparePassword = function (pw) {
  return bcrypt.compare(pw, this.password);
};

module.exports = mongoose.model("User", UserSchema);
