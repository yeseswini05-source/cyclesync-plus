import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import OpeningPage from "../pages/OpeningPage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";

import DashboardPage from "../pages/DashboardPage";
import SurveyPage from "../pages/SurveyPage";
import SurveyForPhasePage from "../pages/SurveyForPhasePage";
import PhaseTrackerPage from "../pages/PhaseTrackerPage";
import TrackerPage from "../pages/TrackerPage";

import RecommendationsPage from "../pages/RecommendationsPage";
import NotificationsPage from "../pages/NotificationsPage";
import PostsPage from "../pages/PostsPage";
import ChatPage from "../pages/ChatPage";
import DailyCheckinPage from "../pages/DailyCheckinPage";
import FoodRecsPage from "../pages/FoodRecsPage";
import ActivityRestPage from "../pages/ActivityRestPage";
import NutrientSignalsPage from "../pages/NutrientSignalsPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<OpeningPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* PUBLIC FEATURE PREVIEW PAGES */}
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/daily-checkin" element={<DailyCheckinPage />} />
      <Route path="/food-recs" element={<FoodRecsPage />} />
      <Route path="/activity-rest" element={<ActivityRestPage />} />
      <Route path="/nutrient-signals" element={<NutrientSignalsPage />} />

      {/* ✅ SURVEY MUST BE DONE BEFORE ANY OTHER APP ACCESS */}
      <Route
        path="/survey"
        element={
          <ProtectedRoute requireSurvey>
            <SurveyPage />
          </ProtectedRoute>
        }
      />

      {/* ✅ Only opens if user clicks — NOT forced */}
      <Route
        path="/survey-phase"
        element={
          <ProtectedRoute>
            <SurveyForPhasePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/phase-tracker"
        element={
          <ProtectedRoute>
            <PhaseTrackerPage />
          </ProtectedRoute>
        }
      />

      {/* AUTHENTICATED NORMAL ROUTES */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
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

      <Route
        path="/recommendations"
        element={
          <ProtectedRoute>
            <RecommendationsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
