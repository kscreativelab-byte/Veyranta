'use client';

import React from 'react';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-slate-800 rounded-lg w-1/3 skeleton-shimmer" />
      
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-28 bg-slate-900 border border-slate-800 rounded-xl skeleton-shimmer" />
        ))}
      </div>

      <div className="h-64 bg-slate-900 border border-slate-800 rounded-xl skeleton-shimmer" />
    </div>
  );
};
