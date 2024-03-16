import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
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
import AllJobs from "./components/plumberdashboard/allJobs";
import Plumber from "./components/Customerdashboard/plumber";
// import Design from "./components/design/sidebar";
import Quotes from "./components/plumberdashboard/plumberQutoes";
import Finishedjobs from "./components/plumberdashboard/finishedJobs";
import CustomerFinishedJobs from "./components/Customerdashboard/finishedJobs";
import { ToastContainer } from "react-toastify";
import AdminQuotes from "./components/admindashboard/adminQuotes";
import CustomerQuotes from "./components/Customerdashboard/customerQuotes";
import CustomerProfile from "./components/Customerdashboard/customerProfile";
import Evseller from "./components/test/evseller";



function App() {
  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path="/" element={<Landing_page />} />
          <Route path="/loginpage" element={<Login />} />
          <Route path="/signuppage" element={<Signup/>}/>
          <Route path="/dashnavbar" element={<Dashnavbar/>}/>
          <Route path="/sidebar" element={<Sidebar/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/plumberdetails" element={<Dashplumber/>}/>
          <Route path="/admin/plumberjobs" element={<DashplumberJobs/>}/>
          <Route path="/admin/customerjobs" element={<DashCustomerJobs/>}/>
          <Route path="/review" element={<Dashreview/>}/>
          <Route path="/admin/customer" element={<Dashcustomer/>}/>
          <Route path="/customerdashboard" element={<Cusotmerdashboard/>}/>
          <Route path="/customer" element={<Dashcustomer/>}/>
          <Route path="/customer/dashboard" element={<Customerdash/>}/>
          <Route path="/customer/jobslist" element={<Cusotmerjobs/>}/>
          <Route path="/customer/plumbers" element={<Customerplumber/>}/>
          <Route path="/plumberdashboard" element={<PlumberDashboard/>}/>
          <Route path="/plumbernavbar" element={<PlumberNavbar/>}/>
          <Route path="/plumbersidebar" element={<PlumberSidebar/>}/>
          <Route path="/plumber/invitejobs" element={<PlumberJobs/>}/> 
          <Route path="/plumber/alljobs" element={<AllJobs/>}/>
          <Route path="/customer/plumber" element={<Plumber />} />
          {/* <Route path="/design" element={<Design/>}/> */}
          <Route path="/check" element={<Quotes />} />
          <Route path="/plumber/finishedjobs" element={<Finishedjobs />} />
          <Route path="/customer/finishedjobs" element={<CustomerFinishedJobs />}/>
          <Route path="/customer/quotes" element={<CustomerQuotes />} />
          <Route path="/admin/quotes" element={<AdminQuotes/>} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          {/* <Route path="/evseller" element={<Evseller />} /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;
