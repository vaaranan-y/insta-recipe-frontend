import React from "react";
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" replace/>;
}

export default ProtectedRoute;
