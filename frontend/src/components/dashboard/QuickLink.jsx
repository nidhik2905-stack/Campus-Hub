// src/components/dashboard/QuickLink.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileEdit,
  BarChart2,
  CalendarCheck,
  Book,
  FileText,
  PhoneCall,
} from 'lucide-react';

const iconMap = {
  FileEdit,
  BarChart2,
  CalendarCheck,
  Book,
  FileText,
  PhoneCall,
};

export default function QuickLink({ link }) {
  const navigate = useNavigate();
  const Icon = iconMap[link.iconName] || FileText;

  return (
    <button
      onClick={() => navigate(link.link)}
      className={`flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl border border-slate-200/60 ${link.bg} transition-all duration-150 hover:shadow-xs hover:scale-[1.02] active:scale-[0.98] group`}
    >
      <div className={`mb-2 ${link.iconColor} group-hover:scale-110 transition-transform`}>
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <span className={`text-xs font-semibold ${link.text} text-center leading-tight`}>
        {link.title}
      </span>
    </button>
  );
}
