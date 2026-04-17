// ============================================
// Footer - Site footer with links and info
// ============================================

import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground/70 mt-16">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-primary font-display font-bold text-xl mb-4">
            <Zap className="h-6 w-6" />
            Gajanan Electricals
          </div>
          <p className="text-sm leading-relaxed">Your trusted destination for quality electrical products. From wires to appliances, we've got everything you need.</p>
        </div>
        <div>
          <h4 className="font-semibold text-secondary-foreground mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products?cat=Wires+%26+Cables" className="hover:text-primary transition-colors">Wires & Cables</Link></li>
            <li><Link to="/products?cat=Switches+%26+Boards" className="hover:text-primary transition-colors">Switches & Boards</Link></li>
            <li><Link to="/products?cat=Lighting" className="hover:text-primary transition-colors">Lighting</Link></li>
            <li><Link to="/products?cat=Home+Appliances" className="hover:text-primary transition-colors">Home Appliances</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-secondary-foreground mb-3">Account</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-primary transition-colors">Login / Sign Up</Link></li>
            <li><Link to="/orders" className="hover:text-primary transition-colors">My Orders</Link></li>
            <li><Link to="/wishlist" className="hover:text-primary transition-colors">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-primary transition-colors">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-secondary-foreground mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>📍 123 Electrical Lane, Mumbai</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ support@electromart.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/30 mt-8 pt-6 text-center text-sm text-muted-foreground">
        © 2026 Gajanan Electricals. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
