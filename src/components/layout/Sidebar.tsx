'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  LayoutDashboard,
  Search,
  Award,
  MessageSquare,
  PieChart,
  Smile,
  AlertTriangle,
  Users,
  Lightbulb,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Layers,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Home Website', href: '/', icon: Home },
    { name: 'Analyze Company', href: '/analyze', icon: Search },
    { name: 'How It Works', href: '/how-it-works', icon: Layers },
    { name: 'Capabilities', href: '/capabilities', icon: Sparkles },
    { name: 'Pricing & Plans', href: '/pricing', icon: CreditCard },
    { name: 'Overview Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Reputation Score', href: '/analyze#reputation', icon: Award },
    { name: 'Star Breakdown', href: '/analyze#reviews-stars', icon: MessageSquare },
    { name: 'Sentiment Split', href: '/analyze#sentiment', icon: PieChart },
    { name: '12-Tone Emotions', href: '/analyze#emotions-spectrum', icon: Smile },
    { name: 'Issue Clusters', href: '/analyze#issues', icon: AlertTriangle },
    { name: 'Competitor Matrix', href: '/analyze#competitors', icon: Users },
    { name: 'AI Action Roadmap', href: '/analyze#recommendations', icon: Lightbulb },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Header & Logo */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-3 overflow-hidden" title="Return to Veyranta Home Website">
            <div className="bg-brand-600 text-white p-2 rounded-xl flex-shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight leading-none">Veyranta</span>
                <span className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold uppercase tracking-wider mt-0.5">Intelligence</span>
              </div>
            )}
          </Link>

          <button
            onClick={onToggleCollapse}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && !item.href.includes('#') && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-600/20 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-500/30 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'}`} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
        <Link
          href="/faq"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title={isCollapsed ? 'FAQ & Help Center' : undefined}
        >
          <HelpCircle className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          {!isCollapsed && <span>FAQ & Help Center</span>}
        </Link>

        {user ? (
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300 transition"
            title={isCollapsed ? 'Sign Out' : undefined}
          >
            <LogOut className="w-4 h-4 text-red-500 dark:text-red-400" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        ) : (
          <Link
            href="/login"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-brand-700 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 hover:text-brand-800 dark:hover:text-brand-300 transition font-semibold"
            title={isCollapsed ? 'Sign In' : undefined}
          >
            <LogOut className="w-4 h-4 text-brand-600 dark:text-brand-400 rotate-180" />
            {!isCollapsed && <span>Sign In / Register</span>}
          </Link>
        )}
      </div>
    </aside>
  );
};
