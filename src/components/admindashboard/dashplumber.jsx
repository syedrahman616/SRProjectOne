import React, { useEffect, useState } from "react";
import Dashnavbar from "./dashnavbar";
import Sidebar from "./dashsidebar";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function Dashplumber() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [plumberId, setPlumberId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All"); 
  const [searchQuery, setSearchQuery] = useState("");
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
                      <th scope="col">Id</th>
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
                      <th>{plumber.id}</th>
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
                      <td >
                        <button className="btn btn-success me-2" title="View" onClick={() => admin_approve(plumber.id)}>Approve<i className="fa fa-eye"></i></button>
                        <button className="btn btn-primary me-2" title="View">View <i className="fa fa-eye"></i></button>
                        <button className="btn btn-warning me-2" title="Edit">Edit <i className="fa fa-edit"></i></button>
                        <button className="btn btn-danger" title="Delete">Delete <i className="fa fa-trash"></i></button>
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
            <p>{plumberId}</p>
            <input type="hidden" name="firstName" value={formData.firstName} className="form-control"></input>
            <div className="d-flex justify-content-end mt-3 align-items-center">
              <button className="modalclose me-3" >Cancel</button>
              <button  className="modalsave" onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Dashplumber;
