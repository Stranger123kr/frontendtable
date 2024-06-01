import React, { useContext, useEffect } from "react";
import UserTable from "./Pages/UserTable";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Protection from "./components/Protection";
import Page404 from "./Pages/Page404";
import { LoginContext } from "./ContextProvider/Context";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
const App = () => {
  const { loading, UserAuthCheck } = useContext(LoginContext);

  useEffect(() => {
    UserAuthCheck();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
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
      )}
    </>
  );
};

export default App;
