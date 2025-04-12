import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const FinancialCharts = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const params = useParams();
  const id = params?.id || user._id;

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const res = await axios.get(`/api/financial/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch financial data", err);
      }
    };

    if (user) fetchFinancialData();
  }, [user, token]);

  if (!data)
    return <p className="p-6 text-gray-600">Loading financial charts...</p>;

  const revenueData = {
    labels: data.revenueHistory.map((entry) => entry.year),
    datasets: [
      {
        label: "Revenue",
        data: data.revenueHistory.map((entry) => entry.revenue),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const metricData = {
    labels: ["CAGR", "Profit Margin", "ROI", "Customer Retention"],
    datasets: [
      {
        label: "%",
        data: [
          data.CAGR,
          data.profitMargin,
          data.ROI,
          data.customerRetentionRate,
        ],
        backgroundColor: ["#2563eb", "#10b981", "#f59e0b", "#ec4899"],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-3xl font-bold text-gray-800">📊 Financial Performance Charts</div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">📈 Revenue Over Time</h2>
          <Line data={revenueData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">📋 Key Financial Metrics</h2>
          <Bar data={metricData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">🧩 Performance Breakdown</h2>
          <Doughnut data={metricData} />
        </div>
      </div>
    </div>
  );
};

export default FinancialCharts;