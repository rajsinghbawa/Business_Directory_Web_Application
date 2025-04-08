const BusinessProfile = require('../models/BusinessProfile');

const createOrUpdateProfile = async (req, res) => {
  try {
    const { businessName, incorporationType, description, contactInfo, offerings } = req.body;

    const data = {
      user: req.user.id,
      businessName,
      incorporationType,
      description,
      contactInfo,
      offerings
    };

    const existingProfile = await BusinessProfile.findOne({ user: req.user.id });

    let profile;
    if (existingProfile) {
      profile = await BusinessProfile.findOneAndUpdate({ user: req.user.id }, data, { new: true });
    } else {
      profile = await BusinessProfile.create(data);
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create/update profile' });
  }
};

const getBusinessProfile = async (req, res) => {
  try {
    const profile = await BusinessProfile.findOne({ user: req.params.userId }).populate('user', 'name email role');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

module.exports = { createOrUpdateProfile, getBusinessProfile };
