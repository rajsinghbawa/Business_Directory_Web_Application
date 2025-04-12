import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setAuthError } from "../../features/auth/authSlice";
import { register } from "../../services/authService";
import { Link } from "react-router-dom";
import { Briefcase, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Signup = () => {
  const dispatch = useDispatch();
  const [isBusiness, setIsBusiness] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    incorporationType: "",
    role: "user",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleRole = () => {
    const newRole = !isBusiness ? "business" : "user";
    setIsBusiness(!isBusiness);
    setForm({ ...form, role: newRole });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      dispatch(setAuth({ user: res.user, token: res.token, role: form.role }));
    } catch (err) {
      console.error(err);
      dispatch(setAuthError("Signup failed. Email might already exist."));
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#3a0ca3] via-[#7209b7] to-[#f72585] flex items-center justify-center">
      <div className="w-full h-full md:max-w-6xl md:h-auto flex flex-col md:flex-row bg-white md:rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left Welcome Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#3f37c9] to-[#560bad] text-white flex items-center justify-center p-10">
          <div>
            <h1 className="text-4xl font-extrabold mb-4">Join BizConnect</h1>
            <p className="text-sm mb-6 opacity-90 leading-relaxed">
              Empower your business or explore opportunities as a user.
            </p>
            <button className="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-lg font-medium transition">
              Explore Platform
            </button>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-8 md:p-12">
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={toggleRole}
                className="flex items-center gap-2 px-3 py-1 rounded bg-black text-white text-sm hover:opacity-90 transition"
              >
                {isBusiness ? <User size={16} /> : <Briefcase size={16} />}
                Switch to {isBusiness ? "User" : "Business"}
              </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 text-center">
              {isBusiness ? "Business" : "User"} Sign Up
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <AnimatePresence>
              {isBusiness && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Incorporation Type</label>
                  <input
                    name="incorporationType"
                    required
                    value={form.incorporationType}
                    onChange={handleChange}
                    placeholder="e.g., LLC, Corp"
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              Register
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-pink-600 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
