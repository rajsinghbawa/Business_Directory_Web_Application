import React from "react";
import Navbar from "../components/dashboard/business/Navbar";
import DashboardOverview from "../components/dashboard/business/DashboardOverview";
import BusinessSearch from "../components/dashboard/business/BusinessSearch";

const BusinessDashboard = () => {
  return (
    <div className="min-h-screen  bg-gray-50 w-screen">
      <Navbar/>
      <DashboardOverview/>
       </div>
  );
};

export default BusinessDashboard;