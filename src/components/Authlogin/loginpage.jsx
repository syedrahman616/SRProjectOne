import React, { useState } from "react";
import "./admin.css";
import Img5 from "../../assets/women/plumbing-01.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const loginUser = async () => {
    try {
      const data = {
        email: formData.email,
        password: formData.password,
      };
      const apiurl = "https://plumbing.api.heptotechnologies.org/plumber/user/api/auth/login"; 
      const response = await axios.post(apiurl, data);
  
      if (response.status === 200) {
        const userData = response.data;
        console.log("Login successful:", userData);
  
        if (userData.role) {
          const role = userData.role.toLowerCase();
          if (role === "admin") {
            navigate("/dashboard");
          } else if (role === "plumber") {
            navigate("/plumberdashboard");
          } else if (role === "customer") {
            navigate("/customerdashboard");
          }
        } else {
          console.error("Role information not found in the response");
        }
      } else {
        console.error("Login failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  

  
  return (
    <>
      <div className="login100 signpad">
        <div className="loginpagecenter">
          <div className="row p-5">
            <div className="col-6">
              <img src={Img5} style={{ objectFit: "fill", height: "85%" ,width :"100%"}}></img>
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
                <div className="input-group gap-2">
                  <span className="input-icon d-flex jusify-content-center align-items-center ">
                    <i className="fa fa-user ml-2"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control logininput"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="input-group gap-2 ">
                  <span className="input-icon d-flex jusify-content-center align-items-center ">
                    <i className="fa fa-lock ml-2"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control logininput"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
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
                <button className="loginbutton" onClick={loginUser}>
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
