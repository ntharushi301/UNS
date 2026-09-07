// src/components/Navbar.jsx
import React from 'react';

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <svg className="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span className="brand-text">UNS STUDENT PORTAL</span>
      </div>

      <div className="nav-right">
        <nav className="nav-links">
          <a href="#" className="nav-item">Analytics</a>
          <a href="#" className="nav-item active">Dashboard</a>
          <a href="#" className="nav-item">Reporting</a>
        </nav>

        <div className="user-profile">
          <div className="avatar-default" id="profile-toggle" onClick={onToggleSidebar}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}