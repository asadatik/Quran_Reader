'use client';

import Link from 'next/link';
import { Settings, BookOpen, Sparkles } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { toggleSettings, isSettingsOpen } = useSettings();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_2px_32px_rgba(16,185,129,0.10)] border-b border-emerald-100'
          : 'bg-white/80 backdrop-blur-lg shadow-[0_1px_24px_rgba(16,185,129,0.06)] border-b border-emerald-50'
      }`}
    >


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[62px] relative">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label="Go to Surah list"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600
                             flex items-center justify-center shadow-[0_2px_12px_rgba(16,185,129,0.25)]
                             group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_4px_20px_rgba(16,185,129,0.35)]
                             transition-all duration-300 ease-out">
                <BookOpen className="w-5 h-5 text-white" strokeWidth={2.2} />
              </div>
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-[17px] tracking-tight text-emerald-950">
                  Al-Quran
                </p>
                <Sparkles className="w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-emerald-500 text-[10px] uppercase tracking-[0.18em] font-medium hidden sm:block">
                Read &amp; Reflect
              </p>
            </div>
          </Link>

          {/* Center */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 pointer-events-none select-none items-center gap-2.5">
        
            <p
              className=" text-xl text-emerald-600/90 tracking-wide"
              style={{ direction: 'rtl' }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
           
          </div>

          {/* Settings button */}
          <button
            onClick={toggleSettings}
            aria-pressed={isSettingsOpen}
            aria-label="Toggle display settings"
            className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-[13.5px] font-medium
                       border transition-all duration-200
                       ${isSettingsOpen
                         ? 'bg-gradient-to-br from-emerald-400 to-emerald-500 text-white border-transparent shadow-[0_4px_14px_rgba(16,185,129,0.35)]'
                         : 'bg-emerald-100 border-emerald-200/60 text-emerald-800 hover:bg-emerald-100/80 hover:border-emerald-300/70 hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(16,185,129,0.12)] backdrop-blur-sm'
                       }`}
          >
            <Settings
              className={`w-[15px] h-[15px] transition-transform duration-400 ${
                isSettingsOpen ? 'rotate-180' : 'group-hover:rotate-[72deg]'
              }`}
            />
            <span className="hidden sm:inline">Settings</span>
          </button>

        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-emerald-100 to-transparent" />
    </header>
  );
}