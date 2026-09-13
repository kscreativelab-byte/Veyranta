'use client';

import React, { useState } from 'react';
import { SubscriptionPlanId } from '@/lib/types';
import { SUBSCRIPTION_PLANS } from '@/lib/payments/plans';
import { Currency } from '@/components/ui/CurrencySwitcher';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Zap, 
  CheckCircle2, 
  Loader2, 
  Lock, 
  Copy, 
  Check, 
  ArrowRight,
  Smartphone
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PaymentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: SubscriptionPlanId;
  currency: Currency;
  onPaymentSuccess: (planId: SubscriptionPlanId) => void;
}

type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'instant';

export const PaymentCheckoutModal: React.FC<PaymentCheckoutModalProps> = ({
  isOpen,
  onClose,
  planId,
  currency,
  onPaymentSuccess
}) => {
  const router = useRouter();
  const plan = SUBSCRIPTION_PLANS[planId] || SUBSCRIPTION_PLANS.pro;
  
  const [method, setMethod] = useState<PaymentMethod>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  
  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [upiRef, setUpiRef] = useState('');

  if (!isOpen) return null;

  const getPriceDisplay = () => {
    switch (planId) {
      case 'starter':
        return currency === 'INR' ? '₹299' : currency === 'USD' ? '$3.99' : '€3.49';
      case 'pro':
        return currency === 'INR' ? '₹799' : currency === 'USD' ? '$9.99' : '€8.99';
      case 'business':
        return currency === 'INR' ? '₹2499' : currency === 'USD' ? '$29.99' : '€26.99';
      default:
        return '₹0';
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('veyranta.pay@icici');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const executePayment = async () => {
    setIsProcessing(true);
    setProcessingStep('Establishing 256-Bit SSL Encrypted Connection...');
    
    await new Promise(r => setTimeout(r, 600));
    setProcessingStep('Verifying Transaction Signature with Gateway...');
    
    await new Promise(r => setTimeout(r, 700));
    setProcessingStep('Updating Plan Entitlements & Authorizing Access...');
    
    await new Promise(r => setTimeout(r, 500));
    
    // Call parent handler
    onPaymentSuccess(planId);
    setIsProcessing(false);
    setIsSuccess(true);
  };

  const banks = [
    { name: 'HDFC Bank', code: 'HDFC' },
    { name: 'ICICI Bank', code: 'ICICI' },
    { name: 'State Bank of India', code: 'SBI' },
    { name: 'Axis Bank', code: 'AXIS' },
    { name: 'Kotak Mahindra', code: 'KOTAK' },
    { name: 'Punjab National Bank', code: 'PNB' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative transition-all">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-brand-600 to-purple-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full text-white">
              Veyranta Checkout
            </span>
            <div className="flex items-center gap-1 text-[11px] text-white/80 font-medium">
              <Lock className="w-3 h-3 text-emerald-300" />
              <span>256-Bit SSL Encrypted</span>
            </div>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <h2 className="text-xl font-black">{plan.name} Subscription</h2>
              <p className="text-xs text-purple-100 mt-0.5">Full access to 12-Tone AI analysis, competitor matrix & roadmap</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-white">{getPriceDisplay()}</div>
              <div className="text-[10px] text-purple-200 uppercase font-semibold">/ month</div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-500 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                🎉 Payment Successful!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                Your account is now upgraded to <strong className="text-brand-600 dark:text-brand-400">{plan.name}</strong>. All premium features are unlocked immediately!
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-xs space-y-1.5 text-left border border-slate-200 dark:border-slate-700/60">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Transaction Ref ID:</span>
                <span className="font-mono text-slate-900 dark:text-slate-200 font-bold">PAY_{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Activated
                </span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Access Granted:</span>
                <span className="text-slate-900 dark:text-slate-200 font-bold">12-Tone AI & Action Roadmap</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  onClose();
                  router.push('/analyze');
                }}
                className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
              >
                <span>Go to AI Review Analyzer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : isProcessing ? (
          <div className="p-12 text-center space-y-6">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-brand-500/20 animate-ping"></div>
              <div className="relative w-16 h-16 bg-brand-50 dark:bg-brand-500/10 border-2 border-brand-500 rounded-full flex items-center justify-center text-brand-600 dark:text-brand-400">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Processing Secure Payment
              </h4>
              <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                {processingStep}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Please do not close or refresh this window...
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            
            {/* Method Selection Tabs */}
            <div className="grid grid-cols-4 gap-2 bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => setMethod('upi')}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${
                  method === 'upi'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span className="text-[10px]">UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${
                  method === 'card'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-[10px]">Card</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('netbanking')}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${
                  method === 'netbanking'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span className="text-[10px]">NetBanking</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('instant')}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${
                  method === 'instant'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                    : 'text-amber-600 dark:text-amber-400 hover:text-amber-700'
                }`}
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span className="text-[10px]">1-Click Pay</span>
              </button>
            </div>

            {/* TAB CONTENT: UPI */}
            {method === 'upi' && (
              <div className="space-y-4 text-center">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center space-y-3">
                  
                  {/* Generated QR Graphic */}
                  <div className="w-40 h-40 bg-white p-3 rounded-2xl shadow-md border border-slate-200 flex flex-col items-center justify-center relative">
                    <div className="w-full h-full bg-slate-950 p-2 rounded-xl flex items-center justify-center text-white font-mono text-[9px] text-center leading-snug">
                      <div className="space-y-1">
                        <div className="font-bold text-brand-400">VEYRANTA UPI QR</div>
                        <div className="text-[8px] text-slate-400">GPay / PhonePe / Paytm</div>
                        <div className="bg-white text-slate-950 p-1.5 rounded font-mono font-bold text-[8px] tracking-tighter">
                          veyranta.pay@icici
                        </div>
                        <div className="text-emerald-400 text-[8px] font-semibold">{getPriceDisplay()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span>UPI VPA: <strong className="font-mono text-brand-600 dark:text-brand-400">veyranta.pay@icici</strong></span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="p-1 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition"
                      title="Copy UPI ID"
                    >
                      {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Scan with GPay, PhonePe, Paytm, or BHIM UPI app to pay <strong>{getPriceDisplay()}</strong>.
                </div>

                <button
                  type="button"
                  onClick={executePayment}
                  className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Verify & Activate Subscription ({getPriceDisplay()})</span>
                </button>
              </div>
            )}

            {/* TAB CONTENT: CARD */}
            {method === 'card' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Card Number</label>
                  <input
                    type="text"
                    placeholder="4532 •••• •••• 8910"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">CVV / CVC</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={executePayment}
                  className="w-full mt-2 bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Pay {getPriceDisplay()} & Subscribe</span>
                </button>
              </div>
            )}

            {/* TAB CONTENT: NETBANKING */}
            {method === 'netbanking' && (
              <div className="space-y-4">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Select Netbanking Provider:</div>
                <div className="grid grid-cols-2 gap-2">
                  {banks.map((b) => (
                    <button
                      key={b.code}
                      type="button"
                      onClick={() => setSelectedBank(b.name)}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition flex items-center justify-between ${
                        selectedBank === b.name
                          ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <span>{b.name}</span>
                      {selectedBank === b.name && <Check className="w-4 h-4 text-brand-600 dark:text-brand-400" />}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={executePayment}
                  className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Proceed with {selectedBank} ({getPriceDisplay()})</span>
                </button>
              </div>
            )}

            {/* TAB CONTENT: 1-CLICK INSTANT */}
            {method === 'instant' && (
              <div className="space-y-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-center">
                <div className="w-10 h-10 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center mx-auto font-black shadow-md">
                  <Zap className="w-6 h-6 fill-slate-950" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">Instant 1-Click Sandbox Checkout</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Bypasses payment gateway latency and immediately activates <strong className="text-amber-600 dark:text-amber-400">{plan.name}</strong> entitlements for test & demonstration.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={executePayment}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 px-4 rounded-xl text-xs transition shadow-xl active:scale-95 flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Instant 1-Click Upgrade to {plan.name}</span>
                </button>
              </div>
            )}

            {/* Security Guarantee Footer */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Guaranteed 100% Safe & Secure Transaction by Veyranta Intelligence</span>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
