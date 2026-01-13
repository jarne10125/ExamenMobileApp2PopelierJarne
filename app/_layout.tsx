import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "../src/store";
import { useHydrateAndPersist } from "../src/utils/useHydrate";
import { ActivityIndicator, View } from "react-native";
import { useThemeColors } from "../src/components/Themed";

const queryClient = new QueryClient();

function Gate({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrateAndPersist();
  const c = useThemeColors();

  if (!hydrated) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: c.bg }}>
        <ActivityIndicator />
      </View>
    );
  }
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Gate>
          <Stack screenOptions={{ headerShown: false }} />
        </Gate>
      </QueryClientProvider>
    </Provider>
  );
}
