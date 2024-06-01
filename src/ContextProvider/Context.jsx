import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const LoginContext = createContext();
const Context = ({ children }) => {
  const [loginData, setLoginData] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // ===================================================

  const UserAuthCheck = async () => {
    // function for authorization
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/userValidate`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      navigate("/home");
      setLoginData(data.email);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <LoginContext.Provider
        value={{ loading, setLoading, loginData, setLoginData, UserAuthCheck }}
      >
        {children}
      </LoginContext.Provider>
    </>
  );
};

// Create the custom hook
export const useMyContext = () => {
  const contextValue = useContext(LoginContext);
  return contextValue;
};

export default Context;
