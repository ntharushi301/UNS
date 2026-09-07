// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Page Components
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Notices from './pages/Notices';
import RepNotices from './pages/RepNotices';
import StuNotice from './pages/StuNotices';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Hide Navbar & Sidebar on auth routes
  const isAuthPage = location.pathname === '/' || location.pathname === '/registration';

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="app-layout">
      {/* Conditionally render navigation layout */}
      {!isAuthPage && <Navbar onToggleSidebar={toggleSidebar} />}
      {!isAuthPage && <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />}

      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* Protected Application Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Notice Board Routes */}
        <Route path="/notices" element={<Notices />} />
        <Route path="/rep-notices" element={<RepNotices />} />
        <Route path="/stu-notices" element={<StuNotice />} />

        {/* Fallbacks for pages yet to be converted */}
        <Route path="/timetable" element={<div style={{ padding: '40px', color: '#fff' }}><h1>Timetable (Pending)</h1></div>} />
        <Route path="/profile" element={<div style={{ padding: '40px', color: '#fff' }}><h1>Profile (Pending)</h1></div>} />
        <Route path="/settings" element={<div style={{ padding: '40px', color: '#fff' }}><h1>Settings (Pending)</h1></div>} />
      </Routes>
    </div>
  );
}