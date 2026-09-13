'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PublicNav } from './PublicNav';
import { PublicFooter } from './PublicFooter';
import { SUBSCRIPTION_PLANS } from '@/lib/payments/plans';
import {
  Sparkles,
  ArrowRight,
  Search,
  Check,
  ShieldCheck,
  Zap,
  BarChart3,
  PieChart,
  Smile,
  ShieldAlert,
  Award,
  TrendingUp,
  Users,
  Lightbulb,
  FileText,
  Lock,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'How does Veyranta collect and analyze customer signals?',
      a: 'Veyranta normalizes available feedback from user CSV datasets and permitted public business profile APIs. It runs AI sentiment, emotional tone, topic extraction, and issue severity algorithms to generate grounded business insights.'
    },
    {
      q: 'What is included in the Free Analysis?',
      a: 'The Free Analysis provides a high-level overview including your company overview, basic composite reputation score, overall positive/neutral/negative sentiment percentages, 2 top customer themes, and a sample executive summary.'
    },
    {
      q: 'Does Veyranta perform unauthorized scraping?',
      a: 'No. Veyranta relies strictly on official API integrations, user-uploaded CSV feedback datasets, and permitted public metadata. Unconfigured platforms clearly display "Source unavailable" rather than fabricating fake reviews.'
    },
    {
      q: 'How does the Pro Intelligence subscription work?',
      a: 'Upgrading to Pro unlocks 100+ review analysis limits, full 12-tone emotional analysis, complete issue severity breakdowns with evidence, competitor benchmarking, prioritized action recommendations with KPI targets, and PDF export.'
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-brand-500 selection:text-white">
      <PublicNav />

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-400 text-xs font-semibold px-3.5 py-1 rounded-full border border-brand-500/20">
          <Sparkles className="w-4 h-4" />
          <span>AI REPUTATION & CUSTOMER INTELLIGENCE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Know what your customers are saying.<br />
          <span className="bg-gradient-to-r from-brand-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Know what to do next.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Veyranta turns customer reviews and feedback into clear reputation insights, recurring issues, customer sentiment, and actionable business recommendations.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/analyze"
            className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs px-7 py-4 rounded-xl transition shadow-xl shadow-brand-600/30 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Analyze Your Company</span>
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs px-6 py-4 rounded-xl border border-slate-800 transition flex items-center justify-center gap-2"
          >
            <span>See How It Works</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* HERO INTERACTIVE VISUAL: Signal Pipeline Diagram */}
        <div className="pt-10 max-w-4xl mx-auto">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-left relative backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-brand-400" />
                Veyranta Signal Pipeline Architecture
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-semibold">
                Live Processing Flow
              </span>
            </div>

            {/* Pipeline Flow Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-slate-400 font-semibold text-[10px] uppercase">01 Customer Signals</span>
                <p className="font-bold text-white">Reviews & Datasets</p>
                <span className="text-[10px] text-slate-500 block">CSV & Public Metadata</span>
              </div>

              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-brand-400 font-semibold text-[10px] uppercase">02 AI Processing</span>
                <p className="font-bold text-white">Sentiment & Tone</p>
                <span className="text-[10px] text-slate-500 block">12 Emotional Patterns</span>
              </div>

              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-purple-400 font-semibold text-[10px] uppercase">03 Issue Engine</span>
                <p className="font-bold text-white">Pain Points & Trends</p>
                <span className="text-[10px] text-slate-500 block">Severity & Frequency</span>
              </div>

              <div className="p-3.5 bg-brand-950/60 border border-brand-500/40 rounded-xl space-y-1">
                <span className="text-emerald-400 font-semibold text-[10px] uppercase">04 Business Action</span>
                <p className="font-bold text-white">Prioritized Actions</p>
                <span className="text-[10px] text-slate-400 block">Target KPIs & SLAs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: WHAT IS VEYRANTA? */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Intelligence Platform</span>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">What is Veyranta?</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Veyranta is an AI-powered reputation and customer intelligence platform that helps businesses understand the signals hidden inside customer feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="p-2 bg-brand-500/10 text-brand-400 rounded-lg w-fit">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Composite Reputation Score</h3>
              <p className="text-slate-400 leading-relaxed">A 0-100 analytical benchmark derived from sentiment, recency, consistency, and risk signals.</p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg w-fit">
                <PieChart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Sentiment & 12-Tone Emotions</h3>
              <p className="text-slate-400 leading-relaxed">Evaluates written complaints independently of star ratings to surface satisfaction, trust, and frustration.</p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg w-fit">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Recurring Issue Detection</h3>
              <p className="text-slate-400 leading-relaxed">Automatically detects support bottlenecks, pricing confusion, and operational defects ranked by severity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FREE ANALYSIS EXPLANATION VS PRO REPORT CONTAINER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Analysis Options</span>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Free Company Analysis vs. Pro Intelligence Report</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Start with a instant free preview or unlock deep 12-tone customer emotions and competitor battlecards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan Breakdown */}
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-500/10 text-brand-400 px-3 py-1 rounded-full border border-brand-500/20">
                  Start Free
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-3">Free Company Analysis</h3>
                <p className="text-xs text-slate-400 mt-1">Get an instant high-level customer signal overview.</p>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /><span>Company metadata overview</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /><span>Basic Veyranta Reputation Score</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /><span>Overall sentiment breakdown (% positive/negative)</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /><span>2 top customer theme highlights</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /><span>Limited issue summary titles</span></li>
              </ul>

              <Link
                href="/analyze"
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
              >
                <span>Analyze Your Company — Free</span>
              </Link>
            </div>

            {/* Pro Plan Breakdown */}
            <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950/30 border border-brand-500/40 rounded-2xl space-y-6 shadow-xl">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20">
                  Complete Picture
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-3">Pro Intelligence Report</h3>
                <p className="text-xs text-slate-300 mt-1">Understand why signals occur and what to fix first.</p>
              </div>

              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-400" /><span>100+ review analysis limits</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-400" /><span>12-Tone Emotional Analysis with evidence</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-400" /><span>Competitor Intelligence benchmarking matrix</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-400" /><span>Prioritized AI recommendations with target KPIs</span></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-400" /><span>PDF & CSV export capabilities</span></li>
              </ul>

              <Link
                href="/pricing"
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3.5 rounded-xl border border-slate-700 transition flex items-center justify-center gap-2"
              >
                <span>Unlock Detailed Intelligence</span>
                <ArrowUpRight className="w-4 h-4 text-brand-400" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK EXPLORE SUB-PAGES CALLOUT */}
      <section className="py-16 bg-slate-900/40 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-xl font-bold text-white">Explore Veyranta Customer Intelligence</h3>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
            <Link href="/how-it-works" className="bg-slate-900 hover:bg-slate-800 text-slate-200 px-5 py-3 rounded-xl border border-slate-800 transition flex items-center gap-1.5">
              <span>How It Works & Problem Overview</span>
              <ArrowRight className="w-4 h-4 text-brand-400" />
            </Link>
            <Link href="/capabilities" className="bg-slate-900 hover:bg-slate-800 text-slate-200 px-5 py-3 rounded-xl border border-slate-800 transition flex items-center gap-1.5">
              <span>Capabilities vs Legacy Trackers</span>
              <ArrowRight className="w-4 h-4 text-brand-400" />
            </Link>
            <Link href="/pricing" className="bg-slate-900 hover:bg-slate-800 text-slate-200 px-5 py-3 rounded-xl border border-slate-800 transition flex items-center gap-1.5">
              <span>Pricing & Plans</span>
              <ArrowRight className="w-4 h-4 text-brand-400" />
            </Link>
            <Link href="/faq" className="bg-slate-900 hover:bg-slate-800 text-slate-200 px-5 py-3 rounded-xl border border-slate-800 transition flex items-center gap-1.5">
              <span>FAQ & Customer Feedback</span>
              <ArrowRight className="w-4 h-4 text-brand-400" />
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};
