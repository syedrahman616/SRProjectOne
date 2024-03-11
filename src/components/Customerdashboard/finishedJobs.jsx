import React, { useEffect,useState } from "react";
import Dashnavbar from "./customernavbar";
import Sidebar from "./customersidebar";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CustomerFinishedJobs()
{
    const [isPlumbersLinkActive, setIsPlumbersLinkActive] = useState(true);
    const [show1, setShow1] = useState(false);
   

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
                    <tr>
                    <th scope="row">{index + 1 }</th>
                    <td>{data.customerName}</td>
                    <td>{data.address}</td>
                    <td>{data.description}</td>
                    <td>{data.fixedPrice}</td>
                    <td>
                      {data.finished === 'false' ? (
                        <button className="btn btn-primary" onClick={() => finishForJobs(data.id)}>Verify</button>
                      ) : (
                        <button className="btn btn-success">Finished</button>
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
    ) 
}
export default CustomerFinishedJobs;