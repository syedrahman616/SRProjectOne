import React, { useEffect,useState } from "react";
import Dashnavbar from "./dashnavbar";
import Sidebar from "./dashsidebar";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function Dashcustomer(){
  const [show1, setShow1] = useState(false);
  const [isPlumbersLinkActive, setIsPlumbersLinkActive] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All"); // Default filter
  const [searchQuery, setSearchQuery] = useState("");

  const apiurl = "https://plumbing.api.heptotechnologies.org/plumber/user/api/admin-customer";
  const [customerData, setCustomerData] = useState([]); 

  const customerget = async() => {
    try{
      var token = localStorage.getItem('accessToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      const response = await axios.get(apiurl,{headers});
      if(response.status===200){
        setCustomerData(response.data.data); 
        console.log('checking',response.data.data);
      }
    }catch(error){
        console.log(error);
    }
  }

  useEffect(() =>{
    customerget();
  },[])

  const handleCloses1 = () => {
    setShow1(false);
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
                    <th scope="col">Customer Names</th>
                    <th scope="col">Email</th>
                    <th scope="col">Post-code</th>
                    <th scope="col">Address</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                {customerData.map((customer, index) => (

                  <tr>
                    <th scope="row"></th>
                    <td>{customer.firstName}</td>
                    <td>{customer.userEmail}</td>
                    <td>{customer.postCode}</td>
                    <td>{customer.address}</td>
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
          <h5>Add New Customer</h5>
          <div className="mt-3">
            <label className="mb-2">Enter Name:</label>
            <input type="text" className="form-control"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Enter Email:</label>
            <input type="text" className="form-control"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Enter Password:</label>
            <input type="text" className="form-control"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Enter Address:</label>
            <input type="text" className="form-control"></input>
          </div>
          <div className="mt-3">
            <label className="mb-2">Enter Postcode:</label>
            <input type="text" className="form-control"></input>
          </div>
          <div className="d-flex justify-content-end mt-3 align-items-center">
            <button className="modalclose me-3">Cancel</button>
            <button className="modalsave">Save</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  </>
);
}


export default Dashcustomer;