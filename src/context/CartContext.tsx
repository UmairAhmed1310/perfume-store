"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";
import { Product } from "@/data/products";
import {
  getCart,
  addToCart as dbAddToCart,
  removeFromCart as dbRemoveFromCart,
  updateCartItemQuantity as dbUpdateQuantity,
  mergeGuestCart,
  type CartItemRow,
} from "@/app/cart/actions";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const LS_KEY = "cart";

function readLocalCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

function writeLocalCart(items: CartItem[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { data: session, status } = useSession();
  const mergedRef = useRef(false);
  const skipSyncRef = useRef(false); // prevents write→read loops

  // ---------------------------------------------------------------
  // 1. Hydrate from localStorage on mount
  // ---------------------------------------------------------------
  useEffect(() => {
    setCartItems(readLocalCart());
    setHydrated(true);
  }, []);

  // ---------------------------------------------------------------
  // 2. Sync cartItems → localStorage (skip during merge load)
  // ---------------------------------------------------------------
  useEffect(() => {
    if (!hydrated) return;
    if (skipSyncRef.current) return;
    writeLocalCart(cartItems);
  }, [cartItems, hydrated]);

  // ---------------------------------------------------------------
  // 3. On login: merge localStorage → DB, then load DB cart
  // ---------------------------------------------------------------
  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.id) return;
    if (mergedRef.current) return; // already merged this session
    mergedRef.current = true;

    const mergeAndLoad = async () => {
      const localItems = readLocalCart();

      // Merge guest cart into DB (sums quantities for shared products)
      if (localItems.length > 0) {
        await mergeGuestCart(
          localItems.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          }))
        );
      }

      // Load the authoritative DB cart
      const dbCart = await getCart();
      const merged = dbCart.map((row: CartItemRow) => ({
        product: row.product as Product,
        quantity: row.quantity,
      }));

      // Skip the localStorage sync for this setState so we don't
      // overwrite the guest cart the user might still want on logout
      skipSyncRef.current = true;
      setCartItems(merged);
      // Allow sync on next tick
      requestAnimationFrame(() => {
        skipSyncRef.current = false;
      });
    };

    mergeAndLoad();
  }, [status, session]);

  // ---------------------------------------------------------------
  // 4. On logout: reset merge flag, reload from localStorage
  // ---------------------------------------------------------------
  useEffect(() => {
    if (status !== "unauthenticated") return;
    mergedRef.current = false;
    setCartItems(readLocalCart());
  }, [status]);

  // ---------------------------------------------------------------
  // 5. Cart mutations — local state + DB (if logged in)
  // ---------------------------------------------------------------
  const addToCart = useCallback(
    (product: Product) => {
      // Optimistic local update
      setCartItems((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...prev, { product, quantity: 1 }];
      });

      // DB sync (fire-and-forget)
      if (status === "authenticated") {
        dbAddToCart(product.id);
      }
    },
    [status]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setCartItems((prev) => prev.filter((i) => i.product.id !== productId));

      if (status === "authenticated") {
        dbRemoveFromCart(productId);
      }
    },
    [status]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setCartItems((prev) =>
        prev.map((i) =>
          i.product.id === productId ? { ...i, quantity } : i
        )
      );

      if (status === "authenticated") {
        dbUpdateQuantity(productId, quantity);
      }
    },
    [status, removeFromCart]
  );

  // ---------------------------------------------------------------
  // Derived values
  // ---------------------------------------------------------------
  const cartCount = cartItems.reduce((t, i) => t + i.quantity, 0);
  const cartTotal = cartItems.reduce(
    (t, i) => t + i.product.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
