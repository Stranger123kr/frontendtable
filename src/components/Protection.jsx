import React from "react";
import { Navigate } from "react-router-dom";
import { useMyContext } from "../ContextProvider/Context";

const Protection = ({ children }) => {
  const { loginData } = useMyContext();
  if (!loginData) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default Protection;
