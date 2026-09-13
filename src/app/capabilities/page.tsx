'use client';

import React from 'react';
import Link from 'next/link';
import { PublicNav } from '@/components/landing/PublicNav';
import { PublicFooter } from '@/components/landing/PublicFooter';
import {
  Sparkles,
  Search,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  PieChart,
  Smile,
  ShieldAlert,
  Award,
  TrendingUp,
  FileText,
  Lock,
  ArrowUpRight
} from 'lucide-react';

export default function CapabilitiesPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-brand-500 selection:text-white">
      <PublicNav />

      {/* HEADER HERO */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-400 text-xs font-semibold px-3.5 py-1 rounded-full border border-brand-500/20">
          <Sparkles className="w-4 h-4" />
          <span>CAPABILITIES & BENCHMARKS</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
          From Customer Feedback to Business Intelligence
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          See why Veyranta outperforms legacy star-rating tools by converting unstructured review text into actionable retention roadmaps and competitive battlecards.
        </p>

        <div className="pt-2 flex justify-center gap-4">
          <Link
            href="/analyze"
            className="bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition shadow-lg shadow-brand-600/30 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Analyze Your Company Free</span>
          </Link>
        </div>
      </section>

      {/* CONTAINER 1: WHY VEYRANTA OUTPERFORMS LEGACY REVIEW TRACKERS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Competitive Edge</span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Why Veyranta Outperforms Legacy Review Trackers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Legacy tools display simple star rating averages. Veyranta analyzes sentiment intensity, emotional tones, and operational bottlenecks.
          </p>
        </div>

        {/* COMPARISON TABLE */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="py-4 px-6 text-slate-200 font-extrabold uppercase tracking-wider w-1/3">
                    Feature / Capability
                  </th>
                  <th className="py-4 px-6 text-slate-400 font-extrabold uppercase tracking-wider w-1/3">
                    Legacy Tools (Trustgate, ZoomLocal, FramePilot, Indellia, Spokk, ReviewTrackers, Wonderflow)
                  </th>
                  <th className="py-4 px-6 text-brand-400 font-black uppercase tracking-wider bg-brand-950/40 border-l border-brand-500/30 w-1/3">
                    Veyranta Platform
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="py-4 px-6 font-bold text-white">Sentiment Intensity Analysis</td>
                  <td className="py-4 px-6 text-slate-400">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      <span>Basic star rating averages only</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-white bg-brand-950/20 border-l border-brand-500/30">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Advanced NLP intensity scoring (0-100)</span>
                    </div>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition">
                  <td className="py-4 px-6 font-bold text-white">Emotional Tone Detection</td>
                  <td className="py-4 px-6 text-slate-400">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      <span>Positive / Negative binary only</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-white bg-brand-950/20 border-l border-brand-500/30">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>12-Tone Spectrum (Frustration, Trust, Joy, Churn Risk)</span>
                    </div>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition">
                  <td className="py-4 px-6 font-bold text-white">Recurring Issue Severity</td>
                  <td className="py-4 px-6 text-slate-400">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      <span>Manual tag creation required</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-white bg-brand-950/20 border-l border-brand-500/30">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Automated issue cluster ranking by severity & volume</span>
                    </div>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition">
                  <td className="py-4 px-6 font-bold text-white">Competitive Intelligence</td>
                  <td className="py-4 px-6 text-slate-400">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      <span>None / Isolated review count</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-white bg-brand-950/20 border-l border-brand-500/30">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Side-by-side competitor benchmarking matrix</span>
                    </div>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition">
                  <td className="py-4 px-6 font-bold text-white">Actionable Recommendations</td>
                  <td className="py-4 px-6 text-slate-400">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      <span>Generic email alerts</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-white bg-brand-950/20 border-l border-brand-500/30">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Prioritized AI action roadmap with target SLAs & KPI lift</span>
                    </div>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition">
                  <td className="py-4 px-6 font-bold text-white">Executive PDF & CSV Reports</td>
                  <td className="py-4 px-6 text-slate-400">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      <span>Basic screenshots</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-white bg-brand-950/20 border-l border-brand-500/30">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>1-Click Executive PDF & CSV raw data export</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CONTAINER 2: CAPABILITIES — FROM CUSTOMER FEEDBACK TO BUSINESS INTELLIGENCE */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Core Capabilities</span>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Capabilities: From Customer Feedback to Business Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Deep-dive features designed for product leaders, customer success teams, and executive management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
              <div className="p-2.5 bg-brand-500/10 text-brand-400 rounded-xl w-fit">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Multi-Channel Normalization</h3>
              <p className="text-slate-400 leading-relaxed">
                Ingest user CSV feedback files and permitted profile metadata into a unified analytical timeline with consistent scoring models.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
              <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl w-fit">
                <PieChart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">12-Tone Emotional Pattern Engine</h3>
              <p className="text-slate-400 leading-relaxed">
                Go beyond simple positive/negative labels. Surface underlying feelings of trust, urgency, disappointment, and brand advocacy with exact evidence quotes.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
              <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl w-fit">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Churn & Risk Severity Scoring</h3>
              <p className="text-slate-400 leading-relaxed">
                Automatically flag high-severity operational bottlenecks (e.g. billing disputes, login bugs, support response lag) before they impact revenue.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Actionable Next Steps with Target SLAs</h3>
              <p className="text-slate-400 leading-relaxed">
                Every report presents concrete operational improvements assigned with clear completion timeframes and projected retention gains.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl w-fit">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Competitor Benchmarking Matrix</h3>
              <p className="text-slate-400 leading-relaxed">
                Compare your composite reputation score and customer sentiment directly against industry peers and market leaders.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl w-fit">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Executive PDF & CSV Reports</h3>
              <p className="text-slate-400 leading-relaxed">
                Generate polished executive PDFs ready for board meetings, or export normalized CSV datasets for custom internal analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTAINER 3: FREE COMPANY ANALYSIS VS PRO INTELLIGENCE REPORT MATRIX */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Analysis Options</span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Free Company Analysis vs. Pro Intelligence Report
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Compare key features available in the instant Free analysis versus the complete Pro Intelligence subscription.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Plan Breakdown */}
          <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-6 shadow-xl">
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
      </section>

      <PublicFooter />
    </div>
  );
}
