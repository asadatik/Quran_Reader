import { Surah, SurahDetail, AyahWithTranslation } from '@/types';

const BASE_URL = 'https://api.alquran.cloud/v1';

const REVALIDATE = 86_400;

export async function getAllSurahs(): Promise<Surah[]> {
  const res = await fetch(`${BASE_URL}/surah`, {
    next: { revalidate: REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch surah list (HTTP ${res.status}): ${res.statusText}`
    );
  }

  const json = await res.json();

  if (json.code !== 200) {
    throw new Error(`Al-Quran Cloud API error: ${json.status}`);
  }

  return json.data as Surah[];
}


export async function getSurahDetail(
  id: number | string
): Promise<SurahDetail> {

  const url = `${BASE_URL}/surah/${id}/editions/quran-uthmani,en.asad`;

  const res = await fetch(url, {
    next: { revalidate: REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch surah ${id} (HTTP ${res.status}): ${res.statusText}`
    );
  }

  const json = await res.json();

  if (json.code !== 200) {
    throw new Error(`Al-Quran Cloud API error for surah ${id}: ${json.status}`);
  }

  const [arabicEdition, englishEdition] = json.data;


  const ayahs: AyahWithTranslation[] = (arabicEdition.ayahs as Ayah[]).map(
    (ayah, index: number) => ({
      ...ayah,
      translation: englishEdition.ayahs[index]?.text ?? '',
    })
  );

  return {
    number:                 arabicEdition.number,
    name:                   arabicEdition.name,
    englishName:            arabicEdition.englishName,
    englishNameTranslation: arabicEdition.englishNameTranslation,
    revelationType:         arabicEdition.revelationType,
    numberOfAyahs:          arabicEdition.numberOfAyahs,
    ayahs,
  };
}

type Ayah = import('@/types').Ayah;