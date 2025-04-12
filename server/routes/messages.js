// routes/messages.js
const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");
const Business = require("../models/Business");
const verifyToken = require("../middleware/authMiddleware");

// ✅ Fetch all users (for dropdown)
router.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await User.find({}, "_id name");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
});

// ✅ Fetch all businesses (for dropdown)
router.get("/businesses", verifyToken, async (req, res) => {
  try {
    const businesses = await Business.find({}, "_id name");
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch businesses", error: err.message });
  }
});

// ✅ Send a message
router.post("/", verifyToken, async (req, res) => {
  try {
    const { receiver, content, receiverModel } = req.body;

    if (!receiver || !receiverModel || !content) {
      return res.status(400).json({ message: "Missing fields in request" });
    }

    const message = await Message.create({
      sender: req.user.id,
      senderModel: req.user.role === "business" ? "Business" : "User",
      receiver,
      receiverModel,
      content,
    });

    res.status(201).json(message);
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ message: "Error sending message", error: err.message });
  }
});

// ✅ Get messages involving the current user
router.get("/", verifyToken, async (req, res) => {
  try {
    const role = req.user.role === "business" ? "Business" : "User";

    const messages = await Message.find({
      $or: [
        { sender: req.user.id, senderModel: role },
        { receiver: req.user.id, receiverModel: role },
      ],
    })
      .sort({ createdAt: -1 })
      .populate("sender receiver", "name");

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages", error: err.message });
  }
});

// Get conversation threads (last message per unique receiver)
router.get("/threads", verifyToken, async (req, res) => {
    try {
      const role = req.user.role === "business" ? "Business" : "User";
      const userId = req.user.id;
  
      // Get all messages where user is involved
      const messages = await Message.find({
        $or: [
          { sender: userId, senderModel: role },
          { receiver: userId, receiverModel: role }
        ]
      })
        .sort({ createdAt: -1 }) // newest first
        .populate("sender receiver", "name");
  
      // Map to hold latest message per participant
      const threads = new Map();
  
      messages.forEach((msg) => {
        // Get the other participant's ID + role
        const isSender = msg.sender._id.toString() === userId;
        const participantId = isSender ? msg.receiver._id.toString() : msg.sender._id.toString();
        const participantModel = isSender ? msg.receiverModel : msg.senderModel;
  
        const key = `${participantModel}_${participantId}`;
  
        // Only keep the first (newest) message per conversation
        if (!threads.has(key)) {
          threads.set(key, {
            _id: msg._id,
            participantId,
            participantModel,
            participantName: isSender ? msg.receiver.name : msg.sender.name,
            lastMessage: msg.content,
            timestamp: msg.createdAt
          });
        }
      });
  
      res.json(Array.from(threads.values()));
    } catch (err) {
      console.error("Failed to fetch threads:", err);
      res.status(500).json({ message: "Error fetching message threads", error: err.message });
    }
  });
  
  // ✅ Get all messages in a thread between current user and another participant
router.get("/thread/:model/:id", verifyToken, async (req, res) => {
    try {
      const otherId = req.params.id;
      const otherModel = req.params.model === "business" ? "Business" : "User";
  
      const myId = req.user.id;
      const myModel = req.user.role === "business" ? "Business" : "User";
  
      const messages = await Message.find({
        $or: [
          { sender: myId, receiver: otherId, senderModel: myModel, receiverModel: otherModel },
          { sender: otherId, receiver: myId, senderModel: otherModel, receiverModel: myModel },
        ],
      })
        .sort({ createdAt: 1 })
        .populate("sender receiver", "name");
  
      res.json(messages);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch thread", error: err.message });
    }
  });
  

module.exports = router;
