// middleware/activityLogger.js
const ActivityLog = require("../models/ActivityLog");

exports.logActivity = (action) => {
  return async (req, res, next) => {
    try {
      if (req.user) {
        await ActivityLog.create({
          userId: req.user._id,
          action,
          details: req.originalUrl,
          ipAddress: req.ip,
        });
      }
    } catch (error) {
      console.error("Activity log error:", error);
    }
    next();
  };
};
