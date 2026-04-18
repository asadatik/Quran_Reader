'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  MapPin,
  Hash,
  AlignJustify,
} from 'lucide-react';
import { SurahDetail } from '@/types';
import AyahCard from '@/components/AyahCard';
import SearchBar from '@/components/SearchBar';
import SettingsSidebar from '@/components/SettingsSidebar';

interface Props {
  surah: SurahDetail;
}

const BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';

// max stagger delay cap
const MAX_DELAY = 600; 

export default function SurahPageClient({ surah }: Props) {
  const [query, setQuery] = useState('');

  const filteredAyahs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return surah.ayahs;
    return surah.ayahs.filter(
      (a) =>
        a.translation.toLowerCase().includes(q) ||
        a.text.includes(q)                       ||
        String(a.numberInSurah) === q
    );
  }, [surah.ayahs, query]);

  const prevId = surah.number > 1   ? surah.number - 1 : null;
  const nextId = surah.number < 114 ? surah.number + 1 : null;

  return (
    <div className="max-w-3xl mx-auto">

      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-emerald-700
                     hover:text-emerald-900 font-medium transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          All Surahs
        </Link>
      </div>

      {/* Surah header card */}
      <div
        className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-800
                   text-white rounded-3xl p-7 sm:p-9 mb-8 shadow-2xl overflow-hidden"
      >
  
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

        <div className="flex items-center justify-between mb-6">
          {prevId ? (
            <Link
              href={`/surah/${prevId}`}
              className="flex items-center gap-1 text-xs text-emerald-300 hover:text-white
                         bg-white/10 hover:bg-white/20 transition-all px-3 py-1.5 rounded-full"
              aria-label="Previous surah"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              {prevId}
            </Link>
          ) : <div />}

          <span className="text-xs text-emerald-400 uppercase tracking-widest font-medium">
            Surah {surah.number} of 114
          </span>

          {nextId ? (
            <Link
              href={`/surah/${nextId}`}
              className="flex items-center gap-1 text-xs text-emerald-300 hover:text-white
                         bg-white/10 hover:bg-white/20 transition-all px-3 py-1.5 rounded-full"
              aria-label="Next surah"
            >
              {nextId}
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          ) : <div />}
        </div>

        {/* Main title */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{surah.englishName}</h1>
          <p className="text-emerald-300 text-base mt-1">{surah.englishNameTranslation}</p>

          <p
            className="font-amiri text-5xl sm:text-6xl text-emerald-100 mt-5 leading-normal"
            style={{ direction: 'rtl' }}
          >
            {surah.name}
          </p>
        </div>

        {/* Meta chips */}
        <div className="flex items-center justify-center flex-wrap gap-3 mt-6">
          <Chip icon={<Hash className="w-3 h-3" />}          label={`Surah ${surah.number}`} />
          <Chip icon={<AlignJustify className="w-3 h-3" />}  label={`${surah.numberOfAyahs} Verses`} />
          <Chip icon={<MapPin className="w-3 h-3" />}        label={surah.revelationType} />
          <Chip icon={<BookOpen className="w-3 h-3" />}      label="Asad Translation" />
        </div>

       {/* Bismillah */}
        {surah.number !== 9 && (
          <div className="mt-7 pt-6 border-t border-emerald-700/60 text-center">
            <p
              className="font-amiri text-2xl sm:text-3xl text-emerald-100 leading-loose"
              style={{ direction: 'rtl' }}
            >
              {BISMILLAH}
            </p>
          </div>
        )}
      </div>


      <div className="mb-6">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search within this Surah (translation or verse number)…"
        />
        {query && (
          <p className="text-xs text-gray-400 mt-2 pl-1">
            {filteredAyahs.length} verse{filteredAyahs.length !== 1 ? 's' : ''} match
            &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {/* Ayah list */}
      {filteredAyahs.length > 0 ? (
        <div className="space-y-4">
          {filteredAyahs.map((ayah, i) => (
            <AyahCard
              key={ayah.number}
              ayah={ayah}
              surahNumber={surah.number}
              delay={Math.min(i * 40, MAX_DELAY)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-gray-500">No verses match &ldquo;{query}&rdquo;</p>
          <button
            onClick={() => setQuery('')}
            className="mt-4 text-emerald-700 hover:underline text-sm font-medium"
          >
            Clear search
          </button>
        </div>
      )}

      {/* bottom navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
        {prevId ? (
          <Link
            href={`/surah/${prevId}`}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200
                       rounded-xl text-sm font-medium text-gray-600
                       hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800
                       transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Surah {prevId}
          </Link>
        ) : <div />}

        <Link
          href="/"
          className="text-xs text-gray-400 hover:text-emerald-700 transition-colors"
        >
          ↑ All Surahs
        </Link>

        {nextId ? (
          <Link
            href={`/surah/${nextId}`}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-800 text-white
                       rounded-xl text-sm font-medium
                       hover:bg-emerald-900 transition-all shadow-sm"
          >
            Surah {nextId}
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </div>

   
      <SettingsSidebar />
    </div>
  );
}


function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20
                     text-emerald-200 text-xs px-3 py-1 rounded-full">
      {icon}
      {label}
    </span>
  );
}