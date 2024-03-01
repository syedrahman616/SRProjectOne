import React, { useState } from "react";
import { Link, useLocation , useNavigate} from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  //...logout...//

  const logOut =() =>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    navigate('/');
  }

  return (
    <>
      <div
        className={`bar-icon ${sidebarVisible ? "active" : ""}`}
        onClick={toggleSidebar}
      >
        <i
          className="fa fa-bars"
          style={{ fontSize: "24px", color: "black" }}
        />
      </div>

      <aside className={`aside100 ${sidebarVisible ? "visible" : ""}`}>
        <ul className="dashside_ul">
          <li
            className={location.pathname === "/dashboard" ? "active-link" : ""}
          >
            <Link
              to="/dashboard"
              className={
                location.pathname === "/dashboard" ? "active-link" : ""
              }
            >
              <i
                className={`fa fa-dashboard${
                  location.pathname === "/dashboard" ? " active-link" : ""
                }`}
              />
              Dashboard
            </Link>
          </li>
          <li
            className={
              location.pathname === "/admin/plumberjobs" ? "active-link" : ""
            }
          >
            <Link
              to="/admin/plumberjobs"
              className={
                location.pathname === "/admin/plumberjobs" ? "active-link" : ""
              }
            >
              <i
                className={`fa fa-briefcase${
                  location.pathname === "/admin/plumberjobs" ? " active-link" : ""
                }`}
              />
              Plumber Orders
            </Link>
          </li>
          <li
            onClick={() => toggleDropdown("plumbers")}
            className={`dropdown ${
              activeDropdown === "plumbers" ? "active-link" : ""
            }`}
          >
            <div>
              <i
                className={`fa fa-wrench ${
                  activeDropdown === "plumbers" ? " active-link" : ""
                }`}
              />
              Plumbers
              <i className={`fa fa-caret-down`} />
            </div>
          </li>
          {activeDropdown === "plumbers" && (
            <li>
              <Link to="/admin/plumberdetails" >
                <i className="fa fa-user" /> Plumber Detail
              </Link>
            </li>
          )}

          <li
            onClick={() => toggleDropdown("customers")}
            className={`dropdown ${
              activeDropdown === "customers" ? "active-link" : ""
            }`}
          >
            <div>
              <i
                className={`fa fa-users${
                  activeDropdown === "customers" ? " active-link" : ""
                }`}
              />
              Customers
              <i className={`fa fa-caret-down`} />
            </div>
          </li>
          {activeDropdown === "customers" && (
            <>
              <li>
                <Link to="/admin/customer">
                  <i className="fa fa-address-card" /> Customer Details
                </Link>
              </li>
              <li>
                <Link to="/admin/customerjobs">
                  <i className="fa fa-shopping-cart" /> Customer Jobs
                </Link>
              </li>
            </>
          )}
          <li className={location.pathname === "/review" ? "active-link" : ""}>
            <Link
              to="/review"
              className={location.pathname === "/review" ? "active-link" : ""}
            >
              <i
                className={`fa fa-star${
                  location.pathname === "/review" ? " active-link" : ""
                }`}
              />
              Review & Ratings
            </Link>
          </li>
          <li
            className={location.pathname === "/loginpage" ? "active-link" : ""}  onClick={logOut}
          >
            
              <i
                className={`fa fa-sign-out${
                  location.pathname === "/loginpage" ? " active-link" : ""
                }`}
              />
              Log Out
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
