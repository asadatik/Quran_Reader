import { Metadata } from 'next';
import { getAllSurahs, getSurahDetail } from '@/lib/api';

import { notFound } from 'next/navigation';
import SurahPageClient from '@/components/SurahPageClient';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const surahs = await getAllSurahs();
  return surahs.map((surah) => ({
    id: String(surah.number),
  }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const surah = await getSurahDetail(params.id);
    return {
      title: `${surah.englishName} — Al-Quran`,
      description: `Surah ${surah.englishName} (${surah.englishNameTranslation}). Read ${surah.numberOfAyahs} verses with Arabic text and English translation.`,
    };
  } catch {
    return {
      title: 'Surah Not Found — Al-Quran',
    };
  }
}


export default async function SurahPage({ params }: Props) {
  const id = parseInt(params.id, 10);


  if (isNaN(id) || id < 1 || id > 114) {
    notFound();
  }

  let surah;
  try {
    surah = await getSurahDetail(id);
  } catch (err) {
    console.error(`Failed to load surah ${id}:`, err);
    notFound();
  }

  return <SurahPageClient surah={surah} />;
}