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

export let userSelectedFontSize = 26;

export const TextStyles: Record<
  | "f50016"
  | "f50012"
  | "f50014"
  | "f700U"
  | "f56010"
  | "f70016"
  | "f50010"
  | "f60014"
  | "f70014",
  TextStyle
> = {
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
  f56010: {
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  f60014: {
    fontSize: 14,
    fontWeight: "600",
  },
  f70014: {
    fontSize: 14,
    fontWeight: "700",
  },
  f50010: {
    fontSize: 10,
    fontWeight: "500",
    textAlign: "center",
  },
  f70016: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  f50014: {
    fontSize: 14,
    fontWeight: "500",
  },
  f700U: {
    fontSize: userSelectedFontSize,
    fontWeight: "700",
    fontFamily: "Uthmani",
  },
};
