import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setAuth, setAuthError } from "../../features/auth/authSlice";
import { login } from "../../services/authService";

const BusinessLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      const role = res.user.role;
      dispatch(setAuth({ user: res.user, token: res.token, role }));

      navigate(role === "business" ? "/dashboard/business" : "/dashboard/user");
    } catch (err) {
      console.error(err);
      dispatch(setAuthError("Login failed. Invalid credentials."));
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-[#3a0ca3] via-[#7209b7] to-[#f72585] text-white">
      <div className="flex w-full h-full overflow-hidden rounded-none md:rounded-3xl m-0 md:m-10 shadow-2xl bg-white bg-opacity-5 backdrop-blur-3xl border border-white border-opacity-10">

        {/* Left Welcome Section */}
        <div className="w-1/2 hidden md:flex flex-col justify-center items-start px-12 text-left bg-gradient-to-br from-[#3f37c9] to-[#560bad] text-white">
          <h1 className="text-4xl font-extrabold mb-4">Welcome!</h1>
          <p className="text-sm mb-6 opacity-90">
            Discover businesses, explore insights, and connect like never before.
          </p>
          <button className="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-lg font-medium text-white transition">
            Learn More
          </button>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-white rounded-none md:rounded-r-3xl">
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>

            <div>
              <label className="text-sm text-gray-700 block mb-1">Email</label>
              <input
  type="email"
  name="email"
  value={form.email}
  onChange={handleChange}
  required
  placeholder="Enter your email"
  className="w-full px-4 py-2 border rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
/>
            </div>

            <div>
              <label className="text-sm text-gray-700 block mb-1">Password</label>
              <input
  type="password"
  name="password"
  value={form.password}
  onChange={handleChange}
  required
  placeholder="Enter your password"
  className="w-full px-4 py-2 border rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
/>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              Submit
            </button>

            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-pink-600 hover:underline">
                Sign Up
              </Link>
            </p>

            <div className="flex justify-center gap-4 text-xl text-gray-400 pt-2">
  <a
    href="https://www.linkedin.com"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-600 transition"
    title="LinkedIn"
  >
    🔗
  </a>
  <a
    href="https://www.instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-pink-500 transition"
    title="Instagram"
  >
    📸
  </a>
  <a
    href="https://www.pinterest.com"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-red-500 transition"
    title="Pinterest"
  >
    📌
  </a>
</div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessLogin;
