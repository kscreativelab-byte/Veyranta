'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-2">Veyranta</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              "Turn customer signals into business action."
            </p>
            <p className="text-xs text-slate-500 mt-3">
              AI Reputation & Customer Intelligence Platform.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Product Capabilities</h4>
            <ul className="space-y-2 text-xs">
              <li>Reputation Scores</li>
              <li>Sentiment & 12-Tone Emotional Analysis</li>
              <li>Dynamic Topic Extraction</li>
              <li>AI Issue & Praise Detection Engine</li>
              <li>Prioritized Business Recommendations</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Integrations & Compliance</h4>
            <ul className="space-y-2 text-xs">
              <li>Multi-Source Architecture</li>
              <li>Official API Connectors</li>
              <li>Custom CSV Dataset Processing</li>
              <li>Server-Side SSRF Protection</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Legal & Governance</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:underline">Terms of Service</Link></li>
              <li><Link href="#" className="hover:underline">Refund & Cancellation Policy</Link></li>
              <li><Link href="#" className="hover:underline">Data Deletion Request</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Veyranta Inc. All rights reserved.</p>
          <p className="text-slate-500">
            Composite Reputation Scores are analytical benchmarks calculated by Veyranta.
          </p>
        </div>
      </div>
    </footer>
  );
};
