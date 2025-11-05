import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function SurveyPage() {
  const API_BASE = "http://localhost:5000";
  const nav = useNavigate();

  // form state
  const [energy, setEnergy] = useState("");
  const [mood, setMood] = useState("");
  const [cramps, setCramps] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [foodRating, setFoodRating] = useState("");
  const [meal1, setMeal1] = useState(false);
  const [meal2, setMeal2] = useState(false);
  const [meal3, setMeal3] = useState(false);
  const [note, setNote] = useState("");

  // history of previous submissions
  const [history, setHistory] = useState([]);
  const [saving, setSaving] = useState(false);

  // load previous survey logs
  useEffect(() => {
    async function fetchHistory() {
      try {
        const token =
          localStorage.getItem("cyclesync_token") ||
          localStorage.getItem("cs_auth_token");

        const res = await fetch(`${API_BASE}/api/survey/history`, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        });

        const data = await res.json();
        setHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading survey history:", err);
      }
    }
    fetchHistory();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("cyclesync_token");
      console.log("Token before submit:", token);

      const res = await fetch("http://localhost:5000/api/survey/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          energy,
          mood,
          cramps,
          sleepHours,
          foodRating,
          meal1,
          meal2,
          meal3,
          note,
        }),
      });

      const data = await res.json();
      console.log("Survey response:", data);

      if (!res.ok) throw new Error(data?.message || "Failed to save survey");

      // clear form
      setEnergy("");
      setMood("");
      setCramps("");
      setSleepHours("");
      setFoodRating("");
      setMeal1(false);
      setMeal2(false);
      setMeal3(false);
      setNote("");

