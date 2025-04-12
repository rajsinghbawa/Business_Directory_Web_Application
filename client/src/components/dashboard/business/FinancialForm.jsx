import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const FinancialDataForm = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    revenueHistory: [{ year: new Date().getFullYear(), revenue: 0 }],
    CAGR: 0,
    profitMargin: 0,
    ROI: 0,
    customerRetentionRate: 0,
  });

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const res = await axios.get(`/api/financial/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data) setForm(res.data);
      } catch (err) {
        console.log("No financial data yet or fetch error", err);
      }
    };
    if (user) fetchFinancialData();
  }, [user, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: parseFloat(value) });
  };

  const handleRevenueChange = (index, field, value) => {
    const updated = [...form.revenueHistory];
    updated[index][field] = field === "year" ? parseInt(value) : parseFloat(value);
    setForm({ ...form, revenueHistory: updated });
  };

  const addRevenueEntry = () => {
    setForm({
      ...form,
      revenueHistory: [...form.revenueHistory, { year: new Date().getFullYear(), revenue: 0 }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/financial/${user._id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Financial data saved successfully!");
    } catch (err) {
      console.error("Failed to save financial data", err);
      alert("Error saving financial data");
    }
  };

  return (
    <div className=" text-gray-800">
     
      <div className="max-w-4xl mx-auto py-10 px-6">
        <div className="text-3xl font-bold mb-6">📈 Update Financial Data</div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2">📊 Revenue History</label>
            {form.revenueHistory.map((entry, idx) => (
              <div key={idx} className="flex gap-4 mb-2">
                <input
                  type="number"
                  placeholder="Year"
                  value={entry.year}
                  onChange={(e) => handleRevenueChange(idx, "year", e.target.value)}
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:ring-2"
                />
                <input
                  type="number"
                  placeholder="Revenue"
                  value={entry.revenue}
                  onChange={(e) => handleRevenueChange(idx, "revenue", e.target.value)}
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:ring-2"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addRevenueEntry}
              className="text-blue-600 text-sm underline hover:text-blue-800"
            >
              + Add Year
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">CAGR (%)</label>
            <input
              name="CAGR"
              type="number"
              placeholder="CAGR (%)"
              value={form.CAGR}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:ring-2"
            />
            </div>
            <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Profit Margin (%)</label>
            <input
              name="profitMargin"
              type="number"
              placeholder="Profit Margin (%)"
              value={form.profitMargin}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:ring-2"
            />
            </div>
            <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">ROI (%)</label>
            <input
              name="ROI"
              type="number"
              placeholder="ROI (%)"
              value={form.ROI}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:ring-2"
            />
            </div>
            <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Customer Retention Rate (%)</label>
            <input
              name="customerRetentionRate"
              type="number"
              placeholder="Customer Retention Rate (%)"
              value={form.customerRetentionRate}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:ring-2"
            />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
          >
            Save Financial Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default FinancialDataForm;
