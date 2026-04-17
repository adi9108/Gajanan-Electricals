// ============================================
// ElectroMart - Sample Product Data
// Contains 20+ products across 4 categories
// ============================================

import { Product, Review } from "@/types";

export const sampleProducts: Product[] = [
  // Wires & Cables
  { id: "p1", name: "Havells Lifeline 1.5 sq mm Wire", description: "High quality PVC insulated copper wire, ideal for house wiring. Fire retardant and lead-free. Suitable for domestic and industrial use.", price: 1299, originalPrice: 1599, category: "Wires & Cables", brand: "Havells", image: "https://images.unsplash.com/photo-1620283085439-39620a1e21c4?w=400&auto=format&fit=crop", stock: 150, rating: 4.5, reviewCount: 89, featured: true },
  { id: "p2", name: "Polycab 2.5 sq mm FR Wire", description: "Fire retardant PVC insulated copper conductor wire. REACH compliant, safe for residential wiring.", price: 2199, originalPrice: 2499, category: "Wires & Cables", brand: "Polycab", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&auto=format&fit=crop", stock: 200, rating: 4.3, reviewCount: 67 },
  { id: "p3", name: "Finolex 4 sq mm Cable", description: "Premium quality multi-strand copper conductor cable. High current carrying capacity.", price: 3499, category: "Wires & Cables", brand: "Finolex", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&auto=format&fit=crop", stock: 80, rating: 4.6, reviewCount: 45 },
  { id: "p4", name: "RR Kabel 6 sq mm Industrial Wire", description: "Heavy-duty industrial grade wire with superior insulation. Perfect for commercial installations.", price: 4999, originalPrice: 5499, category: "Wires & Cables", brand: "RR Kabel", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&auto=format&fit=crop", stock: 50, rating: 4.4, reviewCount: 32 },
  { id: "p5", name: "Anchor 1 sq mm Flexible Wire", description: "Flexible copper wire for light-duty applications. Easy to bend and install.", price: 899, category: "Wires & Cables", brand: "Anchor", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&auto=format&fit=crop&q=80&sat=-100", stock: 300, rating: 4.1, reviewCount: 112 },

  // Switches & Boards
  { id: "p6", name: "Legrand Modular Switch 6A", description: "Premium modular switch with elegant design. Features self-cleaning contact mechanism and robust construction.", price: 149, originalPrice: 199, category: "Switches & Boards", brand: "Legrand", image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=400&auto=format&fit=crop", stock: 500, rating: 4.7, reviewCount: 234, featured: true },
  { id: "p7", name: "Schneider Electric 16A Switch", description: "High-performance switch with modern aesthetic. UV stabilized and flame retardant material.", price: 189, category: "Switches & Boards", brand: "Schneider", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&auto=format&fit=crop", stock: 350, rating: 4.5, reviewCount: 156 },
  { id: "p8", name: "Havells 8-Way MCB Distribution Board", description: "Double door MCB distribution board. Powder coated for durability. IP43 rated.", price: 1899, originalPrice: 2299, category: "Switches & Boards", brand: "Havells", image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=400&auto=format&fit=crop", stock: 75, rating: 4.8, reviewCount: 91, featured: true },
  { id: "p9", name: "Anchor Roma USB Socket", description: "Modern USB charging socket with dual ports. 5V/2.1A fast charging support.", price: 449, category: "Switches & Boards", brand: "Anchor", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&auto=format&fit=crop", stock: 200, rating: 4.2, reviewCount: 78 },
  { id: "p10", name: "GM Modular 4-Gang Switch Plate", description: "4-gang switch plate with matching frame. Available in ivory and white finishes.", price: 299, category: "Switches & Boards", brand: "GM", image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&auto=format&fit=crop", stock: 400, rating: 4.0, reviewCount: 45 },

  // Lighting
  { id: "p11", name: "Philips 9W LED Bulb (Pack of 4)", description: "Energy-efficient LED bulb with 15,000 hours lifespan. Cool daylight 6500K. Saves up to 88% energy.", price: 499, originalPrice: 699, category: "Lighting", brand: "Philips", image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=400&auto=format&fit=crop", stock: 600, rating: 4.6, reviewCount: 512, featured: true },
  { id: "p12", name: "Syska 18W LED Panel Light", description: "Slim panel light with uniform light distribution. Suitable for false ceiling installation.", price: 799, category: "Lighting", brand: "Syska", image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&auto=format&fit=crop", stock: 150, rating: 4.3, reviewCount: 89 },
  { id: "p13", name: "Wipro 15W LED Downlight", description: "Recessed LED downlight with aluminum heat sink. 3000K warm white for ambient lighting.", price: 649, originalPrice: 849, category: "Lighting", brand: "Wipro", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop", stock: 200, rating: 4.4, reviewCount: 67 },
  { id: "p14", name: "Crompton 4ft LED Tube Light", description: "T5 LED batten with integrated driver. Instant start, no flickering. 20W power consumption.", price: 399, category: "Lighting", brand: "Crompton", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&auto=format&fit=crop", stock: 300, rating: 4.2, reviewCount: 145 },
  { id: "p15", name: "Bajaj LED Strip Light 5m", description: "Flexible RGB LED strip with remote control. 16 million color options. IP65 waterproof.", price: 1299, originalPrice: 1699, category: "Lighting", brand: "Bajaj", image: "https://images.unsplash.com/photo-1558618047-3c8c76ca38b3?w=400&auto=format&fit=crop", stock: 100, rating: 4.1, reviewCount: 56 },

  // Home Appliances
  { id: "p16", name: "Havells 1500W Room Heater", description: "Oil-filled radiator heater with 3 heat settings. Thermostat control and overheat protection.", price: 7999, originalPrice: 9999, category: "Home Appliances", brand: "Havells", image: "https://images.unsplash.com/photo-1588854337236-6889a45d1b0e?w=400&auto=format&fit=crop", stock: 30, rating: 4.5, reviewCount: 78, featured: true },
  { id: "p17", name: "Crompton 3L Instant Water Heater", description: "Compact instant water heater with ISI mark. Rust-proof ABS body. 4 bar pressure rating.", price: 3499, originalPrice: 4299, category: "Home Appliances", brand: "Crompton", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&auto=format&fit=crop", stock: 45, rating: 4.3, reviewCount: 56 },
  { id: "p18", name: "Orient 1200mm Ceiling Fan", description: "Aerodynamic blade design for maximum air delivery. Energy-efficient motor. Available in brown and ivory.", price: 1899, category: "Home Appliances", brand: "Orient", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&auto=format&fit=crop&sat=-100&bri=10", stock: 100, rating: 4.4, reviewCount: 203 },
  { id: "p19", name: "Bajaj 750W Mixer Grinder", description: "3-jar mixer grinder with powerful motor. Stainless steel blades. Overload protection.", price: 2999, originalPrice: 3599, category: "Home Appliances", brand: "Bajaj", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&auto=format&fit=crop", stock: 60, rating: 4.2, reviewCount: 134 },
  { id: "p20", name: "Philips 1200W Dry Iron", description: "Lightweight dry iron with non-stick coated sole plate. Adjustable temperature control.", price: 899, category: "Home Appliances", brand: "Philips", image: "https://images.unsplash.com/photo-1558618047-3c8c76ca38b3?w=400&auto=format&fit=crop", stock: 120, rating: 4.0, reviewCount: 89 },
];

export const sampleReviews: Review[] = [
  { id: "r1", productId: "p1", userId: "u1", userName: "Rahul Sharma", rating: 5, comment: "Excellent quality wire. Very durable and easy to work with.", date: "2026-03-15" },
  { id: "r2", productId: "p1", userId: "u2", userName: "Priya Patel", rating: 4, comment: "Good product for the price. Delivery was fast.", date: "2026-03-10" },
  { id: "r3", productId: "p6", userId: "u1", userName: "Rahul Sharma", rating: 5, comment: "Premium quality switch. Looks great on the wall.", date: "2026-03-20" },
  { id: "r4", productId: "p11", userId: "u3", userName: "Amit Kumar", rating: 4, comment: "Bright and energy efficient. Great value pack.", date: "2026-03-18" },
  { id: "r5", productId: "p16", userId: "u2", userName: "Priya Patel", rating: 5, comment: "Perfect for winter. Heats up quickly and maintains temperature.", date: "2026-02-28" },
];

// Brands for filter
export const brands = ["Havells", "Polycab", "Finolex", "RR Kabel", "Anchor", "Legrand", "Schneider", "Philips", "Syska", "Wipro", "Crompton", "Bajaj", "Orient", "GM"];

export const categories = ["Wires & Cables", "Switches & Boards", "Lighting", "Home Appliances"] as const;
