import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import OpeningPage from "../pages/OpeningPage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import DashboardPage from "../pages/DashboardPage";
import SurveyPage from "../pages/SurveyPage";
import TrackerPage from "../pages/TrackerPage";

// if you have other pages, import them here too

export default function AppRouter() {
  return (
    <Routes>
      {/*
        DEFAULT ENTRY:
        When the app loads at "/", we show OpeningPage first.
      */}
      <Route path="/" element={<OpeningPage />} />

      {/* after opening animation you can navigate("/landing") */}
      <Route path="/landing" element={<LandingPage />} />

      {/* auth-related */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* gated pages */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/survey"
        element={
          <ProtectedRoute>
            <SurveyPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tracker"
        element={
          <ProtectedRoute>
            <TrackerPage />
          </ProtectedRoute>
        }
      />
      

      {/* you can keep any dev / debug routes if you had them */}
      {/* <Route path="/dev-tools" element={<DevToolsDebugLogin />} /> */}
    </Routes>
  );
}
