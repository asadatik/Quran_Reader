'use client';

import Link from 'next/link';
import { Settings, BookOpen, Menu } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { useState } from 'react';

export default function Navbar() {
  const { toggleSettings, isSettingsOpen } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-linear-to-r from-emerald-950 to-emerald-900 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

      
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label="Go to Surah list"
          >
            <div
              className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center
                         group-hover:bg-emerald-400 transition-colors shadow-lg"
            >
              <BookOpen className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div className="leading-tight">
              <p className="font-bold text-lg tracking-tight">Al-Quran</p>
              <p className="text-emerald-400 text-[10px] uppercase tracking-widest hidden sm:block">
                Read &amp; Reflect
              </p>
            </div>
          </Link>

          {/* Centre decorative Arabic  */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none select-none">
            <p
              className="font-amiri text-xl text-emerald-300/80 tracking-wide"
              style={{ direction: 'rtl' }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>

     
          <div className="flex items-center gap-2">
            {/* Settings button */}
            <button
              onClick={toggleSettings}
              aria-pressed={isSettingsOpen}
              aria-label="Toggle display settings"
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
                         transition-all border
                         ${isSettingsOpen
                           ? 'bg-emerald-500 border-emerald-400 text-white'
                           : 'bg-emerald-800/50 border-emerald-700 hover:bg-emerald-700 text-emerald-200'
                         }`}
            >
              <Settings
                className={`w-4 h-4 transition-transform duration-500 ${
                  isSettingsOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}