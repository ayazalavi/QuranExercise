import { fetchDataFor } from "api";
import { Endpoints } from "api/endpoints";
import { getFormatterFor } from "api/formatter";
import { userSelectedFontSize } from "components/theme";
import { createContext, useCallback, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { IndoPakAPIResponse, IndoPakText } from "types/IndoPakText";
import { ChaptersType } from "types/chapters";
import { RubElHizbType, VerseType } from "types/rub_el_hiz";
import {
  downloaRubElHizbAndDoFormat,
  downloadQuranIndopakByJuz,
  makePagesOfText,
} from "utility/text";

export let Quran: Record<string, IndoPakText[]> = {};
export const DataContext = createContext({
  chapters: [] as ChaptersType[],
  setChapters: (chapters: ChaptersType[]) => {},
});

export function useAPI(
  endpoint: Endpoints,
  formatter: (data: any) => any,
  pathparams: string[] = [],
  queryparams: string[] = []
) {
  const [data, setData] = useState<any[]>([]);
  const [rubElHizb, setRubElHizbs] = useState<RubElHizbType[]>([]);
  const [chapters, setChapters] = useState<ChaptersType[]>([]);
  const [verses, setVerses] = useState<VerseType[]>([]);

  const [quranDownloaded, setQuranDownloaded] = useState(false);
  const [rubelHizDownloaded, setRubelHizDownloaded] = useState(false);

  const [loading, setLoading] = useState(false);

  const startDownloadQuran = () =>
    downloadQuranIndopakByJuz(setQuranDownloaded);
  const startDownloadRubElHizb = () => {
    downloaRubElHizbAndDoFormat(setRubelHizDownloaded)
      .then((data_) => getFormatterFor(Endpoints.JUZZ)(data_))
      .then(setRubElHizbs);
  };

  const startDownloadPage = () => {
    setLoading(true);
    fetchDataFor(Endpoints.VERSES_BYPAGE, pathparams, [
      "words=true&translations=131&word_fields=text_uthmani,text_indopak,code_v1,v1_page,verse_id,verse_key",
    ])
      .then((data_) => formatter(data_))
      .then(setVerses)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (quranDownloaded) {
      console.log("Quran", Quran);
      //   makePagesOfText();
    }
  }, [quranDownloaded]);

  const fetchChapters = useCallback(
    function () {
      setLoading(true);
      fetchDataFor(Endpoints.CHAPTERS, pathparams, queryparams)
        .then((data_) => formatter(data_))
        .then(setChapters)
        .finally(() => setLoading(false));
    },
    [endpoint]
  );
  return {
    data:
      endpoint === Endpoints.CHAPTERS
        ? chapters
        : endpoint === Endpoints.VERSES_BYPAGE
        ? verses
        : rubElHizb,
    loading,
    startDownload: startDownloadQuran,
    quranDownloaded,
    startDownloadRubElHizb,
    fetchChapters,
    rubelHizDownloaded,
    chapters,
    startDownloadPage,
  };
}
