import React, { useState } from "react";
import axios from "../../../utils/axios";
import { useSelector } from "react-redux";

const BusinessProductForm = ({ onProductAdded }) => {
  const { user, token } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        businessId: user._id,
      };
      const res = await axios.post("/api/products", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ name: "", description: "", price: "", availability: true });
      onProductAdded(res.data);
    } catch (err) {
      console.error("Error creating product", err);
      alert("Failed to add product.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 space-y-6"
    >
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7209b7] to-[#f72585] mb-4">
        ➕ Add New Product or Service
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Product or Service Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Short description..."
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
        <input
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          required
          placeholder="$0.00"
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Availability */}
      <div className="flex items-center gap-2">
        <input
          name="availability"
          type="checkbox"
          checked={form.availability}
          onChange={handleChange}
          className="accent-purple-600 h-4 w-4"
        />
        <label className="text-sm text-gray-700">Available</label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
      >
        Add Product
      </button>
    </form>
  );
};

export default BusinessProductForm;
