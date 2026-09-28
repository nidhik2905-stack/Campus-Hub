// src/components/dashboard/StatCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Calendar,
  Clock,
  ClipboardList,
} from 'lucide-react';

const iconComponents = {
  FileText,
  Calendar,
  Clock,
  ClipboardList,
};

export default function StatCard({
  count,
  label,
  iconName,
  bgLight,
  borderLight,
  iconBg,
  link,
}) {
  const navigate = useNavigate();
  const Icon = iconComponents[iconName] || FileText;

  return (
    <div
      onClick={() => link && navigate(link)}
      className={`flex items-center gap-4 p-5 rounded-2xl border ${borderLight} ${bgLight} shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer bg-white`}
    >
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg} shadow-xs`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-none">
          {count}
        </div>
        <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
          {label}
        </div>
      </div>
    </div>
  );
}
