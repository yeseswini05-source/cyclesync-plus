const express = require('express');
const { protect, admin } = require('../middleware/auth');
const Notification = require('../models/Notification');

const router = express.Router();

router.post('/create', protect, admin, async (req, res) => {
  try {
    const n = new Notification(req.body);
    await n.save();
    res.json({ success: true, data: n });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get('/', protect, async (req, res) => {
  const list = await Notification.find().sort({ time: -1 });
  res.json({ success: true, data: list });
});

module.exports = router;
