import React, { useState } from "react";
import "./admin.css";
import Img5 from "../../assets/women/plumbing_19 [Converted]-01.png";
import { Link } from "react-router-dom";
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    postcode: "",
    address: "",
    role: "",
    mobile: "",
    registrationStatus: "" // New state for registration status
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile" && !/^\+?\d{0,10}$/.test(value)) {
      return; 
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        postCode: formData.postcode,
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password,
        userRole: formData.role,
      };
      const apiurl="https://plumbing.api.heptotechnologies.org/plumber/user/api/auth/signup";
      const response = await axios.post(apiurl, data);

      console.log(response);
      if (response.status === 200) {
        console.log("User registered successfully");
        setFormData({
          ...formData,
          registrationStatus: "success"
        });
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <>
      <div className="sign100 signpad">
        <div className="loginpagecenter1">
        
          <div className="row p-2">
            <div className="col-6">
              <img
                src={Img5}
               className="signimg"
              ></img>
              <div className="d-flex justify-content-center mt-2">
                <label>
                  Already have an Account?{" "}
                  <Link to="/loginpage">
                    <b
                      style={{ color: "#6caddf", textDecoration: "underline" }}
                    >
                      Sign In
                    </b>
                  </Link>
                </label>
              </div>
            </div>
            <div className="col-6 p-3">
              <h3 className="logh3">Sign Up</h3>
              <div className="mt-2">
                <div className="input-group">
                  <span
                    className="input-icon d-flex jusify-content-center align-items-center"
                    style={{ marginRight: "10px" }}
                  >
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control logininput"
                    value={formData.firstName}
                    name="firstName"
                    onChange={handleInputChange}
                    placeholder="Enter Name"
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="input-group">
                  <span
                    className="input-icon d-flex jusify-content-center align-items-center"
                    style={{ marginRight: "10px" }}
                  >
                    <i className="fa fa-user "></i>
                  </span>
                  <input
                    type="text"
                    className="form-control logininput"
                    value={formData.lastName}
                    name="lastName"
                    onChange={handleInputChange}
                    placeholder="Enter Last Name"
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="input-group">
                  <span
                    className="input-icon d-flex jusify-content-center align-items-center"
                    style={{ marginRight: "5px" }}
                  >
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control logininput"
                    value={formData.email}
                    name="email"
                    onChange={handleInputChange}
                    placeholder="Enter Email"
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="input-group">
                  <span
                    className="input-icon d-flex jusify-content-center align-items-center"
                    style={{ marginRight: "11px" }}
                  >
                    <i className="fa fa-lock "></i>
                  </span>
                  <input
                    type="text"
                    className="form-control logininput"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="input-group">
                  <span
                    className="input-icon d-flex jusify-content-center align-items-center"
                    style={{ marginRight: "14px" }}
                  >
                    <i className="fa fa-mobile"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control logininput"
                    value={formData.mobile}
                    name="mobile"
                    onChange={handleInputChange}
                    placeholder="Enter Mobile Number"
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="input-group">
                  <span
                    className="input-icon d-flex jusify-content-center align-items-center"
                    style={{ marginRight: "12px" }}
                  >
                    <i className="fa fa-map-marker "></i>
                  </span>
                  <input
                    type="text"
                    className="form-control logininput"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    placeholder="Enter Post-code"
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="input-group">
                  <span
                    className="input-icon d-flex jusify-content-center align-items-center"
                    style={{ marginRight: "3px" }}
                  >
                    <i className="fa fa-address-card "></i>
                  </span>
                  <input
                    type="text"
                    className="form-control logininput"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter Address"
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="input-group">
                  <span className="input-icon d-flex jusify-content-center align-items-center" >
                    <i className="fa fa-user me-3"></i>
                  </span>
                  <select
                    className="form-control logininput "
                    style={{ marginLeft: "-7px" }}
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Role</option>
                    <option value="Plumber" data-icon="fa fa-wrench">
                      Plumber
                    </option>
                    <option value="Customer" data-icon="fa fa-users">
                      Customer
                    </option>
                    <option value="Admin" data-icon="fa fa-cog">
                      Admin
                    </option>
                  </select>
                </div>
              </div>
              <div className="mt-2">
                <button className="loginbutton" onClick={handleSubmit}>
                  Register
                </button>
              </div>
              {formData.registrationStatus === "success" && (
            <div className="alert alert-success" role="alert">
              User registered successfully!
            </div>
          )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
