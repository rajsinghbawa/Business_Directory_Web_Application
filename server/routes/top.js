// backend/routes/topFinancialRoutes.js
const express = require("express");
const router = express.Router();
const FinancialData = require("../models/FinancialData");
const Business = require("../models/Business");
const verifyToken = require("../middleware/authMiddleware");

// GET top businesses with financial metrics
router.get("/top", verifyToken, async (req, res) => {
//   try {
//     const financials = await FinancialData.find().lean();
//     const businessIds = financials.map((f) => f.businessId);

//     const businesses = await Business.find({ _id: { $in: businessIds } })
//       .select("name industry location")
//       .lean();

//     const businessMap = businesses.reduce((map, biz) => {
//       map[biz._id.toString()] = biz;
//       return map;
//     }, {});

//     const results = financials.map((f) => {
//       const b = businessMap[f.businessId.toString()] || {};
//       const totalRevenue = f.revenueHistory.reduce(
//         (sum, entry) => sum + entry.revenue,
//         0
//       );

//       return {
//         businessId: f.businessId,
//         name: b.name,
//         industry: b.industry,
//         location: b.location,
//         totalRevenue,
//         CAGR: f.CAGR,
//         profitMargin: f.profitMargin,
//         ROI: f.ROI,
//         customerRetentionRate: f.customerRetentionRate,
//       };
//     });

//     res.json(results);
//   } catch (err) {
//     console.error("Error in /api/financial/top:", err);
//     res.status(500).json({ message: "Failed to retrieve top businessessss", error: err.message });
//   }
});

module.exports = router;
