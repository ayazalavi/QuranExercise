import { fetchDataFor } from "api";
import { Endpoints } from "api/endpoints";
import { getFormatterFor } from "api/formatter";
import { userSelectedFontSize } from "components/theme";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { IndoPakAPIResponse, IndoPakText } from "types/IndoPakText";
import { ChaptersType } from "types/chapters";
import { downloadQuranIndopakByJuz, makePagesOfText } from "utility/text";

export let Quran: Record<string, IndoPakText[]> = {};

export function useAPI(
  endpoint: Endpoints,
  formatter: (data: any) => any,
  pathparams: string[] = [],
  queryparams: string[] = []
) {
  const [data, setData] = useState<any[]>([]);
  const [quranDownloaded, setQuranDownloaded] = useState(false);

  const [loading, setLoading] = useState(false);

  const startDownload = () => downloadQuranIndopakByJuz(setQuranDownloaded);

  useEffect(() => {
    if (quranDownloaded) {
      console.log("Quran", Quran);
      //   makePagesOfText();
    }
  }, [quranDownloaded]);

  useEffect(
    function () {
      setLoading(true);
      fetchDataFor(endpoint, pathparams, queryparams)
        .then((data_) => formatter(data_))
        .then(setData)
        .finally(() => setLoading(false));
    },
    [endpoint]
  );
  return { data, loading, startDownload, quranDownloaded };
}
