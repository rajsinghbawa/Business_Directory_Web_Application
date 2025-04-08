const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // ✅ Import your model
const { getConversation, getInbox } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

// ✅ Send a message
router.post('/', protect, async (req, res) => {
    try {
      const { receiver, content } = req.body;
  
      console.log('🚀 Sender:', req.user);  // log entire user
      console.log('➡️ Receiver:', receiver);
      console.log('💬 Content:', content);
  
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Not authenticated user' });
      }
  
      if (!receiver || !content) {
        return res.status(400).json({ message: 'Receiver and content are required' });
      }
  
      const newMessage = await Message.create({
        sender: req.user._id,
        receiver,
        content
      });
  
      res.status(201).json(newMessage);
    } catch (err) {
      console.error('❌ Message send error:', err);
      res.status(500).json({ message: 'Server error sending message' });
    }
  });

// ✅ Get conversation with another user
router.get('/conversation/:userId', protect, getConversation);

// ✅ Get inbox
router.get('/inbox', protect, getInbox);

module.exports = router;
