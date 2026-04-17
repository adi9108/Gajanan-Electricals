// ============================================
// ProductCard - Reusable product display card
// Shows image, price, rating, and quick actions
// ============================================

import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const isWished = wishlist.includes(product.id);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square bg-muted">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-md">
            -{discount}%
          </span>
        )}
        {product.stock < 10 && product.stock > 0 && (
          <span className="absolute top-3 right-3 bg-warning text-warning-foreground text-xs font-bold px-2 py-1 rounded-md">
            Low Stock
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-md">
            Out of Stock
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">{product.brand}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-card-foreground line-clamp-2 hover:text-primary transition-colors mb-2 text-sm">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-card-foreground">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => { addToCart(product); toast.success("Added to cart!"); }}
            disabled={product.stock === 0}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-4 w-4" /> Add
          </button>
          <button
            onClick={() => { toggleWishlist(product.id); toast.success(isWished ? "Removed from wishlist" : "Added to wishlist"); }}
            className={`p-2 rounded-lg border transition-colors ${isWished ? "bg-destructive/10 border-destructive text-destructive" : "border-border text-muted-foreground hover:text-destructive hover:border-destructive"}`}
          >
            <Heart className={`h-4 w-4 ${isWished ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
