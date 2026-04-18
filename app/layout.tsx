import type { Metadata } from 'next';
import { Amiri, Lateef } from 'next/font/google';
import { SettingsProvider } from '@/context/SettingsContext';
import Navbar from '@/components/Navbar';
import './globals.css';


const amiri = Amiri({
  subsets:  ['arabic', 'latin'],
  weight:   ['400', '700'],
  variable: '--font-amiri',
  display:  'swap',
});

const lateef = Lateef({
  subsets:  ['arabic', 'latin'],
  weight:   ['400'],
  variable: '--font-lateef',
  display:  'swap',
});


export const metadata: Metadata = {
  title: {
    default:  'Al-Quran — Read & Reflect',
    template: '%s | Al-Quran',
  },
  description:
    'A beautiful, modern Quran reading application with full Arabic text, ' +
    'English translation, and customisable display settings.',
  keywords: ['Quran', 'Islamic', 'Arabic', 'Translation', 'Surah', 'Ayah'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
     
      <body className={`${amiri.variable} ${lateef.variable} min-h-screen`}>
        <SettingsProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </SettingsProvider>
      </body>
    </html>
  );
}