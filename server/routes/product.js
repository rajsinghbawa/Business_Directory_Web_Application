// backend/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const  verifyToken  = require("../middleware/authMiddleware");

// GET all products for a business
router.get("/business/:businessId", async (req, res) => {
  try {
    const products = await Product.find({ businessId: req.params.businessId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// POST create new product
router.post("/", verifyToken, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Failed to create product" });
  }
});

// PUT update a product
router.put("/:productId", verifyToken, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product" });
  }
});

// DELETE a product
router.delete("/:productId", verifyToken, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

module.exports = router;
