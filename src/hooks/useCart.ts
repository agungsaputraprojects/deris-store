"use client";

import { useState, useEffect, useCallback } from "react";
import { CartItem, Product } from "@/types";
import { FREE_SHIPPING_MIN, SHIPPING_COST } from "@/constants";

const CART_STORAGE_KEY = "luxe_cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, product.stock),
              }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          product,
          quantity: Math.min(quantity, product.stock),
        },
      ];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id);
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.min(quantity, item.product.stock),
              }
            : item,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (productId: string) => items.some((item) => item.id === productId),
    [items],
  );

  const getItemQuantity = useCallback(
    (productId: string) =>
      items.find((item) => item.id === productId)?.quantity ?? 0,
    [items],
  );

  // Calculations
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalDiscount = items.reduce((sum, item) => {
    if (item.product.originalPrice) {
      return (
        sum + (item.product.originalPrice - item.product.price) * item.quantity
      );
    }
    return sum;
  }, 0);

  const shippingCost = subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_COST;

  const total = subtotal + shippingCost;

  return {
    items,
    itemCount,
    subtotal,
    totalDiscount,
    shippingCost,
    total,
    isLoaded,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };
}
