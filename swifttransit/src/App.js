import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import UserLogin from './Login/UserLogin';
import UserSignup from './Signup/UserSignup';
import ConductorLogin from './Login/ConductorLogin';
import AdminLogin from './Login/AdminLogin';
import CreateConductor from './Signup/CreateConductor';
import UserDashboard from './Main/UserDashboard';
import AdminDashboard from './Main/AdminDashboard';
import ConductorDashboard from './Main/ConductorDashboard';
import SyncTable from './Main/AdminTable'
import CustAdminDashboard from './Main/CustomerData'
import QrContainer from './Main/Components/scanner';

//import Main from './Main/Landing';
function App() {
    
  return (
      <div>
        
        <Router>
          <div>
            <Routes>
              
              <Route exact path="/conductor-login" element={<ConductorLogin/>} />
              <Route exact path="/user-login" element={<UserLogin/>} />
              <Route exact path="/admin-login" element={<AdminLogin/>} />
              <Route exact path="/user-signup" element={<UserSignup/>} />
              <Route exact path="/create-conductor" element={<CreateConductor/>} />
              <Route exact path="/user-dashboard" element={<UserDashboard/>} />
              <Route exact path="/admin-dashboard" element={<AdminDashboard/>} />
              <Route exact path="/conductor-dashboard" element={<ConductorDashboard/>} />
              <Route exact path="/CustAdminDashboard" element={<CustAdminDashboard/>} />
              <Route exact path="/admin-table" element={<SyncTable/>} />
              <Route exact path="/scanner" element={<QrContainer/>} />
            </Routes>
            
          </div>
      </Router>
      </div>
  );
}

export default App;
