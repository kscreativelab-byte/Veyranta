'use client';

import React from 'react';
import Link from 'next/link';
import { BarChart3 } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-brand-600 text-white p-1.5 rounded-lg">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white">Veyranta</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              "Turn customer signals into business action."
            </p>
            <p className="text-[11px] text-slate-500">
              AI Reputation & Customer Intelligence Platform. Next-gen alternative to Trustgate, ZoomLocal, FramePilot, Indellia, Spokk, ReviewTrackers, and Wonderflow.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
              <li><Link href="/capabilities" className="hover:text-white transition">Capabilities</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition">Pricing & Plans</Link></li>
              <li><Link href="/analyze" className="hover:text-white transition">Free Analysis</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/faq" className="hover:text-white transition">FAQ & Help Center</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition">Signal Processing Guide</Link></li>
              <li><Link href="/capabilities" className="hover:text-white transition">Competitor Benchmarks</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition">Subscription Plans</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Legal & Governance</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition">Refund & Cancellation Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Data Deletion Request</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Veyranta Inc. All rights reserved.</p>
          <p className="text-slate-500 text-[11px]">
            Veyranta Composite Reputation Scores are analytical benchmarks derived from multi-channel customer feedback.
          </p>
        </div>
      </div>
    </footer>
  );
};
