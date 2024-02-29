import React,{useEffect, useState } from "react";
import Dashnavbar from "./customernavbar";
import Sidebar from "./customersidebar";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function Plumber(){
    const [isPlumbersLinkActive, setIsPlumbersLinkActive] = useState(true);

    return(
        <>
    <Dashnavbar/>
    <div className="container-fluid" style={{ backgroundColor: 'rgb(248, 248, 248)', width: '100%', height: '100vh' }}>
      <div className="row dash_row">
        <div className="col-3 col_corr_2">
          <Sidebar activelink={isPlumbersLinkActive} />
        </div>
        <div className="col-9 col_corr_1">
       
          <div className="dashmain">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">                
              </div>
             
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                {/* <button className="dashaddbutton" >Add new</button> */}
              </div> 
            </div>

            <div className="table-responsive">
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Plumbing Issue</th>
                    <th scope="col">Address</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </>
    )
}
export default Plumber;