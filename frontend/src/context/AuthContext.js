// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCurrentUser } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);     // logged in user object
  const [loading, setLoading] = useState(true); // true until we check /auth/me once

  // called from LoginPage after successful login
  function login(token, userData) {
    // token was already saved to localStorage in LoginPage,
    // we just sync React state:
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("cyclesync_token");
    setUser(null);
  }

  // when the app first loads or refreshes, try to restore the session
  useEffect(() => {
    async function bootstrap() {
      const token = localStorage.getItem("cyclesync_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
const data = await fetchCurrentUser();
setUser(data.user);
      } catch (err) {
        // token invalid/expired
        localStorage.removeItem("cyclesync_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    bootstrap();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthed: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// little hook for convenience
export function useAuth() {
  return useContext(AuthContext);
}
