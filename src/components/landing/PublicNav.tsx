'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart3, Search, Sparkles, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export const PublicNav: React.FC = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800/80 backdrop-blur-md py-3 shadow-lg dark:shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="bg-brand-600 text-white p-2 rounded-xl group-hover:scale-105 transition transform shadow-md shadow-brand-600/30">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg text-slate-900 dark:text-white tracking-tight leading-none">Veyranta</span>
            <span className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold uppercase tracking-wider mt-0.5">Intelligence</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <Link href="/how-it-works" className="hover:text-slate-900 dark:hover:text-white transition">How It Works</Link>
          <Link href="/capabilities" className="hover:text-slate-900 dark:hover:text-white transition">Capabilities</Link>
          <Link href="/pricing" className="hover:text-slate-900 dark:hover:text-white transition">Pricing</Link>
          <Link href="/faq" className="hover:text-slate-900 dark:hover:text-white transition">FAQ</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-xs text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white font-semibold transition"
              >
                Dashboard
              </Link>
              <span className="text-[11px] font-mono text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 px-2.5 py-1 rounded-lg">
                {user.email}
              </span>
              <button
                onClick={logout}
                className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-semibold transition flex items-center gap-1 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 px-2.5 py-1 rounded-lg active:scale-95"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white font-semibold transition"
            >
              Sign In
            </Link>
          )}

          <Link
            href="/analyze"
            className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-brand-600/30 flex items-center gap-1.5 active:scale-[0.98]"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Analyze Your Company</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-400 hover:text-white p-2"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-6 space-y-4 text-xs font-semibold text-slate-300">
          <Link href="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="block hover:text-white py-1">How It Works</Link>
          <Link href="/capabilities" onClick={() => setMobileMenuOpen(false)} className="block hover:text-white py-1">Capabilities</Link>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block hover:text-white py-1">Pricing</Link>
          <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="block hover:text-white py-1">FAQ</Link>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="py-2 text-center text-slate-300">Sign In</Link>
            <Link href="/analyze" onClick={() => setMobileMenuOpen(false)} className="bg-brand-600 text-white font-bold py-2.5 text-center rounded-xl">Analyze Your Company</Link>
          </div>
        </div>
      )}
    </header>
  );
};
