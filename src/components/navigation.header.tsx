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

type NavigationheaderType = {
  chapter: ChaptersType;
  page: number;
  hiz: number;
  juz: number;
  surah: number;
};
function NavigationHeader(props: NavigationheaderType) {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const onPress = () => {
    nav.goBack();
  };
  return (
    <Pressable onPress={onPress} style={styles.main}>
      <View style={styles.mainView}>
        <Back color="black" />
        <View style={styles.centerTextView}>
          <Text style={styles.chapterName}>
            {`${props.chapter.id}. ${props.chapter.translated_name.name} (${props.chapter.name_simple}) `}
            <Text style={styles.chapterNameArabic}>
              {props.chapter.name_arabic}
            </Text>
          </Text>
          <Text style={styles.chapeterDetails}>
            Page {props.page}, Hizb {props.hiz}, Juz {props.juz}, Surah{" "}
            {props.surah}
          </Text>
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
    shadowColor: "#F4F4F4",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.7,
    shadowRadius: 0,
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
    flexDirection: "column",
  },
  buttonText: {
    ...TextStyles.f50012,
    color: "white",
    position: "absolute",
  },
  chapterName: {
    ...TextStyles.f60014,
    color: "black",
  },
  chapterNameArabic: {
    ...TextStyles.f70014,
    color: Colors.Black01,
    fontFamily: "IndoPak",
  },
  chapeterDetails: {
    ...TextStyles.f50012,
    color: Colors.Black01,
    textAlign: "left",
    marginTop: 4,
  },
  space: {
    marginBottom: 0,
  },
});

export default NavigationHeader;
