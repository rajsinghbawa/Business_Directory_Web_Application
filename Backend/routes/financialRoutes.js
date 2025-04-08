const express = require('express');
const router = express.Router();
const { createOrUpdateFinancials, getFinancialsByBusiness } = require('../controllers/financialController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Business: Add or update financial data
router.post('/', protect, authorizeRoles('business'), createOrUpdateFinancials);

// Authenticated users: View financial data of a business
router.get('/:businessId', protect, getFinancialsByBusiness);

module.exports = router;
