"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "@/data/products";
import { lineKey, MAX_QTY } from "@/lib/cart";

const CartContext = createContext(null);
const STORAGE = "sabi-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE) || "[]");
      if (Array.isArray(saved)) setItems(saved.filter((i) => getProduct(i.slug)));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE, JSON.stringify(items));
  }, [items, ready]);

  const add = useCallback((item) => {
    setItems((list) => {
      const key = lineKey(item);
      const found = list.find((i) => lineKey(i) === key);
      if (found) return list.map((i) => (lineKey(i) === key ? { ...i, qty: Math.min(MAX_QTY, i.qty + item.qty) } : i));
      return [...list, item];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((key, qty) => {
    setItems((list) => (qty < 1 ? list.filter((i) => lineKey(i) !== key) : list.map((i) => (lineKey(i) === key ? { ...i, qty: Math.min(MAX_QTY, qty) } : i))));
  }, []);

  const remove = useCallback((key) => setItems((list) => list.filter((i) => lineKey(i) !== key)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const lines = items.map((i) => ({ ...i, key: lineKey(i), product: getProduct(i.slug) })).filter((l) => l.product);
    return {
      items,
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.product.price * l.qty, 0),
      ready,
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
    };
  }, [items, ready, open, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
