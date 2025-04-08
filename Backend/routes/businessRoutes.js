const express = require('express');
const router = express.Router();
const { createOrUpdateProfile, getBusinessProfile } = require('../controllers/businessProfileController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Only businesses can create or update their profile
router.post('/profile', protect, authorizeRoles('business'), createOrUpdateProfile);

// Anyone authenticated can view a business profile
router.get('/profile/:userId', protect, getBusinessProfile);
router.get('/profile/:id', async (req, res) => {
    try {
      const business = await Business.findOne({ user: req.params.id, isApproved: true });
      if (!business) return res.status(404).json({ message: 'Business not found or not approved' });
      res.json(business);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching profile' });
    }
  });
module.exports = router;
