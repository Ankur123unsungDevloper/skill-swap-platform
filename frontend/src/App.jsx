import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import AppLayout from './AppLayout';

// Import page components
// import Home from './(homepage)/page';
// import Login from './login/page';
// import Dashboard from './dashboard/page';
// import Browse from './browse/page';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
