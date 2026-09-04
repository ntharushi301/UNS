// src/pages/Dashboard.jsx
import React from 'react';
import '../styles/Dashboard.css';
import '../styles/base.css';

export default function Dashboard() {
  return (
    <main className="dashboard-container">
      {/* Header Greeting */}
      <section className="welcome-header">
        <h1>Good Morning, Nadun</h1>
        <p className="subtitle">Recent notices for Monday, October 14th.</p>
      </section>

      {/* Top Grid Layout (Notices & Calendar) */}
      <div className="top-grid">
        {/* Notices Card */}
        <section className="card notices-card">
          <div className="card-header">
            <h2><span>📢</span> Notices</h2>
            <span className="badge">3 New Updates</span>
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
          </div>
        </section>

        {/* Calendar & Deadline Card */}
        <section className="card calendar-card">
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
            <span className="today">14</span>
            <span>15</span>
            <span className="active-date">16</span>
            <span>17</span><span>18</span><span>19</span>
            <span>20</span><span></span><span></span><span></span><span></span><span></span><span></span>
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

      {/* Weekly Schedule Section */}
      <section className="card schedule-card">
        <div className="schedule-header">
          <h2><span>📅</span> Weekly Schedule</h2>
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
                <td className="time-col">09:00</td>
                <td>
                  <div className="slot-card cyan border-left-accent">
                    <strong>CS401 Lecture</strong>
                    <span>Hall B | Prof. Miller</span>
                  </div>
                </td>
                <td></td>
                <td>
                  <div className="slot-card teal">
                    <strong>Math Seminars</strong>
                    <span>Room 402</span>
                  </div>
                </td>
                <td></td>
                <td>
                  <div className="slot-card cyan border-left-accent">
                    <strong>CS401 Lab</strong>
                    <span>Lab 3 | T.A. Smith</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="time-col">11:00</td>
                <td></td>
                <td>
                  <div className="slot-card grey">
                    <strong>Physics III</strong>
                    <span>Main Hall</span>
                  </div>
                </td>
                <td></td>
                <td>
                  <div className="slot-card grey">
                    <strong>Physics III</strong>
                    <span>Main Hall</span>
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td className="time-col">14:00</td>
                <td>
                  <div className="slot-card dark-teal border-left-accent">
                    <strong>Data Ethics</strong>
                    <span>Annex 1</span>
                  </div>
                </td>
                <td></td>
                <td>
                  <div className="slot-card teal">
                    <strong>Software Arch</strong>
                    <span>Hall A</span>
                  </div>
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}