import React from "react";
import "./admin.css";
import Img5 from "../../assets/women/plumbing-01.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const log = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <div className="login100 signpad">
        <div className="loginpagecenter">
          <div className="row p-5">
            <div className="col-6">
              <img src={Img5}></img>
              <div className="d-flex justify-content-center mt-2">
                <label>
                  Don't have an account?{" "}
                  <Link to="/signuppage">
                    <b
                      style={{ color: "#6caddf", textDecoration: "underline",
                       }}
                    >
                      Sign Up
                    </b>
                  </Link>
                </label>
              </div>
            </div>
            <div className="col-6 p-3">
              <h3 className="logh3 ">Sign In</h3>
              <div className="mt-4">
                <div className="input-group">
                  <span className="input-icon d-flex jusify-content-center align-items-center ">
                    <i className="fa fa-user ml-2"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control logininput"
                    placeholder="Enter your name"
                  />
                </div>
                {/* <input type="text" className="form-control logininput" placeholder="Enter your name"></input> */}
              </div>
              <div className="mt-4">
                <div className="input-group">
                  <span className="input-icon d-flex jusify-content-center align-items-center ">
                    <i className="fa fa-lock ml-2"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control logininput"
                    placeholder="Enter your password"
                  ></input>
                </div>
                {/* <input type="text" className="form-control logininput" placeholder="Enter your password"></input> */}
              </div>
              <div className="mt-3 ml-1 d-flex align-items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="mr-2 logcheckbox"
                />
                <label htmlFor="rememberMe" className="mb-0 logremember">
                  Remember Me
                </label>
              </div>
              <div className="mt-4">
                <button className="loginbutton" onClick={log}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
