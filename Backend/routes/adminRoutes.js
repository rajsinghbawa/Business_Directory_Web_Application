// Get unapproved businesses
router.get('/pending-businesses', protect, authorizeRoles('admin'), async (req, res) => {
    const pending = await Business.find({ isApproved: false });
    res.json(pending);
  });
  
  // Approve a business
  router.post('/approve-business/:id', protect, authorizeRoles('admin'), async (req, res) => {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: 'Business not found' });
  
    business.isApproved = true;
    await business.save();
    res.json({ message: 'Business approved' });
  });
  