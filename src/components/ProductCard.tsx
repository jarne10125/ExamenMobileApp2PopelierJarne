import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import type { Product } from "../api/dummyjson";
import { ThemedCard, ThemedText, useThemeColors } from "./Themed";
import { eur } from "../utils/money";

export function ProductCard({ product, onPress }: { product: Product; onPress: () => void }) {
  const c = useThemeColors();

  return (
    <Pressable onPress={onPress} style={{ marginBottom: 12 }}>
      <ThemedCard>
        <View style={styles.row}>
          <Image source={{ uri: product.thumbnail }} style={styles.thumb} />
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.title} numberOfLines={1}>
              {product.title}
            </ThemedText>
            <ThemedText style={{ color: c.muted }} numberOfLines={2}>
              {product.description}
            </ThemedText>
            <ThemedText style={styles.price}>{eur(product.price)}</ThemedText>
          </View>
        </View>
      </ThemedCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 12, alignItems: "center" },
  thumb: { width: 72, height: 72, borderRadius: 12 },
  title: { fontSize: 16, fontWeight: "700" },
  price: { marginTop: 8, fontSize: 16, fontWeight: "800" },
});
