import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./form.css";
const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const navigate = useNavigate();
  // -------------------------------------------------------------

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  // -------------------------------------------------------------

  const GetValue = (e) => {
    const { name, value } = e.target;
    setInpval({
      ...inpval,
      [name]: value,
    });
  };

  // -------------------------------------------------------------

  const LoginUpFrom = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;
    if (email === "") {
      toast.error("Email is Required");
    } else if (!email.includes("@")) {
      toast.error("Email is Wrong");
    } else if (password === "") {
      toast.error("password is Required");
    } else if (password.length < 6) {
      toast.error("password Must be 6 character");
    } else {
      try {
        const NewUser = await axios.post(
          `${import.meta.env.VITE_URL}/login`,
          inpval,
          {
            withCredentials: true, // enable sending and storing cookies
          }
        );
        localStorage.setItem("UserToken", NewUser.data.token);
        toast.success(NewUser.data.msg);
        console.log(NewUser.data.msg);
        navigate("/home");
      } catch (error) {
        console.log(error);
        if (error.response.status === 406) {
          toast.error(error.response.data);
        } else if (error.response.status === 401) {
          toast.error(error.response.data);
        } else {
          toast.error(error);
        }
      }
    }
  };

  // ------------------------------------------------------------

  return (
    <>
      <section>
        <div className="form_data">
          <h1>Welcome Back, Log In</h1>
          <p>Hi, We are you glad you are back. please login.</p>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Enter your Email"
                id="email"
                value={inpval.fname}
                onChange={GetValue}
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  autoComplete="off"
                  placeholder="Enter your Password"
                  id="password"
                  value={inpval.password}
                  onChange={GetValue}
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className="btn" onClick={LoginUpFrom}>
              Login
            </button>
            <p>
              Don't have an Account?<Link to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
