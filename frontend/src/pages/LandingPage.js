import React, { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import WhyCycleSyncSection from "../components/WhyCycleSyncSection";
import PhasesSection from "../components/PhasesSection";
import NutritionSection from "../components/NutritionSection";
import AppFeaturesSection from "../components/AppFeaturesSection";
import Footer from "../components/Footer";

function LandingPage() {
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Apply dark / light background class to body dynamically
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDark]);

  // Simple auth check using stored tokens
  useEffect(() => {
    const token =
      localStorage.getItem("cyclesync_token") ||
      localStorage.getItem("cs_auth_token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <main
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        isDark ? "bg-[#1E1E1A] text-[#EEE7C9]" : "bg-[#F8F3DF] text-[#3A3F1D]"
      }`}
    >
      <Navbar isDark={isDark} />

      <section>
        <HeroSection isLoggedIn={isLoggedIn} />
      </section>

      {/* Pass setter down so toggle can control theme */}
      <section>
        <WhyCycleSyncSection setIsDark={setIsDark} />
      </section>

      <section>
        <PhasesSection />
      </section>

      <section>
        <NutritionSection />
      </section>

      <section>
        <AppFeaturesSection />
      </section>

      <Footer />
    </main>
  );
}

export default LandingPage;
