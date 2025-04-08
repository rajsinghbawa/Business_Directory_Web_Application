import express from 'express';
import Review from '../models/Review.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Submit review
router.post('/', protect, async (req, res) => {
  const { businessId, rating, comment } = req.body;

  // One review per user per business
  const existing = await Review.findOne({ business: businessId, reviewer: req.user._id });
  if (existing) return res.status(400).json({ message: 'You already reviewed this business.' });

  const review = new Review({ reviewer: req.user._id, business: businessId, rating, comment });
  await review.save();
  res.status(201).json(review);
});

// Get reviews for a business
router.get('/:businessId', async (req, res) => {
  const reviews = await Review.find({ business: req.params.businessId }).populate('reviewer', 'name');
  res.json(reviews);
});

// Get average rating
router.get('/avg/:businessId', async (req, res) => {
  const result = await Review.aggregate([
    { $match: { business: new mongoose.Types.ObjectId(req.params.businessId) } },
    { $group: { _id: null, avgRating: { $avg: "$rating" }, count: { $sum: 1 } } }
  ]);
  res.json(result[0] || { avgRating: 0, count: 0 });
});

export default router;
