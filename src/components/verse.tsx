import React from "react";
import { Text, View } from "react-native";
import { IndoPakText } from "types/IndoPakText";

export default function Verse(props: IndoPakText) {
  return (
    <Text
      style={{
        fontFamily: "IndoPak",
        fontSize: 20,
        width: "100%",
        writingDirection: "rtl",
      }}
    >
      {props.text_indopak}
      {"   "}
      <Text
        style={{
          width: 10,
          fontFamily: "IndoPak",
        }}
      >
        {"\uF67C"}
        <Text
          style={{
            position: "absolute",
            fontFamily: "IndoPak",
            fontSize: 10,
          }}
        >
          {props.verse_key.split(":")[1]}
        </Text>
      </Text>{" "}
    </Text>
  );
}
