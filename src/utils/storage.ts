import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CartState } from "../store/cartSlice";
import type { ThemeMode } from "../store/themeSlice";

const KEY_CART = "minishop_cart_v1";
const KEY_THEME = "minishop_theme_v1";

export async function saveCart(state: CartState) {
  await AsyncStorage.setItem(KEY_CART, JSON.stringify(state));
}

export async function loadCart(): Promise<CartState | null> {
  const raw = await AsyncStorage.getItem(KEY_CART);
  return raw ? (JSON.parse(raw) as CartState) : null;
}

export async function saveTheme(mode: ThemeMode) {
  await AsyncStorage.setItem(KEY_THEME, mode);
}

export async function loadTheme(): Promise<ThemeMode | null> {
  const raw = await AsyncStorage.getItem(KEY_THEME);
  return raw === "light" || raw === "dark" ? raw : null;
}
