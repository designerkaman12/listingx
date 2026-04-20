export type ProductStatus = "high-selling" | "potential" | "not-selling" | "needs-fix" | "stable";
export type Marketplace = "Amazon" | "Flipkart" | "Shopify" | "Meesho";

export interface Product {
  id: string;
  title: string;
  asin: string;
  sku: string;
  marketplace: Marketplace;
  category: string;
  image: string;
  status: ProductStatus;
  price: number;
  currency: string;
  salesLast30Days: number;
  unitsSold: number;
  salesTrend: number; // % change
  listingScore: number;
  seoScore: number;
  conversionScore: number;
  visualScore: number;
  brandScore: number;
  growthPotentialScore: number;
  marketplaceFitScore: number;
  overallGrowthScore: number;
  reviews: number;
  rating: number;
  lastAnalyzed: string;
  issues: string[];
  opportunities: string[];
}

export interface WeeklyInsight {
  week: string;
  improved: number;
  pending: number;
  newAlerts: number;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "P001",
    title: "Wireless Bluetooth Earbuds Pro X5 with Active Noise Cancellation, 40H Battery",
    asin: "B09XK7TFRS",
    sku: "WBE-PRO-X5-BLK",
    marketplace: "Amazon",
    category: "Electronics > Audio",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
    status: "potential",
    price: 49.99,
    currency: "USD",
    salesLast30Days: 2340,
    unitsSold: 47,
    salesTrend: -8.2,
    listingScore: 52,
    seoScore: 41,
    conversionScore: 38,
    visualScore: 45,
    brandScore: 30,
    growthPotentialScore: 82,
    marketplaceFitScore: 61,
    overallGrowthScore: 49,
    reviews: 23,
    rating: 3.8,
    lastAnalyzed: "2026-04-19",
    issues: ["Weak title keywords", "No A+ content", "Only 3 images", "Low review count", "Missing infographic"],
    opportunities: ["High category demand", "Competitor pricing gap", "Keyword volume untapped"],
  },
  {
    id: "P002",
    title: "Premium Stainless Steel Water Bottle 1L Insulated Double Wall for Hot & Cold",
    asin: "B08TQPNM7L",
    sku: "SSB-1L-SLV",
    marketplace: "Amazon",
    category: "Kitchen & Home",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop",
    status: "high-selling",
    price: 24.99,
    currency: "USD",
    salesLast30Days: 18750,
    unitsSold: 750,
    salesTrend: 22.5,
    listingScore: 88,
    seoScore: 84,
    conversionScore: 79,
    visualScore: 86,
    brandScore: 72,
    growthPotentialScore: 45,
    marketplaceFitScore: 91,
    overallGrowthScore: 82,
    reviews: 847,
    rating: 4.6,
    lastAnalyzed: "2026-04-19",
    issues: ["Could improve A+ content", "Backend keywords partially optimized"],
    opportunities: ["Bundle opportunity", "International expansion"],
  },
  {
    id: "P003",
    title: "Yoga Mat Anti-Slip 6mm Thick Exercise Fitness Mat",
    asin: "B07MNQFLPJ",
    sku: "YGM-6MM-PRP",
    marketplace: "Flipkart",
    category: "Sports & Fitness",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=200&h=200&fit=crop",
    status: "not-selling",
    price: 899,
    currency: "INR",
    salesLast30Days: 0,
    unitsSold: 0,
    salesTrend: -100,
    listingScore: 22,
    seoScore: 18,
    conversionScore: 15,
    visualScore: 20,
    brandScore: 10,
    growthPotentialScore: 68,
    marketplaceFitScore: 42,
    overallGrowthScore: 21,
    reviews: 2,
    rating: 3.0,
    lastAnalyzed: "2026-04-18",
    issues: ["Terrible listing title", "No description", "Only 1 image", "Zero keywords", "No bullet points", "No brand identity", "Pricing too high vs competitors"],
    opportunities: ["Yoga category surging on Flipkart", "Festive season demand", "Low competition for premium yoga mats"],
  },
  {
    id: "P004",
    title: "LED Desk Lamp with USB Charging Port, 5 Color Modes, Touch Control, Eye-Care",
    asin: "B0BZPQR8TK",
    sku: "LED-DESK-USB-WHT",
    marketplace: "Amazon",
    category: "Home & Office",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop",
    status: "needs-fix",
    price: 34.99,
    currency: "USD",
    salesLast30Days: 560,
    unitsSold: 16,
    salesTrend: -31.5,
    listingScore: 35,
    seoScore: 28,
    conversionScore: 22,
    visualScore: 31,
    brandScore: 18,
    growthPotentialScore: 76,
    marketplaceFitScore: 55,
    overallGrowthScore: 34,
    reviews: 7,
    rating: 3.4,
    lastAnalyzed: "2026-04-19",
    issues: ["Title missing key search terms", "Bullet points too generic", "No lifestyle images", "Poor description", "Pricing above category average", "No A+ content"],
    opportunities: ["Work-from-home trend", "High search volume for desk lamps", "Competitor A+ content weak"],
  },
  {
    id: "P005",
    title: "Moisturizing Face Cream with Hyaluronic Acid & Vitamin C - 50ml All Skin Types",
    asin: "B0CXMT7PLQ",
    sku: "FC-HA-VC-50ML",
    marketplace: "Flipkart",
    category: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=200&fit=crop",
    status: "potential",
    price: 549,
    currency: "INR",
    salesLast30Days: 8200,
    unitsSold: 149,
    salesTrend: 5.3,
    listingScore: 61,
    seoScore: 55,
    conversionScore: 48,
    visualScore: 58,
    brandScore: 44,
    growthPotentialScore: 79,
    marketplaceFitScore: 72,
    overallGrowthScore: 60,
    reviews: 89,
    rating: 4.1,
    lastAnalyzed: "2026-04-19",
    issues: ["Missing ingredient highlight images", "No comparison chart", "Weak brand story", "Few secondary images"],
    opportunities: ["Beauty category growing 40% YoY", "Premium skincare demand rising", "Review generation opportunity"],
  },
  {
    id: "P006",
    title: "Men's Running Shoes Lightweight Breathable Athletic Sport Sneakers",
    asin: "B09QRS5PXV",
    sku: "MRS-BLU-42",
    marketplace: "Flipkart",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    status: "high-selling",
    price: 1299,
    currency: "INR",
    salesLast30Days: 42000,
    unitsSold: 323,
    salesTrend: 18.7,
    listingScore: 81,
    seoScore: 78,
    conversionScore: 74,
    visualScore: 82,
    brandScore: 65,
    growthPotentialScore: 55,
    marketplaceFitScore: 88,
    overallGrowthScore: 78,
    reviews: 412,
    rating: 4.4,
    lastAnalyzed: "2026-04-19",
    issues: ["A+ content could be enhanced", "Missing size guide visual"],
    opportunities: ["Expand color variants", "Bundle with socks", "Sports season campaign"],
  },
  {
    id: "P007",
    title: "Smart Home Security Camera 1080p WiFi Indoor Pet Cam Night Vision Two-Way Audio",
    asin: "B0BMP9RFWQ",
    sku: "SHSC-1080P-BLK",
    marketplace: "Amazon",
    category: "Electronics > Smart Home",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    status: "potential",
    price: 42.99,
    currency: "USD",
    salesLast30Days: 3800,
    unitsSold: 88,
    salesTrend: 2.1,
    listingScore: 58,
    seoScore: 62,
    conversionScore: 44,
    visualScore: 55,
    brandScore: 38,
    growthPotentialScore: 85,
    marketplaceFitScore: 70,
    overallGrowthScore: 58,
    reviews: 54,
    rating: 4.0,
    lastAnalyzed: "2026-04-18",
    issues: ["No video demonstration", "Missing trust visuals", "Weak FAQ section", "No comparison with competitors", "Backend keywords insufficient"],
    opportunities: ["Smart home market booming", "High repeat purchase potential", "Bundle opportunity with hub"],
  },
  {
    id: "P008",
    title: "Bamboo Cutting Board Set of 3 with Juice Groove Handles Kitchen Chopping Board",
    asin: "B07BFNQYZP",
    sku: "BCB-SET3-NAT",
    marketplace: "Amazon",
    category: "Kitchen & Dining",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
    status: "not-selling",
    price: 29.99,
    currency: "USD",
    salesLast30Days: 89,
    unitsSold: 3,
    salesTrend: -62.4,
    listingScore: 28,
    seoScore: 22,
    conversionScore: 18,
    visualScore: 25,
    brandScore: 12,
    growthPotentialScore: 72,
    marketplaceFitScore: 48,
    overallGrowthScore: 26,
    reviews: 4,
    rating: 3.5,
    lastAnalyzed: "2026-04-17",
    issues: ["Generic product title", "No lifestyle images", "Missing key cooking keywords", "No size comparison visual", "No A+ content", "Priced same as top sellers with 1000+ reviews"],
    opportunities: ["Kitchen category growing", "Eco-friendly products trending", "Gifting season opportunity"],
  },
  {
    id: "P009",
    title: "Resistance Bands Set 5pcs Heavy Duty Workout Exercise Bands for Home Gym Fitness",
    asin: "B08YGQK9TC",
    sku: "RBS-5PC-MUL",
    marketplace: "Flipkart",
    category: "Sports & Fitness",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&h=200&fit=crop",
    status: "stable",
    price: 699,
    currency: "INR",
    salesLast30Days: 5200,
    unitsSold: 74,
    salesTrend: 1.2,
    listingScore: 64,
    seoScore: 60,
    conversionScore: 56,
    visualScore: 61,
    brandScore: 48,
    growthPotentialScore: 60,
    marketplaceFitScore: 74,
    overallGrowthScore: 63,
    reviews: 167,
    rating: 4.2,
    lastAnalyzed: "2026-04-19",
    issues: ["Missing workout guide visual", "No testimonial images"],
    opportunities: ["Fitness resurgence trend", "Add workout guide as value-add"],
  },
  {
    id: "P010",
    title: "Portable Electric Hand Mixer 5 Speed Kitchen Handheld Blender Beater Egg Whisk",
    asin: "B0BNKPXQLR",
    sku: "PEH-5SPD-WHT",
    marketplace: "Amazon",
    category: "Kitchen Appliances",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=200&h=200&fit=crop",
    status: "needs-fix",
    price: 27.99,
    currency: "USD",
    salesLast30Days: 770,
    unitsSold: 27,
    salesTrend: -19.3,
    listingScore: 41,
    seoScore: 35,
    conversionScore: 32,
    visualScore: 38,
    brandScore: 25,
    growthPotentialScore: 70,
    marketplaceFitScore: 60,
    overallGrowthScore: 40,
    reviews: 18,
    rating: 3.7,
    lastAnalyzed: "2026-04-19",
    issues: ["Title too short", "Missing use-case keywords", "No baking lifestyle images", "Weak description", "No how-to-use imagery"],
    opportunities: ["Baking trend surge", "Recipe partnerships", "Bundle with accessories"],
  },
];

