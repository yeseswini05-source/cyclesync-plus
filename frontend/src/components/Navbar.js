import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ isDark = false }) {
  // Olive & beige theme (static)
  const linkBase =
    "text-[#3A3F1D]/70 hover:text-[#5B6B2F] transition-colors font-medium";
  const linkActive = "text-[#5B6B2F] font-semibold";

  return (
    <header className="w-full sticky top-0 z-50 transition-colors duration-700">
      <div className="backdrop-blur-xl bg-[#F8F3DF]/90 border-b border-[#EEE7C9] shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          {/* left: brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#5B6B2F] to-[#A6B86E] shadow-card border border-[#EEE7C9] flex items-center justify-center text-[#1E1E1A] text-[11px] font-semibold">
              CSP
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[14px] font-semibold text-[#3A3F1D] group-hover:text-[#5B6B2F] transition-colors">
                CycleSync Plus
              </span>
              <span className="text-[11px] text-[#3A3F1D]/70">
                Wellness &amp; cycle insights
              </span>
            </div>
          </Link>

          {/* center: app feature links */}
          <nav className="hidden md:flex items-center gap-6 text-[13px]">
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                isActive ? linkActive : linkBase
              }
            >
              Posts
            </NavLink>

            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                isActive ? linkActive : linkBase
              }
            >
              Notifications
            </NavLink>

            <NavLink
              to="/survey"
              className={({ isActive }) =>
                isActive ? linkActive : linkBase
              }
            >
              Survey
            </NavLink>

            <NavLink
              to="/chat"
              className={({ isActive }) =>
                isActive ? linkActive : linkBase
              }
            >
              Chat
            </NavLink>

            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? linkActive : linkBase
              }
            >
              Admin
            </NavLink>
          </nav>

          {/* right: auth buttons */}
          <div className="flex items-center gap-2 text-[13px] font-medium">
            <Link
              to="/login"
              className="px-4 py-2 rounded-full border border-[#8A9A5B]/50 bg-[#F8F3DF] text-[#5B6B2F] shadow-soft hover:scale-[1.03] active:scale-[0.98] transition-transform"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#8A9A5B] to-[#5B6B2F] text-[#F8F3DF] shadow-card border border-[#8A9A5B]/70 hover:scale-[1.03] active:scale-[0.98] transition-transform"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
