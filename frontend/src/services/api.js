// frontend/src/services/api.js
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// create a simple axios instance (we'll use it for manual requests)
const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 8000,
});

// helper to attach token if present
function authHeaders(optionalToken) {
  const token = optionalToken || localStorage.getItem("cyclesync_token") || localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* ===========================
   AUTH
   endpoints expected:
   POST  /api/auth/login
   POST  /api/auth/register
   GET   /api/auth/me
   =========================== */

export async function loginUser(payload) {
  // payload: { email, password }
  const res = await axiosInstance.post("/auth/login", payload);
  return res; // caller will inspect res.data
}

export async function registerUser(payload) {
  const res = await axiosInstance.post("/auth/register", payload);
  return res;
}

export async function fetchCurrentUser(optionalToken) {
  const res = await axiosInstance.get("/auth/me", {
    headers: authHeaders(optionalToken),
  });
  return res;
}

/* ===========================
   SURVEY helpers
   We'll try the most-common endpoints safely:
   GET /api/survey/today
   GET /api/survey/check-today
   GET /api/survey/today-status
   POST /api/survey/submit
   GET  /api/survey/results
   =========================== */

async function tryGet(paths, config) {
  let lastErr = null;
  for (const p of paths) {
    try {
      const r = await axiosInstance.get(p, config);
      return r;
    } catch (err) {
      lastErr = err;
      // continue on 404; for other codes propagate
      if (err.response && err.response.status !== 404) throw err;
    }
  }
  // none succeeded
  const e = new Error("All GET endpoints failed");
  e.original = lastErr;
  throw e;
}

export async function checkSurveyToday(optionalToken) {
  const paths = [
    "/survey/today",
    "/survey/check-today",
    "/survey/today-status",
    "/survey/status",
  ];
  const config = { headers: authHeaders(optionalToken) };
  const res = await tryGet(paths, config);
  return res; // caller inspects res.data (e.g. { completedToday: true } or { done: true } or { filled: true })
}

export async function submitDailyCheckin(payload, optionalToken) {
  const paths = [
    "/survey/submit",
    "/survey/checkin",
    "/survey/check-in",
    "/survey/checkin/submit",
  ];
  const config = { headers: authHeaders(optionalToken) };
  let lastErr = null;
  for (const p of paths) {
    try {
      const r = await axiosInstance.post(p, payload, config);
      return r;
    } catch (err) {
      lastErr = err;
      if (err.response && err.response.status !== 404) throw err;
    }
  }
  const e = new Error("All POST endpoints failed");
  e.original = lastErr;
  throw e;
}

export async function fetchDashboardSummary(optionalToken) {
  const paths = ["/survey/results", "/survey/history", "/survey/list"];
  const config = { headers: authHeaders(optionalToken) };
  return tryGet(paths, config);
}

/* ===========================
   Convenience default export (for older imports like `import api from "../services/api"`)
   and a named export object for destructuring imports.
   =========================== */

const api = {
  loginUser,
  registerUser,
  fetchCurrentUser,
  checkSurveyToday,
  submitDailyCheckin,
  fetchDashboardSummary,
};

export default api;
