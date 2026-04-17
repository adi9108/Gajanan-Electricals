// ============================================
// ElectroMart - Type Definitions
// All interfaces used across the application
// ============================================

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  brand: string;
  image: string;
  stock: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export type Category = 
  | "Wires & Cables"
  | "Switches & Boards"
  | "Lighting"
  | "Home Appliances";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  address: string;
  date: string;
  paymentMethod: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FilterState {
  category: Category | "All";
  priceRange: [number, number];
  brand: string;
  search: string;
  sortBy: "price-asc" | "price-desc" | "rating" | "name";
}
