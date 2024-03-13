import React, { useState, useEffect } from "react";
import Dashnavbar from "./dashnavbar";
import Sidebar from "./dashsidebar";
import Modal from "react-bootstrap/Modal";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

function AdminQuotes() {
  const [show1, setShow1] = useState(false);
  const [jobs, setJobs] = useState([]); // State to hold jobs
  const [statusFilter, setStatusFilter] = useState("All"); // Default filter
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

  // Function to handle applying for a job
  const applyForJob = (jobId) => {
    console.log(`Applied for job with ID: ${jobId}`);
  };
  
  const handleCloses1 = () => {
    setShow1(false);
  };

  const addnew_plumber = () => {
    setShow1(true);
  };


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      job.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.plumbingIssue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.startDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      statusFilter === "All" ||
      job.status === statusFilter
    );
  });

  const apiurl = "https://plumbing.api.heptotechnologies.org/plumber/user/api/get-admin-quotes";
  const [adminjobqutoes, setAdminQutoes] = useState([]); 

  var token = localStorage.getItem('accessToken');


  const adminquotes = async() => {
    try{
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      const response = await axios.get(apiurl,{headers});
      if(response.status===200){
        setAdminQutoes(response.data.data); 
        console.log('checking',response.data.data);
      }
    }catch(error){
        console.log(error);
    }
  }

  useEffect(() =>{
    adminquotes();
  },[])

  return (
    <>
      <Dashnavbar />
      <div
        className="container-fluid dashboard-container"
        style={{
          backgroundColor: "rgb(248, 248, 248)",
          height: "100vh",
        }}
      >
        <div className="row dash_row">
          <div className="col-3 col_corr_2">
            {/* Pass a function to update the active link */}
            <Sidebar />
          </div>
          <div className="col-9 col_corr_1 ">
            <div className="dashmain">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center ">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <div className="ml-5">
                    <select
                      className="form-select custom-width"
                      value={statusFilter}
                      onChange={(e) => handleStatusFilterChange(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="table-responsive plumber-jobs">
                {/* Table of plumbers */}
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Plumber Name</th>
                      <th scope="col">Plumbing Issue</th>
                      <th scope="col">Description</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>

                  {adminjobqutoes.map((qutoes, index) => (
                    
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{qutoes.customerName}</td>
                        <td>{qutoes.plumberName}</td>
                        <td>{qutoes.jobTitle}</td>
                        <td>{qutoes.description}</td>
                       
                        <td>{qutoes.price}</td>
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
        <Modal.Body style={{ margin: "0", padding: "0" }}>
          <div className="modalpad">
            <h5>Add New Plumber</h5>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AdminQuotes;
