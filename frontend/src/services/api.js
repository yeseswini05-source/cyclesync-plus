// src/services/api.js
import apiRequest from "../apiClient"; // apiClient is directly under src/

/**
 * AUTH
 * backend: app.use("/api/auth", authRoutes)
 * routes/auth.js: POST /register, POST /login, GET /me
 */
export function registerUser(payload) {
  // { name, email, password, avatar, ... }
  return apiRequest("/api/auth/register", {
    method: "POST",
    auth: false,
    body: payload,
  });
}

export function loginUser(payload) {
  // { email, password }
  return apiRequest("/api/auth/login", {
    method: "POST",
    auth: false,
    body: payload,
  });
}

export function fetchCurrentUser() {
  // GET /api/auth/me
  return apiRequest("/api/auth/me", { method: "GET", auth: true });
}

/**
 * FEATURES
 * backend: app.use("/api", apiRoutes) and app.use("/api/survey", surveyRoutes)
 */

export function fetchCurrentPhase() {
  // GET /api/phase
  return apiRequest("/api/phase", { method: "GET" });
}

export function submitDailyCheckin(payload) {
  // POST /api/survey/submit
  return apiRequest("/api/survey/submit", {
    method: "POST",
    body: payload,
  });
}

export function fetchFoodRecs() {
  // GET /api/recommendations
  return apiRequest("/api/recommendations", { method: "GET" });
}

export function fetchNutrientSignals() {
  // GET /api/recommendations
  return apiRequest("/api/recommendations", { method: "GET" });
}

export function fetchActivityRestGuidance() {
  // GET /api/recommendations
  return apiRequest("/api/recommendations", { method: "GET" });
}

/**
 * DASHBOARD
 * GET /api/survey/results
 */
export function fetchDashboardSummary() {
  return apiRequest("/api/survey/results", { method: "GET" });
}

/**
 * DEFAULT EXPORT
 * so `import api from "../services/api"` still works
 */
const api = {
  registerUser,
  loginUser,
  fetchCurrentUser,
  fetchCurrentPhase,
  submitDailyCheckin,
  fetchFoodRecs,
  fetchNutrientSignals,
  fetchActivityRestGuidance,
  fetchDashboardSummary,
};

export default api;
