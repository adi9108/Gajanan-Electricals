// ============================================
// Admin Dashboard - Product CRUD, order management, analytics
// ============================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ShoppingCart, Users, TrendingUp, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { Product, Category } from "@/types";
import { categories } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { products, setProducts, orders, updateOrderStatus } = useStore();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"analytics" | "products" | "orders">("analytics");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formCategory, setFormCategory] = useState<Category>("Wires & Cables");
  const [formBrand, setFormBrand] = useState("");
  const [formStock, setFormStock] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formImage, setFormImage] = useState("");

  if (!isAdmin) {
    navigate("/login");
    return null;
  }

  // Analytics data
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const pendingOrders = orders.filter(o => o.status === "Pending").length;

  const openAddForm = () => {
    setEditProduct(null);
    setFormName(""); setFormPrice(""); setFormCategory("Wires & Cables"); setFormBrand(""); setFormStock(""); setFormDesc(""); setFormImage("");
    setShowForm(true);
  };

  const openEditForm = (p: Product) => {
    setEditProduct(p);
    setFormName(p.name); setFormPrice(String(p.price)); setFormCategory(p.category); setFormBrand(p.brand); setFormStock(String(p.stock)); setFormDesc(p.description); setFormImage(p.image);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formName || !formPrice || !formBrand) { toast.error("Please fill required fields"); return; }
    const productData: Product = {
      id: editProduct?.id || `p${Date.now()}`,
      name: formName, price: Number(formPrice), category: formCategory, brand: formBrand,
      stock: Number(formStock) || 0, description: formDesc,
      image: formImage || "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400",
      rating: editProduct?.rating || 0, reviewCount: editProduct?.reviewCount || 0,
    };
    if (editProduct) {
      setProducts(prev => prev.map(p => p.id === editProduct.id ? productData : p));
      toast.success("Product updated!");
    } else {
      setProducts(prev => [...prev, productData]);
      toast.success("Product added!");
    }
    setShowForm(false);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success("Product deleted");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">Welcome back, {user?.name}</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          {(["analytics", "products", "orders"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-3 text-sm font-semibold capitalize transition-colors border-b-2 ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Analytics */}
        {activeTab === "analytics" && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: TrendingUp, label: "Total Sales", value: `₹${totalSales.toLocaleString()}`, color: "text-success" },
                { icon: ShoppingCart, label: "Total Orders", value: totalOrders, color: "text-primary" },
                { icon: Package, label: "Products", value: totalProducts, color: "text-accent" },
                { icon: Users, label: "Pending Orders", value: pendingOrders, color: "text-warning" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="bg-card border border-border rounded-xl p-5">
                  <Icon className={`h-6 w-6 ${color} mb-2`} />
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="text-2xl font-bold text-card-foreground">{value}</p>
                </div>
              ))}
            </div>

            {/* Category breakdown */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-display text-lg font-bold text-card-foreground mb-4">Products by Category</h3>
              <div className="space-y-3">
                {categories.map(cat => {
                  const count = products.filter(p => p.category === cat).length;
                  const pct = Math.round((count / products.length) * 100);
                  return (
                    <div key={cat}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-card-foreground">{cat}</span>
                        <span className="text-muted-foreground">{count} ({pct}%)</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full hero-gradient rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Products Management */}
        {activeTab === "products" && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <p className="text-muted-foreground text-sm">{products.length} products</p>
              <button onClick={openAddForm} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90">
                <Plus className="h-4 w-4" /> Add Product
              </button>
            </div>

            {/* Product Form Modal */}
            {showForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={() => setShowForm(false)}>
                <div className="bg-card border border-border rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
                  <h3 className="font-display text-lg font-bold text-card-foreground mb-4">{editProduct ? "Edit Product" : "Add Product"}</h3>
                  <div className="space-y-3">
                    <input value={formName} onChange={e => setFormName(e.target.value)} placeholder="Product Name *" className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="number" value={formPrice} onChange={e => setFormPrice(e.target.value)} placeholder="Price *" className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                      <input type="number" value={formStock} onChange={e => setFormStock(e.target.value)} placeholder="Stock" className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <select value={formCategory} onChange={e => setFormCategory(e.target.value as Category)} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm">
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <input value={formBrand} onChange={e => setFormBrand(e.target.value)} placeholder="Brand *" className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <input value={formImage} onChange={e => setFormImage(e.target.value)} placeholder="Image URL" className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    <textarea value={formDesc} onChange={e => setFormDesc(e.target.value)} placeholder="Description" className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary" />
                    <div className="flex gap-3">
                      <button onClick={handleSave} className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-bold text-sm hover:bg-primary/90">Save</button>
                      <button onClick={() => setShowForm(false)} className="flex-1 border border-border text-foreground py-2 rounded-lg font-bold text-sm hover:bg-muted">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Product Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Product</th>
                      <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Category</th>
                      <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Price</th>
                      <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Stock</th>
                      <th className="text-right px-4 py-3 text-muted-foreground font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} className="border-t border-border hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                            <span className="font-medium text-card-foreground line-clamp-1">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                        <td className="px-4 py-3 text-card-foreground font-medium">₹{p.price.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={p.stock > 10 ? "text-success" : p.stock > 0 ? "text-warning" : "text-destructive"}>{p.stock}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => openEditForm(p)} className="p-1.5 text-muted-foreground hover:text-primary"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => deleteProduct(p.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Order Management */}
        {activeTab === "orders" && (
          <div className="animate-fade-in space-y-4">
            {orders.length === 0 ? (
              <p className="text-center text-muted-foreground py-16">No orders yet.</p>
            ) : orders.map(order => (
              <div key={order.id} className="bg-card border border-border rounded-xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div>
                    <p className="font-mono text-sm font-bold text-card-foreground">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.date} • {order.paymentMethod}</p>
                  </div>
                  <select value={order.status} onChange={e => updateOrderStatus(order.id, e.target.value as any)} className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm font-medium">
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground mb-2">
                  {order.items.map(item => (
                    <p key={item.product.id}>{item.product.name} × {item.quantity} — ₹{(item.product.price * item.quantity).toLocaleString()}</p>
                  ))}
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-sm">
                  <span className="text-muted-foreground">{order.address}</span>
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

export default AdminDashboard;
