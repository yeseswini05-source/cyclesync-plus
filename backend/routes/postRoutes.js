const express = require("express");
const { protect } = require("../middleware/auth");
const router = express.Router();

// 🔹 TEMP in-memory store (resets when server restarts)
let posts = [];

// GET /api/posts/  -> health check
router.get("/", protect, (req, res) => {
  res.json({ message: "Posts route working ✅" });
});

// GET /api/posts/all  -> list all posts
router.get("/all", protect, (req, res) => {
  res.json(posts);
});

// POST /api/posts/create  -> create a new post
router.post("/create", protect, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newPost = {
    _id: posts.length + 1, // fake id
    title,
    body,
    createdAt: new Date().toISOString(),
    // depends on what your `protect` middleware sets:
    authorId: req.user?._id || null,
    authorName: req.user?.name || req.user?.username || "You",
  };

  // add newest at the top
  posts.unshift(newPost);

  // return the created post (so frontend can show it immediately)
  res.json(newPost);
});

module.exports = router;
