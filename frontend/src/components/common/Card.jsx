// src/components/common/Card.jsx
import React from 'react';

export default function Card({
  children,
  className = '',
  hoverEffect = false,
  padding = 'p-6',
  ...props
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/70 shadow-sm ${
        hoverEffect
          ? 'transition-all duration-200 hover:shadow-md hover:border-slate-300'
          : ''
      } ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
