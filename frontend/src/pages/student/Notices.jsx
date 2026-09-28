// src/pages/student/Notices.jsx
import React, { useState, useMemo } from 'react';
import { Search, Filter, Bell, Calendar, Building, Eye, ChevronRight } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';
import { latestNotices } from '../../utils/mockData';

const categories = [
  { value: 'ALL', label: 'All Categories' },
  { value: 'Academic', label: 'Academic' },
  { value: 'Examination', label: 'Examination' },
  { value: 'Department', label: 'Department' },
  { value: 'General', label: 'General' },
  { value: 'Event', label: 'Event' },
  { value: 'Placement', label: 'Placement' },
];

const departments = [
  { value: 'ALL', label: 'All Departments' },
  { value: 'Examination Cell', label: 'Examination Cell' },
  { value: 'CSE Department', label: 'CSE Department' },
  { value: 'Training & Placement Cell', label: 'Training & Placement' },
  { value: 'Central Library', label: 'Central Library' },
  { value: 'Sports Council', label: 'Sports Council' },
  { value: 'Dean Student Affairs', label: 'Student Affairs' },
];

export default function NoticesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [activeModalNotice, setActiveModalNotice] = useState(null);

  const filteredNotices = useMemo(() => {
    return latestNotices.filter((n) => {
      const matchSearch =
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.description.toLowerCase().includes(search.toLowerCase()) ||
        n.department.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === 'ALL' || n.category === selectedCategory;
      const matchDept = selectedDept === 'ALL' || n.department === selectedDept;
      return matchSearch && matchCat && matchDept;
    });
  }, [search, selectedCategory, selectedDept]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Bell className="h-5 w-5" />
            </span>
            College Notices
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Official announcements, academic circulars, and departmental updates
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="primary" size="md">
            {filteredNotices.length} Notices Available
          </Badge>
        </div>
      </div>

      {/* Filters Bar */}
      <Card padding="p-4" className="bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            placeholder="Search by keywords or notice title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={Search}
          />
          <Select
            options={categories}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          <Select
            options={departments}
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          />
        </div>
      </Card>

      {/* Notices List */}
      {filteredNotices.length === 0 ? (
        <Card>
          <EmptyState
            title="No notices found"
            description="No announcements match your search or filter criteria. Try resetting filters."
            actionLabel="Reset Filters"
            onAction={() => {
              setSearch('');
              setSelectedCategory('ALL');
              setSelectedDept('ALL');
            }}
          />
        </Card>
      ) : (
        <div className="space-y-3.5">
          {filteredNotices.map((notice) => (
            <Card
              key={notice.id}
              hoverEffect
              padding="p-5"
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <Badge variant="primary">{notice.category}</Badge>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${notice.priorityColor}`}
                  >
                    {notice.priority}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {notice.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {notice.title}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <Building className="h-3.5 w-3.5 text-slate-400" />
                  {notice.department}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {notice.description}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Eye}
                  onClick={() => setActiveModalNotice(notice)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Notice Detail Modal */}
      <Modal
        isOpen={!!activeModalNotice}
        onClose={() => setActiveModalNotice(null)}
        title={activeModalNotice?.title || 'Notice Details'}
        subtitle={`Issued by ${activeModalNotice?.department || ''}`}
      >
        {activeModalNotice && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary">{activeModalNotice.category}</Badge>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${activeModalNotice.priorityColor}`}>
                {activeModalNotice.priority}
              </span>
              <span className="text-xs text-slate-500">
                Date: {activeModalNotice.date}
              </span>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/70 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeModalNotice.description}
            </div>

            <div className="rounded-xl border border-slate-100 p-3 space-y-1 text-xs text-slate-500 bg-slate-50/50">
              <p>Reference: {activeModalNotice.id}/2024-AUTUMN</p>
              <p>Issuing Office: {activeModalNotice.department}, Campus Administration Block</p>
              <p>Contact Email: notices@campushub.edu</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
