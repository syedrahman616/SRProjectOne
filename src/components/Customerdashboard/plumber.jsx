import React,{useEffect, useState } from "react";
import Dashnavbar from "./customernavbar";
import Sidebar from "./customersidebar";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { Button } from "bootstrap";

function Plumber(){
    const [isPlumbersLinkActive, setIsPlumbersLinkActive] = useState(true);
    const [inviteshow, setinviteshow] = useState(false);

    const handleClose = () => {
      setinviteshow(false);
    };

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
          console.log('checking',response.data.data);
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
      setinviteshow(true);
    }


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
 
    <Modal show={inviteshow} onHide={handleClose} backdrop="static" keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          I will not close if you click outside me. Do not even try to press
          escape key.</p>
        </Modal.Body> 
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>

    
  </>
    )
}
export default Plumber;