import React from "react";
import Sidebar from "./customersidebar";
import Dashnavbar from "./customernavbar";
function CustomerDashboard(){
    return(
        <>
        <Dashnavbar/>
        <div className="container-fluid" style={{backgroundColor:'rgb(248, 248, 248)',width:'100%',height:'100vh'}}>
         <div className="row dash_row">
          <div className="col-3 col_corr_2">
          <Sidebar/>
          </div> 
          <div className="col-9 col_corr_1">
            <div className="row mt-3">
               <div className="col-12 col-md-3">
               <div className="card">
                <div className="cardhalf">
                <div className="css ml-2">
                <i className="fa fa-book"></i>
                </div>
                <div>
                <p className="cardp">Bookings</p>
                <p className="cardp1">281</p>
                </div>
                </div>
                <hr className="MuiDivider-root MuiDivider-fullWidth css-17li347-MuiDivider-root"></hr>
                <div className="MuiBox-root css-bln954"><p className="MuiTypography-root MuiTypography-button css-3iprzi-MuiTypography-root"><span className="MuiTypography-root MuiTypography-button css-15ti2lr-MuiTypography-root">+55%</span>&nbsp;than lask week</p></div>
               </div>
                </div> 
               <div className="col-12 col-md-3">
               <div className="card">
               <div className="cardhalf">
               <div className="css-1 ml-2">
                <i className="fa fa-user-plus"></i>
                </div>
                <div>
                <p className="cardp">Today&apos;s Users</p>
                <p className="cardp1">281+</p>
                </div>
                </div>
                <hr className="MuiDivider-root MuiDivider-fullWidth css-17li347-MuiDivider-root"></hr>
                <div className="MuiBox-root css-bln954"><p className="MuiTypography-root MuiTypography-button css-3iprzi-MuiTypography-root"><span className="MuiTypography-root MuiTypography-button css-15ti2lr-MuiTypography-root">+55%</span>&nbsp;than yesterday</p></div>
               </div>
                </div> 
               <div className="col-12 col-md-3">
               <div className="card">
               <div className="cardhalf">
               <div className="css-2 ml-2">
                <i className="fa fa-book"></i>
                </div>
                <div>
                <p className="cardp">Revenue</p>
                <p className="cardp1">281k</p>
                </div>
                </div>
                <hr className="MuiDivider-root MuiDivider-fullWidth css-17li347-MuiDivider-root"></hr>
                <div className="MuiBox-root css-bln954"><p className="MuiTypography-root MuiTypography-button css-3iprzi-MuiTypography-root"><span className="MuiTypography-root MuiTypography-button css-15ti2lr-MuiTypography-root">+55%</span>&nbsp;than last month</p></div>
               </div>
                </div> 
                <div className="col-12 col-md-3">
               <div className="card">
               <div className="cardhalf">
               <div className="css-3 ml-2">
               <span className="fa fa-book"/>
                </div>
                <div>
                <p className="cardp">Followers</p>
                <p className="cardp1">+91</p>
                </div>
                </div>
                <hr className="MuiDivider-root MuiDivider-fullWidth css-17li347-MuiDivider-root"></hr>
                <div className="MuiBox-root css-bln954"><p className="MuiTypography-root MuiTypography-button css-3iprzi-MuiTypography-root">Just updated</p></div>
                {/* <div className="MuiBox-root css-bln954"><p class="MuiTypography-root MuiTypography-button css-3iprzi-MuiTypography-root"><span className="MuiTypography-root MuiTypography-button css-15ti2lr-MuiTypography-root">+55%</span>&nbsp;than lask week</p></div> */}
               </div>
               </div>
            </div>
            <div className="dashmain">
                {/* <button className="dashaddbutton">Add new</button> */}
                <div className="table-responsive">
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Serial No</th>
                    <th scope="col">Product Image</th>
                    <th scope="col">Column 2</th>
                    {/* Add more columns as needed */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Data 1</td>
                    <td>Data 2</td>
                    <td>Data 2</td>
                    <td>Data 2</td>
                    {/* Add more data rows as needed */}
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
export default CustomerDashboard;