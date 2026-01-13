import React from "react";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { useThemeColors } from "../../src/components/Themed";
import { useAppSelector } from "../../src/store/hooks";
import { selectTotalItems } from "../../src/store/selectors";

function CartBadge() {
  const total = useAppSelector(selectTotalItems);
  const c = useThemeColors();
  if (total <= 0) return null;

  return (
    <View
      style={{
        marginLeft: 6,
        backgroundColor: c.primary,
        borderRadius: 999,
        paddingHorizontal: 8,
        paddingVertical: 2,
      }}
    >
      <Text style={{ color: "white", fontWeight: "800" }}>{total}</Text>
    </View>
  );
}

export default function TabsLayout() {
  const c = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: c.bg },
        headerTitleStyle: { color: c.text },
        tabBarStyle: { backgroundColor: c.bg, borderTopColor: c.border },
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.muted,
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarLabel: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: c.text }}>Cart</Text>
              <CartBadge />
            </View>
          ),
        }}
      />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
