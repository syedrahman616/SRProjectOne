import React, { useState, useEffect } from "react";
import { Link, useLocation , useNavigate} from "react-router-dom";

import Img5 from "../../assets/women/download.png";
function Dashnavbar(){
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [profile, setProfile] = useState([]); 
    const navigate = useNavigate();


    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    ///logout

    const logOut =() =>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
        navigate('/');
    }
    
    var token = localStorage.getItem('accessToken');

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
                <i className="fa fa-bell mt-1 me-2" style={{ fontSize: "23px", color: "black" }}></i>
             </div>
             <div className="d-flex justify-content-center align-items-center mr-3">
              <li className="fa fa-user-circle-o mr-1 me-2" style={{ fontSize: "23px", color: "black" }} onClick={toggleDropdown}>
                    <a href="#">Admin</a>
                    <span style={{ marginRight: "10px" }}></span>

                    {isDropdownOpen && (
                        <ul className="dropdown-menu-nav">
                            <li style={{ fontSize: "23px", color: "black" }}><i>Admin</i></li>
                            <li><i className="fa fa-user me-2"></i>Profile</li>
                            <li onClick={logOut}><i className="fa fa-sign-out me-2"></i>Logout</li>

                        </ul>
                    )}
                </li>
              </div>  
              {/* <li className={`fa fa-user-circle-o mr-1 dropdown user user-menu ${toggleDropdown ? 'open' : ''}`} style={{ fontSize: "23px", color: "black" }}>
                           <span className="hidden-xs">ADMIN</span>
                         <ul className="dropdown-menu">
                            <li className="user-header">
                               <img src="/uploads/user/{{$user->image_url}}" className="img-circle" alt="User Image"/>
                                <p>
                                    ADMIN
                                    <small>Facility</small>
                                    <small><em>12/03/2023</em></small>
                                </p>
                            </li>
               
                <li className="user-footer">
                    <div className="pull">
                        <a title='Lock Screen' href="#" className='btn btn-default btn-flat'><i className='fa fa-key'></i></a>
                        <a href="javascript:void(0)" className="btn btn-danger btn-flat"><i className='fa fa-power-off'></i></a>
                    </div>
                </li>
            </ul>
        </li> */}
             {/* <div className="d-flex justify-content-center align-items-center mr-3">
                 <i className="fa fa-user-circle-o mr-1" style={{ fontSize: "23px", color: "black" }}></i>
                  <p className="mb-0 navpro_name">Jone Doe</p>
              </div> */}
             </div>
        </nav>
        </>
    );
}
export default Dashnavbar;