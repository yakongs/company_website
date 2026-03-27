const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
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
    const { name, email, phone, message, status } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      message,
      status,
    });

    await contact.save();
    res.status(201).json({ message: "Message sent successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Inquiry not found." });
    }
    res.json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!contact) {
      return res.status(404).json({ message: "Inquiry not found." });
    }

    res.json({ message: "Inquiry status updated successfully.", contact });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Inquiry not found." });
    }

    res.json({ message: "Inquiry deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
