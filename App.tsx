import { useFonts } from "expo-font";
import { DataContext } from "hooks/useAPI";
import AppNavigation from "navigation/index";
import React, { useState } from "react";
import { ChaptersType } from "types/chapters";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    IndoPak: require("./assets/fonts/IndoPak.ttf"),
    Uthmani: require("./assets/fonts/Uthmani.ttf"),
  });

  const [chapters, setChapters] = useState<ChaptersType[]>([]);
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <DataContext.Provider value={{ chapters, setChapters }}>
      <AppNavigation />
    </DataContext.Provider>
  );
}
