import React, { useState } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";

function CustomerSidebar() {
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
      <div className={`bar-icon ${sidebarVisible ? "active" : ""}`} onClick={toggleSidebar}>
        <i className="fa fa-bars" style={{ fontSize: "24px", color: "black" }} />
      </div>

      <aside className={`aside100 ${sidebarVisible ? "visible" : ""}`}>
        <ul className="dashside_ul">
          <li className={location.pathname === "/customer/dashboard" ? "active-link" : ""}>
            <Link to="/customerdashboard" className={location.pathname === "/customerdashboard" ? "active-link" : ""}>
              <i className={`fa fa-dashboard${location.pathname === "/customerdashboard" ? " active-link" : ""}`} />
              Dashboard
            </Link>
          </li>
          <li onClick={() => toggleDropdown("customers")} className={`dropdown ${activeDropdown === "customers" ? "active-link" : ""}`}>
            <div>
              <i className={`fa fa-users${activeDropdown === "customers" ? " active-link" : ""}`} />
              Jobs
              <i className={`fa fa-caret-down`} />
            </div>
          </li>
          {activeDropdown === "customers" && (
            <li>
              <Link to="/customer/jobslist"><i className="fa fa-address-card" />Job</Link>
            </li>
          )}
          <li onClick={() => toggleDropdown("plumbers")} className={`dropdown ${activeDropdown === "plumbers" ? "active-link" : ""}`}>
            <div>
              <i className={`fa fa-wrench ${activeDropdown === "plumbers" ? " active-link" : ""}`} />
              Plumbers
              <i className={`fa fa-caret-down`} />
            </div>
          </li>
          {activeDropdown === "plumbers" && (
            <>
              <li>
                <Link to="/customer/plumbers"><i className="fa fa-user" /> Plumber Detail</Link>
              </li>
            </>
          )}
          <li className={location.pathname === "#" ? "active-link" : ""} onClick={logOut}>
              <i className={`fa fa-sign-out${location.pathname === "#" ? " active-link" : ""}`} />
              Logout
          </li>
        </ul>
      </aside>
    </>
  );
}

export default CustomerSidebar;
