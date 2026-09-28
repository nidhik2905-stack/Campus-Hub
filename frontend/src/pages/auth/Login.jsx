// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('rahul.sharma@campushub.edu');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedDemoRole, setSelectedDemoRole] = useState('student');

  const handleSignIn = (e) => {
    e.preventDefault();
    if (selectedDemoRole === 'student') navigate('/student');
    else if (selectedDemoRole === 'faculty') navigate('/faculty');
    else if (selectedDemoRole === 'hod') navigate('/hod');
    else if (selectedDemoRole === 'dean') navigate('/dean');
    else if (selectedDemoRole === 'examination') navigate('/examination');
    else if (selectedDemoRole === 'admin') navigate('/admin');
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Left Column: Campus Hub Branding & Visual Banner */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-900 p-12 text-white lg:flex">
        {/* Background Image */}
        <img
          src="/assets/campus_banner.jpg"
          alt="Campus Hub Architecture"
          className="absolute inset-0 h-full w-full object-cover opacity-35 filter contrast-125 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071329] via-[#0b172a]/80 to-[#0d1f3f]/70" />

        {/* Top Branding */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-500/30">
            <GraduationCap className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">Campus Hub</h2>
            <p className="text-xs font-medium text-cyan-300">Your Campus, One Place</p>
          </div>
        </div>

        {/* Middle Feature Highlights */}
        <div className="relative z-10 max-w-md space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/60 px-3.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>AI-Powered Smart College Information System</span>
          </div>

          <h1 className="text-4xl font-extrabold text-white leading-tight">
            Centralized Academic Intelligence & Campus Life
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Instant access to verified examination dates, departmental circulars, faculty hours, timetables, and automated AI assistance.
          </p>
        </div>

        {/* Bottom Quote & Subtext */}
        <div className="relative z-10 border-t border-slate-800 pt-6">
          <p className="text-xs text-slate-400 italic">
            "Education is not the learning of facts, but the training of the mind to think."
          </p>
          <p className="text-[11px] text-cyan-400 font-semibold mt-1">
            — Albert Einstein • Campus Information Assistant
          </p>
        </div>
      </div>

      {/* Right Column: Sign In Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 bg-white">
        <div className="mx-auto w-full max-w-md space-y-8">
          {/* Mobile Branding */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900">Campus Hub</span>
              <span className="block text-xs text-slate-500">Your Campus, One Place</span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Sign In to Your Account
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Enter your university credentials to access notices, timetables, and academic records
            </p>
          </div>

          {/* Quick Role Preset Indicator (Phase 1 UI Helper) */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-3.5">
            <p className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Phase 1 Presentation Demo: Select Role</span>
            </p>
            <div className="grid grid-cols-3 gap-1.5 text-[11px] font-semibold">
              {[
                { id: 'student', label: 'Student' },
                { id: 'faculty', label: 'Faculty' },
                { id: 'hod', label: 'HOD' },
                { id: 'dean', label: 'Dean' },
                { id: 'examination', label: 'Exam Cell' },
                { id: 'admin', label: 'Admin' },
              ].map((role) => (
                <button
                  type="button"
                  key={role.id}
                  onClick={() => setSelectedDemoRole(role.id)}
                  className={`py-1.5 px-2 rounded-lg border transition-all ${
                    selectedDemoRole === role.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            <Input
              id="email"
              label="University Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              required
            />

            <Input
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-800"
                onClick={() => alert('Phase 1 UI Notice: Forgot password flow will connect in the authentication phase.')}
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              iconRight={ArrowRight}
            >
              Sign In as {selectedDemoRole.toUpperCase()}
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Campus Information Assistant • Phase 1 Presentation Mode
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
