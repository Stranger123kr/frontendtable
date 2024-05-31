import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";
const Page404 = () => {
  return (
    <>
      <div className="container">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="button">
          Go Back Home
        </Link>
      </div>
    </>
  );
};

export default Page404;
