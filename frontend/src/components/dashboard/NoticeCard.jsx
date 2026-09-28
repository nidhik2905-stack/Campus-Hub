// src/components/dashboard/NoticeCard.jsx
import React from 'react';
import {
  Megaphone,
  Laptop,
  Target,
  BookOpen,
  Activity,
  FileCheck,
} from 'lucide-react';

const iconMap = {
  Megaphone,
  Laptop,
  Target,
  BookOpen,
  Activity,
  FileCheck,
};

export default function NoticeCard({ notice, onSelect }) {
  const Icon = iconMap[notice.iconName] || Megaphone;

  return (
    <div
      onClick={() => onSelect && onSelect(notice)}
      className="group flex items-start justify-between gap-3 p-3.5 rounded-xl hover:bg-slate-50 transition-all duration-150 cursor-pointer border border-transparent hover:border-slate-200/80"
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${notice.iconColor} group-hover:scale-105 transition-transform`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
            {notice.title}
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            {notice.department}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
        <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
          {notice.date}
        </span>
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${notice.priorityColor}`}
        >
          {notice.priority}
        </span>
      </div>
    </div>
  );
}
