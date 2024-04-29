import { StyleSheet, View } from "react-native";
import { Colors } from "./theme";
import { Endpoints } from "api/endpoints";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

function MainView(props: any) {
  return (
    <SafeAreaView>
      <View style={styles.main}>{props.children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.Gray1,
  },
});

export default MainView;
