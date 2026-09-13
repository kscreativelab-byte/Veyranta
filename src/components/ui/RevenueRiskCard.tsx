'use client';

import React from 'react';
import { DollarSign, Clock, TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';

interface RevenueRiskCardProps {
  summary?: {
    revenueRiskEstimate: string;
    targetSlaHours: number;
    expectedKpiLift: string;
  };
  isFreePreview?: boolean;
}

export const RevenueRiskCard: React.FC<RevenueRiskCardProps> = ({ summary, isFreePreview = false }) => {
  if (!summary) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/20 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">AI Revenue Risk & SLA Action Barometer</h3>
            <p className="text-xs text-slate-400">Quantified business impact & retention targets</p>
          </div>
        </div>
        <span className="text-[10px] font-extrabold text-rose-400 uppercase tracking-wider bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
          Risk Impact Summary
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Revenue at Risk */}
        <div className="p-4 bg-slate-950/80 border border-slate-800/90 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
            <DollarSign className="w-4 h-4" />
            <span>Monthly Revenue at Risk</span>
          </div>
          <p className="text-2xl font-black text-white">{summary.revenueRiskEstimate}</p>
          <p className="text-[11px] text-slate-400">Estimated ARR lost if negative sentiment issues remain unaddressed.</p>
        </div>

        {/* Metric 2: Resolution Target SLA */}
        <div className="p-4 bg-slate-950/80 border border-slate-800/90 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-brand-400 text-xs font-bold">
            <Clock className="w-4 h-4" />
            <span>Target Response SLA</span>
          </div>
          <p className="text-2xl font-black text-white">{summary.targetSlaHours} Hours</p>
          <p className="text-[11px] text-slate-400">Recommended SLA resolution window for customer escalations.</p>
        </div>

        {/* Metric 3: Target KPI Lift */}
        <div className="p-4 bg-slate-950/80 border border-slate-800/90 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <TrendingUp className="w-4 h-4" />
            <span>Projected KPI Impact</span>
          </div>
          <p className="text-sm font-bold text-emerald-400 mt-1">{summary.expectedKpiLift}</p>
          <p className="text-[11px] text-slate-400">Measurable retention improvement upon resolving root causes.</p>
        </div>
      </div>
    </div>
  );
};
