// src/apiClient.js

const API_BASE =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

async function apiRequest(
  path,
  { method = "GET", body, auth = true } = {}
) {
  const headers = {
    "Content-Type": "application/json",
  };

  // pick up token from either key
  const token =
    localStorage.getItem("cyclesync_token") ||
    localStorage.getItem("cs_auth_token");

  if (auth && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });
  } catch (err) {
    // network / CORS / server down
    throw new Error(`Network error: ${err.message}`);
  }

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg =
      typeof data === "string"
        ? data
        : data?.message || data?.error || data?.msg || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}

export default apiRequest;
