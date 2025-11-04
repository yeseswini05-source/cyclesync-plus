import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "./Typography";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#D6C1A0]/70 bg-[#F8F3DF]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 py-10 text-[#3A3F1D]/70 text-[12px]">
        {/* Top layout */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-between">
          {/* Brand block */}
          <div className="flex-1">
            <Typography
              variant="sectionTitle"
              as="h2"
              className="text-base sm:text-lg text-[#3A3F1D]"
            >
              CycleSync Plus
            </Typography>
            <Typography
              variant="bodySm"
              className="mt-2 text-[12px] text-[#3A3F1D]/70"
            >
              Personal cycle tracking, mood journaling, and
              phase-aligned nutrition guidance — built just for you.
            </Typography>

            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#3A3F1D]/60">
              <Typography variant="bodySm">
                Menstrual wellness support
              </Typography>
              <span className="hidden sm:inline-block text-[#3A3F1D]/30">
                •
              </span>
              <Typography variant="bodySm">
                Daily self-care check-ins
              </Typography>
              <span className="hidden sm:inline-block text-[#3A3F1D]/30">
                •
              </span>
              <Typography variant="bodySm">Private to you</Typography>
            </div>
          </div>

          {/* Features / pages block */}
          <div className="flex-1">
            <Typography
              variant="subTitle"
              className="text-[11px] tracking-[0.18em] text-[#7B8A4C] mb-2"
            >
              APP FEATURES
            </Typography>

            <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-[12px]">
              {/* Match your routes */}
              <Link to="/phase-tracker">
                <Typography variant="bodySm" className="hover:text-[#2B3A23]">
                  Phase Tracker
                </Typography>
              </Link>
              <Link to="/daily-checkin">
                <Typography variant="bodySm" className="hover:text-[#2B3A23]">
                  Daily Check-in
                </Typography>
              </Link>
              <Link to="/food-recs">
                <Typography variant="bodySm" className="hover:text-[#2B3A23]">
                  Food & Recipe Recs
                </Typography>
              </Link>
              <Link to="/activity-rest">
                <Typography variant="bodySm" className="hover:text-[#2B3A23]">
                  Activity & Rest Guidance
                </Typography>
              </Link>
              <Link to="/nutrient-signals">
                <Typography variant="bodySm" className="hover:text-[#2B3A23]">
                  Nutrient Signals
                </Typography>
              </Link>
              <Link to="/dashboard">
                <Typography variant="bodySm" className="hover:text-[#2B3A23]">
                  Your Dashboard
                </Typography>
              </Link>

              {/* Main app pages */}
              <Link to="/posts">
                <Typography variant="bodySm" className="hover:text-[#2B3A23]">
                  Posts
                </Typography>
              </Link>
              <Link to="/notifications">
                <Typography variant="bodySm" className="hover:text-[#2B3A23]">
                  Notifications
                </Typography>
              </Link>
              <Link to="/survey">
                <Typography variant="bodySm" className="hover:text-[#2B3A23]">
                  Survey
                </Typography>
              </Link>
              <Link to="/chat">
                <Typography variant="bodySm" className="hover:text-[#2B3A23]">
                  Chat
                </Typography>
              </Link>
              <Link to="/admin">
                <Typography variant="bodySm" className="hover:text-[#2B3A23]">
                  Admin
                </Typography>
              </Link>
              <Link to="/demo">
                <Typography variant="bodySm" className="hover:text-[#2B3A23]">
                  Play Demo
                </Typography>
              </Link>
            </div>
          </div>

          {/* Contact block */}
          <div className="flex-1">
            <Typography
              variant="subTitle"
              className="text-[11px] tracking-[0.18em] text-[#7B8A4C] mb-2"
            >
              CONTACT
            </Typography>

            {/* Phones */}
            <div className="space-y-1">
              <Typography variant="bodySm" className="text-[12px]">
                Phone:
              </Typography>
              <a href="tel:+919392814044">
                <Typography
                  variant="bodySm"
                  className="text-[12px] hover:text-[#2B3A23]"
                >
                  +91 93928 14044
                </Typography>
              </a>
              <a href="tel:+918121691269">
                <Typography
                  variant="bodySm"
                  className="text-[12px] hover:text-[#2B3A23]"
                >
                  +91 81216 91269
                </Typography>
              </a>
            </div>

            {/* Emails */}
            <div className="mt-3 space-y-1">
              <Typography variant="bodySm" className="text-[12px]">
                Email:
              </Typography>
              <a href="mailto:bl.en.u4aie23013@bl.students.amrita.edu">
                <Typography
                  variant="bodySm"
                  className="text-[12px] break-all hover:text-[#2B3A23]"
                >
                  bl.en.u4aie23013@bl.students.amrita.edu
                </Typography>
              </a>
              <a href="mailto:bl.en.u4aie23013@bl.students.amrita.edu">
                <Typography
                  variant="bodySm"
                  className="text-[12px] break-all hover:text-[#2B3A23]"
                >
                  bl.en.u4aie23013@bl.students.amrita.edu
                </Typography>
              </a>
            </div>

            {/* Address with Google Maps */}
            <div className="mt-3 space-y-1">
              <Typography variant="bodySm" className="text-[12px]">
                Address:
              </Typography>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Amrita+Vishwa+Vidyapeetham,+Kasavanahalli,+Bengaluru"
                target="_blank"
                rel="noreferrer"
              >
                <Typography
                  variant="bodySm"
                  className="text-[12px] hover:text-[#2B3A23]"
                >
                  Amrita Vishwa Vidyapeetham,
                  <br />
                  Kasavanahalli, Bengaluru.
                </Typography>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 border-t border-[#D6C1A0]/60 pt-4 text-center">
          <Typography
            variant="bodySm"
            className="text-[11px] text-[#3A3F1D]/50"
          >
            © {year} CycleSync Plus. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
}
