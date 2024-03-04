import React,{useEffect, useState } from "react";
import Dashnavbar from "./customernavbar";
import Sidebar from "./customersidebar";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "bootstrap";

function Plumber(){
    const [isPlumbersLinkActive, setIsPlumbersLinkActive] = useState(true);
    const [show1, setShow1] = useState(false);
    const location = useLocation();
    const { state } = location;
    const jobId = state && state.id ? state.id : '';     

    const handleCloses1 = () => {
      setShow1(false);
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

    const apiurl = "https://plumbing.api.heptotechnologies.org/plumber/user/api/customer-plumber-details";
    const [plumberData, setPlumberData] = useState([]); 

    var token = localStorage.getItem('accessToken');

    const plumber= async() => {
      try{
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
        const response = await axios.get(apiurl,{headers});
        if(response.status===200){
          setPlumberData(response.data.data); 
        }
      }catch(error){
          console.log(error);
      }
    }

    useEffect(() =>{
      plumber();
    },[])

    //Invite Job

    const  jobInvite =(plumber) =>{
      setShow1(true);
      console.log(plumber);
      setFormData({
        id: plumber.id,
        plumberId: plumber.plumberId,
     });
    }

    //add invitation

    const handleSubmit = async (e) => {
      e.preventDefault();
      const flag="add";
      try {  
           const data = {
            plumberId: formData.plumberId,
            price: formData.price,
            jobId: jobId,
            description:formData.description,
            flag: flag,
          };
        
  
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
        const apiurl="https://plumbing.api.heptotechnologies.org/plumber/user/api/job-invitation";
        const response = await axios.post(apiurl, data,{headers});
  
        console.log(response.data);
        if (response.status === 200) {
          setShow1(false);
            setFormData({
              ...formData,
              inviteStatus: "success"
            });
        } else {
          console.error("Failed"); 
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };


    return(
        <>
    <Dashnavbar/>
    <div className="container-fluid" style={{ backgroundColor: 'rgb(248, 248, 248)', width: '100%', height: '100vh' }}>
      <div className="row dash_row">
      {formData.inviteStatus === "success" && (
              <div className="alert alert-success" role="alert">
              Invite sent successfully!
              </div>
            )}
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
                <p>Plumber Invitation</p>
              </div> 
            </div>

            <div className="table-responsive">
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                {plumberData.map((plumber, index) => (
                    <tr>
                    <th scope="row">{index + 1 }</th>
                    <td>{plumber.firstName}</td>
                    <td>{plumber.address}</td>
                    <td>{plumber.description}</td>
                    <td></td>
                    <td><button className="btn btn-primary" onClick={() => jobInvite(plumber)}>Invite</button></td>
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
          <input type="text" name="plumberId" value={formData.plumberId}  onChange={handleInputChange} className="form-control"></input>

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
export default Plumber;