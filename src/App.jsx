import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing_page from "./components/landingpages/landingpage";
import Login from "./components/Authlogin/loginpage";
import Signup from "./components/Authlogin/signuppage";
import Dashnavbar from "./components/admindashboard/dashnavbar";
import Sidebar from "./components/admindashboard/dashsidebar";
import Dashboard from "./components/admindashboard/dashboard";
import Dashplumber from "./components/admindashboard/dashplumber";
import DashplumberJobs from "./components/admindashboard/dashplumberjobs";
import DashCustomerJobs from "./components/admindashboard/dashcustomerjobs";
import Dashreview from "./components/admindashboard/dashreview";
import Dashcustomer from "./components/admindashboard/dashcustomer";
import PlumberDashboard from "./components/plumberdashboard/plumberDashboard";
import PlumberNavbar from "./components/plumberdashboard/plumbernavbar";
import PlumberSidebar from "./components/plumberdashboard/plumbersidebar";
import PlumberJobs from "./components/plumberdashboard/plumberjobs";
import Cusotmerdashboard from "./components/Customerdashboard/customerdashboard";
import Customerdash from "./components/Customerdashboard/customerdashboard";
import Cusotmerjobs from "./components/Customerdashboard/customerjobs";
import Customerplumber from "./components/Customerdashboard/customerplumber";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing_page />} />
          <Route path="/loginpage" element={<Login />} />
          <Route path="/signuppage" element={<Signup/>}/>
          <Route path="/dashnavbar" element={<Dashnavbar/>}/>
          <Route path="/sidebar" element={<Sidebar/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/plumberdetails" element={<Dashplumber/>}/>
          <Route path="/plumberjobs" element={<DashplumberJobs/>}/>
          <Route path="/customerjobs" element={<DashCustomerJobs/>}/>
          <Route path="/review" element={<Dashreview/>}/>
          <Route path="/customer" element={<Dashcustomer/>}/>
          <Route path="/customerdashboard" element={<Cusotmerdashboard/>}/>
          <Route path="/customer" element={<Dashcustomer/>}/>
          <Route path="/customerdashboard" element={<Customerdash/>}/>
          <Route path="/customerjobslist" element={<Cusotmerjobs/>}/>
          <Route path="/plumbers" element={<Customerplumber/>}/>
          <Route path="/plumberdashboard" element={<PlumberDashboard/>}/>
          <Route path="/plumbernavbar" element={<PlumberNavbar/>}/>
          <Route path="/plumbersidebar" element={<PlumberSidebar/>}/>
          <Route path="/plumberjobsdetail" element={<PlumberJobs/>}/>
      </Routes>
    </Router>
  );
}

export default App;
