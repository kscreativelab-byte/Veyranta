'use client';

import React, { useState } from 'react';
import { Search, Bell, Building, Menu, Sparkles, ChevronDown, Home, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface TopNavProps {
  onToggleMobileMenu: () => void;
  activeCompanyName?: string;
}

export const TopNav: React.FC<TopNavProps> = ({ onToggleMobileMenu, activeCompanyName }) => {
  const { user, subscription, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const workspaceTitle = activeCompanyName || 'Veyranta Intelligence Workspace';

  return (
    <header className="h-16 bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between font-sans transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Home Navigation Link */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-3 py-1.5 rounded-lg transition"
          title="Return to Home Landing Page"
        >
          <Home className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
          <span className="hidden sm:inline">Home</span>
        </Link>

        {/* Authentic Company Workspace Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 px-3 py-1.5 rounded-lg text-xs">
          <Building className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">{workspaceTitle}</span>
          <ChevronDown className="w-3 h-3 text-slate-500 dark:text-slate-400 ml-1 flex-shrink-0" />
        </div>

        {/* Global Search */}
        <div className="hidden lg:flex items-center relative ml-2 w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search signals or reviews..."
            className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* Plan Entitlement Badge */}
        <Link
          href="/pricing"
          className="hidden sm:flex items-center gap-1.5 text-xs bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-500/20 px-2.5 py-1 rounded-full font-semibold hover:bg-brand-100 dark:hover:bg-brand-500/20 transition"
        >
          <Sparkles className="w-3 h-3" />
          <span>{subscription?.planId === 'pro' ? 'Pro Plan' : 'Free Preview'}</span>
        </Link>

        {/* Notifications Icon Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 bg-brand-500 rounded-full absolute top-2 right-2 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-4 text-xs z-50">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2 mb-2">Notifications</h4>
              <p className="text-slate-600 dark:text-slate-400 py-2">Veyranta intelligence pipeline active.</p>
            </div>
          )}
        </div>

        {/* User Profile Avatar & Logout */}
        {user ? (
          <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-3">
            <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center border border-brand-400/30">
              {user.email.substring(0, 2).toUpperCase()}
            </div>
            <div className="hidden xl:flex flex-col">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">{user.fullName || user.email.split('@')[0]}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">{user.email}</span>
            </div>
            <button
              onClick={logout}
              className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-semibold p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 transition flex items-center gap-1 active:scale-95"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};
