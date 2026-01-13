import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { hydrateCart } from "../store/cartSlice";
import { setTheme } from "../store/themeSlice";
import { loadCart, loadTheme, saveCart, saveTheme } from "./storage";

export function useHydrateAndPersist() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((s) => s.cart);
  const mode = useAppSelector((s) => s.theme.mode);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      const [savedCart, savedTheme] = await Promise.all([loadCart(), loadTheme()]);
      if (savedCart) dispatch(hydrateCart(savedCart));
      if (savedTheme) dispatch(setTheme(savedTheme));
      setHydrated(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;
    saveCart(cart).catch(() => {});
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveTheme(mode).catch(() => {});
  }, [mode, hydrated]);

  return hydrated;
}
