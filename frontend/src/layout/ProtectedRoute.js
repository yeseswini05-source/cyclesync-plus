import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, requireSurvey }) {
  const token =
    localStorage.getItem("cyclesync_token") ||
    localStorage.getItem("cs_auth_token") ||
    localStorage.getItem("token");

  const surveyDone = localStorage.getItem("survey_completed") === "true";
  const location = useLocation();

  if (!token) return <Navigate to="/login" replace />;

  // if survey not done → force to survey
  if (requireSurvey && !surveyDone && location.pathname !== "/survey") {
    return <Navigate to="/survey" replace />;
  }

  return children;
}
