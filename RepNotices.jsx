// src/pages/RepNotices.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Notice.css';
import '../styles/base.css';

export default function RepNotices() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-container">
      <div className="header-action-row">
        <section className="welcome-header">
          <h1>Notices</h1>
          <p className="subtitle">Here is your academic overview for Monday, October 14th.</p>
        </section>
        
        <button className="btn-change-password btn-back" onClick={() => navigate('/notices')}>
          <span>⬅</span> Back
        </button>
      </div>

      <div className="top-grid">
        <div className="feed-column">
          <section className="card form-card">
            <div className="card-title-row">
              <h2 className="card-subtitle-icon">
                <span>🚩</span> Post Notice to Year 2 Students
              </h2>
              <span className="badge badge-target">🔒 TARGET: YEAR 2 ONLY</span>
            </div>

            <form id="post-notice-form" className="form-layout" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                className="field-input" 
                placeholder="Enter Notice Title (e.g. Lab Slot Change)..." 
                required 
              />
              
              <textarea 
                className="field-input text-area" 
                rows="3" 
                placeholder="Type the detailed message for your batch..." 
                required
              />

              <div className="form-footer">
                <span className="auth-label">● Authorized as Year 2 Representative</span>
                <button type="submit" className="btn-teal">Publish to Year 2</button>
              </div>
            </form>
          </section>

          <section className="card feed-container-card">
            <div className="card-title-row header-margin">
              <h2 className="card-subtitle-icon large-text">
                <span>🔔</span> Year 2 Notice Feed
              </h2>
              <span className="badge badge-teal">3 Active</span>
            </div>

            <div className="feed-list">
              <div className="feed-card-item">
                <div className="item-header">
                  <div className="badge-group">
                    <span className="badge badge-rep">REP NOTICE</span>
                    <span className="badge badge-batch">YEAR 2 ONLY</span>
                  </div>
                  <span className="timestamp">1h ago</span>
                </div>
                
                <h3 className="notice-headline">CS202 Presentation Schedule Update</h3>
                <p className="notice-description">Group 01 to 05 presentations are rescheduled to Hall B at 2 PM.</p>

                <div className="item-footer">
                  <span className="author-label">By: You (Year Rep)</span>
                  <button type="button" className="btn-delete-sm">Delete</button>
                </div>
              </div>

              <div className="feed-card-item">
                <div className="item-header">
                  <span className="badge badge-faculty">FACULTY NOTICE</span>
                  <span className="timestamp">Yesterday</span>
                </div>
                
                <h3 className="notice-headline">Mid-Semester Exam Timetable</h3>
                <p className="notice-description">The official timetable for Year 2 BICT semester end exams is published.</p>

                <div className="item-footer">
                  <span className="author-label">By: Dr. Aruni Perera</span>
                  <span className="author-label">Faculty Only</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="card calendar-card">
          <div className="calendar-header">
            <span className="calendar-icon">📅</span>
            <h2>October 2026</h2>
          </div>
          <div className="calendar-grid weekdays">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>
          <div className="calendar-grid dates">
            <span className="other-month">29</span>
            <span className="other-month">30</span>
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
            <span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
            <span>13</span>
            <span className="today-highlight">14</span>
            <span>15</span>
            <span className="active-date">16</span>
            <span>17</span>
          </div>

          <div className="deadlines-section">
            <span className="section-label">UPCOMING BATCH DEADLINES</span>
            
            <div className="deadlines-wrapper">
              <div className="deadline-box">
                <div className="deadline-indicator indicator-red"></div>
                <div className="deadline-info">
                  <span className="deadline-title">CS302 Project Submission</span>
                  <span className="deadline-time text-red">Oct 16, 11:59 PM</span>
                </div>
              </div>

              <div className="deadline-box">
                <div className="deadline-indicator indicator-amber"></div>
                <div className="deadline-info">
                  <span className="deadline-title text-white">Year 2 Batch Meeting</span>
                  <span className="deadline-time text-amber">Oct 18, 04:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}