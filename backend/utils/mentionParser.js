// utils/mentionParser.js
const User = require("../models/User");

exports.parseMentions = async (text) => {
  // Find all @mentions in the text
  const mentionMatches = text.match(/@([a-zA-Z0-9_]+)/g) || [];

  const usernames = mentionMatches.map((m) => m.slice(1)); // remove '@'
  const users = await User.find({ username: { $in: usernames } }, "_id");

  return users.map((u) => u._id);
};
