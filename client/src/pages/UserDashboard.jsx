// UserDashboard.jsx
import React from "react";
import UserNavbar from "../components/dashboard/user/Navbar";
import DashboardOverview from "../components/dashboard/business/DashboardOverview";

const UserDashboard = () => {
  return (
    <div className="min-h-screen  bg-gray-50 w-screen">
        <UserNavbar/>
        <DashboardOverview/>
    </div>
  );
};

export default UserDashboard;