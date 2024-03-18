import React, { useState, useEffect } from "react";
import { Link, useLocation , useNavigate} from "react-router-dom";
import axios from "axios";

import Img5 from "../../assets/women/download.png";
function CustomerDashnavbar(){
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [profile, setProfile] = useState([]); 
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();

    const apiurl = "https://plumbing.api.heptotechnologies.org/plumber/user/api/get-profile";
    useEffect(() => {
        const role = localStorage.getItem('userRole');
        setUserRole(role);
    }, []);

    var token = localStorage.getItem('accessToken');


    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    ///logout
    
    const logOut =() =>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
        navigate('/');
    }
    

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
    return(
        <>
        <nav className="nav100">
            <div className="nav-left">
                <img src={Img5}></img>   
            </div>
            <div className="nav-right">
                <div className="mr-3">
                    <i className="fa fa-bell mt-1" style={{ fontSize: "23px", color: "black" }}></i>
                </div>
                <div className="d-flex justify-content-center align-items-center mr-3">
                <li className="fa fa-user-circle-o mr-1 me-2" style={{ fontSize: "23px", color: "black" }} onClick={toggleDropdown}>
                    <a href="#">{profile.firstName}{profile.lastName}</a>
                    <span style={{ marginRight: "10px" }}></span>

                    {isDropdownOpen && (
                        <ul className="dropdown-menu-nav">
                            <li style={{ fontSize: "23px", color: "black" }} id="userRoleInput">{userRole}</li>
                            <li><i className="fa fa-user me-2"></i>Profile</li>
                            <li onClick={logOut}><i className="fa fa-sign-out me-2"></i>Logout</li>
                        </ul>
                    )}
                </li>
                </div>

             </div>
        </nav>
        </>
    );
}
export default CustomerDashnavbar;