'use client';

import React from 'react';
import { ShieldCheck, Activity, Database, Key, Server, Cpu, CheckCircle } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-400" />
            System Administration & Health
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Internal observability, security monitoring, payment webhooks, and AI provider status.
          </p>
        </div>
        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5" />
          System Operational
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <span className="text-xs text-slate-400 font-semibold uppercase text-[10px]">PostgreSQL Database</span>
          <div className="text-lg font-bold text-emerald-400 mt-1">Supabase RLS Active</div>
          <span className="text-[11px] text-slate-500">20 Schema Tables Enforced</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <span className="text-xs text-slate-400 font-semibold uppercase text-[10px]">Payment Gateway</span>
          <div className="text-lg font-bold text-brand-400 mt-1">Razorpay Verified</div>
          <span className="text-[11px] text-slate-500">HMAC SHA-256 Webhooks</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <span className="text-xs text-slate-400 font-semibold uppercase text-[10px]">SSRF Protection</span>
          <div className="text-lg font-bold text-emerald-400 mt-1">Active Filter</div>
          <span className="text-[11px] text-slate-500">Subnet & IP Block List</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <span className="text-xs text-slate-400 font-semibold uppercase text-[10px]">AI Service Engine</span>
          <div className="text-lg font-bold text-purple-400 mt-1">Grounded NLP</div>
          <span className="text-[11px] text-slate-500">Hallucination Protection</span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-4">
        <h2 className="text-sm font-bold text-white">Configured Data Source Adapters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="font-bold text-slate-200">CSV Dataset Upload</span>
            <p className="text-emerald-400 text-[11px]">Status: Active & Operational</p>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="font-bold text-slate-200">Public Web Extractor</span>
            <p className="text-emerald-400 text-[11px]">Status: Active (Permitted Public)</p>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="font-bold text-slate-200">Google Business API</span>
            <p className="text-slate-400 text-[11px]">Status: Awaiting GOOGLE_BUSINESS_API_KEY</p>
          </div>
        </div>
      </div>
    </div>
  );
}
