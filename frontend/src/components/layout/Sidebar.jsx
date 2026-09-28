// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Bell,
  Calendar,
  Clock,
  ClipboardList,
  FolderClosed,
  Search,
  Sparkles,
  User,
  Settings,
  GraduationCap,
  X,
  Building2,
  ShieldCheck,
  Award,
  Users,
} from 'lucide-react';

const studentNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/student' },
  { label: 'Notices', icon: Bell, path: '/student/notices', badge: '12' },
  { label: 'Events', icon: Calendar, path: '/student/events', badge: '3' },
  { label: 'Timetable', icon: Clock, path: '/student/timetable' },
  { label: 'Examinations', icon: ClipboardList, path: '/student/examinations', badge: '2' },
  { label: 'Documents', icon: FolderClosed, path: '/student/documents' },
  { label: 'Search', icon: Search, path: '/student/search' },
  { label: 'AI Assistant', icon: Sparkles, path: '/student/ai', isSpecial: true },
];

const roleOptions = [
  { id: 'student', label: 'Student View', path: '/student', icon: GraduationCap },
  { id: 'faculty', label: 'Faculty View', path: '/faculty', icon: Users },
  { id: 'hod', label: 'HOD View', path: '/hod', icon: Building2 },
  { id: 'dean', label: 'Dean View', path: '/dean', icon: Award },
  { id: 'examination', label: 'Exam Cell View', path: '/examination', icon: ClipboardList },
  { id: 'admin', label: 'Admin View', path: '/admin', icon: ShieldCheck },
];

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentRole = roleOptions.find((r) => location.pathname.startsWith(r.path)) || roleOptions[0];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-64 flex-col bg-[#0b1528] text-slate-300 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-slate-800/80 shadow-xl lg:shadow-none`}
      >
        {/* Brand Header */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-slate-800/60">
          <div
            onClick={() => navigate('/student')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">
                Campus Hub
              </span>
              <span className="text-[11px] font-medium text-slate-400 block -mt-0.5">
                Your Campus, One Place
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
          <div className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Navigation
          </div>

          {studentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose && onClose()}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && !isActive && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 group-hover:bg-blue-900/60 group-hover:text-blue-300">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* Quick Role Switcher section */}
          <div className="pt-5 pb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Role Dashboards
          </div>
          <div className="space-y-1">
            {roleOptions.filter((r) => r.id !== 'student').map((role) => {
              const RoleIcon = role.icon;
              const isCurrent = location.pathname.startsWith(role.path);
              return (
                <NavLink
                  key={role.path}
                  to={role.path}
                  onClick={() => onClose && onClose()}
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isCurrent
                      ? 'bg-slate-800 text-cyan-400 font-semibold border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <RoleIcon className="h-3.5 w-3.5 shrink-0" />
                  <span>{role.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="pt-4 pb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Account
          </div>

          <NavLink
            to="/student/profile"
            onClick={() => onClose && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`
            }
          >
            <User className="h-4 w-4 text-slate-400" />
            <span>My Profile</span>
          </NavLink>

          <NavLink
            to="/student/profile?tab=settings"
            onClick={() => onClose && onClose()}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
          >
            <Settings className="h-4 w-4 text-slate-400" />
            <span>Settings</span>
          </NavLink>
        </div>

        {/* Sidebar University Illustration Footer */}
        <div className="p-4 mx-3 mb-3 rounded-2xl bg-gradient-to-b from-[#13223f] to-[#0c1628] border border-blue-900/40 text-center relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            {/* SVG University Building Silhouette */}
            <svg
              className="h-12 w-28 text-cyan-300 opacity-90 mb-1"
              viewBox="0 0 140 60"
              fill="currentColor"
            >
              {/* Roof Dome */}
              <path d="M70 4 C60 4 58 14 58 18 L82 18 C82 14 80 4 70 4 Z" fill="currentColor" opacity="0.9" />
              <rect x="68" y="0" width="4" height="4" fill="currentColor" />
              {/* Pediment Triangle */}
              <polygon points="46,26 70,16 94,26" fill="currentColor" />
              {/* Entablature */}
              <rect x="42" y="26" width="56" height="4" fill="currentColor" />
              {/* Columns */}
              <rect x="46" y="30" width="4" height="22" fill="currentColor" opacity="0.85" />
              <rect x="58" y="30" width="4" height="22" fill="currentColor" opacity="0.85" />
              <rect x="70" y="30" width="4" height="22" fill="currentColor" opacity="0.85" />
              <rect x="78" y="30" width="4" height="22" fill="currentColor" opacity="0.85" />
              <rect x="90" y="30" width="4" height="22" fill="currentColor" opacity="0.85" />
              {/* Wings */}
              <rect x="14" y="28" width="30" height="24" fill="currentColor" opacity="0.75" />
              <rect x="96" y="28" width="30" height="24" fill="currentColor" opacity="0.75" />
              {/* Wing Windows */}
              <rect x="18" y="32" width="6" height="8" rx="2" fill="#0b1528" />
              <rect x="28" y="32" width="6" height="8" rx="2" fill="#0b1528" />
              <rect x="36" y="32" width="6" height="8" rx="2" fill="#0b1528" />
              <rect x="100" y="32" width="6" height="8" rx="2" fill="#0b1528" />
              <rect x="108" y="32" width="6" height="8" rx="2" fill="#0b1528" />
              <rect x="116" y="32" width="6" height="8" rx="2" fill="#0b1528" />
              {/* Steps/Base */}
              <rect x="6" y="52" width="128" height="4" fill="currentColor" />
              <rect x="2" y="56" width="136" height="4" fill="currentColor" opacity="0.8" />
            </svg>
            <p className="text-[11px] font-semibold text-cyan-200 tracking-wider">
              Learn • Connect • Grow
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
