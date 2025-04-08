// App.js (Final Interlinked Navigation Setup)
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import BusinessProfileForm from './pages/BusinessProfileForm';
import BusinessProfileView from './pages/BusinessProfileView';
import FinancialDashboard from './pages/FinancialDashboard';
import ProductManager from './pages/ProductManager';
import ProductSearchPage from './pages/ProductSearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import MessagesPage from './pages/MessagesPage';
import AdminApprovePage from './pages/AdminApprovePage';
import InboxPage from './pages/InboxPage';
import PrivateRoute from './components/PrivateRoute';
import { getUser } from './auth';

export default function App() {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUser());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <nav className="bg-blue-600 text-white p-4 flex justify-between">
        <div className="space-x-4">
          {user && (
            <>
              <Link to="/dashboard">Dashboard</Link>

              {user.role === 'business' && (
                <>
                  <Link to="/business-profile">My Profile</Link>
                  <Link to="/my-products">My Products</Link>
                </>
              )}

              {user.role === 'user' && (
                <>
                  <Link to="/products">Browse Products</Link>
                </>
              )}

              {(user.role === 'user' || user.role === 'business') && (
                <>
                  <Link to="/inbox">📥 My Inbox</Link>
                  <Link to="/messages">Send Message</Link>
                </>
              )}

              {user.role === 'admin' && (
                <>
                  <Link to="/admin/approvals">Admin Panel</Link>
                </>
              )}
            </>
          )}
        </div>
        <div>
          {!user ? (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button
              onClick={() => {
                localStorage.removeItem('token');
                setUser(null);
              }}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/business-profile" element={<PrivateRoute><BusinessProfileForm /></PrivateRoute>} />
        <Route path="/profile/:userId" element={<PrivateRoute><BusinessProfileView /></PrivateRoute>} />
        <Route path="/financials/:businessId" element={<PrivateRoute><FinancialDashboard /></PrivateRoute>} />
        <Route path="/my-products" element={<PrivateRoute><ProductManager /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><ProductSearchPage /></PrivateRoute>} />
        <Route path="/product/:productId" element={<PrivateRoute><ProductDetailPage /></PrivateRoute>} />
        <Route path="/messages/:otherUserId" element={<PrivateRoute><MessagesPage /></PrivateRoute>} />
        <Route path="/messages" element={<PrivateRoute><MessagesPage /></PrivateRoute>} />
        <Route path="/admin/approvals" element={<PrivateRoute><AdminApprovePage /></PrivateRoute>} />
        <Route path="/inbox" element={<PrivateRoute><InboxPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}
