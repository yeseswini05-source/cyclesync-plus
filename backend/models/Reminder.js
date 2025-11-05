// backend/models/Reminder.js
const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    date: { type: Date }, // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reminder", ReminderSchema);
