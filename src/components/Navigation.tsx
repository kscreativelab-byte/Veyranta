'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/context';
import { BarChart3, ShieldCheck, User, LogOut, Lock } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export const Navigation: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white hover:opacity-90">
          <div className="bg-brand-600 text-white p-1.5 rounded-lg">
            <BarChart3 className="w-5 h-5" />
          </div>
          <span>Veyranta</span>
          <span className="text-xs bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 font-semibold px-2 py-0.5 rounded border border-brand-200 dark:border-brand-500/20">
            SaaS
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <ThemeToggle />
          <Link href="/analyze" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
            Instant Analysis
          </Link>
          <Link href="/pricing" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
            Pricing & Plans
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-brand-600 dark:hover:text-brand-400 transition flex items-center gap-1">
                Dashboard
              </Link>
              <Link href="/admin" className="hover:text-brand-600 dark:hover:text-brand-400 transition text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded">
                Admin
              </Link>
              <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{user.email}</span>
                <button
                  onClick={logout}
                  className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 p-1 rounded"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                Sign In
              </Link>
              <Link
                href="/pricing"
                className="bg-brand-600 text-white px-3.5 py-1.5 rounded-lg hover:bg-brand-700 transition font-semibold"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
