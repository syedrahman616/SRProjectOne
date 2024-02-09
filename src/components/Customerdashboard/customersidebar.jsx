import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function CustomerSidebar() {
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      <div className={`bar-icon ${sidebarVisible ? "active" : ""}`} onClick={toggleSidebar}>
        <i className="fa fa-bars" style={{ fontSize: "24px", color: "black" }} />
      </div>

      <aside className={`aside100 ${sidebarVisible ? "visible" : ""}`}>
        <ul className="dashside_ul">
          <li className={location.pathname === "/customerdashboard" ? "active-link" : ""}>
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
            {activeDropdown === "customers" && (
              <>
                <li>
                  <Link to="/customerjobslist"><i className="fa fa-address-card" />Job</Link>
                </li>
                {/* <li>
                  <Link to="#"><i className="fa fa-shopping-cart" /> Customer Orders</Link>
                </li> */}
              </>
            )}
          </li>
          <li onClick={() => toggleDropdown("plumbers")} className={`dropdown ${activeDropdown === "plumbers" ? "active-link" : ""}`}>
            <div>
              <i className={`fa fa-wrench ${activeDropdown === "plumbers" ? " active-link" : ""}`} />
              Plumbers
              <i className={`fa fa-caret-down`} />
            </div>
            {activeDropdown === "plumbers" && (
              <>
                <li>
                  <Link to="/plumbers"><i className="fa fa-user" /> Plumber Detail</Link>
                </li>
                <li>
                  <Link to="/plumberdetails"><i className="fa fa-briefcase" /> Plumber Jobs</Link>
                </li>
              </>
            )}
          </li>
          
          <li className={location.pathname === "#" ? "active-link" : ""}>
            <Link to="#" className={location.pathname === "#" ? "active-link" : ""}>
              <i className={`fa fa-sign-out${location.pathname === "#" ? " active-link" : ""}`} />
              Logout
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default CustomerSidebar;
