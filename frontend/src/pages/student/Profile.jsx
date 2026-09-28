// src/pages/student/Profile.jsx
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Award, BookOpen, Shield, Bell, Lock, Key } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Avatar from '../../components/common/Avatar';
import { currentUser } from '../../utils/mockData';

export default function ProfilePage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'personal';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [saveMessage, setSaveMessage] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaveMessage(true);
    setTimeout(() => setSaveMessage(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Profile Card */}
      <Card padding="p-6" className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white border-0 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <Avatar
            src={currentUser.avatar}
            name={currentUser.name}
            size="xl"
            className="ring-4 ring-white/20"
          />
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-bold text-white">{currentUser.name}</h1>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                {currentUser.roleTitle}
              </span>
            </div>
            <p className="text-sm text-cyan-200">{currentUser.program}</p>
            <p className="text-xs text-slate-300">
              Student ID: <span className="font-mono text-white">{currentUser.id}</span> • Roll No: <span className="font-mono text-white">{currentUser.rollNo}</span>
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-cyan-400" />
                {currentUser.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="h-3.5 w-3.5 text-cyan-400" />
                {currentUser.phone}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'personal', label: 'Personal Information', icon: User },
          { id: 'academic', label: 'Academic Details', icon: BookOpen },
          { id: 'settings', label: 'Account & Security Settings', icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {saveMessage && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 font-semibold">
          ✓ Profile settings updated successfully in local presentation layer.
        </div>
      )}

      {/* Tab 1: Personal Information */}
      {activeTab === 'personal' && (
        <Card padding="p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" defaultValue={currentUser.name} />
              <Input label="Official College Email" defaultValue={currentUser.email} disabled />
              <Input label="Contact Phone Number" defaultValue={currentUser.phone} />
              <Input label="Campus Accommodation" defaultValue={currentUser.address} />
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Tab 2: Academic Information */}
      {activeTab === 'academic' && (
        <Card padding="p-6">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">
            Institutional Academic Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-500 font-semibold uppercase">Department</p>
              <p className="text-sm font-bold text-slate-900 mt-1">{currentUser.department}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-500 font-semibold uppercase">Current Semester</p>
              <p className="text-sm font-bold text-slate-900 mt-1">{currentUser.semester}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-500 font-semibold uppercase">Batch Admission</p>
              <p className="text-sm font-bold text-slate-900 mt-1">{currentUser.admissionYear} - {currentUser.expectedGraduation}</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <p className="text-xs text-blue-700 font-semibold uppercase">Cumulative CGPA</p>
              <p className="text-2xl font-extrabold text-blue-900 mt-1">{currentUser.cgpa} / 10.0</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <p className="text-xs text-emerald-700 font-semibold uppercase">Overall Attendance</p>
              <p className="text-2xl font-extrabold text-emerald-900 mt-1">{currentUser.attendance}</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
              <p className="text-xs text-purple-700 font-semibold uppercase">Assigned Faculty Advisor</p>
              <p className="text-sm font-bold text-purple-950 mt-1">{currentUser.advisor}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 3: Settings */}
      {activeTab === 'settings' && (
        <Card padding="p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Security & Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Current Password" type="password" placeholder="••••••••" />
              <Input label="New Password" type="password" placeholder="••••••••" />
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Notification Preferences
              </h4>
              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>Email alerts for Urgent Exam & Hall Ticket circulars</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>SMS notifications for class room shifts or cancellations</span>
                </label>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit">Update Password</Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
