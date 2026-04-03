const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token not found." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
};

router.post("/", async (req, res) => {
  try {
    const { title, content, fileUrl } = req.body;

    const latestPost = await Post.findOne().sort({ number: -1 });
    const nextNumber = latestPost ? latestPost.number + 1 : 1;

    const post = new Post({
      number: nextNumber,
      title,
      content,
      fileUrl,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // const ip =
    //   req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;
    // const userAgent = req.headers["user-agent"];

    // const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    // const hasRecentView = post.viewLogs.some(
    //   (log) =>
    //     log.ip === ip &&
    //     log.userAgent === userAgent &&
    //     new Date(log.timestamp) > oneDayAgo,
    // );

    // if (!hasRecentView) {
    //   post.views += 1;
    //   post.viewLogs.push({
    //     ip,
    //     userAgent,
    //     timestamp: new Date(),
    //   });
    //   await post.save();
    // }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, content, fileUrl } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (fileUrl !== undefined) post.fileUrl = fileUrl;

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});
module.exports = router;
