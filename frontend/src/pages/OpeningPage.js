import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OpeningPage.css";

// two-line quote using \n so CSS can break it into 2 lines
const FULL_QUOTE =
  "A woman’s body is a living forest — complex and ever-changing;\nit deserves the same care and wonder as nature itself.";

export default function OpeningPage() {
  // staged reveal flags
  const [showDecor, setShowDecor] = useState(false);          // greens + branch
  const [showFlowerLeft, setShowFlowerLeft] = useState(false);
  const [showFlowerMirror, setShowFlowerMirror] = useState(false);
  const [showFlowerRight, setShowFlowerRight] = useState(false);
  const [showAltWoman, setShowAltWoman] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // typewriter state
  const [typedQuote, setTypedQuote] = useState("");
  const [quoteDone, setQuoteDone] = useState(false); // ✅ new flag

  const navigate = useNavigate();

  useEffect(() => {
    // sequence of reveals:
    // 0.8s -> greens-bottom + branch-top-right
    // 2s   -> left flower
    // 4s   -> mirrored flower
    // 6s   -> right flower
    // 8s   -> swap woman (woman2) + show Explore btn
    const timers = [
      setTimeout(() => setShowDecor(true), 800),
      setTimeout(() => setShowFlowerLeft(true), 2000),
      setTimeout(() => setShowFlowerMirror(true), 4000),
      setTimeout(() => setShowFlowerRight(true), 6000),
      setTimeout(() => {
        setShowAltWoman(true);
        setShowButton(true);
      }, 8000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // typewriter effect starts once decor is visible
  useEffect(() => {
    if (!showDecor) return;

    setTypedQuote("");
    setQuoteDone(false); // reset if we ever re-run
    let index = 0;
    const speed = 40; // ms per character

    const interval = setInterval(() => {
      if (index < FULL_QUOTE.length) {
        setTypedQuote((prev) => prev + FULL_QUOTE[index]);
        index += 1;
      } else {
        clearInterval(interval);
        setQuoteDone(true); // ✅ mark as finished
      }
    }, speed);

    return () => clearInterval(interval);
  }, [showDecor]);

  // ✅ Only AFTER quote is fully typed:
  // wait 5 seconds, then go to landing page
  useEffect(() => {
    if (!quoteDone) return;

    const timer = setTimeout(() => {
      navigate("/landing"); // change path here if your route is different
    }, 5000);

    return () => clearTimeout(timer);
  }, [quoteDone, navigate]);

  return (
    <section className="opening-section">
      {/* Static background image */}
      <img src="/hero/bg-yellow.png" alt="background" className="opening-bg" />

      {/* top-right branch decoration (appears first) */}
      <img
        src="/hero/branch-right-topcorner.png"
        alt="branch top right"
        className={`branch-top-right ${showDecor ? "show-decor" : ""}`}
      />

      {/* bottom greens (full width, appears first) */}
      <img
        src="/hero/greens-bottom.png"
        alt="bottom greens"
        className={`greens-bottom ${showDecor ? "show-decor" : ""}`}
      />

      <div className="opening-stage">
        {/* main woman first, then fade to alt woman */}
        <img
          src="/hero/woman.png"
          alt="main woman"
          className={`woman ${showAltWoman ? "fade-out" : "fade-in"}`}
        />

        <img
          src="/hero/women2.png"
          alt="alternate woman"
          className={`woman woman-alt ${showAltWoman ? "fade-in" : "fade-out"}`}
        />

        {/* flower-left */}
        <img
          src="/hero/flower-left.png"
          alt="pink hibiscus left"
          className={`flower-left ${showFlowerLeft ? "show" : ""}`}
        />

        {/* mirrored flower-left */}
        <img
          src="/hero/flower-left.png"
          alt="mirrored hibiscus"
          className={`flower-left-mirror ${showFlowerMirror ? "show" : ""}`}
        />

        {/* flower-right */}
        <img
          src="/hero/flower-right.png"
          alt="purple cluster right"
          className={`flower-right ${showFlowerRight ? "show" : ""}`}
        />

        {/* bottom leaves (foreground) */}
        <img
          src="/hero/leaves-bottom-left.png"
          alt="foreground leaves"
          className="bottom-leaves"
        />

        {/* Quote with typewriter effect */}
        <div className="opening-quote-wrapper quote-over-head">
          <p className="opening-quote-text short">
            {typedQuote}
          </p>
        </div>

        {/* Explore button (still works as manual skip if you keep it) */}
        {showButton && (
          <button
            className="explore-btn"
            onClick={() => navigate("/landing")}
          >
            Explore
          </button>
        )}
      </div>
    </section>
  );
}
