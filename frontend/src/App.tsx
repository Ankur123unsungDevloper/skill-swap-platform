// src/App.tsx
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from './main/landing-page/landing-page';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
