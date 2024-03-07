import React, { useState,useEffect } from "react";
import Dashnavbar from "./dashnavbar";
import Sidebar from "./dashsidebar";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function Dashcustomerjobs() {
  const [show1, setShow1] = useState(false);
  const [isPlumbersLinkActive, setIsPlumbersLinkActive] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All"); // Default filter
  const [searchQuery, setSearchQuery] = useState("");

  const handleCloses1 = () => {
    setShow1(false);
  };
 

  const addnew_plumber = () => {
    setShow1(true);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const apiurl = "https://plumbing.api.heptotechnologies.org/plumber/user/api/admin-jobs";
  const [adminJobs, setAdminJobs] = useState([]); 

  var token = localStorage.getItem('accessToken');


  const adminjobs = async() => {
    try{
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      const response = await axios.get(apiurl,{headers});
      if(response.status===200){
        setAdminJobs(response.data.data); 
      }
    }catch(error){
        console.log(error);
    }
  }

  useEffect(() =>{
     adminjobs();
  },[])


  return (
    <>
      <Dashnavbar />
      <div
        className="container-fluid"
        style={{
          backgroundColor: "rgb(248, 248, 248)",
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="row dash_row">
          <div className="col-3 col_corr_2">
            <Sidebar activelink={isPlumbersLinkActive} />
          </div>
          <div className="col-9 col_corr_1">
            <div className="dashmain">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <button className="dashaddbutton" onClick={addnew_plumber}>
                    Add new
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Plumbing Issue</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                  {adminJobs.map((job, index) => (

                      <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td>{job.address}</td>
                        <td>{job.jobTitle}</td>
                        <td>{job.description}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show1}
        dialogClassName="example-dialog26"
        contentClassName="example-content26"
        onHide={handleCloses1}
        centered
      >
        <Modal.Body style={{ margin: '0', padding: '0' }}>
          <div className="modalpad">
            <h5>Add Customer Order</h5>
            <div className="mt-3">
              <label className="mb-2">Enter Name:</label>
              <input type="text" className="form-control"></input>
            </div>
            <div className="mt-3">
              <label className="mb-2">Enter Address:</label>
              <input type="text" className="form-control"></input>
            </div>
            <div className="mt-3">
              <label className="mb-2">Enter Plumbing Issue:</label>
              <input type="text" className="form-control"></input>
            </div>
            <div className="mt-3">
              <label className="mb-2">Enter Description:</label>
              <textarea className="form-control"></textarea>
            </div>
            <div className="d-flex justify-content-end mt-3 align-items-center">
              <button className="modalclose me-3">Cancel</button>
              <button className="modalsave">Save</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Dashcustomerjobs;
