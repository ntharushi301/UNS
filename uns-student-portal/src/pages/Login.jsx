// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import '../styles/Logging.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to track visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return ( 
    <div className="login-body">
      <div className="login-card">
        {/* Logo */}
        <img src={logo} alt="UNS Logo" width="100px" height="100px" />
        <h1>Welcome Back</h1>
        <p className="subtitle">Access the intelligence portal</p>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="email">Email Address</label>
            </div>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" strokeLinecap="round" />
                <polyline points="3 7 12 13 21 7" strokeLinecap="round" />
              </svg>
              <input
                type="email"
                id="email"
                placeholder="Student_ID @stu.cmb.ac.lk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
              <a href="#" className="forgot-pass" onClick={(e) => e.preventDefault()}>
                Forgot password?
              </a>
            </div>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" strokeWidth="2">
                <rect x="5" y="11" width="14" height="10" rx="2" strokeLinecap="round" />
                <path d="M8 11 V7 A4 4 0 0 1 16 7 V11" strokeLinecap="round" />
              </svg>
              
              {/* Conditional Input Type */}
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Eye Icon with Toggle Click Handler */}
              <svg
                className="eye-icon"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? (
                  // Eye Slash Icon (When Password Visible)
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  // Standard Eye Icon (When Password Hidden)
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* Sign In Button */}
          <button type="submit" className="btn-submit">
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <span>OR CONTINUE WITH</span>
        </div>

        {/* Google Button */}
        <button type="button" className="btn-google">
          <svg className="google-icon" viewBox="0 0 24 24">
            <path
              fill="#ffffff"
              d="M12.24 10.285V13.4h6.887c-.58 2.31-2.8 4-5.5 4-3.315 0-6-2.685-6-6s2.685-6 6-6c1.48 0 2.83.54 3.88 1.43l2.38-2.38C18.42 3.12 15.5 2 12.24 2 6.7 2 2.2 6.5 2.2 12s4.5 10 10.04 10c5.78 0 9.62-4.06 9.62-9.79 0-.66-.07-1.3-.18-1.925H12.24z"
            />
          </svg>
          Google
        </button>

        {/* Sign up footer */}
        <div className="footer-text">
          Don't have an account? <Link to="/registration">Sign up now</Link>
        </div>
      </div>
    </div>
  );
}