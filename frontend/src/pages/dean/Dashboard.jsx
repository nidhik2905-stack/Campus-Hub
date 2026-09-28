// src/pages/dean/Dashboard.jsx
import React from 'react';
import {
  Award,
  Building,
  Users,
  FileText,
  Calendar,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { deanRoleData, latestNotices } from '../../utils/mockData';

export default function DeanDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="md">Office of the Dean</Badge>
            <span className="text-xs text-slate-500">• Academic Affairs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            {deanRoleData.name}
          </h1>
          <p className="text-sm text-slate-500">{deanRoleData.designation} • University Academic Governance</p>
        </div>

        <Button variant="primary" size="sm" icon={FileText}>
          Publish Academic Circular
        </Button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {deanRoleData.stats.map((s, idx) => (
          <Card key={idx} padding="p-5" className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 font-bold">
              {s.count}
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{s.count}</div>
              <div className="text-xs font-medium text-slate-500">{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <Card padding="p-6">
            <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 mb-4 flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-600" />
              Department Enrollment & Academic Compliance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { dept: 'Computer Science & Engineering', students: 740, faculty: 28, accreditation: 'Tier-1 NBA' },
                { dept: 'Electronics & Communication', students: 620, faculty: 24, accreditation: 'Tier-1 NBA' },
                { dept: 'Mechanical Engineering', students: 480, faculty: 22, accreditation: 'Tier-1 NBA' },
                { dept: 'Information Technology', students: 510, faculty: 20, accreditation: 'Tier-1 NBA' },
              ].map((d, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{d.dept}</span>
                    <span className="text-emerald-600 font-semibold">{d.accreditation}</span>
                  </div>
                  <p className="text-slate-500">
                    {d.students} Students • {d.faculty} Teaching Faculty
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <Card padding="p-6">
            <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              Semester Milestone Tracker
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                <span className="font-bold block">Instruction Period</span>
                <span>Active (Week 11 of 16 completed)</span>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900">
                <span className="font-bold block">Mid-Term Assessments</span>
                <span>Commencing Oct 25, 2024</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                <span className="font-bold block">End-Term Senate Approvals</span>
                <span>Scheduled for Dec 12, 2024</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
