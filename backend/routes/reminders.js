// backend/routes/reminders.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth"); // or your auth middleware
const {
  listReminders,
  createReminder,
  deleteReminder,
} = require("../controllers/reminderController");

router.use(protect);

router.get("/", listReminders);
router.post("/", createReminder);
router.delete("/:id", deleteReminder);

module.exports = router;
