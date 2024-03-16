import React, { useEffect,useState } from "react";
import Dashnavbar from "./customernavbar";
import Sidebar from "./customersidebar";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function CustomerFinishedJobs()
{
    const [isPlumbersLinkActive, setIsPlumbersLinkActive] = useState(true);
    const [show1, setShow1] = useState(false);
    const [errors, setErrors] = useState({});
   
    const handleCloses1= () => {
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
      plumberId: "",
      description: "",
      rating:""
    });

    const apiurl = "https://plumbing.api.heptotechnologies.org/plumber/user/api/finished-customer-jobs";
    const [finishedjobData, setfinishedJobs] = useState([]); 

    var token = localStorage.getItem('accessToken');

    const finishedJobs= async() => {
      try{
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
        const response = await axios.get(apiurl,{headers});
        if(response.status===200){
            console.log(response.data.data);
          setfinishedJobs(response.data.data); 
        }
      }catch(error){
          console.log(error);
      }
    }

    useEffect(() =>{
        finishedJobs();
    },[])

    const finishForJobs = async (id) => {
      var token = localStorage.getItem('accessToken');
      const apiurl_finish = `https://plumbing.api.heptotechnologies.org/plumber/user/api/finished-customer?jobId=${id}`;
      
      try {
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
        const response = await axios.post(apiurl_finish, null, { headers });
        if (response.status === 200) {
          finishedJobs();
          setFormData({
            ...formData,
            jobfinishStatus: "success"
          });
        } else {
          console.log('Unexpected response:', response);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }

    const skillAdd =(data) =>{
      console.log(data);
      setShow1(true);
      setFormData({
        plumberId: data.plumberId,
        jobId: data.id
      });
    }   


    const handleSubmit = async (e) => {
      e.preventDefault();
     
      try {  
          const  data = {
            plumberId: formData.plumberId,
            jobId: formData.jobId,
            rating: formData.rating,           
           }
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
        const apiurl="https://plumbing.api.heptotechnologies.org/plumber/user/api/add-skill";
        const response = await axios.post(apiurl, data,{headers});
  
        if (response.status === 200) {
        
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
            setShow1(false);
            finishedJobs();
        } else {
          console.error("Failed");
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    };
    return(
        <>
    <Dashnavbar/>
    <div className="container-fluid" style={{ backgroundColor: 'rgb(248, 248, 248)', width: '100%', height: '100vh' }}>
      <div className="row dash_row">
      {formData.jobfinishStatus === "success" && (
              <div className="alert alert-success" role="alert">
              Job finished successfully!
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
                <p>Plumber Finished Job</p>
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
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>                    
                  </tr>
                </thead>
                <tbody>
                {finishedjobData.map((data, index) => (
                    <tr key={data.id}>
                    <th scope="row">{index + 1 }</th>
                    <td>{data.customerName}</td>
                    <td>{data.address}</td>
                    <td>{data.description}</td>
                    <td>{data.fixedPrice}</td>
                    <td>
                      {data.finished ? (
                        <button className="btn btn-primary" onClick={() => finishForJobs(data.id)}>Verify</button>
                      ) : (
                        <button className="btn btn-success">Finished</button>
                      )}
                      <button className="btn  btn-secondary" onClick={() =>skillAdd(data)}>Add Skill</button>
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
 
    <Modal show={show1} dialogClassName="example-dialog26" contentClassName="example-content26" onHide={handleCloses1} centered>
      <Modal.Body style={{ margin: '0', padding: '0' }}>
        <div className="modalpad">
          <h5>Rating:</h5>
          <div className="mt-3">
            <div className="row">
            <div className="col-6">
              <label className="mb-2">Rating Skill:</label>
              <input type="text" name="rating" value={formData.rating} onChange={handleInputChange} className="form-control"></input>
              {errors.rating && <div className="text-danger">{errors.rating}</div>}
            </div>
            </div>
          </div>
        
          <div className="d-flex justify-content-end mt-3 align-items-center">
            <button className="modalclose me-3" onClick={handleCloses1}>Cancel</button>
            <button className="modalsave" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  </>
    ) 
}
export default CustomerFinishedJobs;