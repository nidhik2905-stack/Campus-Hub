// src/components/dashboard/WelcomeBanner.jsx
import React from 'react';
import { Sparkles } from 'lucide-react';

export default function WelcomeBanner({
  name = 'Rahul',
  quote = 'A better tomorrow begins with informed today.',
  tagline = 'Knowledge Connects Communities',
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-lg shadow-slate-900/10 min-h-[160px] sm:min-h-[190px] flex items-center">
      {/* Background Campus Panorama Image with subtle overlay */}
      <img
        src="/assets/campus_banner.jpg"
        alt="Campus Panorama"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-45 brightness-90 mix-blend-luminosity filter contrast-125 transition-transform duration-700 hover:scale-105"
      />
      {/* Dark Navy / Indigo Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#09152b] via-[#0d1f3f]/90 to-[#071329]/75" />

      {/* Content Container */}
      <div className="relative z-10 flex w-full flex-col justify-between gap-4 p-6 sm:p-8 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Welcome back, {name}! <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base italic text-slate-300 font-normal leading-relaxed">
            "{quote}"
          </p>
        </div>

        {/* Right side badge */}
        <div className="flex items-center gap-2 self-start rounded-full border border-cyan-400/30 bg-cyan-950/60 px-4 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur-md md:self-center shadow-inner">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>{tagline}</span>
        </div>
      </div>
    </div>
  );
}
