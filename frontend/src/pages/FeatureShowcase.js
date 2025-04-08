import React from 'react';
import { Link } from 'react-router-dom';

const FeatureShowcase = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">📋 Feature Showcase Dashboard</h2>

        {/* Section 1: Authentication & Roles */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-green-600">1️⃣ Authentication & Roles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/register" className="btn">Register</Link>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/dashboard" className="btn">Dashboard</Link>
          </div>
        </div>

        {/* Section 2: Business Profiles & Financials */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-yellow-600">2️⃣ Business Profiles & Financials</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/business-profile" className="btn">Edit My Business Profile</Link>
            <Link to="/profile/<BUSINESS_ID>" className="btn">View Business Profile</Link>
            <Link to="/financials/<BUSINESS_ID>" className="btn">Financial Dashboard</Link>
          </div>
        </div>

        {/* Section 3: Products */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-purple-600">3️⃣ Product Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/my-products" className="btn">Manage My Products</Link>
            <Link to="/products" className="btn">Search Products</Link>
            <Link to="/product/<PRODUCT_ID>" className="btn">View Product Detail</Link>
          </div>
        </div>

        {/* Section 4: Messaging */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-blue-600">4️⃣ Messaging System</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/messages/<OTHER_USER_ID>" className="btn">Chat with User/Business</Link>
          </div>
        </div>

        {/* Section 5: Ratings & Reviews */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-pink-600">5️⃣ Ratings & Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/profile/<BUSINESS_ID>" className="btn">Submit/View Reviews</Link>
          </div>
        </div>

        {/* Section 6: Admin Features */}
        <div className="mb-2">
          <h3 className="text-xl font-semibold mb-3 text-red-600">🛡 Admin Panel</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/admin/approvals" className="btn">Approve Businesses</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
