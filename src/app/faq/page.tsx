'use client';

import React, { useState } from 'react';
import { PublicNav } from '@/components/landing/PublicNav';
import { PublicFooter } from '@/components/landing/PublicFooter';
import {
  HelpCircle,
  ChevronDown,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Lock
} from 'lucide-react';

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry / Feedback');
  const [message, setMessage] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<{ success?: boolean; text?: string } | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      setFeedbackStatus({
        success: false,
        text: 'Please provide both your email address and message before submitting.'
      });
      return;
    }

    setIsSubmitting(true);
    setFeedbackStatus(null);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFeedbackStatus({
          success: true,
          text: data.message || 'Thank you! Your feedback has been securely submitted to the Veyranta team.'
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        throw new Error(data.error || 'Failed to submit feedback message.');
      }
    } catch (err: any) {
      setFeedbackStatus({
        success: false,
        text: err.message || 'Failed to submit feedback message.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'What is Veyranta and how does it calculate composite reputation scores?',
      a: 'Veyranta is an AI-powered customer reputation and intelligence platform. It analyzes review text intensity, customer emotional tones, recency, and issue frequency to synthesize a standardized 0-100 composite reputation benchmark for any business.'
    },
    {
      q: 'How does Veyranta collect multi-channel customer signals?',
      a: 'Veyranta normalizes data from user CSV feedback datasets and permitted public business profile APIs. It does not perform unauthorized or deceptive scraping; unconfigured platforms clearly display "Source unavailable".'
    },
    {
      q: 'What is included in the instant Free Company Analysis?',
      a: 'The Free Analysis gives you an immediate overview including company metadata summary, overall composite reputation score, positive/neutral/negative sentiment split percentages, 2 top customer theme highlights, and sample issue titles.'
    },
    {
      q: 'What additional capabilities does the Pro Intelligence subscription unlock?',
      a: 'Upgrading to Pro unlocks 100+ review analysis limits, full 12-tone emotional pattern breakdowns (trust, frustration, delight, urgency), complete issue severity clusters with evidence, competitor benchmarking battlecards, prioritized action roadmaps, and 1-click PDF/CSV exports.'
    },
    {
      q: 'How does the 12-Tone Emotional Analysis work?',
      a: 'Unlike basic sentiment analyzers that label comments as just "positive" or "negative", Veyranta categorizes underlying emotional nuance into 12 distinct tones (e.g. Trust, Frustration, Sarcasm, Churn Warning, Delight) with direct quoted evidence snippets.'
    },
    {
      q: 'Can I upload my own custom CSV feedback file?',
      a: 'Yes! Veyranta accepts CSV file uploads containing raw review text, customer survey responses, or support ticket notes. Our normalization engine automatically parses and indexes the dataset.'
    },
    {
      q: 'How are Razorpay payments handled and secured?',
      a: 'All subscription checkout orders are initialized server-side using Razorpay Live Gateway credentials with HMAC-SHA256 signature verification. Credit card, Netbanking, and UPI credentials are encrypted directly via Razorpay PCI-DSS compliant infrastructure.'
    },
    {
      q: 'Can I change or cancel my subscription plan at any time?',
      a: 'Yes. You can manage your subscription plan or cancel recurring renewals directly from your Veyranta Account Settings or Dashboard at any time without hidden fees.'
    },
    {
      q: 'How are prioritized recommendations and target SLAs computed?',
      a: 'Veyranta ranks detected operational issues by customer sentiment drop impact and frequency. It then applies AI recommendation algorithms to formulate step-by-step mitigation actions along with target SLA completion goals.'
    },
    {
      q: 'Is my company data and customer feedback kept secure and private?',
      a: 'Yes. Veyranta enforces strict Supabase Row Level Security (RLS) policies. User uploaded datasets and audit logs are accessible only by authenticated account owners and protected by server-side encryption.'
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-brand-500 selection:text-white">
      <PublicNav />

      {/* HEADER HERO */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-400 text-xs font-semibold px-3.5 py-1 rounded-full border border-brand-500/20">
          <HelpCircle className="w-4 h-4" />
          <span>KNOWLEDGE BASE & FEEDBACK</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Frequently Asked Questions & Customer Support
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Find instant answers regarding Veyranta AI analysis, signal collection, Razorpay Live payments, and security protocols below.
        </p>
      </section>

      {/* SECTION 1: EXPANDED FAQ ACCORDION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-extrabold text-white">Top Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400">Click any question to view detailed technical & operational answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200 shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-white hover:text-brand-300 transition focus:outline-none"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-brand-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-slate-300 border-t border-slate-800/80 leading-relaxed bg-slate-950/40">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: SECURE CUSTOMER FEEDBACK FORM */}
      <section className="py-20 bg-slate-900/60 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit Encrypted Direct Dispatch</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl flex items-center justify-center gap-2">
              <MessageSquare className="w-7 h-7 text-brand-400" />
              <span>Send Us Your Feedback</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Have a suggestion, question, or feature request? Submit your feedback directly to our core engineering team.
            </p>
          </div>

          <form
            onSubmit={handleSubmitFeedback}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl relative"
          >
            {feedbackStatus && (
              <div
                className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                  feedbackStatus.success
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                {feedbackStatus.success ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
                )}
                <span>{feedbackStatus.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-300">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-300">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block font-semibold text-slate-300">Subject / Category</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition"
              >
                <option value="General Inquiry / Feedback">General Inquiry / Feedback</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Billing & Razorpay Payments">Billing & Razorpay Payments</option>
                <option value="Enterprise CSV Integration">Enterprise CSV Integration</option>
                <option value="Report Bug / Technical Issue">Report Bug / Technical Issue</option>
              </select>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block font-semibold text-slate-300">
                Your Detailed Feedback Message <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="Share your thoughts, experiences, or questions with the Veyranta team..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition leading-relaxed resize-none"
              ></textarea>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected by Server-Side Encrypted Mail Proxy</span>
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs px-7 py-3.5 rounded-xl transition shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Feedback Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
