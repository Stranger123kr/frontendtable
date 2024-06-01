import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./form.css";
const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const navigate = useNavigate();
  // ------------------------------------------------------------

  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    dob: "",
    password: "",
  });

  // ------------------------------------------------------------

  const GetValue = (e) => {
    const { name, value } = e.target;
    setInpval({
      ...inpval,
      [name]: value,
    });
  };

  // ------------------------------------------------------------

  const SignUpFrom = async (e) => {
    e.preventDefault();
    const { name, email, password, dob } = inpval;
    if (name === "") {
      toast.error("name is Required");
    } else if (email === "") {
      toast.error("Email is Required");
    } else if (dob === "") {
      toast.error("DOB is Required");
    } else if (!email.includes("@")) {
      toast.error("Email is Wrong");
    } else if (password === "") {
      toast.error("password is Required");
    } else if (password.length < 6) {
      toast.error("password Must be 6 character");
    } else {
      try {
        const User = await axios.post(
          `${import.meta.env.VITE_URL}/register`,
          inpval
        );
        toast.success(User.data.message);
        navigate("/");
        setInpval({
          ...inpval,
          name: "",
          email: "",
          password: "",
          dob: "",
        });
      } catch (error) {
        if (error.response.status === 409) {
          toast.error(error.response.data);
        } else if (error.response.status === 406) {
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
          <h1> Sign Up</h1>
          <form>
            <div className="form_input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                autoComplete="off"
                placeholder="Enter your Name"
                id="name"
                value={inpval.name}
                onChange={GetValue}
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Enter your Email"
                id="email"
                value={inpval.email}
                onChange={GetValue}
              />
            </div>

            <div className="form_input">
              <label htmlFor="fname">Dob</label>
              <input
                type="date"
                name="dob"
                autoComplete="off"
                placeholder="Enter your Data of Birth"
                id="dob"
                value={inpval.dob}
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

            <button className="btn" onClick={SignUpFrom}>
              Sign Up
            </button>
            <p>
              Already have an Account ? <Link to="/">Login</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
