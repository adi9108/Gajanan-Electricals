// ============================================
// Login / Signup Page
// ============================================

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      if (!name.trim()) { toast.error("Name is required"); return; }
      const result = signup(name, email, password);
      if (result.success) { toast.success(result.message); navigate("/"); } else toast.error(result.message);
    } else {
      const result = login(email, password);
      if (result.success) { toast.success(result.message); navigate("/"); } else toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <Zap className="h-10 w-10 text-primary mx-auto mb-3" />
            <h1 className="font-display text-2xl font-bold text-foreground">{isSignup ? "Create Account" : "Welcome Back"}</h1>
            <p className="text-muted-foreground text-sm mt-1">{isSignup ? "Join ElectroMart today" : "Login to your account"}</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4">
            {isSignup && (
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="John Doe" />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@email.com" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" required />
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button onClick={() => setIsSignup(!isSignup)} className="text-primary font-semibold ml-1 hover:underline">
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>

          {/* Demo credentials */}
          <div className="bg-muted rounded-xl p-4 mt-6 text-sm">
            <p className="font-semibold text-foreground mb-2">Demo Credentials:</p>
            <p className="text-muted-foreground">Admin: admin@electromart.com / admin123</p>
            <p className="text-muted-foreground">User: rahul@demo.com / demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
