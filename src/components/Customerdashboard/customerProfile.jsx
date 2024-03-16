import React, { useEffect,useState } from "react";
import Dashnavbar from "./customernavbar";
import Sidebar from "./customersidebar";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import "../Authlogin/admin.css";
import Img5 from "../../assets/women/download.png";


function CustomerProfile(){
  const [isPlumbersLinkActive, setIsPlumbersLinkActive] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All"); // Default filter
  const [searchQuery, setSearchQuery] = useState("");

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const apiurl = "https://plumbing.api.heptotechnologies.org/plumber/user/api/customer-plumber-details";
  const [plumberData, setPlumberData] = useState([]); 

  var token = localStorage.getItem('accessToken');

  const plumber= async() => {
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
    plumber();
  },[])



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
            </div>
            <div className="row column1">
      <div className="col-md-2"></div>
      <div className="col-md-8">
        <div className="white_shd full margin_bottom_30">
          <div className="full graph_head">
            <div className="heading1 margin_0">
              <h2>User profile</h2>
            </div>
          </div>
          <div className="full price_table padding_infor_info">
            <div className="row">
              <div className="col-lg-12">
                <div className="full dis_flex center_text">
                  <div className="profile_img" style={{ textAlign: 'right'}}>
                    <img
                      width="180"
                      className="rounded-circle"
                      src={Img5}
                      alt="#"
                    />
                  </div>
                  <div className="profile_contant">
                    <div className="contact_inner">
                      <h3>John Smith</h3>
                      <p>
                        <strong>About: </strong>Frontend Developer
                      </p>
                      <ul className="list-unstyled">
                        <li>
                          <i className="fa fa-envelope-o"></i> : test@gmail.com
                        </li>
                        <li>
                          <i className="fa fa-phone"></i> : 987 654 3210
                        </li>
                      </ul>
                    </div>
                    <div className="user_progress_bar">
                      <div className="progress_bar">
                        <span className="skill" style={{ width: '85%' }}>
                          Web Applications <span className="info_valume">85%</span>
                        </span>
                        <div className="progress skill-bar">
                          <div
                            className="progress-bar progress-bar-animated progress-bar-striped"
                            role="progressbar"
                            aria-valuenow="85"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: '85%' }}
                          ></div>
                        </div>
                        <span className="skill" style={{ width: '78%' }}>
                          Website Design <span className="info_valume">78%</span>
                        </span>
                        <div className="progress skill-bar">
                          <div
                            className="progress-bar progress-bar-animated progress-bar-striped"
                            role="progressbar"
                            aria-valuenow="78"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: '78%' }}
                          ></div>
                        </div>
                        <span className="skill" style={{ width: '47%' }}>
                          Automation & Testing <span className="info_valume">47%</span>
                        </span>
                        <div className="progress skill-bar">
                          <div
                            className="progress-bar progress-bar-animated progress-bar-striped"
                            role="progressbar"
                            aria-valuenow="54"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: '54%' }}
                          ></div>
                        </div>
                        <span className="skill" style={{ width: '65%' }}>
                          UI / UX <span className="info_valume">65%</span>
                        </span>
                        <div className="progress skill-bar">
                          <div
                            className="progress-bar progress-bar-animated progress-bar-striped"
                            role="progressbar"
                            aria-valuenow="65"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: '65%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="full inner_elements margin_top_30">
                  <div className="tab_style2">
                    <div className="tabbar">
                      <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                          <a
                            className="nav-item nav-link active"
                            id="nav-home-tab"
                            data-toggle="tab"
                            href="#recent_activity"
                            role="tab"
                            aria-selected="true"
                          >
                            Recent Activity
                          </a>
                          <a
                            className="nav-item nav-link"
                            id="nav-profile-tab"
                            data-toggle="tab"
                            href="#project_worked"
                            role="tab"
                            aria-selected="false"
                          >
                            Projects Worked on
                          </a>
                          <a
                            className="nav-item nav-link"
                            id="nav-contact-tab"
                            data-toggle="tab"
                            href="#profile_section"
                            role="tab"
                            aria-selected="false"
                          >
                            Profile
                          </a>
                        </div>
                      </nav>
                      <div className="tab-content" id="nav-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="recent_activity"
                          role="tabpanel"
                          aria-labelledby="nav-home-tab"
                        >
                          <div className="msg_list_main">
                            <ul className="msg_list">
                              <li>
                                <span>
                                  <img
                                    src="images/layout_img/msg2.png"
                                    className="img-responsive"
                                    alt="#"
                                  />
                                </span>
                                <span>
                                  <span className="name_user">Taison Jack</span>
                                  <span className="msg_user">
                                    Sed ut perspiciatis unde omnis.
                                  </span>
                                  <span className="time_ago">12 min ago</span>
                                </span>
                              </li>
                              <li>
                                <span>
                                  <img
                                    src="images/layout_img/msg3.png"
                                    className="img-responsive"
                                    alt="#"
                                  />
                                </span>
                                <span>
                                  <span className="name_user">Mike John</span>
                                  <span className="msg_user">
                                    On the other hand, we denounce.
                                  </span>
                                  <span className="time_ago">12 min ago</span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="project_worked"
                          role="tabpanel"
                          aria-labelledby="nav-profile-tab"
                        >
                          <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                            quae ab illo inventore veritatis et quasi architecto beatae vitae
                            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
                            eos qui ratione voluptatem sequi nesciunt.
                          </p>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="profile_section"
                          role="tabpanel"
                          aria-labelledby="nav-contact-tab"
                        >
                          <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                            quae ab illo inventore veritatis et quasi architecto beatae vitae
                            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
                            eos qui ratione voluptatem sequi nesciunt.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>


            
            
           
          </div>
        </div>
      </div>
    </div>
   
  </>
);
}


export default CustomerProfile;