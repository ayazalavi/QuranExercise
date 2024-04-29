export type ChaptersType = {
  bismillah_pre: boolean;
  id: number;
  name_arabic: string;
  name_complex: string;
  name_simple: string;
  pages: [number, number];
  revelation_order: number;
  revelation_place: string;
  translated_name: { language_name: "english"; name: string };
  verses_count: number;
};
