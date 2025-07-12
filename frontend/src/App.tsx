import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Landing from './pages/Landing';
import SignInPage from './routes/sign-in';
import SignUpPage from './routes/sign-up';
import Dashboard from './pages/Dashboard';

// Clerk wrapper
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/sign-in" element={ <SignInPage /> } />
      <Route path="/sign-up" element={<SignUpPage />} />

      {/* Protected Routes */}
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}

export default App;
