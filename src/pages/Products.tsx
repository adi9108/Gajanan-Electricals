// ============================================
// Products Page - Listing with filters and search
// ============================================

import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Category } from "@/types";
import { categories, brands } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Products = () => {
  const { products } = useStore();
  const [params] = useSearchParams();
  const initialCat = params.get("cat") as Category | null;
  const initialSearch = params.get("search") || "";

  const [category, setCategory] = useState<Category | "All">(initialCat || "All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState("rating");
  const [search, setSearch] = useState(initialSearch);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== "All") result = result.filter(p => p.category === category);
    if (brand !== "All") result = result.filter(p => p.brand === brand);
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "name": result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return result;
  }, [products, category, brand, priceRange, sortBy, search]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            {category !== "All" ? category : "All Products"}
            <span className="text-muted-foreground text-lg font-normal ml-2">({filtered.length})</span>
          </h1>
          <button onClick={() => setShowFilters(!showFilters)} className="md:hidden flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-lg text-sm font-medium">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? "fixed inset-0 z-50 bg-background p-6 overflow-auto" : "hidden"} md:block md:static md:w-64 flex-shrink-0`}>
            {showFilters && (
              <button onClick={() => setShowFilters(false)} className="md:hidden absolute top-4 right-4">
                <X className="h-6 w-6" />
              </button>
            )}
            <div className="space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Search</label>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-full px-3 py-2 rounded-lg border border-border bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Category</label>
                <div className="space-y-1">
                  {["All", ...categories].map(c => (
                    <button key={c} onClick={() => setCategory(c as any)} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${category === c ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-muted"}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Brand</label>
                <select value={brand} onChange={e => setBrand(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-card text-card-foreground text-sm">
                  <option value="All">All Brands</option>
                  {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Price Range</label>
                <div className="flex gap-2">
                  <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} className="w-full px-3 py-2 rounded-lg border border-border bg-card text-card-foreground text-sm" placeholder="Min" />
                  <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="w-full px-3 py-2 rounded-lg border border-border bg-card text-card-foreground text-sm" placeholder="Max" />
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Sort By</label>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-card text-card-foreground text-sm">
                  <option value="rating">Top Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
