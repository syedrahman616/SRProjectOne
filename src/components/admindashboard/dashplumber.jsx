import React, { useState } from "react";
import Dashnavbar from "./dashnavbar";
import Sidebar from "./dashsidebar";
import Modal from 'react-bootstrap/Modal';
function Dashplumber(){
    const [show1 , setShow1] = useState(false);
    const handleCloses1=()=>{
        setShow1(false)
    }
    const addnew_plumber = () => {
        setShow1(true);
    }
    return(
        <>
        <Dashnavbar/>
        <div className="container-fluid" style={{backgroundColor:'rgb(248, 248, 248)',width:'100%',height:'100vh'}}>
         <div className="row dash_row">
          <div className="col-3 col_corr_2">
          <Sidebar/>
          </div> 
          <div className="col-9 col_corr_1">
          <div className="dashmain">
                <button className="dashaddbutton" onClick={addnew_plumber}>Add new</button>
                <div className="table-responsive">
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Plumber Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Post-code</th>
                    <th scope="col">Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Data 1</td>
                    <td>Data 2</td>
                    <td>Data 2</td>
                    <td>Data 2</td>
                  </tr>
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
export default Dashplumber;