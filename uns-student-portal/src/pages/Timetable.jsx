import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Timetable.css';
import '../styles/base.css';

export default function Timetable() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-container">
      <div className="header-action-row">
        <section className="welcome-header">
          <h1>Good Morning, Nadun</h1>
          <p className="subtitle">Here is your academic overview for Monday, October 14th.</p>
        </section>
        <button className="btn-change-password btn-back" onClick={() => navigate('/dashboard')}>
          <span>⬅</span> Back to Dashboard
        </button>
      </div>

      <section className="card tt-header-card">
        <div className="tt-controls-row">
          <div className="view-toggle-group">
            <button type="button" className="tab-btn active">Weekly View</button>
            <button type="button" className="tab-btn" onClick={() => navigate('/daily-timetable')}>Daily View</button>
          </div>
          <button type="button" className="btn-export">
            <span>📥</span> Export PDF
          </button>
        </div>

        <div className="schedule-table-wrapper">
          <table className="schedule-table">
            <thead>
              <tr>
                <th className="time-col">TIME</th>
                <th>MONDAY</th>
                <th>TUESDAY</th>
                <th>WEDNESDAY</th>
                <th>THURSDAY</th>
                <th>FRIDAY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="time-col">
                  <strong>08:00</strong>
                  <span className="time-col-sub">09:30</span>
                </td>
                <td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr>
                <td className="time-col">
                  <strong>09:30</strong>
                  <span className="time-col-sub">11:00</span>
                </td>
                <td>
                  <div className="slot-card cyan">
                    <strong>CS401 Lecture</strong>
                    <span>Hall B | Prof. Miller</span>
                    <span className="slot-time">09:30 - 11:00</span>
                  </div>
                </td>
                <td></td>
                <td>
                  <div className="slot-card blue">
                    <strong>Math Seminars</strong>
                    <span>Room 402</span>
                    <span className="slot-time">09:30 - 11:00</span>
                  </div>
                </td>
                <td></td>
                <td>
                  <div className="slot-card cyan">
                    <strong>CS401 Lab</strong>
                    <span>Lab 3 | T.A. Sam</span>
                    <span className="slot-time">09:30 - 11:00</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="time-col">
                  <strong>11:00</strong>
                  <span className="time-col-sub">12:30</span>
                </td>
                <td></td>
                <td>
                  <div className="slot-card grey">
                    <strong>Physics III</strong>
                    <span>Main Hall</span>
                    <span className="slot-time">11:00 - 12:30</span>
                  </div>
                </td>
                <td></td>
                <td>
                  <div className="slot-card grey">
                    <strong>Physics III</strong>
                    <span>Main Hall</span>
                    <span className="slot-time">11:00 - 12:30</span>
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td className="time-col">
                  <strong>13:00</strong>
                  <span className="time-col-sub">14:30</span>
                </td>
                <td>
                  <div className="slot-card cyan">
                    <strong>Data Ethics</strong>
                    <span>Annex 1 | Dr. Silva</span>
                    <span className="slot-time">13:00 - 14:30</span>
                  </div>
                </td>
                <td></td>
                <td>
                  <div className="slot-card grey">
                    <strong>Software Arch</strong>
                    <span>Hall A</span>
                    <span className="slot-time">13:00 - 14:30</span>
                  </div>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="time-col">
                  <strong>14:30</strong>
                  <span className="time-col-sub">16:00</span>
                </td>
                <td></td><td></td><td></td>
                <td>
                  <div className="slot-card purple">
                    <strong>AI Systems Lab</strong>
                    <span>Lab 02 | Prof. Roy</span>
                    <span className="slot-time">14:30 - 16:00</span>
                  </div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}