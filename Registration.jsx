// src/pages/Registration.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import '../styles/Logging.css';

export default function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    department: 'ICT',
    role: 'student',
    year: '2nd',
    terms: true,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="page-container">
      {/* Left Hero Section */}
      <div className="hero-section">
        <div className="logo-wrapper">
          <img src={logo} alt="UNS Logo" className="brand-logo" />
        </div>

        <div className="hero-content">
          <h1>
            Start Your Academic
            <br />
            Journey Here
          </h1>
          <p className="hero-subtitle">
            Access timetables, course modules, hall maps,
            <br />
            and live virtual classes in one central hub.
          </p>

          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">📅</span>
              <div>
                <div className="feature-title">Personalized Timetable</div>
                <div className="feature-desc">Daily & Weekly schedule management</div>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">📚</span>
              <div>
                <div className="feature-title">Lecture Slide Repository</div>
                <div className="feature-desc">Instant access to course material & guides</div>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">📍</span>
              <div>
                <div className="feature-title">Campus Hall Navigation</div>
                <div className="feature-desc">Interactive venue locator & directions</div>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">🎥</span>
              <div>
                <div className="feature-title">Integrated Virtual Classroom</div>
                <div className="feature-desc">Direct access to online lectures & mentoring</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="hero-footer">© UNS Portal System • All Rights Reserved</footer>
      </div>

      {/* Right Form Section */}
      <div className="form-section">
        <div className="form-card">
          <h2>Create Your Account</h2>
          <p className="form-subtitle">Fill in your official university credentials to get started.</p>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullname">FULL NAME</label>
              <input
                type="text"
                id="fullname"
                placeholder="e.g. Nadun Senanayake"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>

            {/* University Email */}
            <div className="form-group">
              <label htmlFor="email">UNIVERSITY EMAIL</label>
              <input
                type="email"
                id="email"
                placeholder="student.id@stu.cmb.ac.lk"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password & Department Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">PASSWORD</label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">DEPARTMENT</label>
                <div className="select-wrapper">
                  <select id="department" value={formData.department} onChange={handleChange}>
                    <option value="ICT">ICT</option>
                    <option value="IAT">IAT</option>
                    <option value="AT">AT</option>
                    <option value="ET">ET</option>
                  </select>
                </div>
              </div>
            </div>

            {/* User Role & Year Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="role">USER ROLE</label>
                <div className="select-wrapper">
                  <select id="role" value={formData.role} onChange={handleChange}>
                    <option value="student">Undergraduate Student</option>
                    <option value="lecturer">Lecturer</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="year">YEAR</label>
                <div className="select-wrapper">
                  <select id="year" value={formData.year} onChange={handleChange}>
                    <option value="1st">1st YEAR</option>
                    <option value="2nd">2nd YEAR</option>
                    <option value="3rd">3rd YEAR</option>
                    <option value="4th">4th YEAR</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              <label htmlFor="terms">
                I agree to the <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a> and{' '}
                <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary">
              Register Account <span className="arrow">→</span>
            </button>
          </form>

          <div className="divider"></div>

          {/* Footer Actions Row */}
          <div className="action-row">
            <div className="action-col">
              <p className="action-label">Already have an active account?</p>
              <Link to="/" className="btn-outline">
                Sign in
              </Link>
            </div>

            <div className="action-col">
              <p className="action-label">or continue with</p>
              <button type="button" className="btn-outline btn-google">
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path
                    fill="#ffffff"
                    d="M12.24 10.285V13.4h6.887c-.58 2.31-2.8 4-5.5 4-3.315 0-6-2.685-6-6s2.685-6 6-6c1.48 0 2.83.54 3.88 1.43l2.38-2.38C18.42 3.12 15.5 2 12.24 2 6.7 2 2.2 6.5 2.2 12s4.5 10 10.04 10c5.78 0 9.62-4.06 9.62-9.79 0-.66-.07-1.3-.18-1.925H12.24z"
                  />
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}