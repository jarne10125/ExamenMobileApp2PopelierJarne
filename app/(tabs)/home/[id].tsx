import React from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../../src/api/dummyjson";
import { ThemedCard, ThemedText, ThemedView, useThemeColors } from "../../../src/components/Themed";
import { eur } from "../../../src/utils/money";
import { useAppDispatch } from "../../../src/store/hooks";
import { addToCart } from "../../../src/store/cartSlice";

export default function ProductDetailScreen() {
  const c = useThemeColors();
  const dispatch = useAppDispatch();

  const params = useLocalSearchParams<{ id: string }>(); // typed params
  const idNum = Number(params.id);

  const query = useQuery({
    queryKey: ["product", idNum],
    queryFn: () => fetchProductById(idNum),
    enabled: Number.isFinite(idNum),
  });

  if (!Number.isFinite(idNum)) {
    return (
      <ThemedView style={{ padding: 16 }}>
        <ThemedText style={{ fontWeight: "800" }}>Invalid product id</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ padding: 16 }}>
      {query.isLoading && (
        <View style={{ paddingTop: 24, alignItems: "center" }}>
          <ActivityIndicator />
          <ThemedText style={{ marginTop: 10, color: c.muted }}>Loading detail…</ThemedText>
        </View>
      )}

      {query.isError && (
        <View style={{ paddingTop: 24 }}>
          <ThemedText style={{ fontWeight: "800", fontSize: 16 }}>Failed to load product</ThemedText>
          <ThemedText style={{ color: c.muted, marginTop: 6 }}>
            {(query.error as Error).message}
          </ThemedText>
        </View>
      )}

      {query.isSuccess && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
          <Image source={{ uri: query.data.thumbnail }} style={{ width: "100%", height: 220, borderRadius: 18 }} />

          <ThemedText style={{ fontSize: 22, fontWeight: "900" }}>{query.data.title}</ThemedText>
          <ThemedText style={{ color: c.muted }}>{query.data.description}</ThemedText>

          <ThemedCard>
            <ThemedText style={{ fontSize: 18, fontWeight: "900" }}>{eur(query.data.price)}</ThemedText>
            <ThemedText style={{ color: c.muted, marginTop: 6 }}>
              Rating: {query.data.rating.toFixed(1)}
            </ThemedText>
          </ThemedCard>

          <Pressable
            onPress={() => dispatch(addToCart(query.data))}
            style={{ backgroundColor: c.primary, paddingVertical: 14, borderRadius: 16, alignItems: "center" }}
          >
            <ThemedText style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
              Add to Cart
            </ThemedText>
          </Pressable>
        </ScrollView>
      )}
    </ThemedView>
  );
}
