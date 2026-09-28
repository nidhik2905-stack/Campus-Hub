// src/pages/admin/Dashboard.jsx
import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Activity,
  Server,
  Shield,
  Settings,
  Building,
  Key,
  Database,
  CheckCircle2,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { adminRoleData } from '../../utils/mockData';

export default function AdminDashboard() {
  const [modalAction, setModalAction] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="success" size="md">System Administration</Badge>
            <span className="text-xs text-slate-500">• Campus Hub IT Core</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            {adminRoleData.name}
          </h1>
          <p className="text-sm text-slate-500">{adminRoleData.designation} • Infrastructure & RBAC Policy</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={Users}
            onClick={() => setModalAction('Provision New User')}
          >
            Provision User
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Settings}
            onClick={() => setModalAction('System Configuration')}
          >
            System Settings
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminRoleData.stats.map((s, idx) => (
          <Card key={idx} padding="p-5" className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 font-bold">
              {s.count}
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{s.count}</div>
              <div className="text-xs font-medium text-slate-500">{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Management Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'User Management',
            desc: '5,240 enrolled student, faculty & dean records',
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
          },
          {
            title: 'Role Permissions (RBAC)',
            desc: 'Configured role policies: Student, Faculty, HOD, Dean, Exam, Admin',
            icon: Shield,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
          },
          {
            title: 'Department Units',
            desc: '9 active academic faculties and 4 administrative cells',
            icon: Building,
            color: 'text-cyan-600',
            bg: 'bg-cyan-50',
          },
          {
            title: 'Database & Audit Logs',
            desc: 'Security event tracing and session activity logs',
            icon: Database,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
          },
        ].map((sec, i) => {
          const SecIcon = sec.icon;
          return (
            <Card
              key={i}
              hoverEffect
              padding="p-5"
              className="cursor-pointer group flex flex-col justify-between"
              onClick={() => setModalAction(sec.title)}
            >
              <div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${sec.bg} ${sec.color} mb-3 group-hover:scale-105 transition-transform`}>
                  <SecIcon className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {sec.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {sec.desc}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>Manage</span>
                <span>→</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* System Activity Feed */}
      <Card padding="p-6">
        <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-emerald-600" />
          Recent Administrative Audit Events
        </h3>
        <div className="space-y-3 text-xs">
          {[
            { action: 'Admit Card Dispatch Completed', user: 'controller@campushub.edu', time: '14 mins ago', status: 'Success' },
            { action: 'CSE Semester 6 Timetable Revision Published', user: 'hod.cse@campushub.edu', time: '1 hour ago', status: 'Success' },
            { action: 'Security Token Configuration Refreshed', user: 'admin@campushub.edu', time: '3 hours ago', status: 'Logged' },
            { action: 'Backup Snapshot Captured', user: 'automated-daemon', time: '6 hours ago', status: 'Completed' },
          ].map((ev, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="font-semibold text-slate-900">{ev.action}</span>
                <p className="text-slate-500 text-[11px] mt-0.5">By {ev.user} • {ev.time}</p>
              </div>
              <Badge variant="success" size="sm">{ev.status}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        isOpen={!!modalAction}
        onClose={() => setModalAction(null)}
        title={modalAction || ''}
        subtitle="System Administration • Phase 1 UI Presentation"
      >
        <p className="text-xs sm:text-sm text-slate-600">
          This administration modal will enable CRUD management on users, role boundaries, and audit policies when connected to Spring Security and MySQL backend services.
        </p>
      </Modal>
    </div>
  );
}
