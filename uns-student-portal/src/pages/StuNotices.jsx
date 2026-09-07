// src/pages/StuNotice.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Notice.css';
import '../styles/base.css';

export default function StuNotice() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-container">
      <div className="header-action-row">
        <section className="welcome-header">
          <h1>Academic Calendar & Events</h1>
          <p className="subtitle">Select any date to view scheduled events and deadlines.</p>
        </section>
        
        <button className="btn-change-password btn-back" onClick={() => navigate('/dashboard')}>
          <span>⬅</span> Back to Dashboard
        </button>
      </div>

      <div className="top-grid">
        <section className="card calendar-card" style={{ padding: '28px' }}>
          <div className="calendar-header" style={{ justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2>October 2024</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" className="btn-change-password" style={{ padding: '4px 10px', margin: 0 }}>◀</button>
              <button type="button" className="btn-change-password" style={{ padding: '4px 10px', margin: 0 }}>▶</button>
            </div>
          </div>

          <div className="calendar-grid weekdays" style={{ fontWeight: 700, marginBottom: '16px' }}>
            <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
          </div>

          <div className="calendar-grid dates" style={{ rowGap: '12px' }}>
            <span className="other-month">29</span>
            <span className="other-month">30</span>
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
            <span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
            <span>13</span>
            <span className="today-highlight" style={{ border: '1px solid #38bdf8', background: 'transparent', color: '#38bdf8', borderRadius: '50%', width: '28px', height: '28px', lineHeight: '26px' }}>14</span>
            <span>15</span><span>16</span><span>17</span>
            <span style={{ backgroundColor: '#ef4444', color: '#ffffff', borderRadius: '6px', width: '28px', height: '28px', lineHeight: '28px', fontWeight: 700, position: 'relative', margin: '0 auto' }}>
              18
              <span style={{ position: 'absolute', bottom: '2px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', backgroundColor: '#ffffff', borderRadius: '50%' }}></span>
            </span>
            <span>19</span>
            <span>20</span><span>21</span>
            <span className="active-date">22</span>
            <span>23</span><span>24</span><span>25</span><span>26</span>
            <span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
            <span className="other-month">1</span>
            <span className="other-month">2</span>
          </div>
        </section>

        <section className="card form-card" style={{ padding: '28px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>Events Overview</h2>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.5px' }}>SELECTED DATE: OCT 18, 2024</span>
          </div>

          <div className="feed-list">
            <div className="feed-card-item" style={{ border: '1.5px solid #ef4444', backgroundColor: '#0c1322' }}>
              <div style={{ marginBottom: '8px' }}>
                <span className="badge" style={{ backgroundColor: '#ef4444', color: '#ffffff', fontSize: '10px', padding: '2px 8px' }}>DEADLINE</span>
              </div>
              <h3 className="notice-headline">CS302 Project Submission</h3>
              <p className="notice-description" style={{ marginBottom: '4px', color: '#cbd5e1' }}>⏰ Time: 11:59 PM • Online Portal</p>
              <p className="author-label" style={{ color: '#64748b' }}>Module: Advanced Database Systems</p>
            </div>

            <div className="feed-card-item">
              <div style={{ marginBottom: '8px' }}>
                <span className="badge" style={{ backgroundColor: '#0284c7', color: '#ffffff', fontSize: '10px', padding: '2px 8px' }}>LECTURE</span>
              </div>
              <h3 className="notice-headline">Guest Lecture: Cybersecurity</h3>
              <p className="notice-description" style={{ marginBottom: 0 }}>📍 Oct 22 • 10:00 AM • Auditorium A</p>
            </div>

            <div className="feed-card-item">
              <div style={{ marginBottom: '8px' }}>
                <span className="badge badge-teal" style={{ fontSize: '10px', padding: '2px 8px' }}>NOTICE</span>
              </div>
              <h3 className="notice-headline">Library Extended 24/7 Hours</h3>
              <p className="notice-description" style={{ marginBottom: 0 }}>📌 Starts Next Week • Main Library</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}