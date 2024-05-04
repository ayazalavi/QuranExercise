export type RubElHizbType = {
  id: number;
  verse_number: number;
  verse_key: string;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number: number;
  page_number: number;
  juz_number: number;
  verse_details: { verse: VerseType };
};

export type VerseType = {
  id: number;
  verse_number: number;
  verse_key: string;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number: number;
  chapter_id: number;
  page_number: number;
  juz_number: number;
  words: WordType[];
  translations: TranslationsType[];
};

export type TranslationsType = {
  id: number;
  resource_id: number;
  text: string;
};

export type WordType = {
  id: number;
  position: number;
  audio_url: string;
  char_type_name: string;
  text_uthmani: string;
  text_indopak: string;
  code_v1: string;
  v1_page: number;
  verse_id: number;
  verse_key: string;
  page_number: number;
  line_number: number;
  text: string;
  translation: TranslationType;
  transliteration: TranslationType;
};

export type TranslationType = {
  text: string;
  language_name: string;
};
