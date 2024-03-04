import React, { useState ,useEffect} from "react";
import Dashnavbar from "./plumbernavbar";
import Sidebar from "./plumbersidebar";
import axios from "axios";

function Dashcustomerjobs() {
  const [isPlumbersLinkActive, setIsPlumbersLinkActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [prices, setPrices] = useState({});
  const [offers, setOffers] = useState({});
  const [assignedJobs, setAssignedJobs] = useState({});

  
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

  //get invitetion jobs
  const apiurl = "https://plumbing.api.heptotechnologies.org/plumber/user/api/plumber-job-invitation";
  const [inviteJobs, setInviteJobs] = useState([]); 
  var token = localStorage.getItem('accessToken');

  const invitejobs= async() => {
    try{
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      const response = await axios.get(apiurl,{headers});
      if(response.status===200){
        console.log(response.data.data);
        setInviteJobs(response.data.data); 
      }
    }catch(error){
        console.log(error);
    }
  }

  useEffect(() =>{
    invitejobs();
  },[])

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
                  {inviteJobs.map((jobs, index) => (

                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{jobs.customerName}</td>
                        <td>{jobs.jobTitle}</td>
                        <td>{jobs.description}</td>
                        <td>
                          <input
                            type="text"
                            value={prices[jobs.id] || ""}
                            onChange={(e) => handlePriceChange(jobs.id, e.target.value)}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={offers[jobs.id] || ""}
                            onChange={(e) => handleOfferChange(jobs.id, e.target.value)}
                            className="form-control"
                          /> 
                        </td>
                        <td>
                          {jobs.plumber ? (
                            <span>Assigned to: {jobs.plumber}</span>
                          ) : (
                            <button onClick={() => applyForJob(jobs.id)} className="btn btn-primary">Apply</button>
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
