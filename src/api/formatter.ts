import { ChaptersType } from "types/chapters";
import { Endpoints } from "./endpoints";
import { IndoPakText } from "types/IndoPakText";

export function formatChaptersDataFromAPI(data: any): ChaptersType[] {
  return data.chapters as ChaptersType[];
}

export function formatIndoPakQuranVerses(data: any): IndoPakText[] {
  return data.verses as IndoPakText[];
}
export function getFormatterFor(endpoint: Endpoints): (data: any) => any {
  switch (endpoint) {
    case Endpoints.CHAPTERS: {
      return formatChaptersDataFromAPI;
    }
    case Endpoints.JUZZ: {
      return formatChaptersDataFromAPI;
    }
    default:
      return formatIndoPakQuranVerses;
  }
}
