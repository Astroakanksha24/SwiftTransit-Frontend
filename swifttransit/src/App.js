import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

function App() {
    
  return (
      <div>
        
        <Router>
          <div>
            <Routes>
              
              <Route exact path="/" element={<Main/>} />
              <Route exact path="/conductor-login" element={<ConductorLogin/>} />
              <Route exact path="/user-login" element={<UserLogin/>} />
              <Route exact path="/admin-login" element={<AdminLogin/>} />
              <Route exact path="/user-signup" element={<UserSignup/>} />
              <Route exact path="/create-conductor" element={<CreateConductor/>} />
              
            </Routes>
            
          </div>
      </Router>
      </div>
  );
}

export default App;
