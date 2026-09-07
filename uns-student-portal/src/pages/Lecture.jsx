import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Timetable.css';
import '../styles/base.css';

export default function Lecture() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-container">
      <div className="header-action-row" style={{ alignItems: 'center' }}>
        <section className="welcome-header">
          <h1>Virtual Classroom - Live Stream</h1>
          <p className="subtitle">Final Year Project Mentoring Session • Eng. K. Jay</p>
        </section>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-change-password btn-back" onClick={() => navigate('/daily-timetable')}>
            <span>⬅</span> Back to Timetable
          </button>
          <button type="button" className="btn-teal tool-btn danger" style={{ width: 'auto', padding: '8px 16px', borderRadius: '8px', gap: '6px' }}>
            <span>🚪</span> Leave Meeting
          </button>
        </div>
      </div>

      <section className="card" style={{ padding: '24px', backgroundColor: '#0f192e' }}>
        <div className="lecture-layout">
          
          <div className="video-column">
            <div className="video-screen">
              <div className="live-badge">
                <span className="live-dot"></span> LIVE (00:42:15)
              </div>
              <div className="speaker-avatar">KJ</div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>Eng. K. Jay (Speaker)</span>
            </div>

            <div className="media-toolbar">
              <button type="button" title="Mute" className="tool-btn">🎙️</button>
              <button type="button" title="Video" className="tool-btn">📹</button>
              <button type="button" title="Share Screen" className="tool-btn active">💻</button>
              <button type="button" title="Raise Hand" className="tool-btn">✋</button>
              <button type="button" title="Reaction" className="tool-btn">💬</button>
              <button type="button" title="End Call" className="tool-btn danger">❌</button>
            </div>
          </div>

          <div className="chat-panel">
            <div>
              <h2 className="venue-header" style={{ marginBottom: '16px' }}>
                <span>💬</span> Class Chat (18)
              </h2>
              <div className="chat-msgs">
                <div>
                  <span className="msg-sender color-blue">Eng. K. Jay</span>
                  <p className="msg-text">Welcome everyone to the session!</p>
                </div>
                <div>
                  <span className="msg-sender color-teal">Nadun (You)</span>
                  <p className="msg-text">Good afternoon sir, I shared the diagram.</p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <input type="text" className="field-input" placeholder="Type a message..." style={{ width: '100%', fontSize: '12px', padding: '10px 14px' }} />
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}