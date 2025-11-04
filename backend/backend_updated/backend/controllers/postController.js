import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { content, image, mood } = req.body;
    const post = new Post({ user: req.user.id, content, image, mood });
    await post.save();
    res.status(201).json({ success: true, post });
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err.message });
  }
};

export const getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
};
