// src/pages/Profile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profiles.css';
import '../styles/base.css';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-container profile-page">
      {/* Profile Page Header */}
      <header className="profile-header-row">
        <h1>Student Profile Overview</h1>
        <button className="btn-edit-settings" onClick={() => navigate('/edit-profile')}>
          Edit Profile Settings
        </button>
      </header>

      {/* Top Grid: Avatar & Academic Credentials */}
      <div className="profile-top-grid">
        {/* Left Card: User Big Avatar Card */}
        <section className="card profile-user-card">
          <div className="large-avatar-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h2 className="user-fullname">NADUN SENANAYAKE</h2>
          <p className="user-role">Undergraduate Student</p>
          <span className="user-intake">Intake: January 2023</span>
        </section>

        {/* Right Card: Academic Credentials */}
        <section className="card academic-credentials-card">
          <h2 className="card-title">Academic Credentials</h2>
          
          <div className="credentials-grid">
            <div className="credential-field">
              <label>UNIVERSITY EMAIL</label>
              <div className="field-value">2023IT0000@sdu.cmb.ac.lk</div>
            </div>

            <div className="credential-field">
              <label>INDEX NUMBER</label>
              <div className="field-value">2023IT0000</div>
            </div>

            <div className="credential-field">
              <label>CURRENT SEMESTER/BATCH</label>
              <div className="field-value">Year 2 - Semester 01</div>
            </div>

            <div className="credential-field">
              <label>ACCOUNT STATUS / ROLE</label>
              <div className="field-value status-active">Active / Verified</div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Grid: Security & Portal Notifications */}
      <div className="profile-bottom-grid">
        {/* Security & Active Sessions Card */}
        <section className="card security-card">
          <h2 className="card-title">Security & Active Sessions</h2>
          
          <div className="security-info-group">
            <h3>Last Login Activity</h3>
            <p className="activity-desc">Today 10:15 PM • Colombo, Sri Lanka (Chrome/Windows)</p>
          </div>

          <div className="security-info-group">
            <h3>Two-Factor Authentication (2FA)</h3>
            <p className="status-2fa">Enabled via University SMS Gateway</p>
          </div>

          <button className="btn-change-password">Change Password</button>
        </section>

        {/* Portal Notifications Toggle Card */}
        <section className="card notifications-settings-card">
          <h2 className="card-title">Portal Notifications</h2>

          <div className="toggle-list">
            <div className="toggle-item">
              <div className="toggle-text">
                <h3>Global Academic Notices</h3>
                <p>Receive push alerts for main faculty announcements.</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-item">
              <div className="toggle-text">
                <h3>Year 2 Semester Notices</h3>
                <p>Receive batch-specific announcement updates.</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-item">
              <div className="toggle-text">
                <h3>Email Digests</h3>
                <p>Send a daily summary of missed notifications.</p>
              </div>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}