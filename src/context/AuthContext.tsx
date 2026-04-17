// ============================================
// ElectroMart - Authentication Context
// Manages user login/signup state with localStorage
// Simulates JWT-based authentication
// ============================================

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  signup: (name: string, email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin account for demo purposes
const DEFAULT_USERS = [
  { id: "admin1", name: "Admin", email: "admin@electromart.com", password: "admin123", role: "admin" as const },
  { id: "u1", name: "Rahul Sharma", email: "rahul@demo.com", password: "demo123", role: "user" as const },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user session on mount
  useEffect(() => {
    const stored = localStorage.getItem("electromart_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Initialize default users in localStorage
  useEffect(() => {
    if (!localStorage.getItem("electromart_users")) {
      localStorage.setItem("electromart_users", JSON.stringify(DEFAULT_USERS));
    }
  }, []);

  const getUsers = () => JSON.parse(localStorage.getItem("electromart_users") || "[]");

  const login = (email: string, password: string) => {
    const users = getUsers();
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      const userData: User = { id: found.id, name: found.name, email: found.email, role: found.role };
      setUser(userData);
      localStorage.setItem("electromart_user", JSON.stringify(userData));
      // Simulate JWT token
      localStorage.setItem("electromart_token", `jwt_${found.id}_${Date.now()}`);
      return { success: true, message: "Login successful!" };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const signup = (name: string, email: string, password: string) => {
    const users = getUsers();
    if (users.find((u: any) => u.email === email)) {
      return { success: false, message: "Email already registered" };
    }
    const newUser = { id: `u${Date.now()}`, name, email, password, role: "user" as const };
    users.push(newUser);
    localStorage.setItem("electromart_users", JSON.stringify(users));
    const userData: User = { id: newUser.id, name, email, role: "user" };
    setUser(userData);
    localStorage.setItem("electromart_user", JSON.stringify(userData));
    localStorage.setItem("electromart_token", `jwt_${newUser.id}_${Date.now()}`);
    return { success: true, message: "Account created successfully!" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("electromart_user");
    localStorage.removeItem("electromart_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
