import { FlashList } from "@shopify/flash-list";
import React, { ReactElement, ReactNode, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  PixelRatio,
} from "react-native";
import { IndoPakText } from "types/IndoPakText";
import {
  QuranText,
  calculateWordsThatFit,
  convertToArabicNumber,
  maxWordsIneachPage,
} from "utility/text";
import { Colors, TextStyles, userSelectedFontSize } from "./theme";
import { RubElHizbType, VerseType, WordType } from "types/rub_el_hiz";
import Header from "@assets/chapter_header.svg";
import Bismillah from "@assets/bismillah.svg";
import Verse from "./verse";
import { DataContext } from "hooks/useAPI";
import { ChaptersType } from "types/chapters";

interface QuranData {
  [key: string]: IndoPakText[];
}

const QuranPages: React.FC<{ data: VerseType[] }> = ({ data }) => {
  // Step 3: Render pages using FlatList
  // const renderItem = ({ item }: { item: string }) => (
  //   <Text
  //     style={{
  //       flexWrap: "wrap",
  //       fontFamily: "IndoPak",
  //       fontSize: userSelectedFontSize,
  //       ...styles.page,
  //     }}
  //     ellipsizeMode="tail"
  //     numberOfLines={Math.floor(Dimensions.get("window").height / lineHeight)}
  //   >
  //     {item}
  //   </Text>
  // );

  const { chapters } = useContext(DataContext);
  const getChapterInfo = (chapter_id: number) =>
    chapters.find((chapter) => chapter.id === chapter_id);

  const SurahStart = ({ chapter }: { chapter: ChaptersType | undefined }) => {
    console.log(chapter);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Header />
          <View style={styles.headerInfo}>
            <Text style={[styles.revelation_place, TextStyles.f50010]}>
              {chapter?.revelation_place === "madinah" ? "Madani" : "Makki"}
            </Text>
            <Text style={[styles.surahName]}>
              {"سُوْرَ" + " " + chapter?.name_arabic}
            </Text>
            <Text style={[styles.revelation_place, TextStyles.f50010]}>
              V:{chapter?.verses_count}
            </Text>
          </View>
        </View>
        {chapter?.bismillah_pre ? (
          <Bismillah style={{ marginTop: 30, marginBottom: 15 }} />
        ) : (
          <View style={{ marginTop: 30, marginBottom: 15 }} />
        )}
      </View>
    );
  };

  const lineWords = data.reduce(
    (prev: Record<string, WordType[] | VerseType>, cverse: VerseType) => {
      const [chapter, verse_] = cverse.verse_key.split(":");
      if (verse_ === "1") {
        prev[chapter + ":" + verse_] = cverse; // Store the verse object for the first verse of each chapter
      }
      cverse.words.forEach((word: WordType) => {
        if (!prev[word.line_number]) {
          prev[word.line_number] = []; // Initialize the array if it doesn't exist
        }
        (prev[word.line_number] as WordType[]).push(word); // Push word to the array for the respective line number
      });
      return prev;
    },
    {} // Use an empty object as the initial value
  );

  console.log("lineWords", lineWords, data);
  // const lines = Object.keys(lineWords).map((line: string) => {
  //   return lineWords[line].map((word) => {});
  // });

  const headersDisplayed: string[] = [];
  const lines = Object.keys(lineWords).reduce(
    (elements: ReactElement[], line: string) => {
      if (Object.hasOwn(lineWords[line], "id")) {
        return elements;
      }
      const words = lineWords[line] as WordType[];

      const [chapter, verse_] = words[0].verse_key.split(":");
      //console.log(words);

      const suranInitialized = (chapter: string) => {
        if (headersDisplayed.includes(chapter)) return true;
        headersDisplayed.push(chapter);
        return false;
      };
      const lineContent = (
        <View key={line} style={styles.lineParent}>
          {verse_ === "1" && !suranInitialized(chapter) ? (
            <SurahStart
              chapter={getChapterInfo(parseInt(chapter))}
              key={`${chapter}:${verse_}`}
            />
          ) : null}
          {words.length ? (
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              allowFontScaling
              style={[styles.line, TextStyles.f700U]}
            >
              {words.map((word) => {
                return word.text_uthmani + " ";
              })}
            </Text>
          ) : null}
        </View>
      );
      return [...elements, lineContent];
    },
    []
  );

  return <View style={{ flex: 1 }}>{lines}</View>;
};

const styles = StyleSheet.create({
  page: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 30,
    paddingHorizontal: 25,
    paddingBottom: 15,
  },
  line: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 25,
    color: Colors.Black01,
    fontFamily: "Uthmani",
  },
  lineParent: { marginBottom: 15 },
  headerInfo: {
    flexDirection: "row",
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: 34,
    paddingHorizontal: 45,
    width: "100%",
  },
  surahName: {
    ...TextStyles.f70016,
    flex: 1,
    textAlign: "center",
    color: Colors.Black01,
  },
  revelation_place: {
    backgroundColor: Colors.DarkRed,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 30,
    color: "white",
    width: 45,
  },
});

export default QuranPages;
