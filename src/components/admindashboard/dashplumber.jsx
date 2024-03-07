import React, { useEffect, useState } from "react";
import Dashnavbar from "./dashnavbar";
import Sidebar from "./dashsidebar";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function Dashplumber() {
  const [show1, setShow1] = useState(false);
  const [viewshow, setviewShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [plumberId, setPlumberId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [plumberdeleteId, setplumberdeleteId] = useState(null);

  const apiurl = "https://plumbing.api.heptotechnologies.org/plumber/user/api/admin-plumber";
  const [plumberData, setPlumberData] = useState([]); 

  var token = localStorage.getItem('accessToken');


  const plumberget = async() => {
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
     plumberget();
  },[])

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    postcode: "",
    address: "",
    role: "",
    mobile: "",
    registrationStatus: "" 
  });

  const handleCloses1 = () => {
    setShow1(false);
  };

  const addnew_plumber = () => {
    setShow1(true);
  };

  const handleCloses2 = () => {
    setShow2(false);
  };

  const viewClose = () => {
    setviewShow(false);
  };

  const admin_approve= (id) => {
    setShow2(true);
    setPlumberId(id);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

   //add new plumber

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // if (name === "mobile" && !/^\+?\d{0,10}$/.test(value)) {
    //   return; 
    // }
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const role='Plumber';
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        postCode: formData.postcode,
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password,
        userRole: role,
      };
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      const apiurl="https://plumbing.api.heptotechnologies.org/plumber/user/api/add-user";
      const response = await axios.post(apiurl, data,{headers});

      console.log(response);
      if (response.status === 200) {
        setShow1(false);
        console.log("User registered successfully");
        setFormData({
          ...formData,
          registrationStatus: "success"
        });
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  //end

  //approve 
  const approveSubmit = async (e) => {
    e.preventDefault();
    try {
      const role='Plumber';
      const action='1';
      const data = {
        userId: plumberId,
        userRole: role,
        action:action,
      };
      console.log(data);
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      const apiurl="https://plumbing.api.heptotechnologies.org/plumber/user/api/admin-approved";
      const response = await axios.post(apiurl, data,{headers});
      if (response.status === 200) {
        setShow2(false);
        setFormData({
          ...formData,
          adminApprove: "success"
        });
      } else {
        console.error("Approved Failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  //end

  //View job details here

  const viewJob=(plumber) =>{
    setviewShow(true);
    setFormData({
      firstName: plumber.firstName,
      lastName: plumber.lastName,
      address: plumber.address,
      city: plumber.city,
      mobile: plumber.mobile,
      postcode: plumber.postCode,
      email: plumber.userEmail,
   });
  }

  //...Delete Function...//

  const deletePlumber = async(id) => {
    setplumberdeleteId(id);
    const apiurl_delete = "https://plumbing.api.heptotechnologies.org/plumber/user/api/admin-plumber-profile";
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
        console.log(response);
        plumberget();
        setFormData({
          ...formData,
          DeleteStatus: "success"
        });
      }
    }catch(error){
        console.log(error);
    }
  };

  return (
    <>

      <Dashnavbar/>
      <div className="container-fluid" style={{ backgroundColor: 'rgb(248, 248, 248)', width: '100%', height: '100vh' }}>
        <div className="row dash_row">   
          <div className="col-3 col_corr_2">
            <Sidebar/>
          </div>
          <div className="col-9 col_corr_1">
          {formData.registrationStatus === "success" && (
              <div className="alert alert-success" role="alert">
                User added successfully!
              </div>
            )}
             {formData.adminApprove === "success" && (
              <div className="alert alert-success" role="alert">
                Approved successfully!
              </div>
            )}
             {formData.DeleteStatus === "success" && (
              <div className="alert alert-success" role="alert">
                Deleted successfully!
              </div>
            )}
            <div className="dashmain">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <select
                      className="form-select"
                      value={statusFilter}
                      onChange={(e) => handleStatusFilterChange(e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
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
                <div>
                  <button className="btn btn-primary me-2" title="Download PDF"><i className="fa fa-file-pdf">Pdf</i></button>
                  <button className="btn btn-secondary" title="Download Other"><i className="fa fa-download">Other</i></button>
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
                      <th scope="col">Plumber Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Post-code</th>
                      <th scope="col">Address</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {plumberData.map((plumber, index) => (

                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{plumber.firstName}</td>
                      <td>{plumber.userEmail}</td>
                      <td>{plumber.postCode}</td>
                      <td>{plumber.address}</td>
                      <td>
                        <select
                          className="form-select"
                           value={statusFilter}
                          onChange={(e) => handleStatusFilterChange(e.target.value)}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>
                      <td>
                      <div class="dropdown">
                        <a href="#" data-bs-toggle="dropdown"
                           class="btn btn-floating"
                           aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-ellipsis-h"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                            <a href="#"  onClick={() => admin_approve(plumber.plumberId)}class="dropdown-item">Approve</a>
                            <a href="#"  onClick = {() => viewJob(plumber)} class="dropdown-item">View</a>
                            <a href="#"  onClick = {() => editPlumber(plumber)} class="dropdown-item">Edit</a>
                            <a href="#" onClick={() => deletePlumber(plumber.id)} class="dropdown-item text-danger">Delete</a>
                        </div>
                      </div>
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
            <h5>Add New Plumber</h5>
            <div className="mt-3">
              <label className="mb-2">Enter Name:</label>
              <input type="text" name="firstName" value={formData.firstName}  onChange={handleInputChange} className="form-control"></input>
            </div>
            <div className="mt-3">
              <label className="mb-2">Enter LastName:</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="form-control"></input>
            </div>
            <div className="mt-3">
              <label className="mb-2">Enter Email:</label>
              <input type="text"  name="email" value={formData.email} onChange={handleInputChange} className="form-control"></input>
            </div>
        
            <div className="mt-3">
              <label className="mb-2">Enter Password:</label>
              <input type="text" name="password" value={formData.password} onChange={handleInputChange}className="form-control"></input>
            </div>
            <div className="mt-3">
              <label className="mb-2">Enter Mobile Number:</label>
              <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange}className="form-control"></input>
            </div>
            <div className="mt-3">
              <label className="mb-2">Enter Address:</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange}
               className="form-control"></input>
            </div>
            <div className="mt-3">
              <label className="mb-2">Enter Postcode:</label>
              <input type="text" name="postcode"  value={formData.postcode} onChange={handleInputChange}className="form-control"></input>
            </div>
            <div className="d-flex justify-content-end mt-3 align-items-center">
              <button className="modalclose me-3" >Cancel</button>
              <button  className="modalsave" onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={show2} dialogClassName="example-dialog26" contentClassName="example-content26" onHide={handleCloses2} centered>
        <Modal.Body style={{ margin: '0', padding: '0' }}>
          <div className="modalpad">
            <p>Are you sure you want to update?</p>
            <div className="d-flex justify-content-end mt-3 align-items-center">
              <button className="modalclose me-3" >Cancel</button>
              <button  className="modalsave" onClick={approveSubmit}>Save</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={viewshow} dialogClassName="example-dialog26" contentClassName="example-content26" onHide={viewClose} centered>
        <Modal.Body style={{ margin: '0', padding: '0' }}>
          <div className="modalpad">
            <h5>View Plumber</h5>
            <div className="mt-3">
              <label className="mb-2">Enter Name:</label>
              <input type="text" name="firstName" value={formData.firstName}  onChange={handleInputChange} className="form-control"></input>
            </div>
            <div className="mt-3">
              <label className="mb-2">Enter LastName:</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="form-control"></input>
            </div>
            <div className="mt-3">
              <label className="mb-2">Enter Email:</label>
              <input type="text"  name="email" value={formData.email} onChange={handleInputChange} className="form-control"></input>
            </div>
        
            {/* <div className="mt-3">
              <label className="mb-2">Enter Password:</label>
              <input type="text" name="password" value={formData.password} onChange={handleInputChange}className="form-control"></input>
            </div> */}
            <div className="mt-3">
              <label className="mb-2">Enter Mobile Number:</label>
              <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange}className="form-control"></input>
            </div>
            <div className="mt-3">
              <label className="mb-2">Enter Address:</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange}
               className="form-control"></input>
            </div>
            <div className="mt-3">
              <label className="mb-2">Enter Postcode:</label>
              <input type="text" name="postcode"  value={formData.postcode} onChange={handleInputChange}className="form-control"></input>
            </div>
           
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Dashplumber;
