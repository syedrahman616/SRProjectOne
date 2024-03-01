import React, { useState } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";

function PlumberSidebar() {
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
          <li className={location.pathname === "/plumberdashboard" ? "active-link" : ""}>
            <Link to="/plumberdashboard" className={location.pathname === "/plumberdashboard" ? "active-link" : ""}>
              <i className={`fa fa-dashboard${location.pathname === "/dashboard" ? " active-link" : ""}`} />
            Dashboard
            </Link>
          </li>
          <li className={location.pathname === "/plumberprofile" ? "active-link" : ""}>
            <Link to="/plumberjobsdetail" className={location.pathname === "/plumberprofile" ? "active-link" : ""}>
              <i className={`fa fa-user-o${location.pathname === "/plumberprofile" ? " active-link" : ""}`} />
               Plumber Profile
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
                className={`fa fa-folder-open-o ${
                  activeDropdown === "plumbers" ? " active-link" : ""
                }`}
              />
              Job
              <i className={`fa fa-caret-down`} />
            </div>
          </li>
          {activeDropdown === "plumbers" && (
            <>
            <li>
              <Link to="/plumber/alljobs" >
                <i className="fa fa-file-code-o" /> All Jobs
              </Link>
            </li>
            <li>
              <Link to="/plumber/invitejobs" >
                <i className="fa fa-list-alt"/> Invite Jobs
              </Link>
            </li>
            <li>
              <Link to="/plumberdetails" >
                <i className="fa fa-address-card-o" /> Finished Jobs
              </Link>
            </li>
            </>            
          )}

        
          <li className={location.pathname === "/loginpage" ? "active-link" : ""} onClick={logOut}>
              <i className={`fa fa-sign-out${location.pathname === "/loginpage" ? " active-link" : ""}`} />
              Log Out
          </li>
 
         
        </ul>
      </aside>
    </>
  );
}

export default PlumberSidebar;
