// ============================================
// Checkout Page - Address, payment, order confirmation
// ============================================

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CreditCard, CheckCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Checkout = () => {
  const { cart, cartTotal, placeOrder } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [payment, setPayment] = useState("cod");
  const [orderId, setOrderId] = useState("");
  const [processing, setProcessing] = useState(false);

  if (orderId) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
        <CheckCircle className="h-20 w-20 text-success mx-auto mb-6" />
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-2">Your order ID: <span className="font-mono font-bold text-foreground">{orderId}</span></p>
        <p className="text-muted-foreground mb-8">Thank you for shopping at ElectroMart!</p>
        <div className="flex justify-center gap-4">
          <Link to="/orders" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">View Orders</Link>
          <Link to="/products" className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-bold hover:bg-primary hover:text-primary-foreground transition-colors">Continue Shopping</Link>
        </div>
      </div>
      <Footer />
    </div>
  );

  if (cart.length === 0) { navigate("/cart"); return null; }

  const handleOrder = () => {
    if (!user) { toast.error("Please login to place an order"); navigate("/login"); return; }
    if (!address.trim() || !city.trim() || !pincode.trim()) { toast.error("Please fill all address fields"); return; }
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      const id = placeOrder(`${address}, ${city} - ${pincode}`, payment);
      setOrderId(id);
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Address Form */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-display text-lg font-bold text-card-foreground mb-4">Delivery Address</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Full Address</label>
                  <textarea value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="House/Flat No., Street, Landmark" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">City</label>
                    <input value={city} onChange={e => setCity(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="City" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Pincode</label>
                    <input value={pincode} onChange={e => setPincode(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="400001" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-display text-lg font-bold text-card-foreground mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" /> Payment Method
              </h3>
              <div className="space-y-2">
                {[
                  { value: "cod", label: "Cash on Delivery" },
                  { value: "upi", label: "UPI Payment" },
                  { value: "card", label: "Credit/Debit Card (Simulated)" },
                  { value: "netbanking", label: "Net Banking (Simulated)" },
                ].map(opt => (
                  <label key={opt.value} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${payment === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <input type="radio" name="payment" value={opt.value} checked={payment === opt.value} onChange={() => setPayment(opt.value)} className="accent-primary" />
                    <span className="text-sm font-medium text-card-foreground">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-20">
            <h3 className="font-display text-lg font-bold text-card-foreground mb-4">Order Summary</h3>
            <div className="space-y-3 max-h-60 overflow-auto mb-4">
              {cart.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground line-clamp-1 flex-1">{item.product.name} × {item.quantity}</span>
                  <span className="font-medium text-card-foreground ml-2">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>{cartTotal > 999 ? "Free" : "₹99"}</span></div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-card-foreground text-lg">
                <span>Total</span><span>₹{(cartTotal > 999 ? cartTotal : cartTotal + 99).toLocaleString()}</span>
              </div>
            </div>
            <button onClick={handleOrder} disabled={processing} className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50">
              {processing ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
