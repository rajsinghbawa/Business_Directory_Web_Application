const express = require('express');
const router = express.Router();
const User = require('../models/User'); // ✅ Make sure this is imported
const { protect } = require('../middleware/authMiddleware');

// ✅ Get all users (name + ID only, excluding self)
router.get('/users', protect, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }, 'name _id');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;
