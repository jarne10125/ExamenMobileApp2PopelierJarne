import React, { useState } from "react";
import { FlatList, TextInput, View, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../src/api/dummyjson";
import { ProductCard } from "../../../src/components/ProductCard";
import { ThemedView, ThemedText, useThemeColors } from "../../../src/components/Themed";
import { router } from "expo-router";

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);

  return debounced;
}

export default function ProductListScreen() {
  const c = useThemeColors();
  const [q, setQ] = useState("");
  const dq = useDebouncedValue(q, 400);

  const query = useQuery({
    queryKey: ["products", dq],
    queryFn: () => fetchProducts(dq),
  });

  const products = query.data?.products ?? [];
  const empty = query.isSuccess && products.length === 0;

  return (
    <ThemedView style={{ padding: 16, gap: 12 }}>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search products..."
        placeholderTextColor={c.muted}
        style={{
          borderWidth: 1,
          borderColor: c.border,
          backgroundColor: c.card,
          paddingHorizontal: 12,
          paddingVertical: 10,
          borderRadius: 14,
          color: c.text,
        }}
      />

      {query.isLoading && (
        <View style={{ paddingTop: 24, alignItems: "center" }}>
          <ActivityIndicator />
          <ThemedText style={{ marginTop: 10, color: c.muted }}>Loading products…</ThemedText>
        </View>
      )}

      {query.isError && (
        <View style={{ paddingTop: 24 }}>
          <ThemedText style={{ fontWeight: "800", fontSize: 16 }}>Something went wrong</ThemedText>
          <ThemedText style={{ color: c.muted, marginTop: 6 }}>
            {(query.error as Error).message}
          </ThemedText>
        </View>
      )}

      {empty && (
        <View style={{ paddingTop: 24 }}>
          <ThemedText style={{ fontWeight: "800", fontSize: 16 }}>No results</ThemedText>
          <ThemedText style={{ color: c.muted, marginTop: 6 }}>
            Try another search term.
          </ThemedText>
        </View>
      )}

      {query.isSuccess && products.length > 0 && (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/home/[id]",
                  params: { id: String(item.id) }, // typed param usage
                })
              }
            />
          )}
          refreshing={query.isRefetching}
          onRefresh={() => query.refetch()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}
