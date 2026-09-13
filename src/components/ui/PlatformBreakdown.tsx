'use client';

import React from 'react';
import { PlatformBreakdownItem } from '@/lib/types';
import { Layers, Star, TrendingUp, TrendingDown, Minus, CheckCircle, ShieldAlert } from 'lucide-react';

interface PlatformBreakdownProps {
  platforms?: PlatformBreakdownItem[];
  isFreePreview?: boolean;
}

export const PlatformBreakdown: React.FC<PlatformBreakdownProps> = ({ platforms = [], isFreePreview = false }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Multi-Platform Channel Distribution</h3>
            <p className="text-xs text-slate-400">Cross-channel review ratings & sentiment split</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-full self-start sm:self-auto">
          {platforms.length} Monitored Platforms
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((item, idx) => {
          const isAtRisk = item.trend === 'At Risk' || item.negativePct > 25;
          const isUpward = item.trend === 'Upward';

          return (
            <div
              key={idx}
              className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-white text-xs flex items-center gap-2">
                  {item.platform}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border ${
                    isAtRisk
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      : isUpward
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}
                >
                  {isAtRisk ? (
                    <TrendingDown className="w-3 h-3" />
                  ) : isUpward ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <Minus className="w-3 h-3" />
                  )}
                  {item.trend}
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <div className="flex items-center gap-1 text-amber-400 font-black text-lg">
                  <span>{item.averageRating.toFixed(1)}</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-[11px] text-slate-400">{item.reviewCount} signals</span>
              </div>

              {/* Sentiment Split Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-bold">{item.positivePct}% Pos</span>
                  <span className="text-rose-400 font-bold">{item.negativePct}% Neg</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: `${item.positivePct}%` }} />
                  <div className="bg-rose-500 h-full" style={{ width: `${item.negativePct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
