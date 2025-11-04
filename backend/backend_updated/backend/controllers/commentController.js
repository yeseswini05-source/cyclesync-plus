// controllers/commentController.js
const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Add a comment to a post
const addComment = async (req, res) => {
  try {
    const { text, author } = req.body;
    const { postId } = req.params;

    const newComment = new Comment({
      postId,
      author,
      text,
      createdAt: new Date(),
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment", error });
  }
};

// Get comments for a post
const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

module.exports = { addComment, getCommentsByPost };
