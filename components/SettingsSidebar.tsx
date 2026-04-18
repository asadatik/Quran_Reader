'use client';

import { X, Type, AlignLeft, RefreshCw } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { ArabicFont } from '@/types';


const FONT_OPTIONS: { label: string; value: ArabicFont; description: string }[] = [
  {
    label:       'Amiri',
    value:       'Amiri',
    description: 'Classical, manuscript-style',
  },
  {
    label:       'Lateef',
    value:       'Lateef',
    description: 'Modern, clear letterforms',
  },
];

const BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
const SAMPLE_EN = 'In the name of Allah, the Entirely Merciful, the Especially Merciful.';


export default function SettingsSidebar() {
  const {
    settings,
    isSettingsOpen,
    updateFont,
    updateArabicFontSize,
    updateTranslationFontSize,
    closeSettings,
    resetSettings,
  } = useSettings();

  if (!isSettingsOpen) return null;

  const fontVar =
    settings.arabicFont === 'Amiri' ? 'var(--font-amiri)' : 'var(--font-lateef)';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
        onClick={closeSettings}
        aria-hidden="true"
      />

      {/*  Panel  */}
      <aside
        className="sidebar-enter fixed right-0 top-0 h-full w-[320px] md:w-[360px] bg-white z-50
                   flex flex-col shadow-2xl border-l border-gray-100"
        role="complementary"
        aria-label="Display settings"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-emerald-900 text-white shrink-0">
          <div>
            <h2 className="font-semibold text-base">Display Settings</h2>
            <p className="text-emerald-400 text-xs mt-0.5">Persisted across sessions</p>
          </div>
          <button
            onClick={closeSettings}
            className="p-1.5 rounded-lg hover:bg-emerald-800 transition-colors"
            aria-label="Close settings panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-7">

          {/* Arabic Font */}
          <section>
            <SectionLabel icon={<Type className="w-4 h-4" />} title="Arabic Font" />
            <div className="space-y-2 mt-3">
              {FONT_OPTIONS.map((opt) => {
                const active = settings.arabicFont === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => updateFont(opt.value)}
                    className={`w-full rounded-xl border-2 px-4 py-3 flex items-center justify-between
                                transition-all text-left
                                ${active
                                  ? 'border-emerald-500 bg-emerald-50'
                                  : 'border-gray-200 bg-gray-50 hover:border-emerald-300'
                                }`}
                    aria-pressed={active}
                  >
                    {/* Left: meta */}
                    <div>
                      <p className={`text-sm font-semibold ${active ? 'text-emerald-800' : 'text-gray-700'}`}>
                        {opt.label}
                        {active && (
                          <span className="ml-2 text-xs text-emerald-500 font-normal">✓ active</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{opt.description}</p>
                    </div>
                    {/* Right: Arabic sample */}
                    <span
                      className="text-lg text-gray-800 shrink-0"
                      style={{
                        fontFamily: opt.value === 'Amiri' ? 'var(--font-amiri)' : 'var(--font-lateef)',
                        direction: 'rtl',
                      }}
                    >
                      اَلْفَاتِحَة
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <SectionLabel icon={<Type className="w-4 h-4" />} title="Arabic Font Size" />
              <Badge value={`${settings.arabicFontSize}px`} />
            </div>
            <input
              type="range"
              min={20}
              max={48}
              step={2}
              value={settings.arabicFontSize}
              onChange={(e) => updateArabicFontSize(Number(e.target.value))}
              className="w-full mt-3"
              aria-label="Arabic font size"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1 select-none">
              <span>Small (20px)</span>
              <span>Large (48px)</span>
            </div>

            {/* Live Arabic preview */}
            <div className="mt-3 p-4 bg-amber-50/60 border border-amber-100 rounded-xl text-right overflow-hidden">
              <p
                className="arabic-block text-gray-900 leading-loose"
                style={{ fontFamily: fontVar, fontSize: settings.arabicFontSize }}
              >
                {BISMILLAH}
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <SectionLabel icon={<AlignLeft className="w-4 h-4" />} title="Translation Size" />
              <Badge value={`${settings.translationFontSize}px`} />
            </div>
            <input
              type="range"
              min={12}
              max={24}
              step={1}
              value={settings.translationFontSize}
              onChange={(e) => updateTranslationFontSize(Number(e.target.value))}
              className="w-full mt-3"
              aria-label="Translation font size"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1 select-none">
              <span>Small (12px)</span>
              <span>Large (24px)</span>
            </div>

            {/* Live translation preview */}
            <div className="mt-3 p-4 bg-gray-50 border border-gray-100 rounded-xl overflow-hidden">
              <p
                className="text-gray-600 leading-relaxed"
                style={{ fontSize: settings.translationFontSize }}
              >
                {SAMPLE_EN}
              </p>
            </div>
          </section>

        </div>

        {/* Footer: Reset */}
        <div className="px-5 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={resetSettings}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4
                       border border-gray-200 rounded-xl text-sm text-gray-500
                       hover:bg-gray-50 hover:text-gray-700 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Reset to Defaults
          </button>
        </div>
      </aside>
    </>
  );
}


function SectionLabel({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 text-gray-500">
      {icon}
      <h3 className="text-xs font-semibold uppercase tracking-widest">{title}</h3>
    </div>
  );
}

function Badge({ value }: { value: string }) {
  return (
    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
      {value}
    </span>
  );
}