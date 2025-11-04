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
import TrackerPage from "../pages/TrackerPage";
import RecommendationsPage from "../pages/RecommendationsPage";
import NotificationsPage from "../pages/NotificationsPage";

import PostsPage from "../pages/PostsPage";
import ChatPage from "../pages/ChatPage";

/* new feature marketing / explainer pages */
import PhaseTrackerPage from "../pages/PhaseTrackerPage.js";
import DailyCheckinPage from "../pages/DailyCheckinPage.js";
import FoodRecsPage from "../pages/FoodRecsPage.js";
import ActivityRestPage from "../pages/ActivityRestPage.js";
import NutrientSignalsPage from "../pages/NutrientSignalsPage.js";

export default function AppRouter() {
  return (
    <Routes>
      {/* default entry splash */}
      <Route path="/" element={<OpeningPage />} />
      <Route path="/opening" element={<OpeningPage />} />

      {/* landing/marketing app home after intro */}
      <Route path="/landing" element={<LandingPage />} />

      {/* auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* community-ish / public */}
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/chat" element={<ChatPage />} />

      {/* public feature pages (from landing cards) */}
      <Route path="/phase-tracker" element={<PhaseTrackerPage />} />
      <Route path="/daily-checkin" element={<DailyCheckinPage />} />
      <Route path="/food-recs" element={<FoodRecsPage />} />
      <Route path="/activity-rest" element={<ActivityRestPage />} />
      <Route path="/nutrient-signals" element={<NutrientSignalsPage />} />

      {/* protected/private user stuff */}
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

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
