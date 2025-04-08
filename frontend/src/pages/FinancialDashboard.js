import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const FinancialDashboard = () => {
  const { businessId } = useParams();
  const [financialData, setFinancialData] = useState(null);

  useEffect(() => {
    const fetchFinancials = async () => {
      try {
        const res = await API.get(`/financials/${businessId}`);
        setFinancialData(res.data);
      } catch (err) {
        alert('Failed to load financial data.');
        console.error(err);
      }
    };

    fetchFinancials();
  }, [businessId]);

  if (!financialData) return <div className="text-center mt-10 text-gray-600">Loading financial data...</div>;

  const chartData = {
    labels: financialData.revenueHistory.map(entry => entry.year),
    datasets: [
      {
        label: 'Revenue',
        data: financialData.revenueHistory.map(entry => entry.revenue),
        fill: false,
        borderColor: 'rgb(59,130,246)', // Tailwind blue-500
        tension: 0.3
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-gray-100 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Financial Dashboard</h2>

        <div className="mb-8">
          <Line data={chartData} />
        </div>

        <div className="grid grid-cols-2 gap-4 text-center text-lg font-medium">
          <div className="bg-white shadow rounded-lg p-4">
            CAGR: <span className="text-blue-600 font-bold">{financialData.CAGR}%</span>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            ROI: <span className="text-green-600 font-bold">{financialData.ROI}%</span>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            Profit Margin: <span className="text-yellow-600 font-bold">{financialData.profitMargin}%</span>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            Retention Rate: <span className="text-purple-600 font-bold">{financialData.customerRetentionRate}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;
