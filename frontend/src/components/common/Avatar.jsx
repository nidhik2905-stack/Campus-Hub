// src/components/common/Avatar.jsx
import React from 'react';

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
};

function getInitials(fullName) {
  if (!fullName) {
    return 'U';
  }

  const parts = fullName.trim().split(' ');

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  return (parts[0][0] + parts[1][0]).toUpperCase();
}

const statusColors = {
  online: 'bg-emerald-500',
  busy: 'bg-rose-500',
};

export default function Avatar({
  src,
  alt = 'User avatar',
  name = '',
  size = 'md',
  className = '',
  status = null,
}) {
  const initials = getInitials(name);
  const sizeClass = sizeMap[size] || sizeMap.md;
  const statusColor = statusColors[status] || 'bg-slate-400';

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizeClass} rounded-full object-cover ring-2 ring-white shadow-sm`}
        />
      ) : (
        <div
          className={`${sizeClass} rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-semibold flex items-center justify-center ring-2 ring-white shadow-sm`}
        >
          {initials}
        </div>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${statusColor}`}
        />
      )}
    </div>
  );
}
