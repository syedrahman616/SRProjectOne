import React from "react";
import './admin.css';
import Img5 from "../../assets/women/plumbing_19 [Converted]-01.png";
import { Link } from "react-router-dom";
function Signup(){
    return(
        <>
         <div className="sign100 signpad">
                <div className="loginpagecenter">
                       <div className="row p-5">
                        <div className="col-6">
                         <img src={Img5} style={{ objectFit: 'fill',width:'90%',height:'90%'}}></img>
                         <div className="d-flex justify-content-center mt-2">
                         <label>Already have an Account? <Link to='/loginpage'><b style={{color:'#6caddf',textDecoration:'underline'}}>Sign In</b></Link></label>
                         </div>
                        </div>
                        <div className="col-6 p-3">
                            <h3 className="logh3 ">Sign Up</h3>
                            <div className="mt-4">
                            <div className="input-group">
    <span className="input-icon d-flex jusify-content-center align-items-center" style={{marginRight:'5px'}}>
      <i className="fa fa-user" ></i>
    </span>
    <input type="text" className="form-control logininput" placeholder="Enter Name" />
  </div>
                            {/* <input type="text" className="form-control logininput" placeholder="Enter your name"></input> */}
                            </div>
                            <div className="mt-4">
                            <div className="input-group">
    <span className="input-icon d-flex jusify-content-center align-items-center" style={{marginRight:'5px'}}>
      <i className="fa fa-user " ></i>
    </span>
    <input type="text" className="form-control logininput" placeholder="Enter Last Name" />
  </div>
                            {/* <input type="text" className="form-control logininput" placeholder="Enter your name"></input> */}
                            </div>
                            <div className="mt-4">
                            <div className="input-group">
    <span className="input-icon d-flex jusify-content-center align-items-center"style={{marginRight:'5px'}}>
    <i className='fa fa-envelope'></i>
    </span>
                            <input type="text" className="form-control logininput" placeholder="Enter Email"></input>
    </div>
                            {/* <input type="text" className="form-control logininput" placeholder="Enter your password"></input> */}
                            </div>
                            <div className="mt-4">
                            <div className="input-group">
    <span className="input-icon d-flex jusify-content-center align-items-center" style={{marginRight:'5px'}}>
    <i className='fa fa-lock '></i>
    </span>
                            <input type="text" className="form-control logininput" placeholder="Enter Password"></input>
    </div>
                            {/* <input type="text" className="form-control logininput" placeholder="Enter your password"></input> */}
                            </div>
                            <div className="mt-4">
                            <div className="input-group">
    <span className="input-icon d-flex jusify-content-center align-items-center"style={{marginRight:'5px'}}>
    <i className='fa fa-map-marker '></i>
    </span>
                            <input type="text" className="form-control logininput" placeholder="Enter Post-code"></input>
    </div>
                            {/* <input type="text" className="form-control logininput" placeholder="Enter your password"></input> */}
                            </div>
                            <div className="mt-4">
                            <div className="input-group">
    <span className="input-icon d-flex jusify-content-center align-items-center"style={{marginRight:'5px'}}>
    <i className='fa fa-address-card '></i>
    </span>
                            <input type="text" className="form-control logininput" placeholder="Enter Address"></input>
    </div>
                            {/* <input type="text" className="form-control logininput" placeholder="Enter your password"></input> */}
                            </div>
                            {/* <div className="mt-3 ml-1 d-flex align-items-center">
                <input type="checkbox" id="rememberMe" className="mr-2 logcheckbox" />
                <label htmlFor="rememberMe" className="mb-0 logremember">Remember Me</label>
              </div> */}
              <div className="mt-4">
              <button className="loginbutton">Register</button>
              </div>
                        </div>
                       </div>
                </div>
            </div>
        </>
    )
}
export default Signup;