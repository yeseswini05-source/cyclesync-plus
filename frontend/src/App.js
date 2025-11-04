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
import Hero from "../pages/Hero";  // ✅ fixed import
import CycleTracker from "./pages/CycleTracker";


export default function AppRouter() {
  return (
    <Routes>

      {/* ✅ Default Route */}
      <Route path="/" element={<OpeningPage />} />

      {/* ✅ Public Pages */}
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* ✅ Protected Routes */}
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

      {/* ✅ Hero after survey (NOT replacing main / route) */}
      <Route
        path="/hero"
        element={
          <ProtectedRoute>
            <Hero />
          </ProtectedRoute>
        }
        
      />
      <Route path="/cycle-tracker" element={<CycleTracker />} />


    </Routes>
  );
}
