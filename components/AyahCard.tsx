'use client';

import { AyahWithTranslation } from '@/types';
import { useSettings } from '@/context/SettingsContext';

interface Props {
  ayah: AyahWithTranslation;
  surahNumber: number;

  delay?: number;
}

export default function AyahCard({ ayah, surahNumber, delay = 0 }: Props) {
  const { settings, isReady } = useSettings();


  const arabicSize = isReady ? settings.arabicFontSize : 30;
  const translationSize = isReady ? settings.translationFontSize : 16;
  const fontFamily =
    isReady && settings.arabicFont === 'Lateef'
      ? 'var(--font-lateef)'
      : 'var(--font-amiri)';

  return (
    <article
      className="ayah-fade bg-white rounded-2xl border border-gray-100 shadow-sm
                 hover:border-emerald-100 hover:shadow-md transition-all duration-200"
      style={{ '--delay': `${delay}ms` } as React.CSSProperties}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-50">
        {/* Verse number */}
        <div
          className="w-9 h-9 rounded-full bg-emerald-700 text-white text-sm font-bold
                     flex items-center justify-center shadow-sm shrink-0"
        >
          {ayah.numberInSurah}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="hidden sm:inline">
            Juz&nbsp;<strong className="text-gray-600">{ayah.juz}</strong>
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">
            Page&nbsp;<strong className="text-gray-600">{ayah.page}</strong>
          </span>
          <span className="font-medium text-gray-500">
            {surahNumber}:{ayah.numberInSurah}
          </span>

          {/* Sajda indicator */}
          {typeof ayah.sajda === 'object' && ayah.sajda !== null && (
            <span
              className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium"
              title="Sajda verse"
            >
              ۩ Sajda
            </span>
          )}
        </div>
      </div>

      <div className="px-5 py-5">

        <p
          className="arabic-block text-gray-900 mb-5"
          style={{
            fontFamily,
            fontSize: `${arabicSize}px`,
            lineHeight: 2,
          }}
        >
          {ayah.text}
        </p>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-dashed border-gray-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-gray-300 text-xs select-none">
              ✦
            </span>
          </div>
        </div>

        <p
          className="text-gray-500 leading-relaxed"
          style={{ fontSize: `${translationSize}px` }}
        >
          {ayah.translation}
        </p>
      </div>
    </article>
  );
}