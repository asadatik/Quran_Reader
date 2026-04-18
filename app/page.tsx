import { getAllSurahs } from '@/lib/api';
import SurahListClient from '@/components/SurahListClient';

// ISR regenerate at most once every 24 hours
export const revalidate = 86400;

export default async function HomePage() {
  const surahs = await getAllSurahs();

  return <SurahListClient surahs={surahs} />;
}
