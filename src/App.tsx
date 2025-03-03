import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

import NotFound from './pages/NotFound';
import LandingPage from "./pages/landingpage/LandingPage";
import Dashboard from './pages/autheduser/Dashboard';

import LoginPage from './pages/authfinder/Login';
import AccountSelection from "./pages/usertypeselect";
import RegisterFinder from "./pages/authfinder/Register";
import RegisterFacility from "./pages/authmedicalfacility/Register";
import FinderHomePage from "./pages/homepages/FinderHomePage";
import FacilityDashboard from "./pages/homepages/FacilityDashboard";

const App: React.FC = () => {
  const isFinder = true; // Replace this with actual authentication logic
  const isFacility = true; // Replace this with actual authentication logic

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={isFinder ? <FinderHomePage /> : <Navigate to="/login" />}

        />
        <Route
          path="/dashboard"
          element={isFacility ? <FacilityDashboard /> : <Navigate to="/login" />}

        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/account-type-select" element={<AccountSelection />} />
        <Route path="/register-finder" element={<RegisterFinder />} />
        <Route path="/register-facility" element={<RegisterFacility />} />

        

      </Routes>
    </Router>
  );
};

export default App;