nav("/hero");   // if your hero page is on "/"
    } catch (err) {
      console.error("Error submitting survey:", err);
      alert(err.message || "Survey submission failed");
    } finally {
      setSaving(false);
    }
  }

  // --- tiny inline chart logic ---------------------------------
  function energyToNum(e) {
    if (e === "high") return 3;
    if (e === "medium") return 2;
    if (e === "low") return 1;
    return 0;
  }

  const recentPoints = useMemo(() => {
    const last7 = [...history].slice(0, 7).reverse();

    return last7.map((entry) => {
      return {
        ts:
          entry.createdAt ||
          entry.timestamp ||
          entry.date ||
          new Date().toISOString(),
        energyVal: energyToNum(entry.energy),
        sleepVal: entry.sleepHours ? Number(entry.sleepHours) : 0,
      };
    });
  }, [history]);

  const W = 320;
  const H = 120;
  const PADDING = 20;

  const xForIndex = (idx, total) => {
    if (total <= 1) return PADDING;
    const innerW = W - PADDING * 2;
    return PADDING + (innerW * idx) / (total - 1);
  };

  const yForEnergy = (val) => {
    const min = 0;
    const max = 3;
    const innerH = H - PADDING * 2;
    const ratio = (val - min) / (max - min || 1);
    return H - PADDING - innerH * ratio;
  };

  const yForSleep = (val) => {
    const min = 0;
    const max = 10;
    const innerH = H - PADDING * 2;
    const ratio = (val - min) / (max - min || 1);
    return H - PADDING - innerH * ratio;
  };

  const energyPolyline = recentPoints
    .map(
      (pt, idx) =>
        `${xForIndex(idx, recentPoints.length)},${yForEnergy(pt.energyVal)}`
    )
    .join(" ");

  const sleepPolyline = recentPoints
    .map(
      (pt, idx) =>
        `${xForIndex(idx, recentPoints.length)},${yForSleep(pt.sleepVal)}`
    )
    .join(" ");

  const cursiveStyle = { fontFamily: "cursive" };

  return (
    <div className="min-h-screen px-4 py-10 flex justify-center bg-[#4F5D2C]">
      <main className="relative max-w-4xl w-full">
        {/* PURE coffee-paper sheet */}
        <section
          className="
            border border-[#D3C1A4]
            rounded-[32px]
            shadow-[0_24px_60px_rgba(0,0,0,0.22)]
            px-7 sm:px-10 py-8 sm:py-10
          "
          style={{
            backgroundImage: "url('/home/coffee-paper.jpg')",
            backgroundSize: "cover",       // fill whole sheet
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
          }}
        >
          {/* header */}
          <header className="text-center mb-8">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#7C6A4A]">
              DAILY CHECK-IN
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl tracking-[0.22em] text-[#2F321D]">
              TODAY&apos;S ENTRY
            </h1>

            <div className="mt-4 flex items-center justify-center gap-3 text-[11px] text-[#7C6A4A] tracking-[0.18em] uppercase">
              <span>DAY</span>
              <span className="inline-block w-12 border-b border-[#CBB79B]" />
              <span>MONTH</span>
              <span className="inline-block w-12 border-b border-[#CBB79B]" />
              <span>YEAR</span>
            </div>
          </header>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-7 sm:space-y-8">
            {/* Energy */}
            <section>
              <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-center text-[#6A5A3D]">
                ENERGY TODAY
              </p>
              <select
                style={cursiveStyle}
                className="
                  mt-3 w-full bg-transparent outline-none
                  border-0 border-b border-[#D7C7AA]
                  pb-1 text-[13px] sm:text-[14px] text-[#3A311F]
                "
                value={energy}
                onChange={(e) => setEnergy(e.target.value)}
              >
                <option value="">Select…</option>
                <option value="high">High / motivated</option>
                <option value="medium">Okay / normal</option>
                <option value="low">Low / drained</option>
              </select>
            </section>

            {/* Mood */}
            <section>
              <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-center text-[#6A5A3D]">
                MOOD TODAY
              </p>
              <select
                style={cursiveStyle}
                className="
                  mt-3 w-full bg-transparent outline-none
                  border-0 border-b border-[#D7C7AA]
                  pb-1 text-[13px] sm:text-[14px] text-[#3A311F]
                "
                value={mood}
                onChange={(e) => setMood(e.target.value)}
              >
                <option value="">Select…</option>
                <option value="calm">Calm</option>
                <option value="irritable">Irritable</option>
                <option value="sad">Sad / heavy</option>
                <option value="anxious">Anxious / on edge</option>
              </select>
            </section>

            {/* Cramps */}
            <section>
              <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-center text-[#6A5A3D]">
                CRAMPS / PAIN
              </p>
              <select
                style={cursiveStyle}
                className="
                  mt-3 w-full bg-transparent outline-none
                  border-0 border-b border-[#D7C7AA]
                  pb-1 text-[13px] sm:text-[14px] text-[#3A311F]
                "
                value={cramps}
                onChange={(e) => setCramps(e.target.value)}
              >
                <option value="">Select…</option>
                <option value="none">None</option>
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe pls help 😭</option>
              </select>
            </section>

            {/* Sleep */}
            <section>
              <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-center text-[#6A5A3D]">
                SLEEP LAST NIGHT (HOURS)
              </p>
              <input
                style={cursiveStyle}
                type="number"
                min="0"
                max="24"
                step="0.5"
                className="
                  mt-3 w-full bg-transparent outline-none
                  border-0 border-b border-[#D7C7AA]
                  pb-1 text-[13px] sm:text-[14px] text-[#3A311F]
                "
                placeholder="e.g. 6.5"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
              />
            </section>

            {/* Food rating */}
            <section>
              <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-center text-[#6A5A3D]">
                HOW WELL DID YOU FEED YOURSELF TODAY?
              </p>
              <select
                style={cursiveStyle}
                className="
                  mt-3 w-full bg-transparent outline-none
                  border-0 border-b border-[#D7C7AA]
                  pb-1 text-[13px] sm:text-[14px] text-[#3A311F]
                "
                value={foodRating}
                onChange={(e) => setFoodRating(e.target.value)}
              >
                <option value="">Select…</option>
                <option value="good">
                  Good (real meals / enough protein / minerals)
                </option>
                <option value="okay">
                  Okay (some proper food, some junk / skipped)
                </option>
                <option value="poor">
                  Barely ate / mostly junk / undernourished
                </option>
              </select>
            </section>

            {/* Meals checklist */}
            <section>
              <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-center text-[#6A5A3D]">
                MEALS YOU ACTUALLY ATE TODAY
              </p>
              <div className="mt-3 flex flex-col gap-2 text-[13px] text-[#3A311F]">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-[#C4B394]"
                    checked={meal1}
                    onChange={(e) => setMeal1(e.target.checked)}
                  />
                  <span>Meal 1 / breakfast-ish</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-[#C4B394]"
                    checked={meal2}
                    onChange={(e) => setMeal2(e.target.checked)}
                  />
                  <span>Meal 2 / lunch-ish</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-[#C4B394]"
                    checked={meal3}
                    onChange={(e) => setMeal3(e.target.checked)}
                  />
                  <span>Meal 3 / dinner-ish</span>
                </label>
              </div>
            </section>

            {/* Free note */}
            <section>
              <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-center text-[#6A5A3D]">
                ANYTHING YOUR FUTURE SELF SHOULD REMEMBER ABOUT TODAY?
              </p>
              <textarea
                style={cursiveStyle}
                rows={3}
                className="
                  mt-3 w-full bg-transparent outline-none resize-none
                  border-b border-[#D7C7AA]
                  pb-1 text-[13px] sm:text-[14px] text-[#3A311F] leading-relaxed
                "
                placeholder="sleepy, craving sugar, lower back sore… anything you want to remember."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </section>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[11px] sm:text-xs tracking-[0.18em] uppercase text-[#7C6A4A]">
                You&apos;re cyclical, not inconsistent.
              </p>

              <button
                type="submit"
                disabled={saving}
                className="
                  inline-flex items-center justify-center
                  px-6 py-2.5 rounded-full
                  text-[12px] font-semibold tracking-[0.16em] uppercase
                  bg-[#4F5D2C]
                  text-[#FDF7EA]
                  shadow-[0_12px_30px_rgba(0,0,0,0.28)]
                  hover:bg-[#424C24]
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transition-colors
                "
              >
                {saving ? "Saving..." : "Save today"}
              </button>
            </div>
          </form>
        </section>

        {/* Trends + history (unchanged) */}
        <section className="mt-8 space-y-6 mb-6">
          {/* Trends graph */}
          <div className="bg-[#F9F2E3]/90 border border-[#D3C1A4] rounded-2xl shadow-[0_14px_34px_rgba(0,0,0,0.18)] p-4 text-sm">
            <h2 className="text-base font-semibold text-[#3A321F] mb-2">
              Trend (last {recentPoints.length} days)
            </h2>
            {recentPoints.length <= 1 ? (
              <div className="text-[#7A6A4B] text-sm">
                Add a few check-ins and we’ll start drawing your patterns 💗
              </div>
            ) : (
              <>
                <div className="text-[12px] text-[#7A6A4B] mb-3 leading-relaxed">
                  • Olive line = Energy (high → low) · Dark line = Sleep hours
                </div>

                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="w-full h-[140px]"
                  preserveAspectRatio="none"
                >
                  <rect
                    x={0}
                    y={0}
                    width={W}
                    height={H}
                    rx={8}
                    fill="#F5EBD7"
                    stroke="#D3C1A4"
                  />

                  {energyPolyline && (
                    <polyline
                      fill="none"
                      stroke="#64733A"
                      strokeWidth="2"
                      points={energyPolyline}
                    />
                  )}

                  {sleepPolyline && (
                    <polyline
                      fill="none"
                      stroke="#3D3A2B"
                      strokeWidth="2"
                      points={sleepPolyline}
                    />
                  )}

                  {recentPoints.map((pt, idx) => (
                    <circle
                      key={`e-${idx}`}
                      cx={xForIndex(idx, recentPoints.length)}
                      cy={yForEnergy(pt.energyVal)}
                      r={3}
                      fill="#64733A"
                    />
                  ))}

                  {recentPoints.map((pt, idx) => (
                    <circle
                      key={`s-${idx}`}
                      cx={xForIndex(idx, recentPoints.length)}
                      cy={yForSleep(pt.sleepVal)}
                      r={3}
                      fill="#3D3A2B"
                    />
                  ))}
                </svg>
              </>
            )}
          </div>

          {/* History list */}
          <div className="bg-[#F9F2E3]/90 border border-[#D3C1A4] rounded-2xl shadow-[0_14px_34px_rgba(0,0,0,0.18)] p-4 text-sm">
            <h2 className="text-base font-semibold text-[#3A321F] mb-4">
              Your recent check-ins
            </h2>

            {history.length === 0 && (
              <div className="text-[#7A6A4B] text-sm">
                No history yet. Log your first check-in 💕
              </div>
            )}

            <div className="space-y-3">
              {history.map((entry, idx) => (
                <div
                  key={entry._id || idx}
                  className="bg-[#FDF7EA] border border-[#D9C8AA] rounded-xl p-3 text-[13px] text-[#3A321F]"
                >
                  <div className="text-[11px] text-[#8B7A59] mb-1">
                    {new Date(entry.createdAt || Date.now()).toLocaleString()}
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 leading-relaxed">
                    <span>
                      <span className="font-semibold">Energy:</span>{" "}
                      {entry.energy || "-"}
                    </span>
                    <span>
                      <span className="font-semibold">Mood:</span>{" "}
                      {entry.mood || "-"}
                    </span>
                    <span>
                      <span className="font-semibold">Cramps:</span>{" "}
                      {entry.cramps || "-"}
                    </span>
                    <span>
                      <span className="font-semibold">Sleep:</span>{" "}
                      {entry.sleepHours ? `${entry.sleepHours}h` : "-"}
                    </span>
                    <span>
                      <span className="font-semibold">Food:</span>{" "}
                      {entry.foodRating || "-"}
                    </span>
                    <span>
                      <span className="font-semibold">Meals:</span>{" "}
                      {[
                        entry.meal1 ? "1" : null,
                        entry.meal2 ? "2" : null,
                        entry.meal3 ? "3" : null,
                      ]
                        .filter(Boolean)
                        .join(", ") || "none"}
                    </span>
                  </div>

                  {entry.note && (
                    <div className="mt-2 text-[13px] leading-relaxed whitespace-pre-wrap">
                      {entry.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
