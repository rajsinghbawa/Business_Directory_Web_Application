const express = require('express');
const router = express.Router();
const { addProduct, getBusinessProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Business actions
router.post('/', protect, authorizeRoles('business'), addProduct);
router.put('/:productId', protect, authorizeRoles('business'), updateProduct);
router.delete('/:productId', protect, authorizeRoles('business'), deleteProduct);
router.get('/', async (req, res) => {
    try {
      const { search, minPrice, maxPrice, available, page = 1, limit = 6, sortBy = 'name', sortOrder = 'asc' } = req.query;
  
      const query = {};
      if (search) query.name = { $regex: search, $options: 'i' };
      if (available) query.available = available === 'true';
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }
  
      const skip = (Number(page) - 1) * Number(limit);
      const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
  
      const total = await Product.countDocuments(query);
      const products = await Product.find(query)
        .populate('business', 'name')
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit));
  
      res.json({ products, total });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching products' });
    }
  });
  router.get('/detail/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate('business', 'name');
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching product' });
    }
  });
// View by any user
router.get('/:businessId', protect, getBusinessProducts);

module.exports = router;
