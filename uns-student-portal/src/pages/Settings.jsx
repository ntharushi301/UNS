// src/pages/Settings.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Settings.css';
import '../styles/base.css';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-container">
      {/* Header Title & Back Action */}
      <div className="header-action-row">
        <section className="welcome-header">
          <h1>Settings & Preferences</h1>
          <p className="subtitle">Manage your notifications, account security, and portal system preferences.</p>
        </section>
        
        {/* Back Navigation Button */}
        <button className="btn-change-password btn-back" onClick={() => navigate('/dashboard')}>
          <span>⬅</span> Back
        </button>
      </div>

      {/* Main Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        
        {/* Left Column: Notification Preferences & App Preferences */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Notification Preferences Card */}
          <section className="card" style={{ padding: '24px', backgroundColor: '#0f192e' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span>🔔</span> Notification Preferences
            </h2>

            <div className="toggle-list">
              <div className="toggle-item">
                <div className="toggle-text">
                  <h3>Academic & Exam Notices</h3>
                  <p>Instant alerts for new notices and schedules.</p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="toggle-item">
                <div className="toggle-text">
                  <h3>Timetable & Venue Updates</h3>
                  <p>Notifications on lecture cancellations or hall changes.</p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="toggle-item">
                <div className="toggle-text">
                  <h3>Assignment Deadlines</h3>
                  <p>Remind 24 hours before submission deadlines.</p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="toggle-item">
                <div className="toggle-text">
                  <h3>Weekly Email Summary</h3>
                  <p>Receive weekly summary to student email.</p>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </section>

          {/* App & Interface Preferences Card */}
          <section className="card" style={{ padding: '24px', backgroundColor: '#0f192e' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span>⚙️</span> App & Interface Preferences
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Theme Selector */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>PORTAL THEME MODE</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" className="btn-teal" style={{ backgroundColor: '#0284c7', padding: '8px 16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🌙</span> Dark Mode
                  </button>
                  <button type="button" className="btn-change-password" style={{ margin: 0, padding: '8px 16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>☀️</span> Light Mode
                  </button>
                </div>
              </div>

              {/* Language Dropdown */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>LANGUAGE</label>
                <select className="field-input" defaultValue="en-US" style={{ width: '100%', maxWidth: '280px', fontSize: '12px', padding: '8px 12px' }}>
                  <option value="en-US">English (United States)</option>
                  <option value="en-UK">English (United Kingdom)</option>
                </select>
              </div>

              {/* Google Calendar Sync Toggle */}
              <div className="toggle-item" style={{ marginTop: '4px' }}>
                <div className="toggle-text">
                  <h3 style={{ fontSize: '13px' }}>Auto-Sync Google Calendar</h3>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Security & Login Card */}
        <section className="card" style={{ padding: '24px', backgroundColor: '#0f192e', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <span>🔒</span> Security & Login
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Account Password */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginBottom: '2px' }}>Account Password</h3>
                  <p style={{ fontSize: '11px', color: '#64748b' }}>Last changed 45 days ago</p>
                </div>
                <button type="button" className="btn-secondary">Change Password</button>
              </div>

              {/* Two-Factor Authentication */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginBottom: '2px' }}>Two-Factor Authentication (2FA)</h3>
                  <p style={{ fontSize: '11px', color: '#22c55e', fontWeight: 600 }}>● Active via Authenticator App</p>
                </div>
                <button type="button" className="btn-secondary">Manage 2FA</button>
              </div>

              {/* Active Login Sessions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginBottom: '2px' }}>Active Login Sessions</h3>
                  <p style={{ fontSize: '11px', color: '#64748b' }}>Chrome on Windows (Current) • Mobile App</p>
                </div>
                <button type="button" className="btn-danger-sm">Revoke Others</button>
              </div>
            </div>
          </div>

          {/* Global Save Button */}
          <div style={{ marginTop: '32px' }}>
            <button type="button" className="btn-teal" style={{ backgroundColor: '#0284c7', width: '100%', padding: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span>💾</span> Save All Settings Changes
            </button>
          </div>

        </section>

      </div>
    </main>
  );
}