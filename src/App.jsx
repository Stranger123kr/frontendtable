import React, { useEffect } from "react";
import UserTable from "./Pages/UserTable";
import Navbar from "./components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Protection from "./components/Protection";
import axios from "axios";
import Page404 from "./Pages/Page404";
const App = () => {
  const navigate = useNavigate();

  const UserAuthCheck = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_URL}/userValidate`, {
        withCredentials: true,
      });
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    UserAuthCheck();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/home"
          element={
            <Protection>
              <UserTable />
            </Protection>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;
