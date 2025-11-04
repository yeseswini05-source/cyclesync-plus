import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-roseMain/10 bg-white/60 backdrop-blur-xl text-center">
      <div className="max-w-6xl mx-auto px-4 py-8 text-[12px] leading-relaxed text-night/60">
        <div className="font-medium text-night/80">
          CycleSync Plus
        </div>
        <div className="text-night/50">
          Personal cycle tracking, mood journaling, nutrition guidance.
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-night/50">
          <span>Menstrual wellness support</span>
          <span className="hidden sm:inline-block text-night/30">•</span>
          <span>Daily self-care check-ins</span>
          <span className="hidden sm:inline-block text-night/30">•</span>
          <span>Private to you</span>
        </div>

        <div className="mt-6 text-[11px] text-night/40">
          © {new Date().getFullYear()} CycleSync Plus. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
