import { TextStyle } from "react-native";

export enum Colors {
  DarkRed = "#5E2A2B",
  Black01 = "#040813",
  Gray1 = "#ECECEE",
  Gray2 = "#9B9CA1",
}

export enum Radius {
  r10 = 10,
}

export const TextStyles: Record<"f50016" | "f50012" | "f50014", TextStyle> = {
  f50016: {
    fontFamily: "IndoPak",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  f50012: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  f50014: {
    fontSize: 14,
    fontWeight: "500",
  },
};

export let userSelectedFontSize = 40;
