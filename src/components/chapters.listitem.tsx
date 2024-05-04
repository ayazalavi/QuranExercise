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

function ChaptersListItem(props: ChaptersType) {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const onPress = (page: number) => {
    nav.push("Reader", { page });
  };
  return (
    <Pressable onPress={() => onPress(props.pages[0])} style={styles.main}>
      <View style={styles.mainView}>
        <View style={styles.starView}>
          <Star color={Colors.DarkRed} />
          <Text style={styles.buttonText}>{props.id}</Text>
        </View>
        <View style={styles.centerTextView}>
          <Text style={styles.space}>
            <Text style={styles.chapterName}>
              {`${props.translated_name.name} (${props.name_simple}) `}
            </Text>
            <Text style={[styles.chapterName, styles.chapterNameArabic]}>
              {props.name_arabic}
            </Text>
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.chapeterDetails}>
              {`${props.revelation_place === "makkah" ? "Makki" : "Madani"}, ${
                props.verses_count
              } verses`}
            </Text>
            <Text style={styles.chapeterDetails}>
              pages {props.pages[0]}-{props.pages[1]}
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
    width: "100%",
    paddingLeft: 13,
    paddingRight: 19,
  },
  mainView: {
    width: "100%",
    justifyContent: "flex-start",
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
  },
  centerTextView: {
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    ...TextStyles.f50012,
    color: "white",
    position: "absolute",
  },
  chapterName: {
    ...TextStyles.f50014,
    color: Colors.Black01,
  },
  chapterNameArabic: {
    fontFamily: "IndoPak",
  },
  chapeterDetails: {
    ...TextStyles.f50012,
    color: Colors.Gray2,
  },
  space: {
    marginBottom: 0,
  },
});

export default ChaptersListItem;
