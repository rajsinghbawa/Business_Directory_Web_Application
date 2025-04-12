import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../utils/axios";
import { Link } from "react-router-dom";

const DashboardOverview = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ type: "", industry: "", location: "" });

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await axios.get("/api/business/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBusinesses(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to load businesses", err);
      }
    };
    fetchBusinesses();
  }, [token]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    applyFilters(updated);
  };

  const applyFilters = (updatedFilters) => {
    const filteredData = businesses.filter((biz) => {
      const matchType = updatedFilters.type ? biz.incorporationType === updatedFilters.type : true;
      const matchIndustry = updatedFilters.industry ? biz.industry?.toLowerCase().includes(updatedFilters.industry.toLowerCase()) : true;
      const matchLocation = updatedFilters.location ? biz.location?.toLowerCase().includes(updatedFilters.location.toLowerCase()) : true;
      return matchType && matchIndustry && matchLocation;
    });
    setFiltered(filteredData);
  };

  const handleResetFilters = () => {
    setFilters({ type: "", industry: "", location: "" });
    setFiltered(businesses);
  };

  return (
    <div className="p-8 ml-60 min-h-screen bg-gradient-to-br from-[#f8f9ff] to-white">
      <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7209b7] to-[#f72585] mb-6">
        📊 Business Dashboard
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4 bg-white p-5 shadow-md rounded-lg mb-6 border border-gray-200">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="border px-4 py-2 rounded-md w-48 text-sm text-black focus:ring-2 focus:ring-pink-500"
          >
            <option value="">All Types</option>
            <option value="Private">Private</option>
            <option value="Corporation">Corporation</option>
            <option value="Partnership">Partnership</option>
            <option value="LLC">LLC</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Industry</label>
          <input
            name="industry"
            value={filters.industry}
            onChange={handleFilterChange}
            placeholder="e.g. Tech"
            className="border px-4 py-2 rounded-md w-48 text-sm text-black focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
          <input
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="e.g. Toronto"
            className="border px-4 py-2 rounded-md w-48 text-sm text-black focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={handleResetFilters}
          className="mt-5 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 transition"
        >
          Reset Filters
        </button>
      </div>

      {/* Applied Filter Tags */}
      {Object.values(filters).some(Boolean) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.type && (
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
              Type: {filters.type}
            </span>
          )}
          {filters.industry && (
            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">
              Industry: {filters.industry}
            </span>
          )}
          {filters.location && (
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
              Location: {filters.location}
            </span>
          )}
        </div>
      )}

      {/* Business Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((biz) => (
          <Link
            to={`/business/${biz._id}`}
            key={biz._id}
            className="bg-white p-5 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl hover:border-pink-400 transition duration-200"
          >
            <h2 className="text-xl font-bold text-[#3a0ca3] mb-1">{biz.name}</h2>
            <p className="text-sm text-gray-500">{biz.incorporationType} | {biz.location} | {biz.industry}</p>
            <p className="text-gray-700 mt-2 line-clamp-2">{biz.description}</p>
            <p className="text-sm text-gray-500 mt-1">📞 {biz.contactDetails}</p>

            {biz.products?.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Products & Services:</h3>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {biz.products.slice(0, 3).map((product) => (
                    <li key={product._id}>{product.name}</li>
                  ))}
                  {biz.products.length > 3 && <li>...and more</li>}
                </ul>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
