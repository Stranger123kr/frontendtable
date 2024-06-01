import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Context from "./ContextProvider/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          pauseOnHover={false}
          theme="colored"
        />
        <App />
      </Context>
    </BrowserRouter>
  </React.StrictMode>
);
