import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";

const PrivateRoute = ({ children }) => {
  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};
export default PrivateRoute;
