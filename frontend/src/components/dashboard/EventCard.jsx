// src/components/dashboard/EventCard.jsx
import React from 'react';

export default function EventCard({ event, onSelect }) {
  return (
    <div
      onClick={() => onSelect && onSelect(event)}
      className="group flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-150 cursor-pointer border border-transparent hover:border-slate-200/80"
    >
      {/* Date badge */}
      <div className="flex flex-col items-center justify-center w-12 shrink-0 py-1 px-1 rounded-xl bg-slate-100/90 text-slate-800 font-bold border border-slate-200/60 group-hover:border-blue-300 transition-colors">
        <span className="text-sm sm:text-base leading-tight font-extrabold text-slate-900">
          {event.day}
        </span>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          {event.month}
        </span>
      </div>

      {/* Timeline indicator with colored dot */}
      <div className="flex flex-col items-center self-stretch pt-2">
        <span className={`h-2.5 w-2.5 rounded-full ${event.dotColor} ring-4 ring-white shadow-xs`} />
        <span className="w-0.5 flex-1 bg-slate-200 mt-1" />
      </div>

      {/* Event Details */}
      <div className="min-w-0 flex-1">
        <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
          {event.title}
        </h4>
        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
          {event.venue}
        </p>
        <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5">
          {event.time}
        </p>
      </div>
    </div>
  );
}
