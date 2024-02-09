import React, { useState } from "react";
import Dashnavbar from "./plumbernavbar";
import Sidebar from "./plumbersidebar";

function Dashcustomerjobs() {
  const [isPlumbersLinkActive, setIsPlumbersLinkActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [prices, setPrices] = useState({});
  const [offers, setOffers] = useState({});
  const [assignedJobs, setAssignedJobs] = useState({});

  const [jobs, setJobs] = useState([
    // Sample job data
    { id: 1, customerName: "John Doe", plumbingIssue: "Leaky faucet", description: "The faucet in the kitchen is leaking.", plumber: null },
    { id: 2, customerName: "Jane Smith", plumbingIssue: "Clogged drain", description: "The bathroom sink drain is clogged.", plumber: null },
  ]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handlePriceChange = (jobId, price) => {
    setPrices({ ...prices, [jobId]: price });
  };

  const handleOfferChange = (jobId, offer) => {
    setOffers({ ...offers, [jobId]: offer });
  };

  const applyForJob = (jobId) => {
    console.log("Applied for job:", jobId);
    // Add logic here to handle applying for the job
    // Once the job is assigned to the plumber, update the jobs state to reflect the assignment
    const job = jobs.find(job => job.id === jobId);
    if (job && !assignedJobs[job.customerName]) {
      const updatedJobs = jobs.map(j => {
        if (j.id === jobId) {
          return { ...j, plumber: "Assigned plumber" };
        }
        return j;
      });
      setJobs(updatedJobs);
      setAssignedJobs({ ...assignedJobs, [job.customerName]: true });
    }
  };

  return (
    <>
      <Dashnavbar />
      <div className="container-fluid" style={{ backgroundColor: "rgb(248, 248, 248)", width: "100%", height: "100vh" }}>
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
              <div className="table-responsive">
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Plumbing Issue</th>
                      <th scope="col">Description</th>
                      <th scope="col">Price</th>
                      <th scope="col">Offer</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{job.customerName}</td>
                        <td>{job.plumbingIssue}</td>
                        <td>{job.description}</td>
                        <td>
                          <input
                            type="text"
                            value={prices[job.id] || ""}
                            onChange={(e) => handlePriceChange(job.id, e.target.value)}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={offers[job.id] || ""}
                            onChange={(e) => handleOfferChange(job.id, e.target.value)}
                            className="form-control"
                          />
                        </td>
                        <td>
                          {job.plumber ? (
                            <span>Assigned to: {job.plumber}</span>
                          ) : (
                            <button onClick={() => applyForJob(job.id)} className="btn btn-primary">Apply</button>
                          )}
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
    </>
  );
}

export default Dashcustomerjobs;
