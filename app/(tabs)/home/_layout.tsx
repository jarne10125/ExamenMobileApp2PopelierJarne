import React from "react";
import { Stack } from "expo-router";
import { useThemeColors } from "../../../src/components/Themed";

export default function HomeStackLayout() {
  const c = useThemeColors();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: c.bg },
        headerTitleStyle: { color: c.text },
        headerTintColor: c.text,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Products" }} />
      <Stack.Screen name="[id]" options={{ title: "Product Detail" }} />
    </Stack>
  );
}
