// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import LoginPage from '../pages/auth/Login';
import StudentDashboard from '../pages/student/Dashboard';
import NoticesPage from '../pages/student/Notices';
import EventsPage from '../pages/student/Events';
import TimetablePage from '../pages/student/Timetable';
import ExaminationsPage from '../pages/student/Examinations';
import DocumentsPage from '../pages/student/Documents';
import SmartSearchPage from '../pages/student/Search';
import AIAssistantPage from '../pages/student/AIAssistant';
import ProfilePage from '../pages/student/Profile';
import FacultyDashboard from '../pages/faculty/Dashboard';
import HodDashboard from '../pages/hod/Dashboard';
import DeanDashboard from '../pages/dean/Dashboard';
import ExaminationCellDashboard from '../pages/examination/Dashboard';
import AdminDashboard from '../pages/admin/Dashboard';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root redirect to /student */}
      <Route path="/" element={<Navigate to="/student" replace />} />

      {/* Screen 1: Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Student Protected / Main Layout Area */}
      <Route element={<DashboardLayout />}>
        {/* Screen 2: Student Dashboard */}
        <Route path="/student" element={<StudentDashboard />} />

        {/* Screen 3: Notices */}
        <Route path="/student/notices" element={<NoticesPage />} />

        {/* Screen 4: Events */}
        <Route path="/student/events" element={<EventsPage />} />

        {/* Screen 5: Timetable */}
        <Route path="/student/timetable" element={<TimetablePage />} />

        {/* Screen 6: Examinations */}
        <Route path="/student/examinations" element={<ExaminationsPage />} />

        {/* Screen 7: Documents */}
        <Route path="/student/documents" element={<DocumentsPage />} />

        {/* Screen 8: Smart Search */}
        <Route path="/student/search" element={<SmartSearchPage />} />

        {/* Screen 9: AI Assistant */}
        <Route path="/student/ai" element={<AIAssistantPage />} />

        {/* Screen 10: Profile */}
        <Route path="/student/profile" element={<ProfilePage />} />

        {/* Role Dashboards */}
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/hod" element={<HodDashboard />} />
        <Route path="/dean" element={<DeanDashboard />} />
        <Route path="/examination" element={<ExaminationCellDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/student" replace />} />
    </Routes>
  );
}
