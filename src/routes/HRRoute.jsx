import React from "react";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const HRRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner />;
  if (role === "hr") return children;
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};

export default HRRoute;
