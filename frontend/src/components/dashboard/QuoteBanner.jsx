// src/components/dashboard/QuoteBanner.jsx
import React from 'react';

export default function QuoteBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Left Quote */}
      <div className="max-w-xs md:max-w-sm">
        <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed italic">
          “Education is not the learning of facts, but the training of the mind to think.”
        </p>
        <p className="text-xs text-slate-500 font-semibold mt-2">
          — Albert Einstein
        </p>
      </div>

      {/* Center Illustration */}
      <div className="flex-1 flex justify-center items-center max-w-md w-full">
        <div className="h-28 w-full max-w-sm rounded-2xl overflow-hidden shadow-xs border border-slate-100">
          <img
            src="/assets/students_walk.jpg"
            alt="Students on Campus"
            className="h-full w-full object-cover object-center filter saturate-110"
          />
        </div>
      </div>

      {/* Right Hand Calligraphy / Tagline */}
      <div className="flex flex-col items-center md:items-end text-center md:text-right">
        <span className="font-serif italic text-lg sm:text-xl font-bold text-slate-800 tracking-wide">
          Same Campus
        </span>
        <span className="font-serif italic text-base sm:text-lg font-medium text-slate-600 -mt-1">
          Stronger Together
        </span>
        <svg
          className="w-28 h-3 text-cyan-600 mt-1"
          viewBox="0 0 100 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 9C28 2 72 2 98 9"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
