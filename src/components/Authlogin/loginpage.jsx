import React, { useState ,useEffect } from "react";
import "./admin.css";
import Img5 from "../../assets/women/plumbing-01.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  //Authenticate checking//
  var token = localStorage.getItem('accessToken');
  var role = localStorage.getItem('userRole');


  useEffect(() => {
      if (token) {
          if(role =="Customer")
          {
            navigate("/customerdashboard"); 
          }
          else if(role == "Plumber")
          {
            navigate("/plumberdashboard"); 
          }
          else if(role == "Admin")
          {
            navigate("/dashboard"); 
          }
          else
          {
            navigate("/loginpage"); 
          }
      }
  }, [token, navigate]);
  //end

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
      const headers = {
        'Content-Type': 'application/json',
      };
      const apiurl = "https://plumbing.api.heptotechnologies.org/plumber/user/api/auth/login";
      const response = await axios.post(apiurl, data, { headers });
  
      if (response.status === 200) {
        console.log(response);
        const responseData = response.data;

        const userRole1 = responseData.data.userRole;
         localStorage.setItem('accessToken',responseData.data.accessToken);
         localStorage.setItem('userRole',userRole1);
        console.log(userRole1);
        if (userRole1 === "Admin") {
          navigate("/dashboard"); 
        } else if (userRole1 === "Plumber") {
          navigate("/plumberdashboard"); 
        } else if (userRole1 === "Customer") {
          navigate("/customerdashboard"); 
        } else {
          console.error("Unknown user role:", userRole1 );
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
              <img src={Img5} className= "logimage" alt="Plumbing Image" />
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
            <div className="col-6 p-3 ">
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
