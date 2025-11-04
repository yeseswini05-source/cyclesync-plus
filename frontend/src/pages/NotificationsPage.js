import React, { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [notes, setNotes] = useState([]);

  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    async function loadNotifications() {
      try {
        const res = await fetch(`${API_BASE}/notifications`);
        const data = await res.json();
        setNotes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    }
    loadNotifications();
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold text-roseDeep mb-6">
        Recommendations for You
      </h1>

      <p className="text-night/60 text-sm mb-8">
        Smart nudges to help you nourish, rest, and recover — synced with where
        your body is right now.
      </p>

      <div className="space-y-4">
        {notes.length === 0 && (
          <div className="text-night/50 text-sm text-center">
            You're all caught up ✨
          </div>
        )}

        {notes.map((n, idx) => (
          <div
            key={n._id || idx}
            className="bg-white border border-roseMain/20 rounded-xl shadow-soft p-4"
          >
            <div className="text-[11px] text-night/50 mb-1">
              {new Date(n.createdAt || Date.now()).toLocaleString()}
            </div>

            <div className="font-medium text-roseDeep text-sm leading-snug mb-1">
              {n.title || "Recommendation"}
            </div>

            <div className="text-night/80 text-[13px] leading-relaxed whitespace-pre-wrap">
              {n.body || n.message || "Remember to hydrate and get sunlight 💖"}
            </div>

            {n.type && (
              <div className="mt-3 inline-block text-[11px] font-medium rounded-full bg-roseBg/60 border border-roseMain/30 text-roseDeep px-3 py-1 shadow-soft">
                {n.type === "food"
                  ? "Food"
                  : n.type === "sleep"
                  ? "Sleep"
                  : n.type === "health"
                  ? "Health"
                  : n.type}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
