"use client";

import { useState, useEffect, useCallback } from "react";

const WISHLIST_KEY = "luxe_wishlist";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(WISHLIST_KEY);
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch {
        setWishlist([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);

  const toggle = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist],
  );

  return {
    wishlist,
    toggle,
    isWishlisted,
    count: wishlist.length,
  };
}
