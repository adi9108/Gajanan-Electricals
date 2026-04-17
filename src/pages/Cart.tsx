// ============================================
// Cart Page - View, update, and checkout cart items
// ============================================

import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();

  if (cart.length === 0) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-6">Add some products to get started!</p>
        <Link to="/products" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
          Browse Products <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Shopping Cart ({cart.length} items)</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="bg-card border border-border rounded-xl p-4 flex gap-4 animate-fade-in">
                <Link to={`/product/${item.product.id}`} className="w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.id}`} className="font-semibold text-card-foreground hover:text-primary transition-colors line-clamp-1">{item.product.name}</Link>
                  <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                  <p className="text-lg font-bold text-card-foreground mt-1">₹{item.product.price.toLocaleString()}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 hover:bg-muted transition-colors rounded-l-lg"><Minus className="h-3 w-3" /></button>
                    <span className="px-3 py-1 text-sm font-medium text-foreground border-x border-border">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 hover:bg-muted transition-colors rounded-r-lg"><Plus className="h-3 w-3" /></button>
                  </div>
                  <p className="text-sm font-semibold text-card-foreground">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-20">
            <h3 className="font-display text-lg font-bold text-card-foreground mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>{cartTotal > 999 ? "Free" : "₹99"}</span></div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-card-foreground text-lg">
                <span>Total</span>
                <span>₹{(cartTotal > 999 ? cartTotal : cartTotal + 99).toLocaleString()}</span>
              </div>
            </div>
            <Link to="/checkout" className="w-full mt-6 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
              Proceed to Checkout <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
