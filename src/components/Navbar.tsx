// ============================================
// Navbar - Main navigation with cart, auth, dark mode
// ============================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User, Sun, Moon, Search, Menu, X, Zap, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount, wishlist } = useStore();
  const { isDark, toggle } = useTheme();
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-secondary border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-primary">
            <Zap className="h-6 w-6" />
            <span>Gajanan Electricals</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg bg-secondary-foreground/5 border border-border/30 text-secondary-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button onClick={toggle} className="p-2 rounded-lg text-secondary-foreground/70 hover:text-primary transition-colors">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <Link to="/wishlist" className="relative p-2 rounded-lg text-secondary-foreground/70 hover:text-primary transition-colors hidden sm:block">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 rounded-lg text-secondary-foreground/70 hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                {isAdmin && (
                  <Link to="/admin">
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Link to="/orders" className="p-2 rounded-lg text-secondary-foreground/70 hover:text-primary transition-colors">
                  <User className="h-5 w-5" />
                </Link>
                <button onClick={logout} className="p-2 rounded-lg text-secondary-foreground/70 hover:text-destructive transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="sm:hidden p-2 text-secondary-foreground/70">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="sm:hidden pb-4 space-y-2 animate-fade-in">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-secondary-foreground/5 border border-border/30 text-secondary-foreground placeholder:text-muted-foreground/60"
              />
            </form>
            <div className="flex flex-col gap-1">
              <Link to="/products" onClick={() => setMobileOpen(false)} className="px-4 py-2 text-secondary-foreground/70 hover:text-primary">Products</Link>
              <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="px-4 py-2 text-secondary-foreground/70 hover:text-primary">Wishlist</Link>
              <Link to="/orders" onClick={() => setMobileOpen(false)} className="px-4 py-2 text-secondary-foreground/70 hover:text-primary">Orders</Link>
              {user ? (
                <button onClick={() => { logout(); setMobileOpen(false); }} className="px-4 py-2 text-left text-destructive">Logout</button>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="px-4 py-2 text-primary font-semibold">Login</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
