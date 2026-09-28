// src/pages/examination/Dashboard.jsx
import React, { useState } from 'react';
import {
  ClipboardList,
  Calendar,
  CreditCard,
  MapPin,
  CheckCircle,
  PlusCircle,
  FileCheck,
  Award,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { examCellData, examinationData } from '../../utils/mockData';

export default function ExaminationCellDashboard() {
  const [modalAction, setModalAction] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="danger" size="md">Controller of Examinations</Badge>
            <span className="text-xs text-slate-500">• Central Exam Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            {examCellData.name}
          </h1>
          <p className="text-sm text-slate-500">{examCellData.designation} • Schedules & Grade Evaluation</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={PlusCircle}
            onClick={() => setModalAction('Create Exam Notice')}
          >
            Create Notice
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Calendar}
            onClick={() => setModalAction('Add Exam Schedule')}
          >
            Add Schedule
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Award}
            onClick={() => setModalAction('Publish Result Batch')}
          >
            Publish Result
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {examCellData.stats.map((s, idx) => (
          <Card key={idx} padding="p-5" className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 font-bold">
              {s.count}
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{s.count}</div>
              <div className="text-xs font-medium text-slate-500">{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Grid: Active Exam Papers & Registration Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <Card padding="p-6">
            <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 mb-4 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-rose-600" />
              Active Examination Schedules Ready for Printing & Dispatch
            </h3>
            <div className="space-y-3">
              {examinationData.upcoming.map((ex, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {ex.code}
                      </span>
                      <span className="font-bold text-slate-800">{ex.subject}</span>
                    </div>
                    <p className="text-slate-500">
                      Date: {ex.date} ({ex.time}) • Allotted: {ex.venue}
                    </p>
                  </div>
                  <Badge variant="primary">Dispatched</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <Card padding="p-6">
            <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 mb-4 flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-emerald-600" />
              Exam Form Applications
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Regular Exam Forms</span>
                  <span className="text-blue-600">3,120 / 3,450</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-[90%]" />
                </div>
                <p className="text-[11px] text-slate-400">90.4% verified applications</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Backlog Forms</span>
                  <span className="text-amber-600">290 / 340</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[85%]" />
                </div>
                <p className="text-[11px] text-slate-400">85.2% fee payments cleared</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={!!modalAction}
        onClose={() => setModalAction(null)}
        title={modalAction || ''}
        subtitle="Examination Cell Operations • Phase 1 UI Presentation"
      >
        <p className="text-xs sm:text-sm text-slate-600">
          This form permits creating schedules, hall allocations, and automated grade publication workflows when integrated with the backend service layer in subsequent phases.
        </p>
      </Modal>
    </div>
  );
}
