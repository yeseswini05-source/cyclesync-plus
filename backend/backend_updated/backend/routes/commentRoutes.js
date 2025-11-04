const express = require("express");
const { protect } = require("../middleware/auth");
const { addComment, getCommentsByPost } = require("../controllers/commentController");

const router = express.Router();

router.post("/:postId", protect, addComment);
router.get("/:postId", protect, getCommentsByPost);

module.exports = router;
