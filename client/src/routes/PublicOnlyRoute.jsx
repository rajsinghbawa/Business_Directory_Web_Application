import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicOnlyRoute = ({ element: Component }) => {
  const { token, role } = useSelector((state) => state.auth);

  if (token) {
    // Redirect to appropriate dashboard if logged in
    return <Navigate to={role === "business" ? "/dashboard/business" : "/dashboard/user"} replace />;
  }

  return <Component />;
};

export default PublicOnlyRoute;
