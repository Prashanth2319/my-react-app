import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Unauthorized from "../components/unauthorized";
import { useAuth } from "../providers/authprovider";

const Authorization = ({ permissions }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (user.username) {
    const userpermission = user.permissions;
    const isAllowed = permissions.some((allowed) =>
      userpermission.includes(allowed)
    );
    return isAllowed ? <Outlet /> : <Unauthorized />;
  }
  return <Navigate to='/' state={{ path: location.pathname }} replace />;
};

export default Authorization;
