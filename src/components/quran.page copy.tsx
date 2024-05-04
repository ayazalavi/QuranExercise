import { FlashList } from "@shopify/flash-list";
import React from "react";
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
import { userSelectedFontSize } from "./theme";
import { RubElHizbType } from "types/rub_el_hiz";

interface QuranData {
  [key: string]: IndoPakText[];
}

const QuranPages: React.FC<{ data: RubElHizbType[] }> = ({}) => {
  const maxWordsPerPage = maxWordsIneachPage(1, 0);
  const pages: string[] = [];
  let remianingText = QuranText;
  const lineHeight = userSelectedFontSize * 2.1;

  console.log(
    "PixelRatio",
    PixelRatio.getPixelSizeForLayoutSize(1),
    PixelRatio.getFontScale()
  );
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
