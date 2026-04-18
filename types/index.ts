
export interface Surah {
  number: number;
  name: string;                     
  englishName: string;            
  englishNameTranslation: string;    
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
  number: number;          
  text: string;          
  numberInSurah: number;  
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
 sajda: false | { id: number; recommended: boolean; obligatory: boolean };
}

export interface AyahWithTranslation extends Ayah {
  translation: string;
}

export interface SurahDetail extends Surah {
  ayahs: AyahWithTranslation[];
}



export type ArabicFont = 'Amiri' | 'Lateef';

export interface Settings {
  arabicFont: ArabicFont;
  arabicFontSize: number;    
  translationFontSize: number; 
}