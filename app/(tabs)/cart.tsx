import React from "react";
import { FlatList, Image, Pressable, View } from "react-native";
import { ThemedCard, ThemedText, ThemedView, useThemeColors } from "../../src/components/Themed";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { selectCartItemsArray, selectSubtotal, selectTotalItems } from "../../src/store/selectors";
import { decrementQty, incrementQty, removeItem } from "../../src/store/cartSlice";
import { QuantityStepper } from "../../src/components/QuantityStepper";
import { eur } from "../../src/utils/money";

export default function CartScreen() {
  const c = useThemeColors();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItemsArray);
  const totalItems = useAppSelector(selectTotalItems);
  const subtotal = useAppSelector(selectSubtotal);

  if (items.length === 0) {
    return (
      <ThemedView style={{ padding: 16 }}>
        <ThemedText style={{ fontSize: 18, fontWeight: "900" }}>Your cart is empty</ThemedText>
        <ThemedText style={{ color: c.muted, marginTop: 8 }}>
          Add a product from the detail screen.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ padding: 16, gap: 12 }}>
      <ThemedCard>
        <ThemedText style={{ fontWeight: "900", fontSize: 16 }}>Items: {totalItems}</ThemedText>
        <ThemedText style={{ marginTop: 6, fontWeight: "900", fontSize: 18 }}>
          Subtotal: {eur(subtotal)}
        </ThemedText>
      </ThemedCard>

      <FlatList
        data={items}
        keyExtractor={(it) => String(it.id)}
        renderItem={({ item }) => (
          <ThemedCard style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
              <Image source={{ uri: item.thumbnail }} style={{ width: 64, height: 64, borderRadius: 12 }} />
              <View style={{ flex: 1 }}>
                <ThemedText style={{ fontWeight: "800" }} numberOfLines={1}>
                  {item.title}
                </ThemedText>
                <ThemedText style={{ color: c.muted, marginTop: 4 }}>{eur(item.price)} each</ThemedText>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <QuantityStepper
                    value={item.quantity}
                    onMinus={() => dispatch(decrementQty(item.id))}
                    onPlus={() => dispatch(incrementQty(item.id))}
                  />
                  <Pressable onPress={() => dispatch(removeItem(item.id))}>
                    <ThemedText style={{ color: c.primary, fontWeight: "900" }}>Remove</ThemedText>
                  </Pressable>
                </View>
              </View>
            </View>
          </ThemedCard>
        )}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}
