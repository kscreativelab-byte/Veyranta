'use client';

import React from 'react';
import Link from 'next/link';
import { PublicNav } from '@/components/landing/PublicNav';
import { PublicFooter } from '@/components/landing/PublicFooter';
import { Search, ArrowRight, Sparkles, Layers, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-brand-500 selection:text-white">
      <PublicNav />

      {/* HEADER HERO */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-400 text-xs font-semibold px-3.5 py-1 rounded-full border border-brand-500/20">
          <Sparkles className="w-4 h-4" />
          <span>METHODOLOGY & PROCESS</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
          How Veyranta Transforms Customer Signals into Business Action
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Discover how Veyranta unifies multi-channel customer feedback, surfaces hidden operational risks, and computes clear SLA resolution steps.
        </p>

        <div className="pt-2 flex justify-center gap-4">
          <Link
            href="/analyze"
            className="bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition shadow-lg shadow-brand-600/30 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Start Free Analysis</span>
          </Link>
        </div>
      </section>

      {/* CONTAINER 1: THE PROBLEM */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">The Problem</span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Customer feedback contains the answers.<br />
            <span className="text-rose-400">The problem is finding them.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Modern businesses receive thousands of reviews, support tickets, and comments every month across disconnected platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Problem 01</span>
            <h3 className="font-bold text-base text-white">Feedback is scattered</h3>
            <p className="text-slate-400 leading-relaxed">
              Customer reviews and comments live across different platforms, CSV exports, and surveys, making unified tracking difficult.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Problem 02</span>
            <h3 className="font-bold text-base text-white">Important patterns are missed</h3>
            <p className="text-slate-400 leading-relaxed">
              A single negative review might seem isolated, but dozens of similar comments hide systemic operational risks and churn drivers.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-xl">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Problem 03</span>
            <h3 className="font-bold text-base text-white">Knowing the problem isn't enough</h3>
            <p className="text-slate-400 leading-relaxed">
              Businesses need concrete, prioritized next steps with target SLA goals rather than generic advice or simple star rating averages.
            </p>
          </div>
        </div>
      </section>

      {/* CONTAINER 2: SIMPLE PROCESS — HOW VEYRANTA WORKS */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Simple Process</span>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">How Veyranta Works</h2>
            <p className="text-xs sm:text-sm text-slate-400">Four automated steps from raw feedback input to prioritized business action.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-xs">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 relative overflow-hidden shadow-xl">
              <span className="text-3xl font-black text-brand-500">01</span>
              <h3 className="font-bold text-base text-white">ENTER</h3>
              <p className="text-slate-400 leading-relaxed">
                Enter your company name or website URL, or attach a customer feedback CSV dataset.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 relative overflow-hidden shadow-xl">
              <span className="text-3xl font-black text-brand-500">02</span>
              <h3 className="font-bold text-base text-white">ANALYZE</h3>
              <p className="text-slate-400 leading-relaxed">
                Veyranta normalizes available feedback and executes AI sentiment, 12-tone emotional pattern, and topic extraction engines.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 relative overflow-hidden shadow-xl">
              <span className="text-3xl font-black text-brand-500">03</span>
              <h3 className="font-bold text-base text-white">UNDERSTAND</h3>
              <p className="text-slate-400 leading-relaxed">
                Review composite reputation scores, emotional tone spectrums, recurring complaints, and competitive advantages.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 relative overflow-hidden shadow-xl">
              <span className="text-3xl font-black text-brand-500">04</span>
              <h3 className="font-bold text-base text-white">ACT</h3>
              <p className="text-slate-400 leading-relaxed">
                Execute prioritized AI recommendations with clear SLA resolution targets and measurable retention KPI lift.
              </p>
            </div>
          </div>

          <div className="pt-6 text-center">
            <Link
              href="/capabilities"
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-400 hover:text-brand-300 transition"
            >
              <span>Explore Veyranta Capabilities & Competitor Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
