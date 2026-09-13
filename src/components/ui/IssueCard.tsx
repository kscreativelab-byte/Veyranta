'use client';

import React from 'react';
import { IssueDetectionItem } from '@/lib/types';
import { ShieldAlert, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';

interface IssueCardProps {
  issue: IssueDetectionItem;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'High':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Medium':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-slate-700 transition">
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
            <ShieldAlert className={`w-4 h-4 ${issue.severity === 'Critical' ? 'text-rose-400' : 'text-amber-400'}`} />
            {issue.title}
          </h4>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getSeverityBadgeClass(issue.severity)}`}>
            {issue.severity} Severity
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-lg border border-slate-800">
          <strong className="text-slate-200">Recommended Action:</strong> {issue.recommendedAction}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between text-xs pt-3 border-t border-slate-800 text-slate-400">
        <div>Appears in: <strong className="text-white">{issue.frequency} mentions</strong></div>
        <div>Trend: <strong className="text-amber-400">{issue.trend}</strong></div>
        <div>Impact: <strong className="text-slate-200">{issue.businessImpact}</strong></div>
      </div>
    </div>
  );
};
