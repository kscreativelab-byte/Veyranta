'use client';

import React from 'react';
import { useTheme } from '@/lib/theme/context';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border shadow-sm ${
        theme === 'dark'
          ? 'bg-slate-900/90 text-violet-300 border-violet-800/50 hover:bg-slate-800 hover:border-violet-500/60 shadow-violet-950/40'
          : 'bg-white text-violet-700 border-violet-200 hover:bg-violet-50 hover:border-violet-300 shadow-slate-200'
      } ${className}`}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      aria-label="Toggle Light / Dark Theme"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span className="bg-gradient-to-r from-violet-300 to-indigo-200 bg-clip-text text-transparent">Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-violet-600" />
          <span className="text-violet-800">Dark Mode</span>
        </>
      )}
    </button>
  );
};
