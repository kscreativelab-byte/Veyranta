'use client';

import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS } from '@/lib/payments/plans';
import { SubscriptionPlanId } from '@/lib/types';
import { useAuth } from '@/lib/auth/context';
import { Check, ShieldCheck, Zap, Sparkles, Loader2, ArrowRight, CheckCircle2, Globe2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PublicNav } from '@/components/landing/PublicNav';
import { PublicFooter } from '@/components/landing/PublicFooter';
import { CurrencySwitcher, Currency } from '@/components/ui/CurrencySwitcher';

export default function PricingPage() {
  const { user, subscription, updateUserSubscription } = useAuth();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [checkoutMessage, setCheckoutMessage] = useState<{ text: string; isError?: boolean } | null>(null);
  const [currency, setCurrency] = useState<Currency>('INR');

  const getFormattedPrice = (planId: string, curr: Currency) => {
    switch (planId) {
      case 'free':
        return curr === 'INR' ? '₹0' : curr === 'USD' ? '$0' : '€0';
      case 'starter':
        return curr === 'INR' ? '₹299' : curr === 'USD' ? '$3.99' : '€3.49';
      case 'pro':
        return curr === 'INR' ? '₹799' : curr === 'USD' ? '$9.99' : '€8.99';
      case 'business':
        return curr === 'INR' ? '₹2499' : curr === 'USD' ? '$29.99' : '€26.99';
      default:
        return '₹0';
    }
  };

  const loadRazorpaySdk = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSelectPlan = async (planId: SubscriptionPlanId) => {
    if (planId === 'free') {
      updateUserSubscription('free');
      router.push('/analyze');
      return;
    }

    if (!user) {
      router.push('/login');
      return;
    }

    setLoadingPlan(planId);
    setCheckoutMessage(null);

    try {
      // 1. Initialize Razorpay order via server API
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, userId: user.id })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to initialize checkout order.');
      }

      const order = data.order;
      const planDetails = SUBSCRIPTION_PLANS[planId];

      // 2. Load Razorpay script
      const sdkLoaded = await loadRazorpaySdk();

      if (!sdkLoaded) {
        throw new Error('Razorpay Payment Gateway SDK failed to load. Please check your internet connection.');
      }

      // 3. Open Interactive Razorpay Checkout Modal
      const options = {
        key: order.keyId || 'rzp_test_placeholder_key',
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'Veyranta Intelligence',
        description: `${planDetails.name} Subscription`,
        order_id: order.orderId,
        prefill: {
          name: user.fullName || user.email.split('@')[0],
          email: user.email
        },
        theme: {
          color: '#7c3aed'
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id || order.orderId,
                razorpay_payment_id: response.razorpay_payment_id || 'pay_' + Date.now(),
                razorpay_signature: response.razorpay_signature || 'test_sig',
                planId,
                userId: user.id
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              updateUserSubscription(planId, 'active');
              setCheckoutMessage({
                text: `🎉 Payment successful! You are now subscribed to ${planDetails.name}.`
              });
            } else {
              setCheckoutMessage({
                text: verifyData.error || 'Payment verification failed.',
                isError: true
              });
            }
          } catch (err: any) {
            setCheckoutMessage({
              text: 'Payment verification error: ' + err.message,
              isError: true
            });
          }
        },
        modal: {
          ondismiss: function () {
            setCheckoutMessage({
              text: 'Checkout process was closed by user.',
              isError: true
            });
          }
        }
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
    } catch (err: any) {
      setCheckoutMessage({
        text: err.message || 'Checkout initialization failed.',
        isError: true
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  const activePlanId = subscription?.planId || 'free';
  const isLiveMode = (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '').startsWith('rzp_live_');

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen font-sans selection:bg-brand-500 selection:text-white transition-colors duration-300">
      <PublicNav />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-500/20 px-3 py-1 rounded-full">
            Transparent Pricing Plans
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Scale Customer Intelligence & Reputation Action
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Choose a plan tailored to your team size, feedback volume, and competitor monitoring needs.
          </p>

          {/* Currency Switcher Control */}
          <div className="pt-4 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Globe2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Select Billing Currency:</span>
            </div>
            <CurrencySwitcher currency={currency} onCurrencyChange={setCurrency} />
          </div>
        </div>

        {/* Razorpay Gateway Status Banner */}
        {isLiveMode ? (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 rounded-2xl text-xs space-y-1 max-w-2xl mx-auto text-center shadow-lg">
            <div className="flex items-center justify-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Razorpay LIVE Production Gateway Active</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Real payments are securely processed via 256-bit SSL encrypted Razorpay Live Gateway. Real UPI (GPay/PhonePe), Credit Cards, and Netbanking are fully accepted.
            </p>
          </div>
        ) : (
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 rounded-2xl text-xs space-y-2 max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 font-bold text-amber-600 dark:text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Razorpay Test Mode Active</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Do not scan the QR code with your phone (GPay/PhonePe block test VPAs). Select <strong>Netbanking</strong> inside the popup, or use the instant test simulator below:
            </p>
            <button
              type="button"
              onClick={() => handleSelectPlan('pro')}
              className="mt-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-4 py-2 rounded-xl text-xs transition inline-flex items-center gap-1.5 shadow-lg active:scale-95"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Instant Simulate Pro Upgrade (Free Test)</span>
            </button>
          </div>
        )}

        {checkoutMessage && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold text-center border flex items-center justify-center gap-2 ${
              checkoutMessage.isError
                ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300'
                : 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>{checkoutMessage.text.replace('🎉', '')}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Object.values(SUBSCRIPTION_PLANS).map((plan) => {
            const isPro = plan.id === 'pro';
            const isCurrentPlan = activePlanId === plan.id;
            const priceText = getFormattedPrice(plan.id, currency);

            return (
              <div
                key={plan.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl border p-6 flex flex-col justify-between shadow-md dark:shadow-xl relative transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 ${
                  isCurrentPlan
                    ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-gradient-to-b from-white via-white to-emerald-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20'
                    : isPro
                    ? 'border-brand-500 ring-2 ring-brand-500/30 bg-gradient-to-b from-white via-white to-brand-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-brand-950/20'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {isCurrentPlan ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Active Plan
                  </span>
                ) : isPro ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                    Most Popular
                  </span>
                ) : null}

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900 dark:text-white transition-all duration-300">
                      {priceText}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">/ month</span>
                  </div>

                  <ul className="mt-6 space-y-3 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                      <span>Up to <strong>{plan.analysisLimit}</strong> analyses/mo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                      <span>Up to <strong>{plan.competitorLimit}</strong> competitor benchmarks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.aiDeepAnalysis ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-600'}`} />
                      <span>12-Tone Emotional Analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.exportReports ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-600'}`} />
                      <span>Export PDF & CSV Reports</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.priorityProcessing ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-600'}`} />
                      <span>Priority Processing Queue</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={loadingPlan === plan.id || isCurrentPlan}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                      isCurrentPlan
                        ? 'bg-emerald-100 dark:bg-emerald-600/30 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 cursor-default'
                        : isPro
                        ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {loadingPlan === plan.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span>{isCurrentPlan ? 'Current Active Plan' : plan.priceMonthly === 0 ? 'Start Free' : 'Choose Plan'}</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-2 text-xs text-slate-600 dark:text-slate-400 shadow-md dark:shadow-lg">
          <div className="flex items-center justify-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <span>Secure Razorpay Payment Gateway Architecture</span>
          </div>
          <p>
            Server-side HMAC-SHA256 signature verification protects all plan subscriptions. Raw payment card info is never processed or stored locally.
          </p>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
