import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to the Landing Page</h1>
      <p>This page is shown when the URL is `/`</p>
    </div>
  );
};

export default LandingPage;
