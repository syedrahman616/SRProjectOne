import React,{useState}from "react";
import "./admin.css";
import Img5 from "../../assets/women/plumbing_19 [Converted]-01.png";
import { Link } from "react-router-dom";
function Signup() {
  const [selectedRole, setSelectedRole] = useState(""); // State to store the selected role

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };


  return (
    <>
      <div className="sign100 signpad">
        <div className="loginpagecenter">
          <div className="row p-5">
            <div className="col-6">
              <img
                src={Img5}
                style={{ objectFit: "fill", width: "90%", height: "90%" }}
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
              <div className="mt-4">
                <div className="input-group">
                  <span
                    className="input-icon d-flex jusify-content-center align-items-center"
                    style={{ marginRight: "5px" }}
                  >
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control logininput"
                    placeholder="Enter Name"
                  />
                </div>
                {/* <input type="text" className="form-control logininput" placeholder="Enter your name"></input> */}
              </div>
              <div className="mt-4">
                <div className="input-group">
                  <span
                    className="input-icon d-flex jusify-content-center align-items-center"
                    style={{ marginRight: "5px" }}
                  >
                    <i className="fa fa-user "></i>
                  </span>
                  <input
                    type="text"
                    className="form-control logininput"
                    placeholder="Enter Last Name"
                  />
                </div>
              </div>
              <div className="mt-4">
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
                    placeholder="Enter Email"
                  ></input>
                </div>
              </div>
              <div className="mt-4">
                <div className="input-group">
                  <span
                    className="input-icon d-flex jusify-content-center align-items-center"
                    style={{ marginRight: "5px" }}
                  >
                    <i className="fa fa-lock "></i>
                  </span>
                  <input
                    type="text"
                    className="form-control logininput"
                    placeholder="Enter Password"
                  ></input>
                </div>
              </div>
              <div className="mt-4">
                <div className="input-group">
                  <span
                    className="input-icon d-flex jusify-content-center align-items-center"
                    style={{ marginRight: "5px" }}
                  >
                    <i className="fa fa-map-marker "></i>
                  </span>
                  <input
                    type="text"
                    className="form-control logininput"
                    placeholder="Enter Post-code"
                  ></input>
                </div>
              </div>
              <div className="mt-4">
                <div className="input-group">
                  <span
                    className="input-icon d-flex jusify-content-center align-items-center"
                    style={{ marginRight: "5px" }}
                  >
                    <i className="fa fa-address-card "></i>
                  </span>
                  <input
                    type="text"
                    className="form-control logininput"
                    placeholder="Enter Address"
                  ></input>
                </div>
              </div>
              <div className="mt-4">
              <label><i className="fa fa-user"></i> Select Role:</label>
                <select
                  className="form-control"
                  value={selectedRole}
                  onChange={handleRoleChange}
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
              <div className="mt-4">
                <button className="loginbutton" onClick={handleSubmit}>
                  Register
                </button>
              </div>
              {/* <div className="mt-2">
                Already have an account?{" "}
                <Link to="/loginpage">
                  <b style={{ color: "#6caddf", textDecoration: "underline" }}>
                    Sign In
                  </b>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;