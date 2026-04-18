import Link from 'next/link';
import { Surah } from '@/types';
import { ChevronRight } from 'lucide-react';

interface Props {
  surah: Surah;
}

// Maps surah number  
const GRADIENT_PALETTE = [
  'from-emerald-50  to-teal-50',
  'from-sky-50      to-blue-50',
  'from-violet-50   to-purple-50',
  'from-amber-50    to-yellow-50',
  'from-rose-50     to-pink-50',
  'from-cyan-50     to-sky-50',
  'from-lime-50     to-green-50',
  'from-indigo-50   to-blue-50',
  'from-orange-50   to-amber-50',
  'from-fuchsia-50  to-pink-50',
  'from-teal-50     to-emerald-50',
  'from-red-50      to-rose-50',
];

const NUMBER_BADGE_COLOURS = [
  'bg-emerald-700', 'bg-sky-700',    'bg-violet-700',
  'bg-amber-600',   'bg-rose-700',   'bg-cyan-700',
  'bg-lime-700',    'bg-indigo-700', 'bg-orange-600',
  'bg-fuchsia-700', 'bg-teal-700',   'bg-red-700',
];

export default function SurahCard({ surah }: Props) {
  const colorIndex  = (surah.number - 1) % 12;
  const gradient    = GRADIENT_PALETTE[colorIndex];
  const badgeColor  = NUMBER_BADGE_COLOURS[colorIndex];

  return (
    <Link
      href={`/surah/${surah.number}`}
      className={`group relative bg-gradient-to-br ${gradient} rounded-2xl p-5
                  border border-white/80 shadow-sm
                  hover:shadow-lg hover:scale-[1.015] hover:-translate-y-0.5
                  transition-all duration-200 flex items-center gap-4 overflow-hidden`}
    >
      {/* Subtle decorative circle */}
      <div
        className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full
                   bg-white/30 group-hover:scale-125 transition-transform duration-300 pointer-events-none"
      />

      {/* Number badge */}
      <div
        className={`${badgeColor} w-11 h-11 rounded-xl text-white text-sm font-bold
                    flex items-center justify-center shrink-0 shadow-md
                    group-hover:scale-110 transition-transform duration-200`}
      >
        {surah.number}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <h3 className="font-semibold text-gray-900 text-sm truncate leading-tight">
            {surah.englishName}
          </h3>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0
                        ${surah.revelationType === 'Meccan'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-blue-100  text-blue-700'
                        }`}
          >
            {surah.revelationType}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5 truncate">{surah.englishNameTranslation}</p>
        <p className="text-[11px] text-gray-400 mt-1">{surah.numberOfAyahs} verses</p>
      </div>

      {/* Arabic name */}
      <div className="text-right shrink-0 mr-1">
        <p
          className="font-amiri text-xl text-gray-800 leading-tight"
          style={{ direction: 'rtl' }}
        >
          {surah.name}
        </p>
      </div>

      {/* Chevron */}
      <ChevronRight
        className="w-4 h-4 text-gray-300 group-hover:text-gray-500
                   group-hover:translate-x-0.5 transition-all shrink-0"
      />
    </Link>
  );
}