export interface CompetitorData {
  name: string;
  listingScore: number;
  imageScore: number;
  reviewScore: number;
  pricingScore: number;
  contentScore: number;
  brandScore: number;
  conversionScore: number;
  reviews: number;
  rating: number;
  price: number;
}

export const MOCK_COMPETITORS: CompetitorData[] = [
  { name: "TopSeller Pro", listingScore: 92, imageScore: 88, reviewScore: 95, pricingScore: 78, contentScore: 90, brandScore: 85, conversionScore: 87, reviews: 2341, rating: 4.7, price: 52.99 },
  { name: "BrandX Elite", listingScore: 85, imageScore: 91, reviewScore: 82, pricingScore: 88, contentScore: 84, brandScore: 79, conversionScore: 80, reviews: 1205, rating: 4.5, price: 47.99 },
  { name: "Your Product", listingScore: 52, imageScore: 45, reviewScore: 38, pricingScore: 65, contentScore: 50, brandScore: 30, conversionScore: 38, reviews: 23, rating: 3.8, price: 49.99 },
  { name: "ValueKing", listingScore: 68, imageScore: 72, reviewScore: 65, pricingScore: 92, contentScore: 62, brandScore: 55, conversionScore: 60, reviews: 445, rating: 4.1, price: 38.99 },
];

