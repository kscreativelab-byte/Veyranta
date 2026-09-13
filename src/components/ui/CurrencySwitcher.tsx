'use client';

import React from 'react';
import { DollarSign, IndianRupee, Euro } from 'lucide-react';

export type Currency = 'INR' | 'USD' | 'EUR';

interface CurrencySwitcherProps {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  className?: string;
}

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({
  currency,
  onCurrencyChange,
  className = ''
}) => {
  const currencies: { code: Currency; label: string; symbol: string; icon: React.ReactNode }[] = [
    { code: 'INR', label: 'INR (₹)', symbol: '₹', icon: <IndianRupee className="w-3.5 h-3.5" /> },
    { code: 'USD', label: 'USD ($)', symbol: '$', icon: <DollarSign className="w-3.5 h-3.5" /> },
    { code: 'EUR', label: 'EUR (€)', symbol: '€', icon: <Euro className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className={`inline-flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-inner ${className}`}>
      {currencies.map((item) => {
        const isActive = currency === item.code;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => onCurrencyChange(item.code)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              isActive
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30 scale-105'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
            }`}
            title={`Display prices in ${item.label}`}
          >
            <span className={isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}>{item.icon}</span>
            <span>{item.code}</span>
          </button>
        );
      })}
    </div>
  );
};
