// src/pages/student/Dashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Link as LinkIcon, FileText, Calendar, Clock, MapPin } from 'lucide-react';
import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import StatCard from '../../components/dashboard/StatCard';
import NoticeCard from '../../components/dashboard/NoticeCard';
import EventCard from '../../components/dashboard/EventCard';
import QuickLink from '../../components/dashboard/QuickLink';
import AiAssistantWidget from '../../components/dashboard/AiAssistantWidget';
import QuoteBanner from '../../components/dashboard/QuoteBanner';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
  currentUser,
  dashboardStats,
  latestNotices,
  upcomingEvents,
  quickLinks,
} from '../../utils/mockData';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="space-y-6">
      {/* 1. Welcome Banner */}
      <WelcomeBanner
        name={currentUser.name.split(' ')[0]}
        quote="A better tomorrow begins with informed today."
        tagline="Knowledge Connects Communities"
      />

      {/* 2. 4 Metric Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.id}
            count={stat.count}
            label={stat.label}
            iconName={stat.iconName}
            bgLight={stat.bgLight}
            borderLight={stat.borderLight}
            iconBg={stat.iconBg}
            link={stat.link}
          />
        ))}
      </div>

      {/* 3. Main Dashboard Grid (Left 2-Column Section + Right Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Notices, Events, Quote */}
        <div className="lg:col-span-8 space-y-6">
          {/* Subgrid: Latest Notices & Upcoming Events side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Latest Notices Card */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Latest Notices
                  </h3>
                  <button
                    onClick={() => navigate('/student/notices')}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>View All</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {latestNotices.slice(0, 4).map((notice) => (
                    <NoticeCard
                      key={notice.id}
                      notice={notice}
                      onSelect={(n) => setSelectedNotice(n)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Events Card */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Upcoming Events
                  </h3>
                  <button
                    onClick={() => navigate('/student/events')}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>View All</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {upcomingEvents.slice(0, 4).map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onSelect={(e) => setSelectedEvent(e)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Campus Quote Banner */}
          <QuoteBanner />
        </div>

        {/* Right Column: AI Assistant & Quick Links */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Assistant Widget */}
          <AiAssistantWidget />

          {/* Quick Links Widget */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
              <LinkIcon className="h-4 w-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Quick Links
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <QuickLink key={link.id} link={link} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notice Detail Modal */}
      <Modal
        isOpen={!!selectedNotice}
        onClose={() => setSelectedNotice(null)}
        title={selectedNotice?.title || 'Notice Details'}
        subtitle={`${selectedNotice?.department || ''} • Published ${selectedNotice?.date || ''}`}
        footer={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setSelectedNotice(null)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setSelectedNotice(null);
                navigate('/student/notices');
              }}
            >
              All Notices
            </Button>
          </div>
        }
      >
        {selectedNotice && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="primary">{selectedNotice.category}</Badge>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${selectedNotice.priorityColor}`}>
                {selectedNotice.priority}
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedNotice.description}
            </p>
            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/70 text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Notice ID:</span>
                <span>{selectedNotice.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Issuing Authority:</span>
                <span>{selectedNotice.department}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Event Detail Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title || 'Event Details'}
        subtitle={`${selectedEvent?.day} ${selectedEvent?.month} • ${selectedEvent?.department || ''}`}
        footer={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setSelectedEvent(null)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setSelectedEvent(null);
                navigate('/student/events');
              }}
            >
              View in Events Calendar
            </Button>
          </div>
        }
      >
        {selectedEvent && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="purple">{selectedEvent.category}</Badge>
              <Badge variant="cyan">{selectedEvent.department}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>{selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span>{selectedEvent.venue}</span>
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedEvent.description}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
