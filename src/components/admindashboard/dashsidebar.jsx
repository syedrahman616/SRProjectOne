import React, { useState } from "react";
import { Link,useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
    {/* <Dashnavbar/> */}
      <div className={`bar-icon ${sidebarVisible ? "active" : ""}`} onClick={toggleSidebar}>
        {/* Bar icon here */}
        <i className="fa fa-bars" style={{ fontSize: "24px", color: "black" }} />
      </div>

      <aside className={`aside100 ${sidebarVisible ? "visible" : ""}`}>
        <ul className="dashside_ul">
          <li className={location.pathname === "/dashboard" ? "active-link" : ""}>
            <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active-link" : ""}>
            <i className={`fa fa-dashboard${location.pathname === "/dashboard" ? " active-link" : ""}`} />
            Dashboard</Link>
          </li>
          <li className={location.pathname === "/plumber" ? "active-link" : ""}>
            <Link to="/plumber" className={location.pathname === "/plumber" ? "active-link" : ""}>
            <i className={`fa fa-wrench${location.pathname === "/plumber" ? " active-link" : ""}`}/>
            Plumbers</Link>
          </li>
          <li className={location.pathname === "/review" ? "active-link" : ""}>
            <Link to="/review" className={location.pathname === "/review" ? "active-link" : ""}>
            <i className={`fa fa-star${location.pathname === "/review" ? " active-link" : ""}`}/>
            Review & Ratings</Link>
          </li>
          <li className={location.pathname === "/customer" ? "active-link" : ""}>
            <Link to="/customer" className={location.pathname === "/customer" ? "active-link" : ""}>
            <i className={`fa fa-users${location.pathname === "/customer" ? " active-link" : ""}`}/>
            Customers</Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
