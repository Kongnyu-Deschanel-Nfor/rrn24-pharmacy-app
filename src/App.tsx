import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

import NotFound from './pages/NotFound';
import LandingPage from "./pages/landingpage/LandingPage";
import Dashboard from './pages/autheduser/Dashboard';

import LoginPage from './pages/auth/Login';

const App: React.FC = () => {
  const isAuthenticated = false; // Replace this with actual authentication logic

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
