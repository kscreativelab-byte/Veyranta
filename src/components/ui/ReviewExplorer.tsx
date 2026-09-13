'use client';

import React, { useState, useMemo } from 'react';
import { NormalizedFeedbackItem } from '@/lib/types';
import { Search, MessageSquare, Star, Lock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface ReviewExplorerProps {
  reviews: NormalizedFeedbackItem[];
  isFreePreview?: boolean;
}

export const ReviewExplorer: React.FC<ReviewExplorerProps> = ({ reviews, isFreePreview = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'rating-desc' | 'rating-asc'>('newest');

  const filteredReviews = useMemo(() => {
    const list = reviews
      .filter(r => {
        const matchesSearch = !searchTerm || r.reviewText.toLowerCase().includes(searchTerm.toLowerCase()) || (r.reviewerName && r.reviewerName.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesSentiment = sentimentFilter === 'all' || r.sentiment === sentimentFilter;
        const matchesRating = ratingFilter === 'all' || Math.floor(r.rating) === parseInt(ratingFilter, 10);
        return matchesSearch && matchesSentiment && matchesRating;
      })
      .sort((a, b) => {
        if (sortOrder === 'rating-desc') return b.rating - a.rating;
        if (sortOrder === 'rating-asc') return a.rating - b.rating;
        return new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime();
      });

    return isFreePreview ? list.slice(0, 3) : list;
  }, [reviews, searchTerm, sentimentFilter, ratingFilter, sortOrder, isFreePreview]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brand-400" />
            Interactive Customer Signal Explorer
          </h3>
          <p className="text-xs text-slate-400">Search and filter feedback across all collected sources.</p>
        </div>
        <span className="text-xs bg-slate-800 text-slate-300 font-semibold px-3 py-1 rounded-md">
          {filteredReviews.length} / {reviews.length} Items Displayed {isFreePreview && '(Free Preview Limit: 3)'}
        </span>
      </div>

      {/* Filter Control Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        {/* Search Input */}
        <div className="sm:col-span-1 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700/80 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Sentiment Filter */}
        <select
          value={sentimentFilter}
          onChange={(e) => setSentimentFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none"
        >
          <option value="all">All Sentiments</option>
          <option value="positive">Positive Only</option>
          <option value="neutral">Neutral Only</option>
          <option value="negative">Negative Only</option>
        </select>

        {/* Rating Filter */}
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none"
        >
          <option value="all">All Star Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>

        {/* Sort Selector */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as any)}
          className="bg-slate-800 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none"
        >
          <option value="newest">Sort by Newest</option>
          <option value="rating-desc">Sort by Highest Rating</option>
          <option value="rating-asc">Sort by Lowest Rating</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((r, idx) => (
            <div key={idx} className="p-4 bg-slate-800/40 rounded-xl border border-slate-800/80 space-y-2 hover:border-slate-700 transition">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{r.reviewerName || 'Anonymous Customer'}</span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono uppercase">
                    {r.source}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                  <span>{r.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">{r.reviewText}</p>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    r.sentiment === 'positive' ? 'bg-emerald-500/10 text-emerald-400' :
                    r.sentiment === 'negative' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {r.sentiment || 'neutral'}
                  </span>
                </div>
                <span>{new Date(r.reviewDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs bg-slate-950/40 rounded-xl border border-slate-800">
            No feedback items match your selected filter criteria.
          </div>
        )}

        {isFreePreview && reviews.length > 3 && (
          <div className="p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-brand-950/40 border border-brand-500/30 rounded-xl text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-brand-400 font-bold text-xs">
              <Lock className="w-4 h-4" />
              <span>{reviews.length - 3} More Customer Reviews Locked for Free User</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Subscribe to unlock 100% of customer feedback signals, raw CSV dataset downloads, and 12-Tone Spectrum analytics.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-[11px] px-4 py-2 rounded-lg transition"
            >
              <span>Unlock All Reviews (Subscribe)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
