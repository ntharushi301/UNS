// src/pages/Notices.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Notice.css';
import '../styles/base.css';

export default function Notices() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-container">
      <div className="header-action-row">
        <section className="welcome-header">
          <h1>Notices</h1>
          <p className="subtitle">Here is your academic overview for Monday, October 14th.</p>
        </section>
        
        <button className="btn-back" onClick={() => navigate('/dashboard')}>
          <span>⬅</span> Back
        </button>
      </div>

      <div className="top-grid">
        <section className="notices-card-white">
          <div className="card-header">
            <div className="card-title-group">
              <h2>📢 Notices</h2>
              <span className="badge-teal">3 New Updates</span>
            </div>

            <button type="button" className="btn-teal" onClick={() => navigate('/rep-notices')}>
              + Create Notice
            </button>
          </div>

          <div className="notices-list">
            <div className="notice-item">
              <div className="notice-title-row">
                <h3>End-of-Semester Exam Registration</h3>
                <span className="timestamp">2 hours ago</span>
              </div>
              <p>The registration window for the winter term examinations is now open. Please ensure all module prerequisites are met before submitting...</p>
            </div>

            <div className="notice-item">
              <div className="notice-title-row">
                <h3>Campus Library Extended Hours</h3>
                <span className="timestamp">Yesterday</span>
              </div>
              <p>Starting next week, the Main Library will be open 24/7 to support students during the final project submission period.</p>
            </div>

            <div className="notice-item">
              <div className="notice-title-row">
                <h3>Guest Lecture: Cybersecurity Trends</h3>
                <span className="timestamp">2 days ago</span>
              </div>
              <p>Join us in Auditorium A for a keynote session with Dr. Sarah Chen from the Global Cyber Initiative this Friday at 10:00 AM.</p>
            </div>

            <div className="notice-item">
              <div className="notice-title-row">
                <h3>Guest Lecture: New Trend</h3>
                <span className="timestamp">2 days ago</span>
              </div>
              <p>Join us in Auditorium A for a keynote session with Dr. Sarah Chen from the Global Cyber Initiative this Friday at 10:00 AM.</p>
            </div>
          </div>
        </section>

        <section className="calendar-card">
          <div className="calendar-header">
            <span className="calendar-icon">📅</span>
            <h2>October 2024</h2>
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
            <span>17</span><span>18</span><span>19</span>
            <span>20</span>
          </div>
          <div className="deadlines-section">
            <span className="section-label">UPCOMING DEADLINES</span>
            <div className="deadline-item">
              <div className="deadline-indicator"></div>
              <div className="deadline-info">
                <span className="deadline-title">CS302 Project Submission</span>
                <span className="deadline-time">Oct 16, 11:59 PM</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}