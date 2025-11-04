import { useEffect, useState } from "react";
import apiRequest from "../apiClient";

export default function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    apiRequest("/auth/me", { method: "GET", auth: true })
      .then((data) => {
        // backend me() returns { user: {...} }
        setUser(data.user || null);
        setLoading(false);
      })
      .catch((e) => {
        setErr(e.message || "failed to load user");
        setLoading(false);
        setUser(null);
      });
  }, []);

  return { user, loading, err };
}
