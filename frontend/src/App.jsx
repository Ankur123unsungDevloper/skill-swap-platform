import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Landing from './pages/Landing';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Auth Pages */}
      {/* <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> */}

      {/* Protected Pages (for later) */}
      {/* <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} /> */}

      {/* Fallback Route */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}

export default App;
