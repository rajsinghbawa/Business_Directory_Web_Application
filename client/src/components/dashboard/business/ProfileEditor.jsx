import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getBusinessById, updateBusinessById } from "../../../services/businessService";
import Navbar from "./Navbar";

const BusinessProfileEditor = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: "",
    incorporationType: "",
    description: "",
    contactDetails: "",
    industry: "",
    location: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getBusinessById(user._id, token);
        setForm(res.data);
      } catch (err) {
        console.error("Failed to fetch business profile", err);
      }
    };

    if (user?._id) fetchProfile();
  }, [user, token]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBusinessById(user._id, form, token);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("❌ Failed to update profile");
    }
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden flex bg-gradient-to-br from-[#f8f9ff] to-white text-gray-800">
      {/* Sidebar */}
      <div className="w-60 h-full fixed top-0 left-0 z-50">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="ml-60 w-[calc(100%-15rem)] px-8 py-10">
        <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#7209b7] to-[#f72585]">
          📝 Edit Business Profile
        </h2>

        <div className="w-full bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full"
          >
            {Object.entries({
              name: "Business Name",
              incorporationType: "Incorporation Type",
              description: "Description",
              contactDetails: "Contact Details",
              industry: "Industry",
              location: "Location",
            }).map(([field, label]) => (
              <div key={field}>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  name={field}
                  value={form[field] || ""}
                  onChange={handleChange}
                  placeholder={label}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-2.5 rounded-md hover:opacity-90 transition duration-200"
            >
              💾 Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileEditor;
