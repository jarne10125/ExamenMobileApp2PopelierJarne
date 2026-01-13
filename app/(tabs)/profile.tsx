import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { ThemedCard, ThemedText, ThemedView, useThemeColors } from "../../src/components/Themed";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { selectSubtotal, selectTotalItems } from "../../src/store/selectors";
import { toggleTheme } from "../../src/store/themeSlice";
import { eur } from "../../src/utils/money";

export default function ProfileScreen() {
  const c = useThemeColors();
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector(selectTotalItems);
  const subtotal = useAppSelector(selectSubtotal);
  const mode = useAppSelector((s) => s.theme.mode);

  return (
    <ThemedView style={{ padding: 16, gap: 12 }}>
      
      <ThemedText style={{ fontSize: 22, fontWeight: "900" }}>
        Jarne Popelier
      </ThemedText>
      <ThemedText style={{ color: c.muted }}>Profile & settings</ThemedText>

      <ThemedCard>
        <ThemedText style={{ fontWeight: "900", fontSize: 16 }}>Cart summary (cross-tab)</ThemedText>

        <ThemedText style={{ marginTop: 10 }}>
          Items: <ThemedText style={{ fontWeight: "900" }}>{totalItems}</ThemedText>
        </ThemedText>

        <ThemedText style={{ marginTop: 6 }}>
          Subtotal: <ThemedText style={{ fontWeight: "900" }}>{eur(subtotal)}</ThemedText>
        </ThemedText>

        <Pressable
          onPress={() => router.push("/(tabs)/cart")}
          style={{
            marginTop: 12,
            backgroundColor: c.primary,
            paddingVertical: 12,
            borderRadius: 16,
            alignItems: "center",
          }}
        >
          <ThemedText style={{ color: "white", fontWeight: "900" }}>Go to Cart</ThemedText>
        </Pressable>
      </ThemedCard>

      <ThemedCard>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <ThemedText style={{ fontWeight: "900", fontSize: 16 }}>Theme</ThemedText>
            <ThemedText style={{ color: c.muted, marginTop: 4 }}>Current: {mode}</ThemedText>
          </View>

          <Pressable
            onPress={() => dispatch(toggleTheme())}
            style={{
              borderWidth: 1,
              borderColor: c.border,
              backgroundColor: c.card,
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderRadius: 16,
            }}
          >
            <ThemedText style={{ fontWeight: "900" }}>Toggle</ThemedText>
          </Pressable>
        </View>
      </ThemedCard>
    </ThemedView>
  );
}
