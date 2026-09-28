// src/pages/student/Documents.jsx
import React, { useState, useMemo } from 'react';
import {
  FolderClosed,
  Search,
  FileText,
  Download,
  Eye,
  Calendar,
  Building,
  Check,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';
import { campusDocuments } from '../../utils/mockData';

const categories = [
  { value: 'ALL', label: 'All Document Categories' },
  { value: 'Academic', label: 'Academic' },
  { value: 'Examination', label: 'Examination' },
  { value: 'Circulars', label: 'Circulars' },
  { value: 'Forms', label: 'Forms & Templates' },
  { value: 'Guidelines', label: 'Guidelines & Policies' },
];

export default function DocumentsPage() {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [previewDoc, setPreviewDoc] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const filteredDocs = useMemo(() => {
    return campusDocuments.filter((doc) => {
      const matchSearch =
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.department.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCat === 'ALL' || doc.category === selectedCat;
      return matchSearch && matchCat;
    });
  }, [search, selectedCat]);

  const handleDownload = (doc) => {
    setDownloadSuccess(doc.id);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <FolderClosed className="h-5 w-5" />
            </span>
            Documents & Resources
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Syllabus files, academic calendars, previous question papers, downloadable circulars and forms
          </p>
        </div>

        <Badge variant="warning" size="md">
          {filteredDocs.length} Resources
        </Badge>
      </div>

      {/* Filter and Search Bar */}
      <Card padding="p-4" className="bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <Input
              placeholder="Search document title, syllabus, regulations, or office..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={Search}
            />
          </div>
          <Select
            options={categories}
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
          />
        </div>
      </Card>

      {/* Document Grid */}
      {filteredDocs.length === 0 ? (
        <Card>
          <EmptyState
            title="No documents found"
            description="Try searching with a different keyword or resetting the category filter."
            actionLabel="Reset Search"
            onAction={() => {
              setSearch('');
              setSelectedCat('ALL');
            }}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map((doc) => {
            const isDownloaded = downloadSuccess === doc.id;

            return (
              <Card
                key={doc.id}
                hoverEffect
                padding="p-5"
                className="flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-mono text-xs font-bold border border-blue-100">
                      {doc.fileType}
                    </div>
                    <Badge variant="primary">{doc.category}</Badge>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {doc.title}
                  </h3>

                  <div className="mt-3 space-y-1 text-xs text-slate-500">
                    <p className="flex items-center gap-1.5">
                      <Building className="h-3.5 w-3.5 text-slate-400" />
                      {doc.department}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      Uploaded {doc.date} • {doc.size}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Eye}
                    onClick={() => setPreviewDoc(doc)}
                  >
                    View
                  </Button>

                  <Button
                    variant={isDownloaded ? 'secondary' : 'outline'}
                    size="sm"
                    icon={isDownloaded ? Check : Download}
                    onClick={() => handleDownload(doc)}
                  >
                    {isDownloaded ? 'Downloaded' : 'Download'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Document Preview Modal */}
      <Modal
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        title={previewDoc?.title || 'Document Preview'}
        subtitle={`${previewDoc?.department} • ${previewDoc?.size}`}
        footer={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setPreviewDoc(null)}>
              Close
            </Button>
            <Button
              variant="primary"
              icon={Download}
              onClick={() => {
                handleDownload(previewDoc);
                setPreviewDoc(null);
              }}
            >
              Download Copy
            </Button>
          </div>
        }
      >
        {previewDoc && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200/80 text-center flex flex-col items-center">
              <FileText className="h-16 w-16 text-blue-600 mb-3" />
              <h4 className="font-bold text-slate-900 text-sm">{previewDoc.title}</h4>
              <p className="text-xs text-slate-500 mt-1">
                Format: {previewDoc.fileType} • Size: {previewDoc.size} • Total Downloads: {previewDoc.downloads}
              </p>
              <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 text-left w-full space-y-1">
                <p><span className="font-semibold">Security:</span> Authenticated Student Access Verified</p>
                <p><span className="font-semibold">Issuing Office:</span> {previewDoc.department}</p>
                <p><span className="font-semibold">Checksum:</span> SHA-256 Verified by University Registrar</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
