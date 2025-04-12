import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

const Navbar = () => {
  const { user, role, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-60 bg-gradient-to-br from-[#3a0ca3] via-[#7209b7] to-[#f72585] text-white flex flex-col justify-between px-4 py-6 z-50 shadow-xl">
      <div>
        {/* Logo */}
        <div className="text-2xl font-extrabold text-center mb-10">BizConnect</div>

        {token ? (
          <ul className="space-y-5 text-sm">
            <li className="text-center font-medium opacity-90">Hi, {user?.name}</li>
            <li>
              <Link to="/dashboard/business/profile" className="block px-2 py-1 rounded hover:bg-white hover:text-pink-600 transition">
                Edit Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard/business/products" className="block px-2 py-1 rounded hover:bg-white hover:text-pink-600 transition">
                Manage Products
              </Link>
            </li>
            <li>
              <Link to="/dashboard/business/stats" className="block px-2 py-1 rounded hover:bg-white hover:text-pink-600 transition">
                Financial Stats
              </Link>
            </li>
            <li>
              <Link to="/messages/inbox" className="block px-2 py-1 rounded hover:bg-white hover:text-pink-600 transition">
                Inbox
              </Link>
            </li>
            <li>
              <Link to="/business/top" className="block px-2 py-1 rounded hover:bg-white hover:text-pink-600 transition">
                🏆 Top Businesses
              </Link>
            </li>
            <li>
              <Link
                to={role === "business" ? "/dashboard/business" : "/dashboard/user"}
                className="block px-2 py-1 rounded hover:bg-white hover:text-pink-600 transition"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="space-y-4 text-sm">
            <li>
              <Link to="/signin" className="block hover:underline">Sign In</Link>
            </li>
            <li>
              <Link to="/signup" className="block hover:underline">Sign Up</Link>
            </li>
          </ul>
        )}
      </div>

      {token && (
        <button
          onClick={handleLogout}
          className="bg-white text-pink-600 py-2 px-4 rounded hover:bg-pink-100 transition text-sm font-semibold"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
