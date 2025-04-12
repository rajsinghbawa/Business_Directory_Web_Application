// backend/routes/businessRoutes.js
const express = require("express");
const router = express.Router();
const Business = require("../models/Business");
const Product = require("../models/Product");
const verifyToken = require("../middleware/authMiddleware");

// ✅ GET all businesses with their products
router.get("/", verifyToken, async (req, res) => {
  try {
    const businesses = await Business.find().select("-password").lean();
    const businessIds = businesses.map((b) => b._id);

    const products = await Product.find({ businessId: { $in: businessIds } });
    const productMap = products.reduce((acc, product) => {
      const bid = product.businessId.toString();
      if (!acc[bid]) acc[bid] = [];
      acc[bid].push(product);
      return acc;
    }, {});

    const enriched = businesses.map((b) => ({
      ...b,
      products: productMap[b._id.toString()] || [],
    }));

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET business by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id).select("-password");
    if (!business) return res.status(404).json({ message: "Business not found" });
    res.json(business);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ PUT (Edit) business profile
router.put("/profile/:id", verifyToken, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business || business.role !== "business") {
      return res.status(404).json({ message: "Business not found" });
    }

    const fieldsToUpdate = [
      "name",
      "incorporationType",
      "description",
      "contactDetails",
      "industry",
      "location",
    ];

    const updateData = {};
    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({ message: "Profile updated successfully", business: updatedBusiness });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
