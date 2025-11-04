// backend/routes/chat.js
const express = require('express');
const router = express.Router();
const wellness = require('../utils/wellnessBotRules');
const User = require('../models/User');

// In-memory sessions: { sessionId: { history: [...], lastAt } }
// NOTE: For production use DB persistence.
const sessions = {};

function getSessionKey(userId) {
  return userId ? `u_${userId}` : `g_guest`; // ✅ FIXED: added backticks for template literal
}

// POST /api/chat
// body: { message, userId, profile(optional), meta(optional) }
router.post('/', async (req, res) => {
  try {
    const { message, userId, profile, meta } = req.body;
    const sessionKey = getSessionKey(userId);

    // Create session if not exists
    if (!sessions[sessionKey]) sessions[sessionKey] = { history: [], lastAt: Date.now() };

    // Append user message to session history
    sessions[sessionKey].history.push({ from: 'user', text: message, at: Date.now() });
    if (sessions[sessionKey].history.length > 50) sessions[sessionKey].history.shift();

    // Enrich profile if not provided but userId exists
    let prof = profile || null;
    if (!prof && userId) {
      try {
        const u = await User.findById(userId).lean();
        prof = u?.profile || null;
      } catch (e) {
        console.error('User fetch error:', e.message);
      }
    }

    // Call rules engine
    const out = wellness.generateReply(message, prof, sessions[sessionKey]);

    // Record bot reply into session
    sessions[sessionKey].history.push({ from: 'bot', text: out.reply, at: Date.now() });
    sessions[sessionKey].lastAt = Date.now();

    // Return reply and actions
    res.json({ reply: out.reply, actions: out.actions || [] });
  } catch (err) {
    console.error('Chat route error:', err);
    res.status(500).json({ reply: 'I’m having trouble right now — try again shortly 💗' });
  }
});

module.exports = router;
