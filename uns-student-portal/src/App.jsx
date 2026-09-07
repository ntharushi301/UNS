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
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Settings from './pages/Settings';

// New Timetable Components
import Timetable from './pages/Timetable';
import DailyTimetable from './pages/DailyTimetable';
import HallMap from './pages/HallMap';
import Lecture from './pages/Lecture';
import LectureMaterials from './pages/LectureMaterials';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === '/' || location.pathname === '/registration';
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="app-layout">
      {!isAuthPage && <Navbar onToggleSidebar={toggleSidebar} />}
      {!isAuthPage && <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/notices" element={<Notices />} />
        <Route path="/rep-notices" element={<RepNotices />} />
        <Route path="/stu-notices" element={<StuNotice />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/settings" element={<Settings />} />

        {/* Timetable Routes */}
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/daily-timetable" element={<DailyTimetable />} />
        <Route path="/hallmap" element={<HallMap />} />
        <Route path="/lecture" element={<Lecture />} />
        <Route path="/lecture-materials" element={<LectureMaterials />} />
      </Routes>
    </div>
  );
}