'use client';

import React from 'react';
import { Search, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No analysis data available yet',
  description = 'Analyze your first company or upload a feedback CSV dataset to view complete reputation metrics.',
  actionText = 'Run Company Analysis',
  onAction
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-xl">
      <div className="w-12 h-12 rounded-full bg-slate-800 text-brand-400 flex items-center justify-center mx-auto border border-slate-700">
        <Search className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-100">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>

      {onAction ? (
        <button
          onClick={onAction}
          className="bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition shadow-md inline-flex items-center gap-2"
        >
          <span>{actionText}</span>
        </button>
      ) : (
        <Link
          href="/"
          className="bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition shadow-md inline-flex items-center gap-2"
        >
          <span>{actionText}</span>
        </Link>
      )}
    </div>
  );
};

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'We could not complete this analysis step. Please check the provided URL or network connection.',
  onRetry
}) => {
  return (
    <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-6 text-center space-y-3 max-w-md mx-auto">
      <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
        <AlertCircle className="w-5 h-5" />
      </div>
      <h4 className="text-sm font-bold text-rose-200">Analysis Error Encountered</h4>
      <p className="text-xs text-rose-300 leading-relaxed">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-slate-900 hover:bg-slate-800 text-rose-300 text-xs font-semibold px-4 py-2 rounded-lg border border-rose-500/30 transition inline-flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Analysis</span>
        </button>
      )}
    </div>
  );
};
