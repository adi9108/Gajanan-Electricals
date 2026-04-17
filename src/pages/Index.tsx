// ============================================
// Homepage - Hero banner, categories, featured products, recommendations
// ============================================

import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Truck, Clock, Cable, ToggleLeft, Lightbulb, Tv, LucideIcon } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/data/products";

const categoryIcons: Record<string, LucideIcon> = {
  "Wires & Cables": Cable,
  "Switches & Boards": ToggleLeft,
  "Lighting": Lightbulb,
  "Home Appliances": Tv,
};

const Index = () => {
  const { products } = useStore();
  const featured = products.filter(p => p.featured);
  // Basic AI recommendation: top-rated products user hasn't bought
  const recommended = [...products].sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative overflow-hidden dark-surface">
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Zap className="h-4 w-4" /> India's Trusted Electrical Store
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-secondary-foreground mb-6 leading-tight">
              Power Your Home with <span className="text-primary">Quality Electricals</span>
            </h1>
            <p className="text-secondary-foreground/70 text-lg mb-8 max-w-lg">
              Premium wires, switches, lighting, and appliances from top brands. Trusted by 50,000+ customers across India.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors text-lg">
                Shop Now <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/products?cat=Lighting" className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary hover:text-primary-foreground transition-colors text-lg">
                Explore Lighting
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative cosmic glow orbs */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-25 pointer-events-none">
          <div className="absolute top-8 right-16 w-72 h-72 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-8 right-48 w-56 h-56 rounded-full bg-accent blur-3xl" />
          <div className="absolute top-1/2 right-8 w-32 h-32 rounded-full bg-primary/60 blur-2xl" />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, text: "Free Delivery over ₹999" },
              { icon: Shield, text: "Genuine Products" },
              { icon: Clock, text: "24/7 Support" },
              { icon: Zap, text: "Fast Dispatch" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 justify-center py-2">
                <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-card-foreground">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link
              key={cat}
              to={`/products?cat=${encodeURIComponent(cat)}`}
              className="group bg-card border border-border rounded-xl p-6 text-center hover:orange-border-glow transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  {categoryIcons[cat] && (() => { const Icon = categoryIcons[cat]; return <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />; })()}
                </div>
              </div>
              <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">{cat}</h3>
              <p className="text-sm text-muted-foreground mt-1">{products.filter(p => p.category === cat).length} Products</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Featured Products</h2>
          <Link to="/products" className="text-primary font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <Zap className="h-6 w-6 text-primary" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Recommended for You</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {recommended.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container mx-auto px-4 py-12">
        <div className="hero-gradient rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-primary-foreground mb-4">Get 20% Off Your First Order!</h2>
          <p className="text-primary-foreground/80 mb-6 text-lg">Sign up today and enjoy exclusive discounts on all electrical products.</p>
          <Link to="/login" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors text-lg">
            Sign Up Now <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
