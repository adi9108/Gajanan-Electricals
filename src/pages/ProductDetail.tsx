// ============================================
// Product Detail Page - Full product info with reviews
// ============================================

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Heart, Star, ArrowLeft, Package, Shield, Truck } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, wishlist, toggleWishlist, reviews, addReview } = useStore();
  const { user } = useAuth();
  const product = products.find(p => p.id === id);
  const [qty, setQty] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  if (!product) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-muted-foreground">Product not found.</p>
        <Link to="/products" className="text-primary mt-4 inline-block">← Back to products</Link>
      </div>
    </div>
  );

  const productReviews = reviews.filter(r => r.productId === product.id);
  const isWished = wishlist.includes(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddReview = () => {
    if (!user) { toast.error("Please login to add a review"); return; }
    if (!reviewText.trim()) { toast.error("Please write a review"); return; }
    addReview({ productId: product.id, userId: user.id, userName: user.name, rating: reviewRating, comment: reviewText });
    setReviewText("");
    toast.success("Review added!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="bg-muted rounded-xl overflow-hidden aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="animate-fade-in">
            <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-1">{product.brand}</p>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="bg-success/10 text-success text-sm font-bold px-2 py-1 rounded">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <Package className="h-4 w-4 text-muted-foreground" />
              {product.stock > 10 ? (
                <span className="text-success text-sm font-medium">In Stock ({product.stock} available)</span>
              ) : product.stock > 0 ? (
                <span className="text-warning text-sm font-medium">Low Stock - Only {product.stock} left!</span>
              ) : (
                <span className="text-destructive text-sm font-medium">Out of Stock</span>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-2 text-foreground hover:bg-muted transition-colors rounded-l-lg">-</button>
                <span className="px-4 py-2 text-foreground font-medium border-x border-border">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-4 py-2 text-foreground hover:bg-muted transition-colors rounded-r-lg">+</button>
              </div>
              <button
                onClick={() => { addToCart(product, qty); toast.success("Added to cart!"); }}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <ShoppingCart className="h-5 w-5" /> Add to Cart
              </button>
              <button onClick={() => { toggleWishlist(product.id); toast.success(isWished ? "Removed" : "Added to wishlist"); }} className={`p-3 rounded-lg border transition-colors ${isWished ? "bg-destructive/10 border-destructive text-destructive" : "border-border text-muted-foreground hover:text-destructive"}`}>
                <Heart className={`h-5 w-5 ${isWished ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 border-t border-border pt-6">
              {[{ icon: Truck, text: "Free Delivery" }, { icon: Shield, text: "Genuine Product" }, { icon: Package, text: "Easy Returns" }].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1 text-center">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Customer Reviews ({productReviews.length})</h2>

          {/* Add Review */}
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-card-foreground mb-3">Write a Review</h3>
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <button key={i} onClick={() => setReviewRating(i + 1)}>
                  <Star className={`h-6 w-6 ${i < reviewRating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                </button>
              ))}
            </div>
            <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="Share your experience..." className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground mb-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary" />
            <button onClick={handleAddReview} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors">
              Submit Review
            </button>
          </div>

          {/* Review list */}
          <div className="space-y-4">
            {productReviews.map(r => (
              <div key={r.id} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-card-foreground">{r.userName}</span>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{r.comment}</p>
              </div>
            ))}
            {productReviews.length === 0 && <p className="text-muted-foreground text-sm">No reviews yet. Be the first to review!</p>}
          </div>
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
