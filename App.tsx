import { useFonts } from "expo-font";
import AppNavigation from "navigation/index";
import React from "react";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    IndoPak: require("./assets/fonts/IndoPak.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <AppNavigation />;
}
