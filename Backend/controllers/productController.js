const Product = require('../models/Product');

const addProduct = async (req, res) => {
  try {
    const product = new Product({
      business: req.user.id,
      ...req.body
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
};

const getBusinessProducts = async (req, res) => {
  try {
    const products = await Product.find({ business: req.params.businessId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { _id: req.params.productId, business: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Product not found or unauthorized' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ _id: req.params.productId, business: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Product not found or unauthorized' });
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

module.exports = { addProduct, getBusinessProducts, updateProduct, deleteProduct };
