// backend/controllers/reminderController.js
const Reminder = require("../models/Reminder");

exports.listReminders = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const reminders = await Reminder.find({ userId }).sort({ createdAt: -1 });
    res.json(reminders);
  } catch (err) {
    console.error("listReminders", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createReminder = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { text, date } = req.body;
    if (!text) return res.status(400).json({ message: "Missing text" });
    const r = new Reminder({ userId, text, date });
    await r.save();
    res.status(201).json(r);
  } catch (err) {
    console.error("createReminder", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { id } = req.params;
    const rem = await Reminder.findOneAndDelete({ _id: id, userId });
    if (!rem) return res.status(404).json({ message: "Not found" });
    res.json({ success: true });
  } catch (err) {
    console.error("deleteReminder", err);
    res.status(500).json({ message: "Server error" });
  }
};
