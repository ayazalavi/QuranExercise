import { FlashList } from "@shopify/flash-list";
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { IndoPakText } from "types/IndoPakText";
import {
  calculateWordsThatFit,
  convertToArabicNumber,
  maxWordsIneachPage,
} from "utility/text";
import { userSelectedFontSize } from "./theme";

interface QuranData {
  [key: string]: IndoPakText[];
}

const QuranPages: React.FC<{ data: QuranData }> = ({ data }) => {
  // Step 1: Flatten the object and extract all text
  const allText = Object.values(data).reduce(
    (acc: string, verses: IndoPakText[]) => {
      const verseTexts = verses.map(
        (verse) =>
          verse.text_indopak +
          "    " +
          "\uF67C" +
          " " +
          convertToArabicNumber(verse.verse_key.split(":")[1])
      );
      return acc + verseTexts;
    },
    ""
  );

  // Step 2: Split text into pages
  const maxWordsPerPage = maxWordsIneachPage(1, 0); // Adjust as needed
  const pages: string[] = [];
  let remianingText = allText;
  const lineHeight = userSelectedFontSize * 2.1;

  while (remianingText.length) {
    const pagewords = calculateWordsThatFit(
      remianingText,
      userSelectedFontSize,
      lineHeight,
      Dimensions.get("window").width,
      Dimensions.get("window").height - 30
    );
    pages.push(pagewords);
    remianingText = remianingText.substring(pagewords.length);
  }

  console.log(Math.floor(Dimensions.get("window").height / 8));

  // Step 3: Render pages using FlatList
  const renderItem = ({ item }: { item: string }) => (
    <Text
      style={{
        flexWrap: "wrap",
        fontFamily: "IndoPak",
        fontSize: userSelectedFontSize,
        ...styles.page,
      }}
      ellipsizeMode="tail"
      numberOfLines={Math.floor(Dimensions.get("window").height / lineHeight)}
    >
      {item}
    </Text>
  );

  return (
    <FlashList
      data={pages}
      renderItem={renderItem}
      horizontal
      inverted // To render pages from right to left
      keyExtractor={(item, index) => index.toString()}
      pagingEnabled
      estimatedItemSize={411}
    />
  );
};

const styles = StyleSheet.create({
  page: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 30,
    paddingHorizontal: 25,
    paddingBottom: 15,
  },
});

export default QuranPages;
