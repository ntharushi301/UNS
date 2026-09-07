import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Timetable.css';
import '../styles/base.css';

export default function HallMap() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-container">
      <div className="header-action-row">
        <section className="welcome-header">
          <h1>Campus Hall Location & Map</h1>
          <p className="subtitle">Technology Annex • Hall 01</p>
        </section>
        <button className="btn-change-password btn-back" onClick={() => navigate('/daily-timetable')}>
          <span>⬅</span> Back to Timetable
        </button>
      </div>

      <section className="card" style={{ padding: '28px', backgroundColor: '#0f192e' }}>
        <div className="map-layout">
          
          <div className="map-viewport">
            <div className="map-block">Main Library</div>
            <div className="map-block">Main Academic Building</div>
            <div className="map-block active">
              <div className="pulse-dot"></div>
              <span>Technology Annex</span>
              <span style={{ fontSize: '10px', opacity: 0.9, fontWeight: 400, marginTop: '2px' }}>(Hall 01 Inside)</span>
            </div>
            <div style={{ backgroundColor: 'transparent' }}></div>
          </div>

          <div className="venue-details">
            <h2 className="venue-header">
              <span>📍</span> Venue Details
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="vd-label">BUILDING</label>
                <span className="vd-value">Technology Annex Block B</span>
              </div>
              <div>
                <label className="vd-label">FLOOR & ROOM</label>
                <span className="vd-value">Ground Floor, Hall 01</span>
              </div>
              <div>
                <label className="vd-label" style={{ marginBottom: '8px' }}>FACILITIES</label>
                <ul className="facility-list">
                  <li><span style={{ color: '#22c55e' }}>✓</span> Air Conditioned</li>
                  <li><span style={{ color: '#22c55e' }}>✓</span> Projector & Sound System</li>
                  <li><span style={{ color: '#22c55e' }}>✓</span> Capacity: 120 Seats</li>
                </ul>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </main>
  );
}