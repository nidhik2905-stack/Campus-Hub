// src/pages/hod/Dashboard.jsx
import React, { useState } from 'react';
import {
  Building2,
  Users,
  GraduationCap,
  Layers,
  Megaphone,
  Calendar,
  Clock,
  Upload,
  PlusCircle,
  FileText,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { hodRoleData, latestNotices } from '../../utils/mockData';

export default function HodDashboard() {
  const [modalAction, setModalAction] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="cyan" size="md">Head of Department</Badge>
            <span className="text-xs text-slate-500">• {hodRoleData.department}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            {hodRoleData.name}
          </h1>
          <p className="text-sm text-slate-500">{hodRoleData.designation} • Departmental Governance</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={PlusCircle}
            onClick={() => setModalAction('Add Department Notice')}
          >
            Add Notice
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Calendar}
            onClick={() => setModalAction('Schedule Event')}
          >
            Add Event
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Clock}
            onClick={() => setModalAction('Update Department Timetable')}
          >
            Update Timetable
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Upload}
            onClick={() => setModalAction('Upload Circular')}
          >
            Upload Document
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {hodRoleData.stats.map((s, idx) => (
          <Card key={idx} padding="p-5" className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 font-bold">
              {s.count}
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{s.count}</div>
              <div className="text-xs font-medium text-slate-500">{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Grid: Department Overview & Faculty Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <Card padding="p-6">
            <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Faculty Department Allocation & Labs
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Dr. S. K. Venkataraman', title: 'Professor', subject: 'Database Management Systems', load: '14 hrs/wk' },
                { name: 'Prof. Ananya Gupta', title: 'Associate Professor', subject: 'Computer Networks', load: '16 hrs/wk' },
                { name: 'Dr. Neha Kulkarni', title: 'Assistant Professor', subject: 'Artificial Intelligence', load: '16 hrs/wk' },
                { name: 'Prof. Rajesh Rao', title: 'Assistant Professor', subject: 'Compiler Design', load: '12 hrs/wk' },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">{f.name} ({f.title})</h4>
                    <p className="text-slate-500">{f.subject}</p>
                  </div>
                  <span className="font-mono font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded border border-cyan-200">
                    {f.load}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <Card padding="p-6">
            <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 mb-4 flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-amber-500" />
              HOD Circulars & Academic Sanctions
            </h3>
            <div className="space-y-3">
              {latestNotices.filter(n => n.category === 'Academic' || n.category === 'Examination').slice(0, 3).map((n) => (
                <div key={n.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex justify-between font-semibold text-slate-800">
                    <span>{n.title}</span>
                    <span className="text-slate-400">{n.date}</span>
                  </div>
                  <p className="text-slate-500 mt-1">{n.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={!!modalAction}
        onClose={() => setModalAction(null)}
        title={modalAction || ''}
        subtitle="HOD Administrative Control • Phase 1 UI Presentation"
      >
        <p className="text-xs sm:text-sm text-slate-600">
          This HOD workflow modal will permit schedule overrides, notice authoring, and faculty allocations when connected to backend database services.
        </p>
      </Modal>
    </div>
  );
}
