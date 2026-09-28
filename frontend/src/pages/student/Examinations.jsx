// src/pages/student/Examinations.jsx
import React, { useState } from 'react';
import {
  ClipboardList,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  Award,
  Download,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { examinationData } from '../../utils/mockData';

export default function ExaminationsPage() {
  const [activeSection, setActiveSection] = useState('upcoming');
  const [appliedForms, setAppliedForms] = useState({});
  const [selectedExam, setSelectedExam] = useState(null);

  const handleApplyForm = (id) => {
    setAppliedForms((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <ClipboardList className="h-5 w-5" />
            </span>
            Examination Center
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Exam schedules, online registration forms, hall tickets, and published semester grade cards
          </p>
        </div>

        <Button variant="primary" size="sm" icon={Download}>
          Download Hall Ticket
        </Button>
      </div>

      {/* Navigation Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'upcoming', label: 'Upcoming Exams' },
          { id: 'forms', label: 'Exam Forms' },
          { id: 'results', label: 'Grade History & Results' },
          { id: 'dates', label: 'Important Dates' },
          { id: 'guidelines', label: 'Exam Guidelines' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              activeSection === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Section 1: Upcoming Exams */}
      {activeSection === 'upcoming' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examinationData.upcoming.map((exam, idx) => (
              <Card
                key={idx}
                hoverEffect
                padding="p-5"
                className="flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                      {exam.code}
                    </span>
                    <Badge variant="primary">{exam.status}</Badge>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {exam.subject}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{exam.semester}</p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="font-semibold">{exam.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>{exam.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                      <span>{exam.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedExam(exam)}
                  >
                    Hall Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Section 2: Exam Forms */}
      {activeSection === 'forms' && (
        <div className="space-y-4">
          {examinationData.forms.map((form) => {
            const isSubmitted = appliedForms[form.id];
            return (
              <Card
                key={form.id}
                padding="p-6"
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="warning">{form.badge}</Badge>
                    <span className="text-xs text-slate-500">Deadline: {form.deadline}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{form.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600">{form.description}</p>
                  <p className="text-xs font-semibold text-blue-600 pt-1">Examination Fee: {form.fee}</p>
                </div>

                <Button
                  variant={isSubmitted ? 'secondary' : 'primary'}
                  size="md"
                  onClick={() => handleApplyForm(form.id)}
                  icon={isSubmitted ? CheckCircle2 : null}
                  disabled={isSubmitted}
                >
                  {isSubmitted ? 'Submitted (Paid)' : 'Register & Pay Fee'}
                </Button>
              </Card>
            );
          })}
        </div>
      )}

      {/* Section 3: Grade History & Results */}
      {activeSection === 'results' && (
        <Card padding="p-0" className="overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              Published Semester Grade Cards
            </h3>
            <Badge variant="success">Current CGPA: 8.74</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Semester</th>
                  <th className="px-6 py-3.5">SGPA</th>
                  <th className="px-6 py-3.5">Cumulative CGPA</th>
                  <th className="px-6 py-3.5">Earned Credits</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {examinationData.results.map((res, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-semibold text-slate-900">{res.semester}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">{res.sgpa}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{res.cgpa}</td>
                    <td className="px-6 py-4">{res.credits}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {res.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" icon={Download}>
                        Grade Card
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Section 4: Important Dates */}
      {activeSection === 'dates' && (
        <Card padding="p-6">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Key Examination Deadlines (Autumn 2024)
          </h3>
          <div className="space-y-3">
            {examinationData.importantDates.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/70"
              >
                <span className="text-sm font-semibold text-slate-800">{item.event}</span>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Section 5: Guidelines */}
      {activeSection === 'guidelines' && (
        <Card padding="p-6">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Examination Code of Conduct & Regulations
          </h3>
          <ul className="space-y-3">
            {examinationData.guidelines.map((rule, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-slate-700 p-3 rounded-xl bg-slate-50 border border-slate-100"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold mt-0.5">
                  {idx + 1}
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Hall Details Modal */}
      <Modal
        isOpen={!!selectedExam}
        onClose={() => setSelectedExam(null)}
        title={selectedExam?.subject || 'Examination Details'}
        subtitle={`Paper Code: ${selectedExam?.code} • ${selectedExam?.semester}`}
      >
        {selectedExam && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-blue-50 p-4 border border-blue-100 text-xs sm:text-sm text-blue-900 space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Exam Date:</span>
                <span>{selectedExam.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Timing:</span>
                <span>{selectedExam.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Allotted Hall:</span>
                <span>{selectedExam.venue}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Seat Number:</span>
                <span>Desk A-34 (Row 4)</span>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Please present your official Student ID and printed hall ticket upon entering the examination block.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
