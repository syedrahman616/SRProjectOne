import React from "react";
import Img5 from "../../assets/women/download.png";
function PlumberNavbar() {
  return (
    <>
      <nav className="nav100">
        <div className="nav-left">
          <img src={Img5}></img>
        </div>
        <div className="nav-right">
          <div className="mr-3">
            <i
              className="fa fa-bell mt-1"
              style={{ fontSize: "23px", color: "black" }}
            ></i>
          </div>
          <div className="d-flex justify-content-center align-items-center mr-3">
            <i
              className="fa fa-user-circle-o mr-1"
              style={{ fontSize: "23px", color: "black" }}
            ></i>

            <p className="mb-0 navpro_name">Jone Doe</p>
          </div>
        </div>
      </nav>
    </>
  );
}
export default PlumberNavbar;
