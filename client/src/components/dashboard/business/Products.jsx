import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { useSelector } from "react-redux";
import BusinessProductForm from "./ProductForm";
import Navbar from "./Navbar";

const BusinessProductManager = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
    setShowModal(false);
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/api/products/business/${user._id}`);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  const startEditing = (product) => {
    setEditingId(product._id);
    setEditForm({ ...product });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm({ ...editForm, [name]: type === "checkbox" ? checked : value });
  };

  const saveEdit = async () => {
    try {
      const res = await axios.put(`/api/products/${editingId}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.map((p) => (p._id === editingId ? res.data : p)));
      cancelEditing();
    } catch (err) {
      alert("Failed to save changes");
    }
  };

  useEffect(() => {
    if (user) fetchProducts();
  }, [user]);

  if (loading)
    return <p className="ml-60 px-8 py-10 text-gray-600">Loading products...</p>;
  if (error)
    return <p className="ml-60 px-8 py-10 text-red-600">{error}</p>;

  return (
    <div className="w-screen min-h-screen overflow-x-hidden flex bg-gradient-to-br from-[#f8f9ff] to-white text-gray-800">
      {/* Sidebar */}
      <div className="w-60 fixed top-0 left-0 h-screen z-50">
        <Navbar />
      </div>

      {/* Main content */}
      <div className="ml-60 w-[calc(100%-15rem)] px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7209b7] to-[#f72585]">
            🛍️ Your Products & Services
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition"
          >
            + Add Product
          </button>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="space-y-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-purple-100 rounded-2xl p-5 shadow hover:shadow-md transition"
              >
                {editingId === product._id ? (
                  <div className="space-y-4 text-gray-700">
                    <input
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      placeholder="Product Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500"
                    />
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      placeholder="Description"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      name="price"
                      type="number"
                      value={editForm.price}
                      onChange={handleEditChange}
                      placeholder="Price"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500"
                    />
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name="availability"
                        checked={editForm.availability}
                        onChange={handleEditChange}
                        className="accent-purple-600"
                      />
                      Available
                    </label>
                    <div className="space-x-3">
                      <button
                        onClick={saveEdit}
                        className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded hover:bg-gray-300 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-700">
                    <h2 className="text-lg font-semibold text-purple-700">
                      {product.name}
                    </h2>
                    <p className="text-sm mt-1 mb-2">{product.description}</p>
                    <p className="text-sm">💰 Price: ${product.price}</p>
                    <p className="text-sm">
                      📦 Availability:{" "}
                      <span
                        className={
                          product.availability
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {product.availability ? "Available" : "Out of stock"}
                      </span>
                    </p>
                    <div className="mt-4 space-x-4">
                      <button
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => startEditing(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-sm text-red-600 hover:underline"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl relative shadow-xl border border-purple-100">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
            <BusinessProductForm onProductAdded={handleProductAdded} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessProductManager;
