import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-white text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7209b7] to-[#f72585] text-white px-6 py-20 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Discover, Connect & Grow With Verified Businesses
            </h1>
            <p className="text-lg text-purple-100 mb-8 max-w-xl">
              BizConnect helps you explore top businesses, manage your profile, showcase products, and access smart financial insights — all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/signin"
                className="bg-white text-purple-700 px-6 py-3 rounded-md text-lg font-semibold hover:bg-purple-100 transition"
              >
                Get Started
              </Link>
              <Link
                to="/signup"
                className="border border-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-purple-700 transition"
              >
                Join as Business
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              src="https://storyset.com/illustration/team-work/bro" // or choose one from unDraw or Storyset
              alt="Hero Illustration"
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-6 md:px-20 bg-gray-50 w-full">
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-700">
          Why Join BizConnect?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3771/3771536.png"
              alt="Connect"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">Connect with Real Businesses</h3>
            <p className="text-sm text-gray-600">
              Build trust and opportunities by connecting with authentic, verified business profiles.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3105/3105612.png"
              alt="Insight"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">Smart Financial Insights</h3>
            <p className="text-sm text-gray-600">
              Track revenue, CAGR, ROI, and more with beautiful visualizations and business analytics.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2421/2421319.png"
              alt="Showcase"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">Showcase Products & Services</h3>
            <p className="text-sm text-gray-600">
              Let users discover your offerings and manage your digital storefront with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-purple-600 text-white py-16 px-6 md:px-20 text-center w-full">
        <h2 className="text-3xl font-bold mb-4">Start Growing Your Network Today!</h2>
        <p className="text-lg mb-6">
          Whether you're a business owner or a curious user, BizConnect is built to elevate your growth.
        </p>
        <Link
          to="/signup"
          className="bg-white text-purple-700 px-6 py-3 rounded-md text-lg font-semibold hover:bg-purple-100 transition"
        >
          Create Your Free Account
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
