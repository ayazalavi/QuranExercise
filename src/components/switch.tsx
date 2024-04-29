import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "navigation";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Radius, TextStyles } from "./theme";
import { Endpoints } from "api/endpoints";
import React, { useState } from "react";
type Props = {
  onChange: (endpoint: Endpoints) => void;
};

function Switch(props: Props) {
  const [selected, setSelected] = useState(Endpoints.CHAPTERS);
  const onPress = (type: Endpoints) => {
    props.onChange(type);
    setSelected(type);
  };
  return (
    <View style={styles.main}>
      <Pressable
        onPress={() => onPress(Endpoints.CHAPTERS)}
        style={
          selected !== Endpoints.CHAPTERS
            ? [styles.button]
            : [styles.button, styles.buttonSelected]
        }
      >
        <Text
          style={
            selected !== Endpoints.CHAPTERS
              ? [styles.buttonText]
              : [styles.buttonText, styles.buttonSelected]
          }
        >
          Surah
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onPress(Endpoints.JUZZ)}
        style={
          selected !== Endpoints.JUZZ
            ? [styles.button]
            : [styles.button, styles.buttonSelected]
        }
      >
        <Text
          style={
            selected !== Endpoints.JUZZ
              ? [styles.buttonText]
              : [styles.buttonText, styles.buttonSelected]
          }
        >
          Juz
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 15,
  },
  button: {
    width: 80,
    height: 40,
    color: Colors.Black01,
    backgroundColor: "white",
    borderRadius: Radius.r10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  buttonSelected: {
    color: "white",
    backgroundColor: Colors.DarkRed,
  },
  buttonText: {
    ...TextStyles.f50016,
  },
});

export default Switch;
