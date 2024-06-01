import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useMyContext } from "../ContextProvider/Context";

// =========================================

const NavbarComp = () => {
  // =========================================
  const navigate = useNavigate();
  const { loginData, setLoginData } = useMyContext();
  const UserLogout = async () => {
    try {
      const User = await axios.get(`${import.meta.env.VITE_URL}/logout`, {
        withCredentials: true,
      });
      navigate("/");
      setLoginData("");
      toast.success(User.data.message);
    } catch (error) {
      toast.success(error);
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link active"
                  aria-current="page"
                  onClick={UserLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
            <div className="btn btn-primary">
              {loginData ? loginData : "Guest"}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarComp;
