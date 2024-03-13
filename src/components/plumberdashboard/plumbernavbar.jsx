import React,{useEffect, useState } from "react";
import axios from "axios";
import Img5 from "../../assets/women/download.png";
function PlumberNavbar() {
  const apiurl = "https://plumbing.api.heptotechnologies.org/plumber/user/api/get-profile";
  const [profile, setProfile] = useState([]); 
  const [userrole, setUserRole] = useState([]); 


  var token = localStorage.getItem('accessToken');
  // var userRole = localStorage.getItem('userRole');
  // setUserRole(userRole); 

  const getProfile= async() => {
    try{
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      const response = await axios.get(apiurl,{headers});
      if(response.status===200){
          console.log("navbar",response.data.data);
          setProfile(response.data.data); 
      }
    }catch(error){
        console.log(error);
    }
  }

  useEffect(() =>{
    getProfile();
  },[])

  return (
    <>
      <nav className="nav100">
        <div className="nav-left">
          <img src={Img5}></img>
        </div>
        <div className="nav-right">
          <div className="mr-3">
            <i
              className="fa fa-bell mt-1"
              style={{ fontSize: "23px", color: "black" }}
            ></i>
          </div>
          {/* <div className="d-flex justify-content-center align-items-center mr-3"> */}
            <i
              className="fa fa-user-circle-o me-3"
              style={{ fontSize: "23px", color: "black" }}
            ></i>
           <div className="me-3" style={{ textAlign:'center' }}> 
               <p className="mb-0 navpro_name" style={{ marginBottom:'5px' }}>{profile.firstName}{profile.lastName}</p>
                <p style={{ marginBottom:'0px' }}></p>    
           </div>    
          {/* </div> */}
        </div>
      </nav>
    </>
  );
}
export default PlumberNavbar;
