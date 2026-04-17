// ============================================
// ElectroMart - Store Context
// Manages cart, wishlist, orders, and reviews
// All data persisted to localStorage
// ============================================

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, CartItem, Order, Review } from "@/types";
import { sampleProducts, sampleReviews } from "@/data/products";

interface StoreContextType {
  // Products
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  // Orders
  orders: Order[];
  placeOrder: (address: string, paymentMethod: string) => string;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "date">) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem("electromart_products");
    return stored ? JSON.parse(stored) : sampleProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("electromart_cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const stored = localStorage.getItem("electromart_wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = localStorage.getItem("electromart_orders");
    return stored ? JSON.parse(stored) : [];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const stored = localStorage.getItem("electromart_reviews");
    return stored ? JSON.parse(stored) : sampleReviews;
  });

  // Persist to localStorage on change
  useEffect(() => { localStorage.setItem("electromart_products", JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem("electromart_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("electromart_wishlist", JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem("electromart_orders", JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem("electromart_reviews", JSON.stringify(reviews)); }, [reviews]);

  // Cart operations
  const addToCart = (product: Product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeFromCart = (productId: string) => setCart(prev => prev.filter(item => item.product.id !== productId));
  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) return removeFromCart(productId);
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: qty } : item));
  };
  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  // Orders
  const placeOrder = (address: string, paymentMethod: string) => {
    const userId = JSON.parse(localStorage.getItem("electromart_user") || "{}")?.id || "guest";
    const order: Order = {
      id: `ORD${Date.now()}`,
      userId,
      items: [...cart],
      total: cartTotal,
      status: "Pending",
      address,
      date: new Date().toISOString().split("T")[0],
      paymentMethod,
    };
    setOrders(prev => [order, ...prev]);
    clearCart();
    return order.id;
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  // Reviews
  const addReview = (review: Omit<Review, "id" | "date">) => {
    const newReview: Review = { ...review, id: `r${Date.now()}`, date: new Date().toISOString().split("T")[0] };
    setReviews(prev => [...prev, newReview]);
  };

  return (
    <StoreContext.Provider value={{ products, setProducts, cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, wishlist, toggleWishlist, orders, placeOrder, updateOrderStatus, reviews, addReview }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};
