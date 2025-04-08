import React from 'react';
import { getUser } from '../auth';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = getUser();

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-4 text-blue-700">
          Welcome, {user.name}
        </h2>
        <p className="text-gray-600 mb-6">
          You are logged in as <strong>{user.role}</strong>
        </p>

        {/* Admin Dashboard */}
        {user.role === 'admin' && (
          <div className="space-y-3">
            <p>👑 You have admin privileges.</p>
            <Link to="/admin/approvals" className="block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Go to Business Approvals
            </Link>
          </div>
        )}

        {/* Business Dashboard */}
        {user.role === 'business' && (
          <div className="space-y-3">
            <p>🏢 Manage your business presence:</p>
            <Link to="/business-profile" className="block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Edit Business Profile
            </Link>
            <Link to="/my-products" className="block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Manage Products
            </Link>
            <Link to="/financials/your-business-id" className="block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              View Financial Dashboard
            </Link>
          </div>
        )}

        {/* General User Dashboard */}
        {user.role === 'user' && (
          <div className="space-y-3">
            <p>👤 Explore the platform:</p>
            <Link to="/products" className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Browse Products
            </Link>
            <Link to="/inbox" className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              View Inbox
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
