import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const { user, token, role } = useSelector((state) => state.auth);

  if (!token || !user) {
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
