const User = require("../models/User");
const SurveyLog = require("../models/SurveyLog");
const Notification = require("../models/Notification");

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSurveys = await Survey.countDocuments();
    const totalNotifications = await Notification.countDocuments();

    res.json({
      success: true,
      totalUsers,
      totalSurveys,
      totalNotifications,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { getAdminStats };
