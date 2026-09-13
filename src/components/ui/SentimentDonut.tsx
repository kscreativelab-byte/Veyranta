'use client';

import React from 'react';
import { SentimentAnalysisResult } from '@/lib/types';
import { PieChart as PieIcon, ThumbsUp, Minus, ThumbsDown } from 'lucide-react';

interface SentimentDonutProps {
  sentiment: SentimentAnalysisResult;
}

export const SentimentDonut: React.FC<SentimentDonutProps> = ({ sentiment }) => {
  const { positivePercentage, neutralPercentage, negativePercentage, totalReviews, averageRating } = sentiment;

  // Calculate SVG stroke dashes for donut representation
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  
  const posDash = (positivePercentage / 100) * circumference;
  const neuDash = (neutralPercentage / 100) * circumference;
  const negDash = (negativePercentage / 100) * circumference;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <PieIcon className="w-4 h-4 text-brand-400" />
          Sentiment Distribution Breakdown
        </h3>
        <span className="text-xs bg-slate-800 text-slate-300 font-semibold px-2.5 py-1 rounded-md">
          {averageRating} ★ ({totalReviews} Reviews)
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* SVG Donut Chart */}
        <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#f43f5e"
              strokeWidth="12"
              strokeDasharray={`${negDash} ${circumference}`}
              strokeDashoffset="0"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#f59e0b"
              strokeWidth="12"
              strokeDasharray={`${neuDash} ${circumference}`}
              strokeDashoffset={`-${negDash}`}
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#10b981"
              strokeWidth="12"
              strokeDasharray={`${posDash} ${circumference}`}
              strokeDashoffset={`-${negDash + neuDash}`}
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center text-center">
            <span className="text-xl font-extrabold text-white">{positivePercentage}%</span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Positive</span>
          </div>
        </div>

        {/* Horizontal Sentiment Percentage Bars */}
        <div className="flex-1 w-full space-y-3">
          <div className="p-2.5 bg-slate-800/40 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ThumbsUp className="w-3.5 h-3.5" />
                Positive Sentiment
              </span>
              <span className="text-emerald-400 font-extrabold">{positivePercentage}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full transition-all duration-700" style={{ width: `${positivePercentage}%` }} />
            </div>
          </div>

          <div className="p-2.5 bg-slate-800/40 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Minus className="w-3.5 h-3.5" />
                Neutral / Mixed Signals
              </span>
              <span className="text-amber-400 font-extrabold">{neutralPercentage}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full transition-all duration-700" style={{ width: `${neutralPercentage}%` }} />
            </div>
          </div>

          <div className="p-2.5 bg-slate-800/40 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="flex items-center gap-1.5 text-rose-400">
                <ThumbsDown className="w-3.5 h-3.5" />
                Negative Sentiment
              </span>
              <span className="text-rose-400 font-extrabold">{negativePercentage}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="bg-rose-500 h-2 rounded-full transition-all duration-700" style={{ width: `${negativePercentage}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
