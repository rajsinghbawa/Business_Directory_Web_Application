const Message = require('../models/Message');
const User = require('../models/User');

const sendMessage = async (req, res) => {
  try {
    const message = new Message({
      sender: req.user.id,
      receiver: req.body.receiver,
      content: req.body.content
    });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Error sending message' });
  }
};

const getConversation = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.id }
      ]
    }).sort('createdAt');
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

// ✅ Make sure this function exists!
const getInbox = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    console.log('📥 Inbox for user:', currentUserId);

    const messages = await Message.find({
      $or: [
        { sender: currentUserId },
        { receiver: currentUserId }
      ]
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'name')
      .populate('receiver', 'name');

    const conversationMap = new Map();

    messages.forEach((msg) => {
      const otherUser =
        msg.sender._id.toString() === currentUserId.toString()
          ? msg.receiver
          : msg.sender;

      if (!conversationMap.has(otherUser._id.toString())) {
        conversationMap.set(otherUser._id.toString(), {
          user: otherUser,
          lastMessage: msg.content,
          timestamp: msg.createdAt
        });
      }
    });

    const inbox = Array.from(conversationMap.values());
    console.log('✅ Final inbox:', inbox);
    res.json(inbox);
  } catch (err) {
    console.error('Inbox fetch error:', err);
    res.status(500).json({ message: 'Error loading inbox' });
  }
};

// ✅ Export all functions properly
module.exports = { sendMessage, getConversation, getInbox };
