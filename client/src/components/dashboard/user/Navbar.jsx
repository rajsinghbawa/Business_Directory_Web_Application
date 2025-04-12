import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { Menu, X } from "lucide-react";

const UserNavbar = () => {
  const { user, role, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-60 bg-gradient-to-br from-[#3a0ca3] via-[#7209b7] to-[#f72585] text-white flex flex-col justify-between p-6 z-50 shadow-xl">
      <div>
        {/* Logo */}
        <div className="text-2xl font-extrabold mb-10 text-center">BizConnect</div>

        {token ? (
          <div className="space-y-5 text-sm">
            <div className="font-medium text-center opacity-90">Hi, {user?.name}</div>

            <Link to="/business/top" className="block px-2 py-1 rounded hover:bg-white hover:text-pink-600 transition">
              🏆 Top Businesses
            </Link>

            <Link to="/messages/inbox" className="block px-2 py-1 rounded hover:bg-white hover:text-pink-600 transition">
              Inbox
            </Link>

            <Link
              to={role === "business" ? "/dashboard/business" : "/dashboard/user"}
              className="block px-2 py-1 rounded hover:bg-white hover:text-pink-600 transition"
            >
              Dashboard
            </Link>
          </div>
        ) : (
          <div className="space-y-4 text-sm text-white">
            <Link to="/signin" className="block hover:underline">
              Sign In
            </Link>
            <Link to="/signup" className="block hover:underline">
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Logout Button */}
      {token && (
        <button
          onClick={handleLogout}
          className="bg-white text-pink-600 px-4 py-2 rounded hover:bg-pink-100 transition font-semibold text-sm"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default UserNavbar;
