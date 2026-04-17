// ============================================
// Orders Page - User order history
// ============================================

import { Link } from "react-router-dom";
import { Package, ArrowLeft } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const statusColors: Record<string, string> = {
  Pending: "bg-warning/10 text-warning",
  Processing: "bg-primary/10 text-primary",
  Shipped: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Delivered: "bg-success/10 text-success",
};

const Orders = () => {
  const { orders } = useStore();
  const { user } = useAuth();
  const userOrders = user?.role === "admin" ? orders : orders.filter(o => o.userId === user?.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">My Orders</h1>

        {!user ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">Please login to view your orders.</p>
            <Link to="/login" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold">Login</Link>
          </div>
        ) : userOrders.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold text-foreground mb-2">No Orders Yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here!</p>
            <Link to="/products" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold">Shop Now</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.map(order => (
              <div key={order.id} className="bg-card border border-border rounded-xl p-5 animate-fade-in">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="font-mono text-sm font-bold text-card-foreground">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <div className="space-y-2 mb-3">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
                      <span className="text-card-foreground font-medium">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center border-t border-border pt-3">
                  <span className="text-sm text-muted-foreground">{order.paymentMethod} • {order.address}</span>
                  <span className="font-bold text-card-foreground">₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
