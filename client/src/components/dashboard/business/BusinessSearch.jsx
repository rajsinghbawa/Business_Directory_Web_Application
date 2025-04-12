import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Navbar from "./Navbar";
import UserNavbar from "../user/Navbar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BusinessSearch = () => {
  const [businesses, setBusinesses] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [metric, setMetric] = useState("totalRevenue");
  const [threshold, setThreshold] = useState(5);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await axios.get("/api/financials/top", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBusinesses(res.data);
        setSearchResults(res.data);
      } catch (err) {
        console.error("Failed to fetch business data", err);
      }
    };
    fetchBusinesses();
  }, [token]);

  const handleSearch = () => {
    if (!metric || !threshold || isNaN(threshold)) {
      return setSearchResults(businesses);
    }

    const sorted = [...businesses]
      .filter((b) => !isNaN(parseFloat(b[metric])))
      .sort((a, b) => parseFloat(b[metric]) - parseFloat(a[metric]))
      .slice(0, threshold);

    setSearchResults(sorted);
  };

  const chartData = {
    labels: searchResults.map((b, i) => `#${i + 1} - ${b.name}`),
    datasets: [
      {
        label: metric,
        data: searchResults.map((b) => parseFloat(b[metric])),
        backgroundColor: "#a855f7",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `Top ${threshold} Businesses by ${metric}`,
        color: "#333",
        font: { size: 18 },
      },
    },
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden flex bg-gradient-to-br from-[#f8f9ff] to-white text-gray-800">
      {/* Sidebar (fixed width) */}
      <div className="w-60 h-full fixed top-0 left-0 z-50">
        {user?.role === "business" ? <Navbar /> : <UserNavbar />}
      </div>

      {/* Main Content (shifted right by sidebar width) */}
      <div className="ml-60 w-[calc(100%-15rem)] px-8 py-10">
        <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#7209b7] to-[#f72585]">
          📊 Search Top Businesses by Metrics
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 items-end">
          <div>
            <label className="block text-sm font-semibold mb-1">Metric</label>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              className="border rounded-md px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="totalRevenue">Total Revenue</option>
              <option value="CAGR">CAGR</option>
              <option value="profitMargin">Profit Margin</option>
              <option value="ROI">ROI</option>
              <option value="customerRetentionRate">Customer Retention Rate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Top N</label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value))}
              placeholder="e.g. 5"
              className="border rounded-md px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:opacity-90 transition"
          >
            Search
          </button>
        </div>

        {/* Chart */}
        {user?.role !== "user" && searchResults.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 mb-10">
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}

        {/* Business Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((b, index) => (
            <div
              key={b.businessId}
              className="bg-white p-6 rounded-2xl shadow-md border hover:border-pink-400 hover:shadow-lg transition duration-200"
            >
              <h2
                className={`text-sm font-semibold flex items-center gap-2 mb-2 ${
                  index === 0
                    ? "text-yellow-500"
                    : index === 1
                    ? "text-gray-400"
                    : index === 2
                    ? "text-orange-400"
                    : "text-purple-600"
                }`}
              >
                {index === 0 && "🥇"}
                {index === 1 && "🥈"}
                {index === 2 && "🥉"}
                #{index + 1} - {b.name}
              </h2>
              <p className="text-sm text-gray-700">Industry: {b.industry}</p>
              <p className="text-sm text-gray-700">Location: {b.location}</p>
              {user?.role !== "user" && (
                <div className="mt-2 text-sm text-gray-800 space-y-1">
                  <p><strong>Total Revenue:</strong> ${b.totalRevenue}</p>
                  <p><strong>CAGR:</strong> {b.CAGR}%</p>
                  <p><strong>Profit Margin:</strong> {b.profitMargin}%</p>
                  <p><strong>ROI:</strong> {b.ROI}%</p>
                  <p><strong>Customer Retention:</strong> {b.customerRetentionRate}%</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessSearch;
