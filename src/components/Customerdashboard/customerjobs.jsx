import React, { useEffect,useState } from "react";
import Dashnavbar from "./customernavbar";
import Sidebar from "./customersidebar";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Customerjobs(){
  const [show1, setShow1] = useState(false);
  const [editshow, seteditshow] = useState(false);
  const [viewshow, setviewshow] = useState(false);
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [vedio, setVedio] = useState("");
  const [errors, setErrors] = useState({});


  const [isPlumbersLinkActive, setIsPlumbersLinkActive] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All"); // Default filter
  const [jobId, setJobId] = useState(null);
  const navigate = useNavigate();
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

  const handleCancel =  () => {
    setShow1(false); 
  }

  const viewClose = () =>{
    setviewshow(false);
  }

 

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

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

   
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
      valid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    }
    if (!formData.postCode.trim()) {
      newErrors.postCode = "Postcode is required";
      valid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

   const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
  };
  console.log('image',image,image1,vedio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      console.log(image,image1,vedio);
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
          image1: image,
          image2: image1,
          vedio: vedio,
          flag: flag,
        };
      }
      else if(flag == 'edit')
      {
        alert('edit');
         data = {
                    address: formData.address,
                    jobTitle: formData.jobTitle,
                    postCode: formData.postcode,
                    description:formData.description,
                    customerId:formData.customerId,
                    id:formData.id,
                    image1: image,
                    image2: image1,
                    vedio: vedio,
                    flag: flag,
         };
      }
      else{
        
        data = {
          address: formData.address,
          jobTitle: formData.jobTitle,
          postCode: formData.postcode,
          description:formData.description,
          image1: image,
          image2: image1,
          vedio: vedio,
          flag: 'add',
        };

      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      const apiurl="https://plumbing.api.heptotechnologies.org/plumber/user/api/add-job";
      const response = await axios.post(apiurl, data,{headers});

      if (response.status === 200) {
        if(response.data.message=='Edited Successfully')
        {
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
          seteditshow(false);
          customerjobs();
        }
        else
        {
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
          customerjobs();
        }
      } else {
        console.error("Failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };


  //end

  //file Upload
  const uploadFile = async (fieldName) => {
    try {
      const fileInput = document.querySelector('input[type="file"]');
      const fileName = fileInput.getAttribute('name');
      const file = fileInput.files[0];
  
      if (!file) {
        const errorfile="File is required";
        toast.error(errorfile, {
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

        return;
      }
     
      const formData = new FormData();
      formData.append('file', file);
  
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', 
      }
  
      const apiurl = "https://plumbing.api.heptotechnologies.org/plumber/user/api/upload-files";
      const response = await axios.post(apiurl, formData, { headers });
  
      console.log(response.data);
      if (response.status === 200) {
        const image = response.data.data;
          if(fieldName == 'image1')
          {
            setImage(image);
            if(image != '')
            {
              alert('File Upload Successfully');
            }
            else
            {
              alert('File Not Upload');
            }
          }

          if(fieldName == 'image2')
          {
            setImage1(image);
            if(image1 != '')
            {
              alert('File Upload Successfully');
            }
            else
            {
              alert('File Not Upload');
            }
          }

          if(fieldName == 'video')
          {
            setVedio(image);
            if(vedio != '')
            {
              alert('File Upload Successfully');
            }
            else
            {
              alert('File Not Upload');
            }
          }
          
      } else {
        console.error("Failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  


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
        console.log(response);

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
    console.log(jobs);
    setFormData({
      jobTitle: jobs.jobTitle,
      address: jobs.address,
      postCode: jobs.postCode,
      id: jobs.id,
      description: jobs.description,
      customerId: jobs.customerId,
   });
  }
  
  // View Plumber

  const viewPlumber =(id) => {
      navigate ("/customer/plumber" ,{ state: {id} })
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
             <p>Job List:</p>
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
                      <button className="view" onClick = {() =>viewPlumber(jobs.id)}>View Plumber<i className="fa fa-user" style={{ marginLeft:'6px',fontSize:'16px' }}></i></button>
                     
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
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} className="form-control"></input>
              {errors.jobTitle && <div className="text-danger">{errors.jobTitle}</div>}
            </div>
            <div className="col-6">
              <label className="mb-2">Address:</label>
              <input type="text" name="address" value={formData.address}  onChange={handleInputChange} className="form-control"></input>
              {errors.address && <div className="text-danger">{errors.address}</div>}
            </div>
            </div>
          </div>
        
          <div className="mt-3">
            <div className="row">
              <div className="col-6">
                <label className="mb-2">PostCode:</label>
                <input type="text" name="postCode" value={formData.postCode}  onChange={handleInputChange} className="form-control"></input>
                {errors.postCode && <div className="text-danger">{errors.postCode}</div>}
              </div>
              <div className="col-6">
              <label className="mb-2">Description:</label>
                   <input type="text" name="description" value={formData.description}  onChange={handleInputChange} className="form-control"></input>
              {errors.description && <div className="text-danger">{errors.description}</div>}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <label className="mb-2">Image File:</label>
            <input type="file" name="image1" className="form-control" accept="image/png, image/jpeg"></input>
            <button onClick={() => uploadFile('image1')} className="btn btn-primary">Upload</button>
          </div>
          <div className="mt-3">
            <label className="mb-2">Image File2:</label>
            <input type="file" className="form-control" name="image2" accept="image/png, image/jpeg"></input>
            <button onClick={() => uploadFile('image2')} className="btn btn-primary">Upload</button>
          </div>
          <div className="mt-3">
            <label className="mb-2">Vedio File:</label>
            <input type="file" className="form-control" name="vedio"  accept="video/mp4, video/mpeg, video/ogg, video/webm"></input>
            <button onClick={() => uploadFile('video')} className="btn btn-primary">Upload</button>
          </div>

          <div className="d-flex justify-content-end mt-3 align-items-center">
            <button className="modalclose me-3" onClick={handleCancel}>Cancel</button>
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
            {errors.jobTitle && <div className="text-danger">{errors.jobTitle}</div>}
          </div>
          <div className="mt-3">
            <label className="mb-2">Address:</label>
            <input type="text" name="address" value={formData.address}  onChange={handleInputChange} className="form-control"></input>
            {errors.address && <div className="text-danger">{errors.address}</div>}
          </div>
          <div className="mt-3">
            <label className="mb-2">PostCode:</label>
            <input type="text" name="postCode" value={formData.postCode}  onChange={handleInputChange} className="form-control"></input>
            {errors.postCode && <div className="text-danger">{errors.postCode}</div>}
          </div>
          <div className="mt-3">
            <label className="mb-2">Description:</label>
            <input type="text" name="description"  value={formData.description}  onChange={handleInputChange}  className="form-control"></input>
            {errors.description && <div className="text-danger">{errors.description}</div>}
          </div>

          <div className="mt-3">
            <label className="mb-2">Image File:</label>
            <input type="file" className="form-control" name="image"accept="image/png, image/jpeg"></input>
            <button onClick={() => uploadFile('image1')} className="btn btn-primary">Upload</button>
          </div>
          <div className="mt-3">
            <label className="mb-2">Image File2:</label>
            <input type="file" className="form-control" name="image2"  accept="image/png, image/jpeg"></input>
            <button onClick={() => uploadFile('image2')} className="btn btn-primary">Upload</button>
          </div>
          <div className="mt-3">
            <label className="mb-2">Vedio File:</label>
            <input type="file" className="form-control" name="vedio"  accept="video/mp4, video/mpeg, video/ogg, video/webm"></input>
            <button onClick={() => uploadFile('video')} className="btn btn-primary">Upload</button>
          </div>
          <input type="hidden" className="form-control" name="id" value={formData.id}></input>

          <div className="d-flex justify-content-end mt-3 align-items-center">
            <button className="modalclose me-3" onClick={handleCloses2}>Cancel</button>
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
            <input type="text"  name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} className="form-control"></input>
            {errors.jobTitle && <div className="text-danger">{errors.jobTitle}</div>}
          </div>
          <div className="mt-3">
            <label className="mb-2">Address:</label>
            <input type="text" name="address" value={formData.address}  onChange={handleInputChange} className="form-control"></input>
            {errors.address && <div className="text-danger">{errors.address}</div>}
          </div>
          <div className="mt-3">
            <label className="mb-2">PostCode:</label>
            <input type="text" name="postCode" value={formData.postCode}  onChange={handleInputChange} className="form-control"></input>
            {errors.postCode && <div className="text-danger">{errors.postCode}</div>}
          </div>
          <div className="mt-3">
            <label className="mb-2">Description:</label>
            <input type="text" name="description"  value={formData.description}  onChange={handleInputChange}  className="form-control"></input>
            {errors.description && <div className="text-danger">{errors.description}</div>}
          </div>
          <div className="mt-3">
            <label className="mb-2">Image File:</label>
            <input type="file" className="form-control" accept="image/png, image/jpeg"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Image File 2:</label>
            <input type="file" className="form-control" accept="image/png, image/jpeg"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Vedio File:</label>
            <input type="file" className="form-control" accept="image/png, image/jpeg"></input>
          </div>
          <input type="hidden" className="form-control" name="id" value={formData.id}></input>

          <div className="d-flex justify-content-end mt-3 align-items-center">
            <button className="modalclose" onClick={viewClose}>Cancel</button>
            {/* <button className="modalsave" onClick={handleSubmit}>Save</button> */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  </>
); 
}


export default Customerjobs;