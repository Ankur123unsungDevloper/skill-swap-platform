import { Routes, Route } from 'react-router-dom';
import LandingPage from './main/landing-page/landing-page';
import DashBoard from './dashboard/dashboard';
import SignInPage from './routes/sign-in';
import SignUpPage from './routes/sign-up';

const App= () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />
      <Route path="/dashboard" element={<DashBoard />} />
    </Routes>
  );
};

export default App;
