// src/components/common/EmptyState.jsx
import React from 'react';
import { Search } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = Search,
  title = 'No records found',
  description = 'Try adjusting your search query or filter options.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
        <Icon className="h-7 w-7" />
      </div>
      <h4 className="text-base font-semibold text-slate-800">{title}</h4>
      <p className="mt-1 text-sm text-slate-500 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button
          variant="outline"
          size="sm"
          onClick={onAction}
          className="mt-4"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
