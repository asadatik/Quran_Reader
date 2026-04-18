'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { Settings, ArabicFont } from '@/types';

const STORAGE_KEY = 'quran-app-settings-v1';

const DEFAULT_SETTINGS: Settings = {
  arabicFont:          'Amiri',
  arabicFontSize:       30,
  translationFontSize:  16,
};

interface SettingsContextValue {
  settings:                  Settings;
  isReady:                   boolean;   
  isSettingsOpen:            boolean;
  updateFont:                (font: ArabicFont) => void;
  updateArabicFontSize:      (size: number) => void;
  updateTranslationFontSize: (size: number) => void;
  toggleSettings:            () => void;
  closeSettings:             () => void;
  resetSettings:             () => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined
);


export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings]           = useState<Settings>(DEFAULT_SETTINGS);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Settings>;
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
     
    } finally {
      setIsReady(true);
    }
  }, []);


  useEffect(() => {
    if (!isReady) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
     
    }
  }, [settings, isReady]);

  const updateFont = useCallback((font: ArabicFont) => {
    setSettings((prev) => ({ ...prev, arabicFont: font }));
  }, []);

  const updateArabicFontSize = useCallback((size: number) => {
    setSettings((prev) => ({ ...prev, arabicFontSize: size }));
  }, []);

  const updateTranslationFontSize = useCallback((size: number) => {
    setSettings((prev) => ({ ...prev, translationFontSize: size }));
  }, []);

  const toggleSettings  = useCallback(() => setSettingsOpen((v) => !v), []);
  const closeSettings   = useCallback(() => setSettingsOpen(false),     []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        isReady,
        isSettingsOpen,
        updateFont,
        updateArabicFontSize,
        updateTranslationFontSize,
        toggleSettings,
        closeSettings,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}


export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings() must be called inside <SettingsProvider>');
  }
  return ctx;
}