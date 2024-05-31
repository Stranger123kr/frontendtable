import React from "react";
import { Navigate } from "react-router-dom";

const Protection = ({ children }) => {
  let auth = localStorage.getItem("UserToken");

  if (!auth) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default Protection;
