import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Endpoints } from "api/endpoints";
import { getFormatterFor } from "api/formatter";
import NavigationHeader from "components/navigation.header";
import Verse from "components/verse";
import { Quran, useAPI } from "hooks/useAPI";
import { RootStackParamList } from "navigation";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import ChapterHeader from "@assets/chapter_header.svg";
import QuranPage from "components/quran.page";
type Props = NativeStackScreenProps<RootStackParamList, "Reader">;

function ReaderPage(props: Props) {
  console.log("Quran", Quran);
  useEffect(() => {
    props.navigation.setOptions({
      header: () => <NavigationHeader />,
      headerShown: true,
    });
  }, []);
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <QuranPage data={Quran} />
    </View>
  );
}

export default ReaderPage;
