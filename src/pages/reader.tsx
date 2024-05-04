import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Endpoints } from "api/endpoints";
import { getFormatterFor } from "api/formatter";
import NavigationHeader from "components/navigation.header";
import Verse from "components/verse";
import { DataContext, Quran, useAPI } from "hooks/useAPI";
import { RootStackParamList } from "navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ChapterHeader from "@assets/chapter_header.svg";
import QuranPage from "components/quran.page";
import { RubElHizbType, VerseType } from "types/rub_el_hiz";
import PageFooter from "components/page.footer";
type Props = NativeStackScreenProps<RootStackParamList, "Reader">;
import GestureRecognizer from "react-native-swipe-gestures";
import { Juz } from "utility/text";

function ReaderPage(props: Props) {
  const [page, setPage] = useState(props.route.params.page);
  const {
    data,
    loading,
    fetchChapters,
    rubelHizDownloaded,
    startDownloadRubElHizb,
    startDownloadPage,
  } = useAPI(
    Endpoints.VERSES_BYPAGE,
    getFormatterFor(Endpoints.VERSES_BYPAGE),
    [`${page}`]
  );

  console.log("page", data);
  useEffect(() => {
    startDownloadPage();
  }, [page]);

  const { chapters } = useContext(DataContext);
  const getChapterInfo = useCallback(
    (verse: VerseType) => {
      const [chapter] = verse.verse_key.split(":");
      const chapterDetails = chapters.find((chap) => `${chap.id}` === chapter);
      return {
        chapter: chapterDetails || chapters[0],
        page: verse.page_number,
        hiz: verse.hizb_number,
        juz: verse.juz_number,
        surah: parseInt(chapter),
      };
    },
    [chapters]
  );
  useEffect(() => {
    if (data.length) {
      props.navigation.setOptions({
        headerShown: true,
        header: () => (
          <NavigationHeader {...getChapterInfo(data[0] as VerseType)} />
        ),
      });
    }
  }, [data]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <GestureRecognizer
        onSwipeLeft={(state) => setPage((p) => (p > 1 ? p - 1 : p))}
        onSwipeRight={(state) => setPage((p) => (p < 604 ? p + 1 : p))}
        style={{
          flex: 1,
        }}
      >
        <QuranPage data={data as VerseType[]} />
        <PageFooter page={page} />
      </GestureRecognizer>
    </ScrollView>
  );
}

export default ReaderPage;
