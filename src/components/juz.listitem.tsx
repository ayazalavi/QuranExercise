import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "navigation";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Radius, TextStyles } from "./theme";
import { Endpoints } from "api/endpoints";
import React, { useState } from "react";
import { ChaptersType } from "types/chapters";
import Star from "@assets/star.svg";
import { useNavigation } from "@react-navigation/native";
import { Quran } from "hooks/useAPI";
import { RubElHizbType } from "types/rub_el_hiz";
import { generateNumbering } from "utility/text";

function JuzListItem(props: {
  item: string | RubElHizbType;
  chapter: ChaptersType | undefined;
}) {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const onPress = (page: number) => {
    nav.push("Reader", { page });
  };

  return typeof props.item === "string" ? (
    <View style={styles.juz}>
      <Text style={styles.juzTitle}>Juz {props.item.split(":")[0]}</Text>
      <Text style={styles.juzTitle}>{props.item.split(":")[1]}</Text>
    </View>
  ) : (
    <Pressable
      onPress={() =>
        onPress((props.item as RubElHizbType).verse_details.verse.page_number)
      }
      style={styles.main}
    >
      <View style={styles.mainView}>
        <View style={styles.starView}>
          <Text style={styles.buttonText}>
            {generateNumbering(props.item.rub_el_hizb_number)}
          </Text>
        </View>
        <View style={styles.centerTextView}>
          <Text style={styles.space} numberOfLines={1}>
            {props.item.verse_details.verse.words.map((word, index) =>
              (props.item as RubElHizbType).rub_el_hizb_number === 1 ||
              index > 0
                ? word.text_uthmani + " "
                : word.text_uthmani.substring(1) + "  "
            )}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.chapterName}>
              {`${props.chapter?.name_simple}, Ayah (${props.item.verse_number}) `}
              {"   "}
            </Text>

            <Text style={styles.chapterName}>
              {props.item.verse_details.verse.page_number}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export function Separator() {
  return <View style={{ height: 12 }} />;
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginHorizontal: 16,
  },
  juz: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    marginHorizontal: 16,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  juzTitle: {
    fontSize: 12,
    fontWeight: "500",
  },
  mainView: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.Gray1,
    borderRadius: 10,
  },
  starView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.DarkRed,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  centerTextView: {
    maxWidth: "50%",

    justifyContent: "flex-end",
  },
  buttonText: {
    ...TextStyles.f50012,
    color: "white",
  },
  chapterName: {
    ...TextStyles.f50012,
    color: Colors.Gray2,
  },
  chapterNameArabic: {
    fontFamily: "IndoPak",
  },
  chapeterDetails: {
    ...TextStyles.f50012,
    color: Colors.Gray2,
  },
  space: {
    fontFamily: "IndoPak",
    fontWeight: "700",
    fontSize: 14,
    color: Colors.Black01,
    marginBottom: 7,
  },
});

export default JuzListItem;
