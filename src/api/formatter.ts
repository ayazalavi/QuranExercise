import { ChaptersType } from "types/chapters";
import { Endpoints } from "./endpoints";
import { IndoPakText } from "types/IndoPakText";
import { RubElHizbType, VerseType } from "types/rub_el_hiz";

export function formatChaptersDataFromAPI(data: any): ChaptersType[] {
  return data.chapters as ChaptersType[];
}

export function formatJuzsDataFromAPI(data: any[]): RubElHizbType[] {
  for (let i = 0; i < 30; i++) {
    data.splice(i * 8 + i, 0, i + 1 + ":" + data[i * 8 + i].page_number);
  }
  return data as RubElHizbType[];
}

export function formatIndoPakQuranVerses(data: any): VerseType[] {
  return data.verses as VerseType[];
}
export function getFormatterFor(endpoint: Endpoints): (data: any) => any {
  switch (endpoint) {
    case Endpoints.CHAPTERS: {
      return formatChaptersDataFromAPI;
    }
    case Endpoints.JUZZ: {
      return formatJuzsDataFromAPI;
    }
    default:
      return formatIndoPakQuranVerses;
  }
}
