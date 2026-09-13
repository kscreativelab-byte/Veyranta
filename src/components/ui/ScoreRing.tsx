'use client';

import React from 'react';
import { VeyrantaReputationScore } from '@/lib/types';
import { Info, ShieldCheck } from 'lucide-react';

interface ScoreRingProps {
  score: VeyrantaReputationScore;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({ score }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score.overallScore / 100) * circumference;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* SVG Circular Score Ring */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-brand-500 transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-white tracking-tight">{score.overallScore}</span>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Out of 100</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-brand-400 font-semibold bg-brand-500/10 border border-brand-500/20 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Veyranta Composite Benchmark</span>
          </div>
        </div>

        {/* Subscore Breakdown Matrix */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-slate-200">Score Drivers & Weight Breakdown</h3>
            <div className="group relative cursor-pointer flex items-center gap-1 text-[11px] text-slate-400">
              <Info className="w-3.5 h-3.5 text-slate-500" />
              <span>Score Methodology</span>
              <div className="absolute right-0 top-full mt-2 hidden group-hover:block w-72 p-3 bg-slate-950 text-[11px] text-slate-300 rounded-xl border border-slate-800 shadow-2xl z-40">
                {score.explanation}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-800">
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Review Quality (25%)</span>
                <span className="text-brand-400 font-bold">{score.subscores.reviewQuality}/100</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${score.subscores.reviewQuality}%` }} />
              </div>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-800">
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Sentiment Intensity (20%)</span>
                <span className="text-emerald-400 font-bold">{score.subscores.sentiment}/100</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${score.subscores.sentiment}%` }} />
              </div>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-800">
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Review Recency (15%)</span>
                <span className="text-slate-200 font-bold">{score.subscores.reviewRecency}/100</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: `${score.subscores.reviewRecency}%` }} />
              </div>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-800">
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Response Health (10%)</span>
                <span className="text-amber-400 font-bold">{score.subscores.responseHealth}/100</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${score.subscores.responseHealth}%` }} />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
            Note: Veyranta Reputation Score is an analytical composite calculated from multi-source customer feedback. It is not an official platform rating from Google or Yelp.
          </p>
        </div>

      </div>
    </div>
  );
};
