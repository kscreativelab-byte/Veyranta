'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { SUBSCRIPTION_PLANS } from '@/lib/payments/plans';
import { Building, Plus, ExternalLink, ShieldCheck, Clock, Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, subscription } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'companies' | 'subscription'>('overview');

  const currentPlan = SUBSCRIPTION_PLANS[subscription?.planId || 'free'];
  const analysesUsed = 1;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Workspace Analytics Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Workspace: <strong className="text-slate-200">{user?.fullName || user?.email || 'Guest Member'}</strong>
          </p>
        </div>

        <Link
          href="/analyze"
          className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Analysis</span>
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 text-xs font-semibold text-slate-400 gap-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 border-b-2 transition ${activeTab === 'overview' ? 'border-brand-500 text-brand-400' : 'border-transparent hover:text-white'}`}
        >
          Overview & History
        </button>
        <button
          onClick={() => setActiveTab('companies')}
          className={`pb-3 border-b-2 transition ${activeTab === 'companies' ? 'border-brand-500 text-brand-400' : 'border-transparent hover:text-white'}`}
        >
          Saved Companies
        </button>
        <button
          onClick={() => setActiveTab('subscription')}
          className={`pb-3 border-b-2 transition ${activeTab === 'subscription' ? 'border-brand-500 text-brand-400' : 'border-transparent hover:text-white'}`}
        >
          Subscription & Entitlements
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <span className="text-xs text-slate-400 font-semibold uppercase">Analyses Used This Month</span>
              <div className="text-2xl font-black text-white mt-1">{analysesUsed} / {currentPlan.analysisLimit}</div>
              <span className="text-xs text-slate-500">Plan Limit</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <span className="text-xs text-slate-400 font-semibold uppercase">Active Subscription</span>
              <div className="text-2xl font-black text-brand-400 mt-1">{currentPlan.name}</div>
              <span className="text-xs text-slate-500">Status: {subscription?.status || 'Active'}</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <span className="text-xs text-slate-500 font-semibold uppercase">Composite Score Avg</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">78 / 100</div>
              <span className="text-xs text-slate-500">Average reputation signal</span>
            </div>
          </div>

          {/* Recent Analyses Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-4">
            <h2 className="text-sm font-bold text-white">Recent Intelligence Analyses</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <th className="py-2.5 px-3">Company Name</th>
                    <th className="py-2.5 px-3">Reputation Score</th>
                    <th className="py-2.5 px-3">Positive Sentiment</th>
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-semibold text-white">Acme Corporation</td>
                    <td className="py-3 px-3">
                      <span className="bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/20">78 / 100</span>
                    </td>
                    <td className="py-3 px-3">68% Positive</td>
                    <td className="py-3 px-3 text-slate-500">Just now</td>
                    <td className="py-3 px-3 text-right">
                      <Link href="/analyze" className="text-brand-400 font-semibold hover:underline flex items-center justify-end gap-1">
                        <span>View Report</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Saved Companies */}
      {activeTab === 'companies' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-3">
          <Bookmark className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="font-bold text-white text-sm">No saved companies in workspace</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Analyze any company or website to pin their profile to your saved workspace list.
          </p>
        </div>
      )}

      {/* Tab 3: Subscription */}
      {activeTab === 'subscription' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-sm font-bold text-white">Plan & Entitlements</h2>
              <p className="text-xs text-slate-400">Current Plan: {currentPlan.name}</p>
            </div>
            <Link
              href="/pricing"
              className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
            >
              Upgrade Plan
            </Link>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-2">
            <div className="flex justify-between font-semibold text-slate-300">
              <span>Monthly Quota Progress</span>
              <span>{analysesUsed} / {currentPlan.analysisLimit} Analyses</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-brand-500 h-2 rounded-full"
                style={{ width: `${(analysesUsed / currentPlan.analysisLimit) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
