// src/pages/faculty/Dashboard.jsx
import React, { useState } from 'react';
import {
  Users,
  BookOpen,
  CheckSquare,
  Bell,
  PlusCircle,
  Upload,
  Calendar,
  FileText,
  Clock,
  ExternalLink,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { facultyRoleData, latestNotices } from '../../utils/mockData';

export default function FacultyDashboard() {
  const [modalAction, setModalAction] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="purple" size="md">Faculty Portal</Badge>
            <span className="text-xs text-slate-500">• {facultyRoleData.department}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Welcome, {facultyRoleData.name}
          </h1>
          <p className="text-sm text-slate-500">{facultyRoleData.designation}</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={PlusCircle}
            onClick={() => setModalAction('Create Notice')}
          >
            Create Notice
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Calendar}
            onClick={() => setModalAction('Add Department Event')}
          >
            Add Event
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Upload}
            onClick={() => setModalAction('Upload Course Document')}
          >
            Upload Document
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {facultyRoleData.stats.map((s, idx) => (
          <Card key={idx} padding="p-5" className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 font-bold">
              {s.count}
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900">{s.count}</div>
              <div className="text-xs font-medium text-slate-500">{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Grid: My Assigned Courses & Department Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: My Courses */}
        <div className="lg:col-span-7 space-y-4">
          <Card padding="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                My Assigned Courses & Batches
              </h3>
              <span className="text-xs text-slate-500">Autumn 2024</span>
            </div>

            <div className="space-y-3">
              {facultyRoleData.myCourses.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-blue-50/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-blue-600 bg-white px-2 py-0.5 rounded border border-blue-200">
                        {c.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-700">{c.section}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{c.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {c.students} Students Enrolled • Hall: {c.room}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Class List
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Recent Faculty Notices */}
        <div className="lg:col-span-5 space-y-4">
          <Card padding="p-6">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 pb-3 border-b border-slate-100 mb-3">
              <Bell className="h-5 w-5 text-indigo-600" />
              Department Notices Issued
            </h3>

            <div className="space-y-3">
              {latestNotices.slice(0, 3).map((n) => (
                <div key={n.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">{n.title}</span>
                    <span className="text-[10px] text-slate-400">{n.date}</span>
                  </div>
                  <p className="text-slate-500">{n.department}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Action Modal (Presentation Placeholder) */}
      <Modal
        isOpen={!!modalAction}
        onClose={() => setModalAction(null)}
        title={modalAction || ''}
        subtitle="Phase 1 UI Presentation • Action will connect to backend API in later phases"
      >
        <div className="space-y-3 py-2 text-sm text-slate-600">
          <p>
            You triggered the <strong>{modalAction}</strong> modal action. In Phase 2/3, this form will dispatch verified payloads to the Spring Boot REST endpoint.
          </p>
          <div className="rounded-xl bg-blue-50 p-4 border border-blue-200 text-xs text-blue-900">
            Form inputs, file attachments, and department broadcasts will be handled through role-based access tokens.
          </div>
        </div>
      </Modal>
    </div>
  );
}
