import { Surah, SurahDetail, AyahWithTranslation } from '@/types';

const BASE_URL = 'https://api.alquran.cloud/v1';

const REVALIDATE = 86_400;

// Rate Limiting & Retry Configuration
const MAX_RETRIES = 5;             
const INITIAL_RETRY_DELAY = 1000;   
const MAX_RETRY_DELAY = 30000;      

let requestQueue: Promise<any> = Promise.resolve();
const DELAY_BETWEEN_REQUESTS = 300; // 300ms delay between requests

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<Response> {
  try {
    const res = await fetch(url, options);

   
    if (res.status === 429) {
      if (retryCount >= MAX_RETRIES) {
        throw new Error(`Rate limit exceeded after ${MAX_RETRIES} retries`);
      }

      // Calculate exponential backoff: 1s, 2s, 4s, 8s, 16s, 30s
      const delay = Math.min(
        INITIAL_RETRY_DELAY * Math.pow(2, retryCount),
        MAX_RETRY_DELAY
      );

      console.log(
        `Rate limited. Retrying in ${delay}ms... (attempt ${retryCount + 1}/${MAX_RETRIES})`
      );

      await sleep(delay);
      return fetchWithRetry(url, options, retryCount + 1);
    }

    if (!res.ok && retryCount < 2) {
      await sleep(INITIAL_RETRY_DELAY);
      return fetchWithRetry(url, options, retryCount + 1);
    }

    return res;
  } catch (error) {

    if (retryCount < MAX_RETRIES) {
      const delay = Math.min(
        INITIAL_RETRY_DELAY * Math.pow(2, retryCount),
        MAX_RETRY_DELAY
      );
      
      console.log(
        `Network error. Retrying in ${delay}ms... (attempt ${retryCount + 1}/${MAX_RETRIES})`
      );
      
      await sleep(delay);
      return fetchWithRetry(url, options, retryCount + 1);
    }
    
    throw error;
  }
}

async function throttledFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {

  const currentRequest = requestQueue.then(async () => {
    await sleep(DELAY_BETWEEN_REQUESTS);
    return fetchWithRetry(url, options);
  });

  // Update the queue
  requestQueue = currentRequest.catch(() => {}); 

  return currentRequest;
}

export async function getAllSurahs(): Promise<Surah[]> {
  const res = await fetchWithRetry(`${BASE_URL}/surah`, {
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


  const res = await throttledFetch(url, {
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