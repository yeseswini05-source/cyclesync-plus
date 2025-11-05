// frontend/src/pages/SurveyForPhasePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * SurveyForPhasePage
 *
 * Purpose:
 *  - Minimal "phase onboarding" survey to collect the first-day-of-last-period
 *    (or let user estimate) and optional cycle length + symptoms/note.
 *  - POSTs to /api/survey/phase-log (backend) — fallback to localStorage when offline.
 *  - Redirects to /phase-tracker on success.
 *
 * UX decisions:
 *  - Inline toasts (success/error) instead of alerts.
 *  - Mobile-friendly Tailwind layout.
 *  - Basic validation: date must be <= today, cycle length between 18 and 45.
 *
 * NOTE: If your backend endpoint differs, replace `ENDPOINT` below.
 */

const ENDPOINT = "/api/survey/phase-log";

export default function SurveyForPhasePage() {
  const [cycleStartDate, setCycleStartDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [dontRemember, setDontRemember] = useState(false);
  const [symptoms, setSymptoms] = useState({
    cramps: false,
    bloating: false,
    fatigue: false,
  });
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message }
  const navigate = useNavigate();

  const token =
    localStorage.getItem("cyclesync_token") ||
    localStorage.getItem("cs_auth_token") ||
    localStorage.getItem("token") ||
    "";

  function showToast(obj) {
    setToast(obj);
    setTimeout(() => setToast(null), 4500);
  }

  function validateInputs(dateStr, len) {
    if (!dontRemember) {
      if (!dateStr) return "Please select the first day of your last period (or choose I don't remember).";
      const date = new Date(dateStr);
      const today = new Date();
      // zero the time part for comparison
      date.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      if (isNaN(date.getTime())) return "Invalid date.";
      if (date > today) return "Date can't be in the future.";
      // unlikely but check very old date
      const earliest = new Date();
      earliest.setFullYear(earliest.getFullYear() - 2); // allow up to 2 years back
      if (date < earliest) return "Please enter a more recent date (within 2 years).";
    }

    const n = Number(len);
    if (!n || n < 18 || n > 45) return "Cycle length should be between 18 and 45 days (use 28 if unsure).";

    return null;
  }

  // estimate a plausible cycle start date when user doesn't remember:
  // - choose today - Math.round(cycleLength / 2) as a middle-of-cycle guess
  function estimateStartDate(len) {
    const daysBack = Math.round(len / 2);
    const d = new Date();
    d.setDate(d.getDate() - daysBack);
    // format YYYY-MM-DD for input
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // form-level validation
    const validationError = validateInputs(cycleStartDate, cycleLength);
    if (validationError) {
      showToast({ type: "error", message: validationError });
      return;
    }

    if (!token) {
      showToast({ type: "error", message: "You need to be logged in to track your cycle. Redirecting to login..." });
      setTimeout(() => navigate("/login"), 900);
      return;
    }

    setSaving(true);

    // final payload
    const startDateToSend = dontRemember ? estimateStartDate(cycleLength) : cycleStartDate;
    const payload = {
      cycleStartDate: startDateToSend,
      cycleLength: Number(cycleLength),
      symptoms,
      note: note.trim(),
      source: "survey-for-phase",
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast({ type: "success", message: "Saved — redirecting to Phase Tracker…" });
        setTimeout(() => navigate("/phase-tracker"), 800);
        return;
      }

      // server responded with error -> show message from server if present
      let errMsg = `Failed to log cycle (${res.status})`;
      try {
        const errJson = await res.json();
        if (errJson?.message) errMsg = errJson.message;
      } catch {}
      // fallback: save locally
      savePendingLocally(payload);
      showToast({ type: "error", message: `${errMsg}. Saved locally — will sync when online.` });
      setTimeout(() => navigate("/phase-tracker"), 900);
    } catch (err) {
      console.error("Network/submit error:", err);
      // network error -> save to localStorage for later sync
      savePendingLocally(payload);
      showToast({ type: "error", message: "Network error — saved locally and will sync later." });
      setTimeout(() => navigate("/phase-tracker"), 900);
    } finally {
      setSaving(false);
    }
  }

  function savePendingLocally(payload) {
    try {
      const key = "pending_phase_logs";
      const raw = localStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift({ ...payload, createdAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(arr.slice(0, 50))); // keep last 50
    } catch (err) {
      console.error("Failed to save pending locally:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7f9] to-white py-8 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-pink-700 mb-2">Quick Phase Setup</h2>
        <p className="text-sm text-gray-600 mb-4">
          To start phase tracking we need your <strong>first day of last period</strong>. If you don't remember it,
          choose <em>I don't remember</em> and we'll estimate so you can start now.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">First day of last period</label>
            <input
              type="date"
              value={cycleStartDate}
              onChange={(e) => setCycleStartDate(e.target.value)}
              disabled={dontRemember}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 ${
                dontRemember ? "bg-gray-50 text-gray-400" : "bg-white"
              }`}
              max={new Date().toISOString().slice(0, 10)}
            />
            <div className="flex items-center gap-2 mt-2">
              <input
                id="dont-remember"
                type="checkbox"
                checked={dontRemember}
                onChange={(e) => setDontRemember(e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="dont-remember" className="text-sm text-gray-600">
                I don't remember — estimate for me
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Cycle length (days)</label>
            <input
              type="number"
              min="18"
              max="45"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              className="w-24 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
            <p className="text-xs text-gray-500 mt-1">Typical cycle length (default 28).</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Symptoms (optional)</label>
            <div className="flex flex-wrap gap-3">
              {[
                { key: "cramps", label: "Cramps" },
                { key: "bloating", label: "Bloating" },
                { key: "fatigue", label: "Fatigue" },
              ].map((s) => (
                <label key={s.key} className="inline-flex items-center gap-2 text-sm bg-[#fff5f7] px-3 py-1 rounded-full border">
                  <input
                    type="checkbox"
                    checked={symptoms[s.key]}
                    onChange={(e) => setSymptoms({ ...symptoms, [s.key]: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">{s.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Notes (optional)</label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Anything to remember (cravings, context…) "
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 resize-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-pink-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-pink-700 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save & start tracking"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-3 py-2 rounded-lg border text-sm text-gray-700"
            >
              Cancel
            </button>
          </div>

          <div className="text-xs text-gray-500">
            We won't share this data. You can update or remove it later from your profile.
          </div>
        </form>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed left-1/2 transform -translate-x-1/2 bottom-8 z-50 max-w-lg w-full px-4`}
          aria-live="polite"
        >
          <div
            className={`mx-auto rounded-lg p-3 shadow-lg border ${
              toast.type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
            }`}
          >
            <div className="text-sm text-gray-800">{toast.message}</div>
          </div>
        </div>
      )}
    </div>
  );
}
