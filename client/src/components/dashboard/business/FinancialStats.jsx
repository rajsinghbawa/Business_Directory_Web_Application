import React, { useState } from "react";
import FinancialDataForm from "./FinancialForm";
import FinancialCharts from "./FinancialChart";
import Navbar from "./Navbar";

const FinancialStats = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen min-w-screen bg-[#f8fafc]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
          >
            ✏️ Edit Financial Data
          </button>
        </div>

        <FinancialCharts />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-xs z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative shadow-xl">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <FinancialDataForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialStats;