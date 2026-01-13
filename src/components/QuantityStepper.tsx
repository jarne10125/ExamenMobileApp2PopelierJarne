import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText, useThemeColors } from "./Themed";

export function QuantityStepper({
  value,
  onMinus,
  onPlus,
}: {
  value: number;
  onMinus: () => void;
  onPlus: () => void;
}) {
  const c = useThemeColors();

  return (
    <View style={styles.row}>
      <Pressable style={[styles.btn, { borderColor: c.border }]} onPress={onMinus}>
        <ThemedText style={styles.btnText}>−</ThemedText>
      </Pressable>
      <ThemedText style={styles.qty}>{value}</ThemedText>
      <Pressable style={[styles.btn, { borderColor: c.border }]} onPress={onPlus}>
        <ThemedText style={styles.btnText}>+</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  btn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { fontSize: 18, fontWeight: "800" },
  qty: { minWidth: 24, textAlign: "center", fontSize: 16, fontWeight: "800" },
});
