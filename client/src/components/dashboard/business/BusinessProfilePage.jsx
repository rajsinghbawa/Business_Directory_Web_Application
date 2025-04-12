import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import { useSelector } from "react-redux";

import FinancialCharts from "./FinancialChart";
import Navbar from "./Navbar";
import UserNavbar from "../user/Navbar";

const BusinessProfilePage = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await axios.get(`/api/business/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBusiness(res.data);
      } catch (err) {
        console.error("Failed to fetch business details", err);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/products/business/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchBusiness();
    fetchProducts();
  }, [id, token]);

  if (!business) return <div className="ml-60 px-8 py-10 text-gray-600">Loading business details...</div>;

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-[#f8f9ff] to-white text-gray-800">
      {/* Sidebar */}
      <div className="w-60 fixed top-0 left-0 z-50">
        {user?.role === "business" ? <Navbar /> : <UserNavbar />}
      </div>

      {/* Main Content */}
      <div className="ml-60 w-[calc(100%-15rem)] px-8 py-10">
        <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#7209b7] to-[#f72585]">
          🏢 {business.name}
        </h1>

        {/* Business Info */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8 border border-purple-100">
          <div className="space-y-2">
            <p className="text-sm text-gray-700"><strong>Type:</strong> {business.incorporationType}</p>
            <p className="text-sm text-gray-700"><strong>Industry:</strong> {business.industry}</p>
            <p className="text-sm text-gray-700"><strong>Location:</strong> {business.location}</p>
            <p className="text-sm text-gray-700"><strong>Contact:</strong> {business.contactDetails}</p>
          </div>
          <p className="mt-4 text-gray-600 leading-relaxed">{business.description}</p>
        </div>

        {/* Product List */}
        {products.length > 0 && (
          <div className="bg-white rounded-2xl shadow p-6 mb-8 border border-purple-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🛍️ Products & Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <p className="text-sm text-gray-700 font-medium">
                    💲 {product.price} | {product.availability ? "Available" : "Out of Stock"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Financial Charts (for business user only) */}
        {user?.role === "business" && (
          <div className="bg-white rounded-2xl shadow p-6 border border-purple-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📈 Financial Overview</h2>
            <FinancialCharts />
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessProfilePage;
