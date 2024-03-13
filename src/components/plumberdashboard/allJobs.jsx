import React,{useEffect, useState } from "react";
import Dashnavbar from "./plumbernavbar";
import Sidebar from "./plumbersidebar";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";



function AllJobs(){
    const [isPlumbersLinkActive, setIsPlumbersLinkActive] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
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

    const apiurl = "https://plumbing.api.heptotechnologies.org/plumber/user/api/all-jobs";
    const [plumberjobsData, setJobs] = useState([]); 
  
    var token = localStorage.getItem('accessToken');
    
    const alljobs= async() => {
      try{
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
        const response = await axios.get(apiurl,{headers});
        if(response.status===200){
            console.log(response.data.data);
            setJobs(response.data.data); 
        }
      }catch(error){
          console.log(error);
      }
    }
  
    useEffect(() =>{
      alljobs();
    },[])

     //send Quotes

     const  sendQuotes =(jobs) =>{
      setShow1(true);
      setFormData({
        jobId: jobs.id,
     });
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const flag="add";
      try {  
           const data = {
            jobId: formData.jobId,
            price: formData.price,
            description:formData.description,
            flag: flag,
            startDate:formData.startDate,
            endDate:formData.endDate,

          };
        
  
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
        const apiurl="https://plumbing.api.heptotechnologies.org/plumber/user/api/plumber-quotes";
        const response = await axios.post(apiurl, data,{headers});
  
        console.log(response.data);
        if (response.status === 200) {
          setShow1(false);
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            backgroundColor:'green'
          }); 
        } else {
          console.error("Failed"); 
        }
      } catch (error) {
        console.error("Error:", error);
        const message=error.response.data.error.description;
          if(error.response.status === 422){
            setShow1(false);
            toast.error(error.response.data.error.description, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              backgroundColor:'green'
            }); 

          }
      }
    };

    return(
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
                  <p>All Jobs</p>
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
                    {plumberjobsData.map((jobs, index) => (
                      <tr>
                      <th scope="row">{index + 1 }</th>
                      <td>{jobs.customerName}</td>
                      <td>{jobs.jobTitle}</td>
                      <td>{jobs.description}</td>
                      <td><button onClick={() => sendQuotes(jobs)} className="btn btn-success">Send Notify</button></td>
                    </tr>
  
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
                <label className="mb-2">Price:</label>
                <input type="text" name="price" value={formData.price} onChange={handleInputChange} className="form-control"></input>
              </div>
              <div className="col-6">
                <label className="mb-2">Description:</label>
                <input type="text" name="description" value={formData.description}  onChange={handleInputChange} className="form-control"></input>
              </div>
            </div>
          </div>
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
          <input type="hidden" name="jobId" value={formData.jobId}  onChange={handleInputChange} className="form-control"></input>

          <div className="d-flex justify-content-end mt-3 align-items-center">
            <button className="modalclose me-3">Cancel</button>
            <button className="modalsave" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </Modal.Body>
       </Modal>
      </>
    )
}
export default AllJobs;