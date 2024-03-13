import React, { useState } from "react";
import "./admin.css";
import Img5 from "../../assets/women/plumbing_19 [Converted]-01.png";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Eye from '../../assets/women/eye.png';
import Eyeslash from '../../assets/women/eye-slash.png';


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

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
      valid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile is required";
      valid = false;
    }
    if (!formData.address.trim()) {
      newErrors.lastName = "Last Name is required";
      valid = false;
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
      valid = false;
    }


    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
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
      if (response.status === 200) {
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
        toast.error(error.response.data.mobile_error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  const [showPasswords, setShowPasswords] = useState(false);
  const togglePasswordVisibilitys = () => {
    setShowPasswords(!showPasswords);
};
  return (
    <>
      <div className="sign100 signpad">
        <div className="loginpagecenter1">
        {formData.registrationStatus === "success" && (
            <div className="alert alert-success" role="alert">
              User registered successfully!
            </div>
          )}
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
                  {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                </div>
              </div>
              <div className="mt-2">
                <div className="input-group">
                  <span  className="input-icon d-flex jusify-content-center align-items-center"
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
                {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
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
                {errors.email && <div className="text-danger">{errors.email}</div>}
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
                  {/* <input
                    type="text"
                    className="form-control logininput"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                  /> */}
                    <div style={{ position: "relative", width: "95%" }}>
                                        <input type={showPasswords ? 'text' : 'password'} className="form-control logininput" id="userpassword"
                                            placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} />
                                        <p className="toggle-passwords" onClick={togglePasswordVisibilitys} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
                                            {showPasswords ? (
                                                <img src={Eye} className='eye' style={{ width: '20px', height: 'auto' }} alt="Hide Password" />
                                            ) : (
                                                <img src={Eyeslash} className='eye' style={{ width: '20px', height: 'auto' }} alt="Show Password" />
                                            )}
                                        </p>
                                    </div>
                 {errors.password && <div className="text-danger">{errors.password}</div>}
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
                  {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
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
                 {errors.postcode && <div className="text-danger">{errors.mobile}</div>}
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
                 {errors.address && <div className="text-danger">{errors.address}</div>}

                </div>

              </div>
              <div className="mt-2">
                <div className="input-group">
                  <span className="input-icon d-flex jusify-content-center align-items-center" >
                    <i className="fa fa-user me-3"></i>
                  </span>
                  <select
                    className="form-control form-select logininput "
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
                    
                  </select>
                  {errors.role && <div className="text-danger">{errors.role}</div>}

                </div>
              </div>
              <div className="mt-2">
                <button className="loginbutton" onClick={handleSubmit}>
                  Register
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
