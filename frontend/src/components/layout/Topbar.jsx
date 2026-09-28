// src/components/layout/Topbar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import Avatar from '../common/Avatar';
import { currentUser, notificationsList } from '../../utils/mockData';

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsList);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/student/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 sm:px-8 backdrop-blur-md">
      {/* Left Search & Mobile Toggle */}
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-lg hidden sm:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for notices, exams, events, documents..."
            className="w-full rounded-full border border-slate-200 bg-slate-50/80 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsProfileOpen(false);
            }}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 ring-2 ring-white"></span>
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-xl ring-1 ring-slate-900/10 border border-slate-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                <span className="font-semibold text-sm text-slate-900">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setIsNotifOpen(false);
                      navigate(item.link);
                    }}
                    className={`flex items-start gap-3 p-3.5 hover:bg-slate-50 cursor-pointer transition-colors ${
                      item.unread ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    <div className="mt-0.5 text-blue-600">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-900">{item.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 px-4 pt-2 text-center">
                <button
                  onClick={() => {
                    setIsNotifOpen(false);
                    navigate('/student/notices');
                  }}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  View all notices & circulars →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotifOpen(false);
            }}
            className="flex items-center gap-3 rounded-full border border-slate-200/90 bg-white py-1.5 pl-1.5 pr-3 text-left transition-all hover:border-slate-300 hover:shadow-sm"
          >
            <Avatar
              src={currentUser.avatar}
              name={currentUser.name}
              size="sm"
            />
            <div className="hidden sm:block">
              <span className="block text-xs font-bold text-slate-900 leading-tight">
                {currentUser.name}
              </span>
              <span className="block text-[11px] font-medium text-slate-500 leading-tight">
                B.Tech CSE (3rd Year)
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 ml-0.5" />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl ring-1 ring-slate-900/10 border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                <p className="text-[11px] font-semibold text-blue-600 mt-1">Roll No: {currentUser.rollNo}</p>
              </div>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate('/student/profile');
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                <User className="h-4 w-4 text-slate-400" />
                My Profile
              </button>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate('/student/profile?tab=settings');
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                <Settings className="h-4 w-4 text-slate-400" />
                Account Settings
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate('/login');
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="h-4 w-4 text-rose-500" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
