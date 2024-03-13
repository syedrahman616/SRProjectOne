import React, { useState ,useEffect} from "react";
import Dashnavbar from "./plumbernavbar";
import Sidebar from "./plumbersidebar";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';


function Dashcustomerjobs() {
  const [isPlumbersLinkActive, setIsPlumbersLinkActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [prices, setPrices] = useState({});
  const [offers, setOffers] = useState({});
  const [assignedJobs, setAssignedJobs] = useState({});

  const [show1, setShow1] = useState(false);

  const handleCloses1 = () => {
    setShow1(false);
  };

  
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [formData, setFormData] = useState({
    price: "",
    description: "",
    plumberId:"",
    flag:""
  });

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

  //send Quotes

  const  applyForJob =(jobs) =>{
    setShow1(true);
    console.log(jobs);
    setFormData({
      id: jobs.id,
   });
  }
   
 

  const finishForJobs = async (jobId) => {
    var token = localStorage.getItem('accessToken');
    const apiurl_finish = `https://plumbing.api.heptotechnologies.org/plumber/user/api/finished-plumber?jobId=${jobId}`;
    
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      const response = await axios.post(apiurl_finish, null, { headers });
      if (response.status === 200) {
        invitejobs();
        setFormData({
          ...formData,
          jobfinishStatus: "success"
        });
        console.log(response);
      } else {
        console.log('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action="invitation";
    try {  
         const data = {
          id: formData.id,
          startDate:formData.startDate,
          endDate:formData.endDate,
          action:action,
        };
      

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      const apiurl="https://plumbing.api.heptotechnologies.org/plumber/user/api/job-accept";
      const response = await axios.post(apiurl, data,{headers});

      console.log(response.data);
      if (response.status === 200) {
        setShow1(false);
          setFormData({
            ...formData,
            qutoesStatus: "success"
          });
      } else {
        console.error("Failed"); 
      }
    } catch (error) {
      console.error("Error:", error);
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
                <p>Invite Jobs</p>
                <table className="table table-bordered mt-3">
                  <thead>
                    
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Plumbing Issue</th>
                      <th scope="col">Description</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {inviteJobs.filter(job => job.accept === false).map((jobs, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{jobs.customerName}</td>
                        <td>{jobs.jobTitle}</td>
                        <td>{jobs.description}</td>
                       
                        <td>
                       
                            <button onClick={() => applyForJob(jobs)} className="btn btn-primary">Apply</button>
                            <button onClick={() => finishForJobs(jobs.jobId)} className="btn btn-primary">Finish</button>
                         
                        </td>
                      </tr>
                     //)
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show1} dialogClassName="example-dialog26" contentClassName="example-content26" onHide={handleCloses1} centered>
      <Modal.Body style={{ margin: '0', padding: '0' }}>
        <div className="modalpad">
          <h5>Add Rate</h5>
        
          <div className="mt-3">
            <div className="row">
              <div className="col-6">
                <label className="mb-2">Start Date:</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="form-control"></input>
              </div>
              <div className="col-6">
                <label className="mb-2">End Date:</label>
                <input type="date" name="endDate" value={formData.endDate}  onChange={handleInputChange} className="form-control"></input>
              </div>
            </div>
          </div>
          <input type="hidden" name="id" value={formData.jobId}  onChange={handleInputChange} className="form-control"></input>
          <div className="d-flex justify-content-end mt-3 align-items-center">
            <button className="modalclose me-3">Cancel</button>
            <button className="modalsave" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </Modal.Body>
       </Modal>
    </>
  );
}

export default Dashcustomerjobs;
