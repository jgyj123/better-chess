import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { AuthContext } from "./authProvider";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};
export default PrivateRoute;
