import React from "react";
import Dashnavbar from "./dashnavbar";
import Sidebar from "./dashsidebar";
function Dashreview(){
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
                {/* <button className="dashaddbutton" onClick={addnew_plumber}>Add new</button> */}
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
        </>
    );
}
export default Dashreview;