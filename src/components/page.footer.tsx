import React from "react";
import Page from "@assets/page.svg";
import { StyleSheet, Text, View } from "react-native";
import { Colors, TextStyles } from "./theme";

export default function PageFooter({ page }: { page: number }) {
  return (
    <View style={styles.main}>
      <Page />
      <Text style={styles.page}>{`${page}`}</Text>
      <Page
        style={{
          transform: [{ rotate: "180deg" }],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    marginHorizontal: 13,
    ...TextStyles.f56010,
    color: Colors.Black01,
  },
  main: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
