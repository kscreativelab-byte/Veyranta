'use client';

import React from 'react';
import { EmotionAnalysisResult } from '@/lib/types';
import { Sparkles, MessageSquare, AlertTriangle, ShieldCheck, HeartHandshake, Zap } from 'lucide-react';

interface EmotionBarChartProps {
  emotions: EmotionAnalysisResult[];
}

export const EmotionBarChart: React.FC<EmotionBarChartProps> = ({ emotions }) => {
  return (
    <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">12-Tone Emotional Spectrum Engine</span>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>12-Tone Spectrum (Frustration, Trust, Joy, Churn Risk & More)</span>
          </h3>
        </div>
        <span className="text-xs font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
          Full 12-Tone NLP Extraction
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emotions.map((item, idx) => {
          const isNegative = ['Frustration', 'Disappointment', 'Anxiety', 'Confusion', 'Churn Risk', 'Sarcasm', 'Anger', 'Concern'].includes(item.emotion);
          const isPositive = ['Trust', 'Joy', 'Satisfaction', 'Gratitude', 'Brand Advocacy', 'Happiness', 'Excitement'].includes(item.emotion);

          const badgeStyle = isNegative
            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            : isPositive
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            : 'bg-slate-800 text-slate-300 border-slate-700';

          const barColor = isNegative
            ? 'bg-gradient-to-r from-rose-600 to-amber-500'
            : isPositive
            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
            : 'bg-slate-600';

          return (
            <div key={idx} className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2.5 shadow-md hover:border-purple-500/30 transition">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-sm">{item.emotion}</span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase border ${badgeStyle}`}>
                    {item.intensity} Intensity
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-white text-sm">{item.percentage}%</span>
                  <span className="text-[10px] text-slate-400">({Math.round(item.confidence * 100)}% conf)</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${Math.max(5, item.percentage)}%` }}
                />
              </div>

              {item.starRatingCorrelation && (
                <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  {item.starRatingCorrelation}
                </span>
              )}

              {item.evidence && (
                <div className="flex items-start gap-2 text-[11px] text-slate-300 italic bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{item.evidence}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
