// backend/routes/financialRoutes.js
const express = require("express");
const router = express.Router();
const FinancialData = require("../models/FinancialData");
const verifyToken  = require("../middleware/authMiddleware");

// Get financial data by business ID
router.get("/:businessId", verifyToken, async (req, res) => {
  try {
    const data = await FinancialData.findOne({ businessId: req.params.businessId });
    if (!data) return res.status(404).json({ message: "Financial data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch financial data" });
  }
});

// Update or create financial data
router.put("/:businessId", verifyToken, async (req, res) => {
  try {
    const updated = await FinancialData.findOneAndUpdate(
      { businessId: req.params.businessId },
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update financial data" });
  }
});

module.exports = router;
