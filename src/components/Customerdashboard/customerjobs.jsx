import React, { useEffect,useState } from "react";
import Dashnavbar from "./customernavbar";
import Sidebar from "./customersidebar";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";


function Customerjobs(){
  const [show1, setShow1] = useState(false);
  const [editshow, seteditshow] = useState(false);
  const [viewshow, setviewshow] = useState(false);
  const [isPlumbersLinkActive, setIsPlumbersLinkActive] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All"); // Default filter
  const [jobId, setJobId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const handleCloses1 = () => {
    setShow1(false);
  };

  const handleCloses2 = () => {
    seteditshow(false);
  };

  const handleCloses3 = () => {
    setviewshow(false);
  };

  const addnew_plumber = () => {
    setShow1(true);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };


  //get Jobs//
 
  const apiurl = "https://plumbing.api.heptotechnologies.org/plumber/user/api/customer-jobs";
  const [customerjobsData, setCustomerjobData] = useState([]); 

  var token = localStorage.getItem('accessToken');

  const customerjobs= async() => {
    try{
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      const response = await axios.get(apiurl,{headers});
      if(response.status===200){
        setCustomerjobData(response.data.data); 
      }
    }catch(error){
        console.log(error);
    }
  }

  useEffect(() =>{
    customerjobs();
  },[])

  //add new jobs and edit function

  const [formData, setFormData] = useState({
    jobTitle:"",
    address: "",
    description: "",
    postCode: "",
    flag:""
  });


   const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const image1='test';
      const image2='test';
      const vedio='testing';
      const flag=formData.flag;
      console.log(flag);
      let data;
      if(flag == 'add')
      {
         data = {
          address: formData.address,
          jobTitle: formData.jobTitle,
          postCode: formData.postcode,
          description:formData.description,
          image1: image1,
          image2: image2,
          vedio: vedio,
          flag: flag,
        };
      }
      else
      {
         data = {
                    address: formData.address,
                    jobTitle: formData.jobTitle,
                    postCode: formData.postcode,
                    description:formData.description,
                    customerId:formData.customerId,
                    id:formData.id,
                    image1: image1,
                    image2: image2,
                    vedio: vedio,
                    flag: flag,
         };
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      const apiurl="https://plumbing.api.heptotechnologies.org/plumber/user/api/add-job";
      const response = await axios.post(apiurl, data,{headers});

      console.log(response.data);
      if (response.status === 200) {
        setShow1(false);
        customerjobs();
        if(response.data.message=='Edited Successfully')
        {
          setFormData({
            ...formData,
            jobEditStatus: "success"
          });

        }
        else
        {
          setFormData({
            ...formData,
            jobStatus: "success"
          });
        }
      } else {
        console.error("Failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  //end

  //...Delete Function...//

  const deleteJob = async(id) => {
    setJobId(id);
    const apiurl_delete = "https://plumbing.api.heptotechnologies.org/plumber/user/api/add-job";
    const flag ='delete';
    try{
      const data = {
        id: id,
        flag: flag,
      };
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      const response = await axios.post(apiurl_delete,data,{headers});
      if(response.status===200){
        customerjobs();
        setFormData({
          ...formData,
          jobDeleteStatus: "success"
        });
        console.log(response);
      }
    }catch(error){
        console.log(error);
    }
  };

  //Edit job details get//

  const editJob =(jobs) =>{
    seteditshow(true);
    const flag2='edit';
    setFormData({
      jobTitle: jobs.jobTitle,
      address: jobs.address,
      postCode: jobs.postCode,
      id: jobs.id,
      description: jobs.description,
      customerId: jobs.customerId,
      flag:flag2
    });
  }

  //View job details here

  const viewJob =(jobs) =>{
    setviewshow(true);
    setFormData({
      jobTitle: jobs.jobTitle,
      address: jobs.address,
      postCode: jobs.postCode,
      id: jobs.id,
      description: jobs.description,
      customerId: jobs.customerId,
   });
  }
  
  


  return (
    <>
    <Dashnavbar/>
    <div className="container-fluid" style={{ backgroundColor: 'rgb(248, 248, 248)', width: '100%', height: '100vh' }}>
      <div className="row dash_row">
        <div className="col-3 col_corr_2">
          <Sidebar activelink={isPlumbersLinkActive} />
        </div>
        <div className="col-9 col_corr_1">
        {formData.jobStatus === "success" && (
              <div className="alert alert-success" role="alert">
                Jobs added successfully!
              </div>
            )}
            {formData.jobEditStatus === "success" && (
              <div className="alert alert-success" role="alert">
                Updated successfully!
              </div>
            )}
             {formData.jobDeleteStatus === "success" && (
              <div className="alert alert-success" role="alert">
                Jobs Deleted successfully!
              </div>
            )}
          <div className="dashmain">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">                
              </div>
             
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <button className="dashaddbutton" onClick={addnew_plumber}>Add new</button>
              </div> 
            </div>

            <div className="table-responsive">
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Plumbing Issue</th>
                    <th scope="col">Address</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                {customerjobsData.map((jobs, index) => (

                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{jobs.jobTitle}</td>
                    <td>{jobs.address}</td>
                    <td>{jobs.description}</td>
                    <td>
                      <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => handleStatusFilterChange(e.target.value)}
                      >
                        <option value="Active">Active</option>
                        <option valu e="Inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="flex-column gap-2">
                      <button className="view" onClick = {() => viewJob(jobs)}>View<i className="fa fa-file" style={{ marginLeft:'6px',fontSize:'16px' }}></i></button>
                      <button className="view view-yellow" onClick = {() => editJob(jobs)}>Edit<i className="fa fa-edit " style={{ marginLeft:'6px',fontSize:'16px' }}></i></button>
                      <button className="view view-red" onClick={() => deleteJob(jobs.id)}>Delete<i className="fa fa-trash  " style={{ marginLeft:'6px',fontSize:'16px' }}></i></button>
                      <a href="/customer/plumber"><button className="view" onClick = {() => viewJob(jobs)}>View Plumber<i className="fa fa-user" style={{ marginLeft:'6px',fontSize:'16px' }}></i></button></a>
                      {/* <button className="mt-2 btn btn-primary flex items-center" style={{ width:'100%' }} onClick = {() => viewJob(jobs)} title="View">View <i className="fa fa-eye " style={{ marginLeft:'6px',fontSize:'16px' }}></i></button> */}
                      {/* <button className="mt-2 btn btn-warning flex items-center" onClick = {() => editJob(jobs)} title="Edit">Edit <i className="fa fa-edit ml-1"></i></button>
                      <button className="mt-2 btn btn-danger flex items-center" onClick={() => deleteJob(jobs.id)}  title="Delete">Delete <i className="fa fa-trash ml-1"></i></button>
                      <a href="/customer/plumber"><button className="mt-2 btn btn-danger flex items-center" title="Delete">View Plumber<i className="ml-1"></i></button></a> */}
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
          <h5>Add New Jobs</h5>
          <div className="mt-3">
            <div className="row">
            <div className="col-6">
            <label className="mb-2">Plumbing Issue:</label>
            <input type="text" value={formData.jobTitle} onChange={handleInputChange}className="form-control"></input>
            </div>
            <div className="col-6">
            <label className="mb-2">Address:</label>
            <input type="text" name="address" value={formData.address}  onChange={handleInputChange} className="form-control"></input>
            </div>
            </div>
          </div>
          {/* <div className="mt-3">
            <label className="mb-2">Address:</label>
            <input type="text" name="address" value={formData.address}  onChange={handleInputChange} className="form-control"></input>
          </div> */}
          <div className="mt-3">
            <label className="mb-2">PostCode:</label>
            <input type="text" name="postCode" value={formData.postCode}  onChange={handleInputChange} className="form-control"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Description:</label>
            <input type="text" name="description" value={formData.description}  onChange={handleInputChange} className="form-control"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Image File:</label>
            <input type="file" className="form-control" accept="image/png, image/jpeg"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Vedio File:</label>
            <input type="file" className="form-control" accept="image/png, image/jpeg"></input>
          </div>

          <div className="d-flex justify-content-end mt-3 align-items-center">
            <button className="modalclose me-3">Cancel</button>
            <button className="modalsave" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>

    <Modal show={editshow} dialogClassName="example-dialog26" contentClassName="example-content26" onHide={handleCloses2} centered>
      <Modal.Body style={{ margin: '0', padding: '0' }}>
        <div className="modalpad">
          <h5>Edit Jobs</h5>
          <div className="mt-3">
            <label className="mb-2">Plumbing Issue:</label>
            <input type="text" value={formData.jobTitle} onChange={handleInputChange}  name="jobTitle" className="form-control"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Address:</label>
            <input type="text" name="address" value={formData.address}  onChange={handleInputChange} className="form-control"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">PostCode:</label>
            <input type="text" name="postCode" value={formData.postCode}  onChange={handleInputChange} className="form-control"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Description:</label>
            <input type="text" name="description"  value={formData.description}  onChange={handleInputChange}  className="form-control"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Image File:</label>
            <input type="file" className="form-control" accept="image/png, image/jpeg"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Vedio File:</label>
            <input type="file" className="form-control" accept="image/png, image/jpeg"></input>
          </div>
          <input type="hidden" className="form-control" name="id" value={formData.id}></input>

          <div className="d-flex justify-content-end mt-3 align-items-center">
            <button className="modalclose me-3">Cancel</button>
            <button className="modalsave" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>

    <Modal show={viewshow} dialogClassName="example-dialog26" contentClassName="example-content26" onHide={handleCloses3} centered>
      <Modal.Body style={{ margin: '0', padding: '0' }}>
        <div className="modalpad">
          <h5>View Jobs</h5>
          <div className="mt-3">
            <label className="mb-2">Plumbing Issue:</label>
            <input type="text" value={formData.jobTitle} onChange={handleInputChange}  name="jobTitle" className="form-control"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Address:</label>
            <input type="text" name="address" value={formData.address}  onChange={handleInputChange} className="form-control"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">PostCode:</label>
            <input type="text" name="postCode" value={formData.postCode}  onChange={handleInputChange} className="form-control"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Description:</label>
            <input type="text" name="description"  value={formData.description}  onChange={handleInputChange}  className="form-control"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Image File:</label>
            <input type="file" className="form-control" accept="image/png, image/jpeg"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Vedio File:</label>
            <input type="file" className="form-control" accept="image/png, image/jpeg"></input>
          </div>
          <input type="hidden" className="form-control" name="id" value={formData.id}></input>

          <div className="d-flex justify-content-end mt-3 align-items-center">
            {/* <button className="modalclose me-3">Cancel</button>
            <button className="modalsave" onClick={handleSubmit}>Save</button> */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  </>
); 
}


export default Customerjobs;