// ============================================
// Wishlist Page
// ============================================

import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Wishlist = () => {
  const { products, wishlist } = useStore();
  const wished = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">My Wishlist ({wished.length})</h1>
        {wished.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold text-foreground mb-2">No items in wishlist</h2>
            <p className="text-muted-foreground mb-6">Save items you love for later!</p>
            <Link to="/products" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold">Browse Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {wished.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
