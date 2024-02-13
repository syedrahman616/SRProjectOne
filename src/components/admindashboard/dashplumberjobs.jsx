import React, { useState, useEffect } from "react";
import Dashnavbar from "./dashnavbar";
import Sidebar from "./dashsidebar";
import Modal from "react-bootstrap/Modal";
import { BsSearch } from "react-icons/bs";

function DashPlumberJobs() {
  const [show1, setShow1] = useState(false);
  const [jobs, setJobs] = useState([]); // State to hold jobs
  const [statusFilter, setStatusFilter] = useState("All"); // Default filter
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

  // Function to handle applying for a job
  const applyForJob = (jobId) => {
    console.log(`Applied for job with ID: ${jobId}`);
  };
  const fetchJobs = () => {
    const fetchedJobs = [
      {
        id: 1,
        customerName: "John Doe",
        address: "123 Main St",
        plumbingIssue: "Leaky faucet",
        description: "The faucet in the kitchen is leaking.",
        startDate: "2024-02-08",
        status: "Pending",
      },
      {
        id: 2,
        customerName: "Jane Smith",
        address: "456 Elm St",
        plumbingIssue: "Clogged drain",
        description: "The bathroom sink drain is clogged.",
        startDate: "2024-02-10",
        status: "In Progress",
      },
    ];
    setJobs(fetchedJobs);
  };
  useEffect(() => {
    fetchJobs();
  }, []);

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
                      <th scope="col">Address</th>
                      <th scope="col">Plumbing Issue</th>
                      <th scope="col">Description</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody >
                    {filteredJobs.map((job, index) => (
                      <tr key={job.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{job.customerName}</td>
                        <td>{job.address}</td>
                        <td>{job.plumbingIssue}</td>
                        <td>{job.description}</td>
                        <td>{job.startDate}</td>
                        <td>{job.status}</td>
                        <td className="action-table">
                          <button className="btn btn-primary" title="View">
                            View <i className="fa fa-eye"></i>
                          </button>
                          <button className="mt-2 btn btn-warning me-2" title="Edit">
                            Edit <i className="fa fa-edit"></i>
                          </button>
                          <button className="mt-2 btn btn-danger flex items-center" title="Delete">
                            Delete <i className="fa fa-trash ml-1"></i>
                          </button>
                        </td>
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

export default DashPlumberJobs;
