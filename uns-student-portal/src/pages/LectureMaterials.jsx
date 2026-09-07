import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Timetable.css';

export default function LectureMaterials() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
        <button className="btn-change-password btn-back" onClick={() => navigate('/daily-timetable')}>
          <span>⬅</span> Back to Timetable
        </button>
      </div>

      <div className="materials-grid">
        
        <section className="card slide-viewer-card">
          <div className="slide-screen">
            <h2 className="slide-title">CS401 - Lecture 05</h2>
            <p className="slide-subtitle">TCP/IP Protocol Suite & Routing Algorithms</p>
          </div>

          <div className="slide-controls">
            <button type="button" className="slide-arrow">◀</button>
            <span className="slide-count">Slide 01 / 24</span>
            <button type="button" className="slide-arrow">▶</button>
          </div>
        </section>

        <section className="files-column">
          <h2 className="venue-header" style={{ border: 'none', padding: 0 }}>
            <span>📂</span> Available Files
          </h2>

          <div className="file-list">
            <div className="file-card active">
              <div className="file-header">
                <span style={{ fontSize: '16px' }}>📄</span>
                <span className="file-name">Lecture_05_TCPIP.pdf</span>
              </div>
              <span className="file-meta">4.2 MB • Updated Today</span>
            </div>

            <div className="file-card">
              <div className="file-header">
                <span style={{ fontSize: '16px' }}>📄</span>
                <span className="file-name">Routing_Lab_Guide.pdf</span>
              </div>
              <span className="file-meta">1.8 MB • Uploaded Oct 12</span>
            </div>
          </div>

          <button type="button" className="btn-teal" style={{ backgroundColor: '#0284c7', width: '100%', padding: '12px', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px' }}>
            <span>🎁</span> Download All Material (.ZIP)
          </button>
        </section>

      </div>
    </main>
  );
}