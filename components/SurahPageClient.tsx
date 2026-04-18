'use client';

import { useState, useMemo } from 'react';
import { Surah } from '@/types';
import SurahCard from '@/components/SurahCard';
import SearchBar from '@/components/SearchBar';
import SettingsSidebar from '@/components/SettingsSidebar';
import { BookOpen, Compass, Moon } from 'lucide-react';

interface Props {
  surahs: Surah[];
}


const STATS = [
  { icon: BookOpen, label: 'Surahs',    value: '114' },
  { icon: Compass,  label: 'Meccan',    value: '86'  },
  { icon: Moon,     label: 'Medinan',   value: '28'  },
];

export default function SurahListClient({ surahs }: Props) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return surahs;
    return surahs.filter(
      (s) =>
        s.englishName.toLowerCase().includes(q)          ||
        s.englishNameTranslation.toLowerCase().includes(q) ||
        s.name.includes(q)                               ||
        String(s.number) === q
    );
  }, [surahs, query]);

  return (
    <>
 
      <section className="relative text-center mb-10">
        {/* Background decoration */}
        <div
          className="absolute inset-x-0 -top-8 h-64 bg-gradient-to-b from-emerald-900/5 to-transparent
                     pointer-events-none rounded-3xl"
          aria-hidden="true"
        />

        {/* Arabic title */}
        <p
          className="font-amiri text-4xl sm:text-5xl text-emerald-800 mb-2 leading-tight"
          style={{ direction: 'rtl' }}
        >
          الْقُرْآنُ الْكَرِيمُ
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">The Noble Quran</h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          114 Surahs with Arabic text &amp; English translation
        </p>

        {/* Quick stats */}
        <div className="flex items-center justify-center gap-6 mt-5">
          {STATS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-700">
                <Icon className="w-4 h-4" />
                <span className="text-lg font-bold">{value}</span>
              </div>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mt-6 max-w-md mx-auto">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search Surah name, translation, or number…"
          />
        </div>
      </section>

      {/* Results meta  */}
      {query && (
        <p className="text-sm text-gray-500 mb-4 text-center">
          {filtered.length === 0
            ? `No results for "${query}"`
            : `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${query}"`}
        </p>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map((surah) => (
            <SurahCard key={surah.number} surah={surah} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-gray-500 text-lg">No Surahs match &ldquo;{query}&rdquo;</p>
          <button
            onClick={() => setQuery('')}
            className="mt-4 text-emerald-700 hover:text-emerald-900 underline text-sm font-medium"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Sidebar is a portal-style overlay, rendered anywhere in the tree */}
      <SettingsSidebar />
    </>
  );
}