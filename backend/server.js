require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ---------- Middleware ----------
app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// ---------- Route Imports ----------
const authRoutes = require("./routes/auth");
const surveyRoutes = require("./routes/surveyRoutes");
const postRoutes = require("./routes/postRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const commentRoutes = require("./routes/commentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const recommendRoutes = require("./routes/recommend");
const recommendationRoutes = require("./routes/recommendationRoutes");
const chatRoutes = require("./routes/chat");

// ---------- API Routes ----------
app.use("/api/auth", authRoutes);              // register/login/me
app.use("/api/survey", surveyRoutes);          // ✅ our survey endpoints
app.use("/api/posts", postRoutes);             // community posts
app.use("/api/notifications", notificationRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/recommend", recommendRoutes);    // AI/phase logic
app.use("/api/recommendations", recommendationRoutes); // seeded DB recs
app.use("/api/chat", chatRoutes);

// ❌ remove this line if it defines survey too
// app.use("/api", apiRoutes); // remove or rename this to avoid route conflicts

// ---------- Health Check ----------
app.get("/", (req, res) =>
  res.json({ status: "ok", uptime: process.uptime() })
);

// ---------- MongoDB Connection ----------
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cyclesync_plus";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ---------- Fallback ----------
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
