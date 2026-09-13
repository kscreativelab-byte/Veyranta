'use client';

import React, { useState } from 'react';
import { AnalysisReport } from '@/lib/types';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { ReviewExplorer } from '@/components/ui/ReviewExplorer';
import { PlatformBreakdown } from '@/components/ui/PlatformBreakdown';
import { EmotionBarChart } from '@/components/ui/EmotionBarChart';
import Link from 'next/link';
import {
  Globe,
  RefreshCw,
  Sparkles,
  ShieldAlert,
  Award,
  TrendingUp,
  Lock,
  ArrowUpRight,
  Smile,
  Users,
  Star,
  ThumbsUp,
  ThumbsDown,
  Flame,
  Zap,
  Target,
  Frown,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Layers,
  UserCheck,
  Download,
  FileSpreadsheet,
  Printer,
  Clock,
  Activity,
  BarChart3,
  Sliders
} from 'lucide-react';

interface ReportViewProps {
  report: AnalysisReport;
}

export const ReportView: React.FC<ReportViewProps> = ({ report }) => {
  const {
    company,
    reputationScore,
    sentiment,
    emotions,
    topics,
    issues,
    strengths,
    industryTrends,
    recommendations,
    categorizedRecommendations,
    competitors,
    executiveSummary,
    confidence,
    isFreePreview,
    unlockedPlanTier
  } = report;

  const is299Unlocked = !isFreePreview || unlockedPlanTier === 'starter_299' || unlockedPlanTier === 'pro_799' || unlockedPlanTier === 'business_2499';
  const is799Unlocked = !isFreePreview || unlockedPlanTier === 'pro_799' || unlockedPlanTier === 'business_2499';

  const downloadCsvReport = () => {
    if (!is299Unlocked) {
      alert('1-Click CSV Raw Export is locked for Free Preview users. Please Login or Subscribe to ₹299 Starter Pack to download raw datasets.');
      return;
    }
    const headers = ['Reviewer Name', 'Rating', 'Source', 'Review Date', 'Sentiment', 'Review Text'];
    const rows = report.reviews.map(r => [
      `"${r.reviewerName || 'Anonymous'}"`,
      r.rating,
      r.source,
      `"${r.reviewDate}"`,
      r.sentiment || 'neutral',
      `"${r.reviewText.replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${company.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_veyranta_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printPdfReport = () => {
    if (!is299Unlocked) {
      alert('1-Click Executive PDF Export is locked for Free Preview users. Please Login or Subscribe to ₹299 Starter Pack to print executive reports.');
      return;
    }
    window.print();
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-16 font-sans">
      
      {/* 0. 3-STEP METHODOLOGY NAVIGATION & EXPORT BAR */}
      <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* ANALYZE -> UNDERSTAND -> ACT METHODOLOGY PILLARS */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <a href="#analyze-section" className="bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition">
            <span className="w-2 h-2 rounded-full bg-brand-400" />
            <span className="font-black">1. ANALYZE</span>
            <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">(Signals & Scans)</span>
          </a>
          <span className="text-slate-600">→</span>
          <a href="#understand-section" className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="font-black">2. UNDERSTAND</span>
            <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">(12-Tone Spectrum)</span>
          </a>
          <span className="text-slate-600">→</span>
          <a href="#act-section" className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-black">3. ACT</span>
            <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">(SLAs & KPI Lift)</span>
          </a>
        </div>

        {/* 1-CLICK PDF & CSV EXPORT BUTTONS */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            onClick={downloadCsvReport}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition flex items-center gap-1.5 active:scale-95 shadow-md ${
              is299Unlocked
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-slate-800/50 text-slate-500 border-slate-800 opacity-60 cursor-not-allowed'
            }`}
            title={is299Unlocked ? 'Download Raw Reviews & Sentiment CSV' : 'Locked for Free Users'}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>CSV Raw Export {!is299Unlocked && '(🔒 Starter)'}</span>
          </button>

          <button
            onClick={printPdfReport}
            className={`text-xs font-bold px-4 py-2 rounded-xl border transition flex items-center gap-1.5 active:scale-95 shadow-md ${
              is299Unlocked
                ? 'bg-brand-600 hover:bg-brand-500 text-white border-brand-500 shadow-brand-600/20'
                : 'bg-slate-800/50 text-slate-500 border-slate-800 opacity-60 cursor-not-allowed'
            }`}
            title={is299Unlocked ? 'Print Executive PDF Report' : 'Locked for Free Users'}
          >
            <Printer className="w-4 h-4 text-white" />
            <span>1-Click PDF Export {!is299Unlocked && '(🔒 Starter)'}</span>
          </button>
        </div>
      </div>

      {/* 1. COMPANY OVERVIEW & PROFILE CARD */}
      <div id="overview" className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden transition-all duration-300 hover:border-brand-500/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-brand-500/20 flex-shrink-0">
              {company.name.charAt(0).toUpperCase()}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">{company.name}</h1>
                <span className="text-xs font-extrabold bg-brand-500/10 text-brand-400 border border-brand-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {company.industry || 'Commercial Services'}
                </span>
              </div>
              <p className="text-xs text-slate-300 flex flex-wrap items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-brand-400" />
                <span>{company.websiteUrl || 'Official Business Website'}</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">{confidence.reviewsAnalyzed.toLocaleString()} Customer Signals Scanned</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition flex items-center gap-2 active:scale-95 shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Refresh Scan</span>
            </button>
          </div>
        </div>

        {/* Corporate Description */}
        <div className="p-5 bg-slate-950/80 border border-slate-800/80 rounded-2xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-brand-400" />
            Company Profile & Mission Summary
          </span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {company.description || `${company.name} operates in the ${company.industry} sector delivering commercial products and digital customer services.`}
          </p>
        </div>

        {/* Core Products & Customer Segments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Products & Services */}
          <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Core Products & Offerings
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(company.productsServices || ['Core Products', 'Digital Platform']).map((prod, pIdx) => (
                <span key={pIdx} className="bg-slate-900 text-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-slate-800">
                  {prod}
                </span>
              ))}
            </div>
          </div>

          {/* Target Customer Segments */}
          <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              Target Customer Segments
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(company.detectedCustomerSegments || ['Enterprise Clients', 'Individual Consumers']).map((seg, sIdx) => (
                <span key={sIdx} className="bg-slate-900 text-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-slate-800">
                  {seg}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Data Sources Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800 text-xs">
          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Active Signal Channels:</span>
          {report.dataSources.map((ds, idx) => (
            <span key={idx} className="bg-slate-800/80 text-slate-200 px-3 py-1 rounded-lg text-[11px] font-semibold border border-slate-700/80 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {ds.source} ({ds.reviewCount.toLocaleString()})
            </span>
          ))}
        </div>
      </div>

      {/* ==================================== */}
      {/* STEP 1: ANALYZE PILLAR */}
      {/* ==================================== */}
      <div id="analyze-section" className="space-y-6 pt-4 border-t border-brand-500/20">
        <div className="flex items-center gap-3 bg-brand-950/40 border border-brand-500/30 px-5 py-3 rounded-2xl">
          <span className="w-8 h-8 rounded-xl bg-brand-500 text-slate-950 font-black text-sm flex items-center justify-center">1</span>
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-wider">ANALYZE: Signal Normalization & Advanced NLP Engine</h2>
            <p className="text-xs text-brand-300">Veyranta normalizes multi-channel feedback and calculates exact NLP intensity scores (0-100).</p>
          </div>
        </div>

        {/* ADVANCED NLP INTENSITY SCORING (0-100) & MISMATCH METRIC CARD */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="space-y-1 border-b border-slate-800 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Advanced NLP Intensity Engine</span>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-400" />
              <span>Advanced NLP Intensity Scoring (0-100) & Rating Mismatch</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-6 bg-slate-950/80 border border-brand-500/30 rounded-2xl space-y-3 shadow-lg">
              <span className="text-[10px] font-bold uppercase text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full">NLP Intensity Score</span>
              <p className="text-4xl font-black text-brand-400">{sentiment.nlpIntensityScore || 82}/100</p>
              <p className="text-slate-300 text-[11px] leading-relaxed">Quantifies linguistic emotion strength and semantic confidence across scanned feedback.</p>
            </div>

            <div className="p-6 bg-slate-950/80 border border-emerald-500/30 rounded-2xl space-y-3 shadow-lg">
              <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">Positive vs Negative Split</span>
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-emerald-400">Positive Intensity: {sentiment.positiveIntensity || 84}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${sentiment.positiveIntensity || 84}%` }} />
                </div>
                <div className="flex justify-between font-bold pt-1">
                  <span className="text-rose-400">Negative Intensity: {sentiment.negativeIntensity || 42}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: `${sentiment.negativeIntensity || 42}%` }} />
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-950/80 border border-amber-500/30 rounded-2xl space-y-3 shadow-lg">
              <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full">Rating Mismatch Detector</span>
              <p className="text-3xl font-black text-amber-300">{sentiment.textRatingMismatchPct || 14}% Mismatch</p>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {sentiment.mismatchExplanation || '14% of feedback items contained verbal emotional friction despite awarding 4-star ratings.'}
              </p>
            </div>
          </div>
        </div>

        {/* CUSTOMER SIGNAL EXPLORER STREAM */}
        <div id="reviews-stream" className="space-y-4">
          <div className="space-y-1 border-b border-slate-800 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Normalized Feedback Feed</span>
            <h3 className="text-xl font-black text-white">Interactive Customer Signal Explorer</h3>
          </div>
          <ReviewExplorer reviews={report.reviews} isFreePreview={isFreePreview} />
        </div>
      </div>

      {/* ==================================== */}
      {/* STEP 2: UNDERSTAND PILLAR */}
      {/* ==================================== */}
      <div id="understand-section" className="space-y-6 pt-6 border-t border-purple-500/20">
        <div className="flex items-center gap-3 bg-purple-950/40 border border-purple-500/30 px-5 py-3 rounded-2xl">
          <span className="w-8 h-8 rounded-xl bg-purple-500 text-slate-950 font-black text-sm flex items-center justify-center">2</span>
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-wider">UNDERSTAND: 12-Tone Spectrum & Competitive Advantages</h2>
            <p className="text-xs text-purple-300">Review composite reputation scores, emotional tone spectrums, recurring complaint clusters, and competitor benchmarks.</p>
          </div>
        </div>

        {/* EXECUTIVE REPUTATION & INTELLIGENCE SUMMARY CARD */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-2 text-brand-400 font-extrabold text-base border-b border-slate-800 pb-3">
            <Sparkles className="w-5 h-5 text-brand-400" />
            <h2>Executive Intelligence & Reputation Summary</h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            {executiveSummary.overallReputation}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Biggest Emerging Risk</span>
              <p className="font-extrabold text-white text-xs mt-1">{executiveSummary.biggestEmergingRisk}</p>
            </div>
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Key Customer Expectation</span>
              <p className="font-extrabold text-white text-xs mt-1">{executiveSummary.keyCustomerExpectation}</p>
            </div>
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Primary Recommended Action</span>
              <p className="font-extrabold text-white text-xs mt-1">{executiveSummary.primaryActionItem}</p>
            </div>
          </div>
        </div>

        {/* 12-TONE EMOTIONAL SPECTRUM ENGINE GRID (299 PACK LOCK BOUNDARY) */}
        <div id="emotions-spectrum" className="space-y-6">
          {is299Unlocked ? (
            <EmotionBarChart emotions={emotions} />
          ) : (
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950/40 border border-purple-500/30 rounded-3xl p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <div className="max-w-xl mx-auto space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full">
                  Locked for Free User Preview
                </span>
                <h3 className="text-2xl font-black text-white">Unlock 12-Tone Emotional Spectrum Engine Grid</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Discover language signals across 12 emotional spectrums (Frustration, Trust, Joy, Churn Risk, Gratitude, Disappointment, Anxiety, Confusion, Sarcasm) with quoted evidence snippets.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition shadow-lg shadow-purple-600/30 active:scale-95"
                >
                  <span>Subscribe to ₹299 Starter Pack</span>
                  <ArrowUpRight className="w-4 h-4 text-purple-300" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs px-5 py-3.5 rounded-xl border border-slate-700 transition"
                >
                  <span>Login to Unlock</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* REVIEWS CATEGORIZED BY STAR RATINGS (5★, 4★, 3★, 2★, 1★) */}
        <div id="reviews-stars" className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Rating Distribution</span>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span>Reviews Categorized by Star Ratings</span>
              </h3>
            </div>
            <span className="text-2xl font-black text-white bg-amber-500/10 text-amber-300 px-4 py-1 rounded-2xl border border-amber-500/20">
              {sentiment.averageRating} ★
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2 text-center hover:border-emerald-500/40 transition shadow-md">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-bold">
                <span>5</span> <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <p className="text-2xl font-black text-white">{sentiment.starCategories.fiveStarCount.toLocaleString()}</p>
              <span className="text-[10px] text-emerald-400 font-bold uppercase bg-emerald-500/10 px-2 py-0.5 rounded-full">Exceptional</span>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2 text-center hover:border-emerald-500/40 transition shadow-md">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-bold">
                <span>4</span> <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <p className="text-2xl font-black text-white">{sentiment.starCategories.fourStarCount.toLocaleString()}</p>
              <span className="text-[10px] text-emerald-400 font-bold uppercase bg-emerald-500/10 px-2 py-0.5 rounded-full">Good</span>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2 text-center hover:border-amber-500/40 transition shadow-md">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-bold">
                <span>3</span> <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <p className="text-2xl font-black text-white">{sentiment.starCategories.threeStarCount.toLocaleString()}</p>
              <span className="text-[10px] text-amber-400 font-bold uppercase bg-amber-500/10 px-2 py-0.5 rounded-full">Average</span>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2 text-center hover:border-rose-500/40 transition shadow-md">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-bold">
                <span>2</span> <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <p className="text-2xl font-black text-white">{sentiment.starCategories.twoStarCount.toLocaleString()}</p>
              <span className="text-[10px] text-rose-400 font-bold uppercase bg-rose-500/10 px-2 py-0.5 rounded-full">Friction</span>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2 text-center hover:border-rose-500/40 transition shadow-md">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-bold">
                <span>1</span> <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <p className="text-2xl font-black text-white">{sentiment.starCategories.oneStarCount.toLocaleString()}</p>
              <span className="text-[10px] text-rose-400 font-bold uppercase bg-rose-500/10 px-2 py-0.5 rounded-full">Critical Churn</span>
            </div>
          </div>
        </div>

        {/* CUSTOMER SENTIMENT SPLIT & EMOJI GAUGES */}
        <div id="sentiment" className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="space-y-1 border-b border-slate-800 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Emotional Sentiment Gauges</span>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <span>Customer Sentiment Split & Emoji Gauges</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-6 bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-950/30 border border-emerald-500/30 rounded-2xl space-y-3 text-center shadow-lg hover:scale-[1.02] transition">
              <span className="text-4xl block">😍</span>
              <h4 className="font-extrabold text-white text-base">Positive Sentiment</h4>
              <p className="text-3xl font-black text-emerald-400">{sentiment.positivePercentage}%</p>
              <p className="text-[11px] text-slate-400">Praise regarding product quality, speed, and reliability.</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-slate-950 via-slate-950 to-amber-950/30 border border-amber-500/30 rounded-2xl space-y-3 text-center shadow-lg hover:scale-[1.02] transition">
              <span className="text-4xl block">😐</span>
              <h4 className="font-extrabold text-white text-base">Neutral Sentiment</h4>
              <p className="text-3xl font-black text-amber-400">{sentiment.neutralPercentage}%</p>
              <p className="text-[11px] text-slate-400">General feature questions and routine service updates.</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-slate-950 via-slate-950 to-rose-950/30 border border-rose-500/30 rounded-2xl space-y-3 text-center shadow-lg hover:scale-[1.02] transition">
              <span className="text-4xl block">😡</span>
              <h4 className="font-extrabold text-white text-base">Negative Sentiment</h4>
              <p className="text-3xl font-black text-rose-400">{sentiment.negativePercentage}%</p>
              <p className="text-[11px] text-slate-400">Support response lag, billing auto-debit, and service lead times.</p>
            </div>
          </div>
        </div>

        {/* WORD PATTERN ENGINE (GOOD WORDS VS BAD WORDS) */}
        <div id="emotions" className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="space-y-1 border-b border-slate-800 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Word Pattern Engine</span>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-purple-400" />
              <span>Word Pattern Engine: Customer Good Words vs. Bad Words</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-950/80 border border-emerald-500/30 rounded-2xl space-y-4 shadow-md">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <ThumbsUp className="w-4 h-4" />
                <h4>Good Words (Praise Drivers)</h4>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {sentiment.goodWords.map((item, idx) => (
                  <span key={idx} className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
                    <span>{item.word}</span>
                    <span className="bg-emerald-500 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                      +{item.count}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-950/80 border border-rose-500/30 rounded-2xl space-y-4 shadow-md">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <ThumbsDown className="w-4 h-4" />
                <h4>Bad Words (Pain Points)</h4>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {sentiment.badWords.map((item, idx) => (
                  <span key={idx} className="bg-rose-500/10 text-rose-300 border border-rose-500/30 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
                    <span>{item.word}</span>
                    <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                      -{item.count}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AUTOMATED ISSUE CLUSTER RANKING BY SEVERITY & VOLUME */}
        <div id="issues" className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="space-y-1 border-b border-slate-800 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Issue Cluster Engine</span>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <span>Automated Issue Cluster Ranking by Severity & Volume</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {issues.map((issue, idx) => (
              <div key={idx} className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3 shadow-md hover:border-slate-700 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 text-xs font-black flex items-center justify-center">#{idx + 1}</span>
                    <span className="font-extrabold text-sm text-white">{issue.title}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-0.5 rounded-full uppercase">
                    Severity: {issue.severity}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-semibold">
                  <span>Frequency: {issue.frequency} review mentions</span>
                  <span>•</span>
                  <span>Trend: {issue.trend}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <strong className="text-white">AI Fix Recommendation:</strong> {issue.recommendedAction}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SIDE-BY-SIDE COMPETITOR BENCHMARKING MATRIX */}
        <div id="competitors" className="space-y-6">
          {is799Unlocked ? (
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="space-y-1 border-b border-slate-800 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Competitive Intelligence Matrix</span>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-400" />
                    <span>Side-by-Side Competitor Benchmarking Matrix</span>
                  </h3>
                </div>
                <span className="text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full">
                  Unlocked (₹799 Pack)
                </span>
              </div>

              {competitors.map((comp, idx) => (
                <div key={idx} className="p-6 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-4 shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="text-lg font-black text-white">{company.name} vs. {comp.competitorName}</h4>
                      <p className="text-xs text-slate-400">{comp.glimpseSummary}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold">
                      <span className="bg-brand-500/10 text-brand-400 border border-brand-500/20 px-3 py-1 rounded-xl">
                        Your Score: {reputationScore.overallScore}
                      </span>
                      <span className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1 rounded-xl">
                        {comp.competitorName}: {comp.reputationScore}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1">
                      <span className="font-extrabold text-emerald-400 block">Where You Win Against {comp.competitorName}:</span>
                      <ul className="space-y-1 text-slate-200">
                        {comp.whereYouWin.map((w, wIdx) => (
                          <li key={wIdx} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {w}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-1">
                      <span className="font-extrabold text-rose-400 block">Growth Opportunities vs {comp.competitorName}:</span>
                      <ul className="space-y-1 text-slate-200">
                        {comp.opportunities.map((op, oIdx) => (
                          <li key={oIdx} className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> {op}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950/40 border border-purple-500/30 rounded-3xl p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <div className="max-w-xl mx-auto space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full">
                  Locked for Free User Preview
                </span>
                <h4 className="text-2xl font-black text-white">Unlock Side-by-Side Competitor Benchmarking Matrix</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Direct benchmark matrix comparing your score against top competitors in {company.industry}.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition shadow-lg shadow-purple-600/30 active:scale-95"
                >
                  <span>Subscribe to ₹799 Pro Pack</span>
                  <ArrowUpRight className="w-4 h-4 text-purple-300" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs px-5 py-3.5 rounded-xl border border-slate-700 transition"
                >
                  <span>Login to Account</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ==================================== */}
      {/* STEP 3: ACT PILLAR */}
      {/* ==================================== */}
      <div id="act-section" className="space-y-6 pt-6 border-t border-emerald-500/20">
        <div className="flex items-center gap-3 bg-emerald-950/40 border border-emerald-500/30 px-5 py-3 rounded-2xl">
          <span className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center">3</span>
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-wider">ACT: Prioritized AI Action Roadmap with SLAs & KPI Lift</h2>
            <p className="text-xs text-emerald-300">Execute prioritized AI recommendations with clear SLA resolution targets and measurable retention KPI lift.</p>
          </div>
        </div>

        {/* PRIORITIZED AI ACTION ROADMAP WITH TARGET SLAS & KPI LIFT (799 PACK BOUNDARY) */}
        <div id="recommendations" className="space-y-6">
          {is799Unlocked ? (
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="space-y-1 border-b border-slate-800 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Action Execution Roadmap</span>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-400" />
                  <span>Prioritized AI Action Roadmap with Target SLAs & Projected KPI Lift</span>
                </h3>
              </div>

              <div className="space-y-4">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="p-6 bg-slate-950/80 border border-emerald-500/30 rounded-2xl space-y-4 shadow-lg hover:border-emerald-500/50 transition">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-black px-3 py-1 rounded-full uppercase">
                          {rec.priority}
                        </span>
                        <h4 className="text-base font-extrabold text-white">{rec.problem}</h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="bg-brand-500/10 text-brand-300 border border-brand-500/20 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-brand-400" />
                          {rec.targetSla || '15-Min SLA Target'}
                        </span>
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          {rec.kpiLift || '+24% Retention Lift'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-[10px] font-bold uppercase text-slate-400">Review Evidence Signal</span>
                        <p className="text-slate-200">{rec.evidence}</p>
                      </div>
                      <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-[10px] font-bold uppercase text-emerald-400">Target Action Plan</span>
                        <p className="text-slate-200 font-semibold">{rec.recommendedAction}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                      <span>💡 <strong>Why It Matters:</strong> {rec.whyItMatters}</span>
                      <span className="text-emerald-400 font-bold">🎯 KPI Target: {rec.suggestedKpi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-3xl p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <div className="max-w-xl mx-auto space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full">
                  Locked for Free User Preview
                </span>
                <h3 className="text-2xl font-black text-white">Unlock ACT: Prioritized AI Action Roadmap with Target SLAs & KPI Lift</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Execute prioritized AI recommendations listing resolution targets (15-min automated SLA, 12-hour resolution) and projected retention KPI lift metrics (+24% Retention).
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition shadow-lg shadow-emerald-600/30 active:scale-95"
                >
                  <span>Subscribe to ₹799 Pro Pack</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-300" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs px-5 py-3.5 rounded-xl border border-slate-700 transition"
                >
                  <span>Login to Account</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* REPUTATION COMPOSITE RING */}
        <div id="reputation">
          <ScoreRing score={reputationScore} />
        </div>
      </div>

      {/* MULTI-PLATFORM BREAKDOWN */}
      <PlatformBreakdown platforms={report.platformBreakdown} isFreePreview={isFreePreview} />

      {/* ENTERPRISE 2499 UNLIMITED UNLOCK CTA FOR FREE USERS */}
      {isFreePreview && (
        <div className="bg-gradient-to-r from-brand-950 via-slate-900 to-slate-900 border border-brand-500/40 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-brand-600/30 text-brand-400 flex items-center justify-center mx-auto border border-brand-500/30">
            <Lock className="w-7 h-7" />
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-400 px-3 py-1 rounded-full border border-brand-500/30">
              Free User Preview Mode
            </span>
            <h3 className="text-3xl font-black text-white">Unlock Full Platform with ₹2,499 Enterprise Pack</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Subscribing unlocks 2,000+ review analysis limits, full 12-tone emotional spectrum analysis, competitor benchmarking, AI action roadmaps with SLAs, and exportable PDF/CSV reports.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/pricing"
              className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs px-7 py-4 rounded-xl transition shadow-xl shadow-brand-600/30 flex items-center justify-center gap-2 active:scale-95"
            >
              <span>View All Subscription Packs (₹299, ₹799, ₹2,499)</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};
