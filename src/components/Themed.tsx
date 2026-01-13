import React from "react";
import { View, Text, ViewProps, TextProps } from "react-native";
import { useAppSelector } from "../store/hooks";
import { colors } from "../theme/colors";

export function ThemedView(props: ViewProps) {
  const mode = useAppSelector((s) => s.theme.mode);
  return (
    <View {...props} style={[{ backgroundColor: colors[mode].bg, flex: 1 }, props.style]} />
  );
}

export function ThemedCard(props: ViewProps) {
  const mode = useAppSelector((s) => s.theme.mode);
  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: colors[mode].card,
          borderColor: colors[mode].border,
          borderWidth: 1,
          borderRadius: 16,
          padding: 12,
        },
        props.style,
      ]}
    />
  );
}

export function ThemedText(props: TextProps) {
  const mode = useAppSelector((s) => s.theme.mode);
  return <Text {...props} style={[{ color: colors[mode].text }, props.style]} />;
}

export function useThemeColors() {
  const mode = useAppSelector((s) => s.theme.mode);
  return colors[mode];
}