export const WEEKLY_DATA: WeeklyInsight[] = [
  { week: "Week 1", improved: 2, pending: 8, newAlerts: 3 },
  { week: "Week 2", improved: 4, pending: 6, newAlerts: 2 },
  { week: "Week 3", improved: 6, pending: 5, newAlerts: 1 },
  { week: "Week 4", improved: 7, pending: 3, newAlerts: 2 },
];

export const SALES_FORECAST_DATA = [
  { day: "Day 0", current: 100, projected: 100 },
  { day: "Day 7", current: 98, projected: 112 },
  { day: "Day 14", current: 95, projected: 128 },
  { day: "Day 21", current: 93, projected: 148 },
  { day: "Day 30", current: 90, projected: 168 },
  { day: "Day 45", current: 88, projected: 195 },
  { day: "Day 60", current: 85, projected: 228 },
];

export const SCORE_HISTORY = [
  { month: "Jan", score: 35 },
  { month: "Feb", score: 38 },
  { month: "Mar", score: 42 },
  { month: "Apr", score: 49 },
  { month: "May", score: 58 },
  { month: "Jun", score: 67 },
];

export interface Notification {
  id: string;
  type: "warning" | "success" | "info" | "urgent";
  message: string;
  time: string;
  read: boolean;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "N1", type: "urgent", message: "Yoga Mat listing has 0 sales for 7 days — needs immediate attention", time: "2h ago", read: false },
  { id: "N2", type: "warning", message: "Earbuds Pro: Add A+ content to improve conversion rate", time: "5h ago", read: false },
  { id: "N3", type: "info", message: "Weekly growth report is ready — 3 products improved", time: "1d ago", read: false },
  { id: "N4", type: "success", message: "Water Bottle listing score improved to 88 — keep it up!", time: "2d ago", read: true },
  { id: "N5", type: "warning", message: "Desk Lamp: Pricing is 23% above category average", time: "2d ago", read: true },
];
