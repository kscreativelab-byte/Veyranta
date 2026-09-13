'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  changePct?: number; // e.g. 6.4 for +6.4%
  changePeriod?: string; // e.g. "vs previous period"
  icon?: React.ElementType;
  tooltipText?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  changePct,
  changePeriod = 'vs previous 30d',
  icon: Icon,
  tooltipText
}) => {
  const isPositiveChange = changePct !== undefined && changePct >= 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative flex flex-col justify-between hover:border-slate-700 transition">
      <div>
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
            {tooltipText && (
              <div className="group relative cursor-pointer">
                <Info className="w-3.5 h-3.5 text-slate-500 hover:text-slate-300" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-slate-950 text-[11px] text-slate-300 rounded-md border border-slate-800 shadow-xl z-30">
                  {tooltipText}
                </div>
              </div>
            )}
          </div>
          {Icon && <Icon className="w-4 h-4 text-brand-400" />}
        </div>

        <div className="text-2xl sm:text-3xl font-black text-white tracking-tight my-1">
          {value}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
        {changePct !== undefined ? (
          <div className="flex items-center gap-1">
            <span className={`inline-flex items-center font-bold px-1.5 py-0.5 rounded text-[11px] ${
              isPositiveChange
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}>
              {isPositiveChange ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {isPositiveChange ? `+${changePct}%` : `${changePct}%`}
            </span>
            <span className="text-slate-500 text-[11px]">{changePeriod}</span>
          </div>
        ) : (
          <span className="text-slate-500 text-[11px]">{subtitle || 'Updated live'}</span>
        )}
      </div>
    </div>
  );
};
