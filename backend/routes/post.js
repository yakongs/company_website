const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const { marked } = require("marked");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

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

const getS3KeyFromUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return decodeURIComponent(urlObj.pathname.substring(1));
  } catch (error) {
    console.error("Failed to parse URL: ", error);
    return null;
  }
};

router.post("/", authenticateToken, async (req, res) => {
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

    const ip =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;
    const userAgent = req.headers["user-agent"];

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const hasRecentView = post.viewLogs.some(
      (log) =>
        log.ip === ip &&
        log.userAgent === userAgent &&
        new Date(log.timestamp) > oneDayAgo,
    );

    if (!hasRecentView) {
      post.views += 1;
      post.viewLogs.push({
        ip,
        userAgent,
        timestamp: new Date(),
      });
      await post.save();
    }

    let htmlContent;
    try {
      htmlContent = marked.parse(post.content || "");
    } catch (error) {
      console.error("Failed to convert Markdown: ", error);
      htmlContent = post.content;
    }

    const responseData = {
      ...post.toObject(),
      renderedContent: htmlContent,
    };

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { title, content, fileUrl } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const imgRegex =
      /https:\/\/[^"']*?\.(?:png|jpg|jpeg|gif|PNG|JPG|JPEG|GIF)/g;
    const oldContentImages = post.content.match(imgRegex) || [];
    const newContentImages = content.match(imgRegex) || [];

    const deletedImages = oldContentImages.filter(
      (url) => !newContentImages.includes(url),
    );
    const deletedFiles = (post.fileUrl || []).filter(
      (url) => !(fileUrl || []).includes(url),
    );

    const allDeletedFiles = [...deletedImages, ...deletedFiles];
    for (const fileUrl of allDeletedFiles) {
      const key = getS3KeyFromUrl(fileUrl);
      if (key) {
        try {
          await s3Client.send(
            new DeleteObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: key,
            }),
          );
          console.log("File deleted successfully: ", key);
        } catch (error) {
          console.error("Failed to delete file from S3: ", error);
        }
      }
    }

    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (fileUrl !== undefined) post.fileUrl = fileUrl;

    await post.save();
    res.json(post);
  } catch (error) {
    console.error("Failed to update post: ", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const imgRegex =
      /https:\/\/[^"']*?\.(?:png|jpg|jpeg|gif|PNG|JPG|JPEG|GIF)/g;
    const contentImages = post.content.match(imgRegex) || [];

    const allFiles = [...contentImages, ...(post.fileUrl || [])];
    for (const file of allFiles) {
      const key = getS3KeyFromUrl(file);
      if (key) {
        try {
          await s3Client.send(
            new DeleteObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: key,
            }),
          );
          console.log("File deleted successfully: ", key);
        } catch (error) {
          console.error("Failed to delete file from S3: ", error);
        }
      }
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Failed to delete post: ", error);
    res.status(500).json({ message: "Internal server error." });
  }
});
module.exports = router;
