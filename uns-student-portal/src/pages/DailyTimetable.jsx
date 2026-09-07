import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Timetable.css';
import '../styles/base.css';

export default function DailyTimetable() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-container">
      <div className="header-action-row">
        <section className="welcome-header">
          <h1>Good Morning, Nadun</h1>
          <p className="subtitle">Here is your academic overview for Monday, October 14th.</p>
        </section>
        <button className="btn-change-password btn-back" onClick={() => navigate('/timetable')}>
          <span>⬅</span> Back to Timetable
        </button>
      </div>

      <section className="card tt-header-card">
        <div className="tt-controls-row">
          <div className="view-toggle-group">
            <button type="button" className="tab-btn" onClick={() => navigate('/timetable')}>Weekly View</button>
            <button type="button" className="tab-btn active">Daily View</button>
          </div>
          <button type="button" className="btn-export">
            <span>📄</span> Export Schedule
          </button>
        </div>

        <div className="day-tabs-row">
          <button type="button" className="day-btn active">Monday (Today)</button>
          <button type="button" className="day-btn">Tuesday</button>
          <button type="button" className="day-btn">Wednesday</button>
          <button type="button" className="day-btn">Thursday</button>
          <button type="button" className="day-btn">Friday</button>
        </div>

        <div className="timeline-container">
          
          <div className="timeline-row">
            <div className="time-marker">
              <span className="time-start color-teal">09:30 AM</span>
              <span className="time-end">11:00 AM</span>
              <span className="time-dot bg-teal"></span>
            </div>
            <div className="timeline-card teal">
              <div>
                <strong className="tl-title color-teal">CS401: Advanced Computer Networks</strong>
                <span className="tl-subtitle color-grey">Lecturer: Prof. Miller • Venue: Main Academic Building, Hall B</span>
                <span className="tl-desc">Topic: TCP/IP Protocol Suite & Routing Algorithms</span>
              </div>
              <button type="button" className="btn-teal-sm" onClick={() => navigate('/lecture-materials')}>
                <span>📄</span> Lecture Slides
              </button>
            </div>
          </div>

          <div className="timeline-row center">
            <div className="time-marker">
              <span className="time-start color-grey">11:00 AM</span>
              <span className="time-end">01:00 PM</span>
            </div>
            <div className="timeline-break">
              <span>☕</span> Academic Break & Lunch Hour
            </div>
          </div>

          <div className="timeline-row">
            <div className="time-marker">
              <span className="time-start color-blue">01:00 PM</span>
              <span className="time-end">02:30 PM</span>
              <span className="time-dot bg-blue"></span>
            </div>
            <div className="timeline-card blue">
              <div>
                <strong className="tl-title" style={{color: '#fff'}}>CS405: Data Ethics & Governance</strong>
                <span className="tl-subtitle color-grey">Lecturer: Dr. Silva • Venue: Technology Annex, Room 01</span>
                <span className="tl-desc">Topic: Privacy Frameworks & AI Ethics Regulations</span>
              </div>
              <button type="button" className="btn-outline-sm" onClick={() => navigate('/hallmap')}>
                <span>📍</span> View Hall Map
              </button>
            </div>
          </div>

          <div className="timeline-row">
            <div className="time-marker">
              <span className="time-start color-purple">03:00 PM</span>
              <span className="time-end">04:00 PM</span>
              <span className="time-dot bg-purple"></span>
            </div>
            <div className="timeline-card purple">
              <div>
                <strong className="tl-title" style={{color: '#fff'}}>Final Year Project - Group Mentoring Session</strong>
                <span className="tl-subtitle" style={{color: '#e9d5ff'}}>Mentor: Eng. K. Jay • Platform: Online Zoom Meeting</span>
              </div>
              <button type="button" className="btn-purple-sm" onClick={() => navigate('/lecture')}>
                <span>🔗</span> Join Zoom Class
              </button>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}