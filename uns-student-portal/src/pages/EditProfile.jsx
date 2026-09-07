// src/pages/EditProfile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profiles.css';

export default function EditProfile() {
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <main className="dashboard-container profile-page">
      {/* Page Header */}
      <header className="welcome-header">
        <h1>Edit Profile Settings</h1>
      </header>

      {/* Top Section: Avatar Upload & Edit Credentials Grid */}
      <div className="profile-top-grid">
        {/* Left Card: Avatar Upload Section */}
        <section className="card profile-user-card">
          <div className="large-avatar-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          
          <div className="avatar-actions" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <button type="button" className="btn-edit-settings" style={{ width: '80%', padding: '10px 0' }}>Upload New Photo</button>
            <button type="button" className="btn-change-password" style={{ width: '80%', borderColor: '#ef4444', color: '#ef4444', margin: 0 }}>Remove Photo</button>
          </div>
          <span className="user-intake" style={{ marginTop: '14px' }}>PNG, JPG up to 2MB</span>
        </section>

        {/* Right Card: Edit Credentials Form */}
        <section className="card academic-credentials-card">
          <h2 className="card-title">Edit Credentials</h2>
          
          <form id="edit-credentials-form" className="credentials-grid" onSubmit={handleSave}>
            <div className="credential-field">
              <label htmlFor="display-name">DISPLAY NAME</label>
              <input 
                type="text" 
                id="display-name" 
                className="field-value" 
                defaultValue="NADUN SENANAYAKE" 
                style={{ width: '100%', outline: 'none', border: '1px solid #00b4d8', color: '#ffffff' }} 
              />
            </div>

            <div className="credential-field">
              <label htmlFor="index-number">INDEX NUMBER (READ-ONLY)</label>
              <input 
                type="text" 
                id="index-number" 
                className="field-value" 
                defaultValue="2023IT0000" 
                readOnly 
                style={{ width: '100%', opacity: 0.6, cursor: 'not-allowed' }} 
              />
            </div>

            <div className="credential-field">
              <label htmlFor="sandbox-batch">ASSIGNED SANDBOX BATCH</label>
              <select 
                id="sandbox-batch" 
                className="field-value" 
                defaultValue="year2-sandbox-b"
                style={{ width: '100%', color: '#ffffff', backgroundColor: '#080f1e', cursor: 'pointer' }}
              >
                <option value="year2-sandbox-b">Year 2 - Sandbox B</option>
                <option value="year2-sandbox-a">Year 2 - Sandbox A</option>
                <option value="year1-sandbox-a">Year 1 - Sandbox A</option>
              </select>
            </div>

            <div className="credential-field">
              <label htmlFor="university-email">UNIVERSITY EMAIL (READ-ONLY)</label>
              <input 
                type="email" 
                id="university-email" 
                className="field-value" 
                defaultValue="2023IT0000@sdu.cmb.ac.lk" 
                readOnly 
                style={{ width: '100%', opacity: 0.6, cursor: 'not-allowed' }} 
              />
            </div>
          </form>
        </section>
      </div>

      {/* Bottom Section: Save System Settings Action Card */}
      <section className="card" style={{ padding: '28px' }}>
        <h2 className="card-title" style={{ marginBottom: '8px' }}>Save System Settings</h2>
        <p className="subtitle" style={{ marginBottom: '24px' }}>Ensure all your display details are up to date before saving changes.</p>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button type="submit" form="edit-credentials-form" className="btn-edit-settings" style={{ backgroundColor: '#10b981', padding: '12px 28px' }}>Save Changes</button>
          <button type="button" className="btn-change-password" onClick={() => navigate('/profile')} style={{ padding: '12px 28px', margin: 0 }}>Cancel</button>
        </div>
      </section>
    </main>
  );
}