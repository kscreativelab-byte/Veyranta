'use client';

import React from 'react';
import { PrioritizedRecommendation } from '@/lib/types';
import { Lightbulb, Target, ArrowRight } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: PrioritizedRecommendation;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const isP1 = recommendation.priority.startsWith('P1');

  return (
    <div className={`bg-slate-900 rounded-xl p-6 border shadow-lg space-y-4 ${
      isP1 ? 'border-brand-500/50 bg-gradient-to-br from-slate-900 to-brand-950/20' : 'border-slate-800'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
            isP1 ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-800 text-brand-400 border border-slate-700'
          }`}>
            {recommendation.priority}
          </span>
          <h4 className="font-extrabold text-base text-white">{recommendation.problem}</h4>
        </div>
        <span className="text-xs text-brand-400 font-semibold flex items-center gap-1">
          <Target className="w-3.5 h-3.5" />
          KPI Target: {recommendation.suggestedKpi}
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800">
          <strong className="text-slate-200 block mb-0.5">Recommended Next Action:</strong>
          <p className="text-slate-300 leading-relaxed">{recommendation.recommendedAction}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
          <div className="p-2.5 bg-slate-950/50 rounded-lg border border-slate-800/80">
            <strong className="text-slate-300 block mb-0.5">Evidence Grounding:</strong>
            <span>{recommendation.evidence}</span>
          </div>

          <div className="p-2.5 bg-slate-950/50 rounded-lg border border-slate-800/80">
            <strong className="text-slate-300 block mb-0.5">Why It Matters:</strong>
            <span>{recommendation.whyItMatters}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
