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
import Back from "@assets/back.svg";
import { useNavigation } from "@react-navigation/native";

function NavigationHeader(props: ChaptersType) {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const onPress = () => {
    nav.goBack();
  };
  return (
    <Pressable onPress={onPress} style={styles.main}>
      <View style={styles.mainView}>
        <Back color="black" />
        {/* <View style={styles.centerTextView}>
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
        </View> */}
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
  },
  mainView: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
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

export default NavigationHeader;
