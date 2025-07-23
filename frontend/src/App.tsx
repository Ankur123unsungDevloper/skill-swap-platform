import { Routes, Route } from 'react-router-dom';
import LandingPage from './main/landing-page/landing-page';
import DashBoard from './dashboard/dashboard';

const App= () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashBoard />} />
    </Routes>
  );
};

export default App;
