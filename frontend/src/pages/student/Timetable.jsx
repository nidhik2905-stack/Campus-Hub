// src/pages/student/Timetable.jsx
import React, { useState } from 'react';
import { Clock, Calendar, User, MapPin, Download, BookOpen, Layers } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Select from '../../components/common/Select';
import { weeklyTimetable, currentUser } from '../../utils/mockData';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const deptOptions = [
  { value: 'CSE', label: 'Computer Science & Engineering' },
  { value: 'IT', label: 'Information Technology' },
  { value: 'ECE', label: 'Electronics & Communication' },
  { value: 'ME', label: 'Mechanical Engineering' },
];

const semOptions = [
  { value: '6', label: '6th Semester (3rd Year)' },
  { value: '5', label: '5th Semester (3rd Year)' },
  { value: '7', label: '7th Semester (4th Year)' },
  { value: '8', label: '8th Semester (4th Year)' },
];

const yearOptions = [
  { value: '2024-25', label: 'Academic Year 2024-25' },
  { value: '2023-24', label: 'Academic Year 2023-24' },
];

export default function TimetablePage() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedDept, setSelectedDept] = useState('CSE');
  const [selectedSem, setSelectedSem] = useState('6');
  const [selectedYear, setSelectedYear] = useState('2024-25');

  const classesForDay = weeklyTimetable[selectedDay] || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <Clock className="h-5 w-5" />
            </span>
            Class Timetable
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Current enrolled schedule for {currentUser.program} • {currentUser.section}
          </p>
        </div>

        <Button variant="secondary" size="sm" icon={Download}>
          Export PDF Schedule
        </Button>
      </div>

      {/* Top Filter Bar */}
      <Card padding="p-4" className="bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select
            label="Department"
            options={deptOptions}
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          />
          <Select
            label="Semester"
            options={semOptions}
            value={selectedSem}
            onChange={(e) => setSelectedSem(e.target.value)}
          />
          <Select
            label="Academic Year"
            options={yearOptions}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          />
        </div>
      </Card>

      {/* Day Selector Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-150 shrink-0 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70'
              }`}
            >
              {day}
              <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${
                isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {weeklyTimetable[day]?.length || 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Class Schedule Cards for Selected Day */}
      <div className="space-y-3.5">
        {classesForDay.map((item, idx) => (
          <Card
            key={idx}
            hoverEffect
            padding="p-5"
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-l-blue-600"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center justify-center h-14 w-28 shrink-0 rounded-xl bg-slate-100/90 text-slate-800 font-bold border border-slate-200/60 p-2 text-center">
                <span className="text-xs font-semibold text-slate-900 leading-tight">
                  {item.time.split(' - ')[0]}
                </span>
                <span className="text-[10px] text-slate-400 font-normal">to</span>
                <span className="text-xs font-semibold text-slate-900 leading-tight">
                  {item.time.split(' - ')[1]}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                    {item.code}
                  </span>
                  <Badge variant={item.type === 'Lab' ? 'purple' : 'primary'}>
                    {item.type}
                  </Badge>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {item.subject}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    {item.faculty}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                    {item.room}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                Confirmed Session
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
