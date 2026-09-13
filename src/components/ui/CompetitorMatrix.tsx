'use client';

import React from 'react';
import { CompetitorBenchmark } from '@/lib/types';
import { Users, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

interface CompetitorMatrixProps {
  companyName: string;
  ourScore: number;
  ourRating?: number;
  ourVolume?: number;
  ourPositivePct?: number;
  competitors: CompetitorBenchmark[];
}

export const CompetitorMatrix: React.FC<CompetitorMatrixProps> = ({
  companyName,
  ourScore,
  ourRating = 4.5,
  ourVolume = 120,
  ourPositivePct = 85,
  competitors
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-400" />
          Competitor Intelligence & Benchmarking
        </h3>
        <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded">Veyranta Comparative Analytics</span>
      </div>

      {/* Comparison Metrics Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
              <th className="py-2.5 px-3">Company</th>
              <th className="py-2.5 px-3">Veyranta Score</th>
              <th className="py-2.5 px-3">Avg Rating</th>
              <th className="py-2.5 px-3">Review Volume</th>
              <th className="py-2.5 px-3">Positive Sentiment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            <tr className="bg-brand-500/10 font-bold border border-brand-500/30">
              <td className="py-3 px-3 text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-400" />
                {companyName} (Your Business)
              </td>
              <td className="py-3 px-3 text-brand-400 font-extrabold">{ourScore} / 100</td>
              <td className="py-3 px-3 text-emerald-400">{ourRating.toFixed(1)} ★</td>
              <td className="py-3 px-3 text-slate-200">{ourVolume}</td>
              <td className="py-3 px-3 text-emerald-400">{ourPositivePct}%</td>
            </tr>

            {competitors.map((comp, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-semibold text-slate-200">{comp.competitorName}</td>
                <td className="py-3 px-3 font-bold text-slate-300">{comp.reputationScore} / 100</td>
                <td className="py-3 px-3">{comp.averageRating} ★</td>
                <td className="py-3 px-3 text-slate-400">{comp.reviewVolume}</td>
                <td className="py-3 px-3 text-slate-300">{comp.positiveSentimentPct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Where You Win vs Where Competitors Win Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2">
          <h4 className="font-extrabold text-xs text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            Where You Win
          </h4>
          <ul className="space-y-1 text-xs text-slate-300">
            {competitors[0]?.whereYouWin.map((item, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
          <h4 className="font-extrabold text-xs text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            Where Competitors Hold Advantage
          </h4>
          <ul className="space-y-1 text-xs text-slate-300">
            {competitors[0]?.whereCompetitorsWin.map((item, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
