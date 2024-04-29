import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "pages/home";
import ReaderPage from "pages/reader";
import React from "react";
import { ChaptersType } from "types/chapters";

export type RootStackParamList = {
  Home: undefined;
  Reader: {
    chapter_number?: number;
    juz_number?: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          statusBarHidden: false,
          statusBarColor: "white",
          statusBarStyle: "dark",
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Reader" component={ReaderPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
