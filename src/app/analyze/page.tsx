'use client';

import React, { useState, useEffect } from 'react';
import { AnalysisForm } from '@/components/AnalysisForm';
import { ReportView } from '@/components/ReportView';
import { AnalysisReport } from '@/lib/types';
import { ArrowLeft, Search, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function AnalyzePage() {
  const [report, setReport] = useState<AnalysisReport | null>(null);

  useEffect(() => {
    if (report && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [report]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4 font-sans">
      {/* Top Header Navigation */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-brand-400 font-bold hover:underline mb-1">
            <Home className="w-3.5 h-3.5" />
            <span>Back to Veyranta Home Website</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Customer Signal Intelligence Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Enter a company name or website URL to run AI sentiment, 12-tone emotional pattern, and topic extraction.
          </p>
        </div>

        {report && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setReport(null)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition flex items-center gap-1.5 active:scale-95 shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5 text-brand-400" />
              <span>Analyze Another Company</span>
            </button>
            <Link
              href="/"
              className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-brand-500 transition flex items-center gap-1.5 active:scale-95 shadow-md shadow-brand-600/20"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </div>
        )}
      </div>

      {/* When no report is generated yet: show AnalysisForm */}
      {!report && (
        <div className="pt-2">
          <AnalysisForm onAnalysisComplete={(newReport) => setReport(newReport)} />
        </div>
      )}

      {/* Generated Intelligence Report Result */}
      {report && (
        <div className="pt-2 space-y-6">
          <ReportView report={report} />
        </div>
      )}
    </div>
  );
}
