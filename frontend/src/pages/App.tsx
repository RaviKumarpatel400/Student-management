import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { DashboardPage } from './DashboardPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

