// src/pages/student/Events.jsx
import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, Users, Tag, CheckCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { upcomingEvents } from '../../utils/mockData';

const pastEvents = [
  {
    id: 'EVT-PAST-01',
    day: '12',
    month: 'OCT',
    title: 'Fresher’s Welcome Gala 2024',
    venue: 'Open Air Amphitheatre',
    time: '05:00 PM - 09:00 PM',
    dotColor: 'bg-slate-400',
    category: 'Cultural',
    department: 'Student Council',
    description: 'Annual induction celebrations and musical evening welcoming the newly joined 1st-year engineering batch.',
  },
  {
    id: 'EVT-PAST-02',
    day: '05',
    month: 'OCT',
    title: 'Expert Talk on Cloud & DevOps',
    venue: 'Seminar Hall 1',
    time: '11:00 AM - 01:00 PM',
    dotColor: 'bg-slate-400',
    category: 'Technical',
    department: 'IT Department',
    description: 'Technical deep-dive on Kubernetes, Terraform, CI/CD pipelines, and microservices architecture in enterprise.',
  },
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState({});

  const eventsToShow = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  const handleRegister = (eventId) => {
    setRegisteredEvents((prev) => ({ ...prev, [eventId]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <CalendarIcon className="h-5 w-5" />
            </span>
            Campus Events
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Conferences, technical hackathons, cultural festivals, and university guest lectures
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200/80 w-fit">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upcoming Events ({upcomingEvents.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'past'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Past Events ({pastEvents.length})
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {eventsToShow.map((event) => {
          const isRegistered = registeredEvents[event.id];

          return (
            <Card
              key={event.id}
              hoverEffect
              padding="p-6"
              className="flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  {/* Big Date Badge */}
                  <div className="flex flex-col items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-b from-blue-50 to-indigo-50 border border-blue-100/90 text-blue-900 font-extrabold shadow-2xs">
                    <span className="text-xl leading-none">{event.day}</span>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-0.5">
                      {event.month}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 justify-end">
                    <Badge variant="purple">{event.category}</Badge>
                    <Badge variant="cyan">{event.department}</Badge>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {event.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 flex items-center justify-between gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedEvent(event)}
                >
                  View Full Details
                </Button>

                {activeTab === 'upcoming' && (
                  <Button
                    variant={isRegistered ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => handleRegister(event.id)}
                    icon={isRegistered ? CheckCircle : null}
                  >
                    {isRegistered ? 'Registered' : 'Register Now'}
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal for Details */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title || 'Event Details'}
        subtitle={`${selectedEvent?.day} ${selectedEvent?.month} • ${selectedEvent?.department}`}
      >
        {selectedEvent && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Badge variant="purple">{selectedEvent.category}</Badge>
              <Badge variant="cyan">{selectedEvent.department}</Badge>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedEvent.description}
            </p>
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/70 text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="font-semibold">Schedule:</span>
                <span>{selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span className="font-semibold">Location:</span>
                <span>{selectedEvent.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Users className="h-4 w-4 text-purple-600" />
                <span className="font-semibold">Organized by:</span>
                <span>{selectedEvent.department}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
