import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing_page from "./components/landingpages/landingpage";
import Login from "./components/Authlogin/loginpage";
import Signup from "./components/Authlogin/signuppage";
import Dashnavbar from "./components/admindashboard/dashnavbar";
import Sidebar from "./components/admindashboard/dashsidebar";
import Dashboard from "./components/admindashboard/dashboard";
import Dashplumber from "./components/admindashboard/dashplumber";
import Dashreview from "./components/admindashboard/dashreview";
import Dashcustomer from "./components/admindashboard/dashcustomer";

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
          <Route path="/plumber" element={<Dashplumber/>}/>
          <Route path="/review" element={<Dashreview/>}/>
          <Route path="/customer" element={<Dashcustomer/>}/>
      </Routes>
    </Router>
  );
}

export default App;
