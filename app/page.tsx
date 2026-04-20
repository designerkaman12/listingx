"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BarChart2, Zap, Target, TrendingUp, CheckCircle, Star, ChevronDown, Globe, ShoppingCart, Package, Search, Image, FileText, Award, Users, Shield, Sparkles } from "lucide-react";

const features = [
  { icon: Search, title: "AI Listing Diagnosis", desc: "Instantly identify why your product isn't selling — from keyword gaps to image problems to pricing issues.", color: "#6366f1" },
  { icon: Target, title: "Conversion Optimizer", desc: "Get a prioritized action plan to fix every listing gap and turn browsers into buyers.", color: "#8b5cf6" },
  { icon: FileText, title: "AI Content Generator", desc: "Generate optimized titles, bullets, descriptions, A+ content, FAQs, and ad copy in seconds.", color: "#06b6d4" },
  { icon: Image, title: "Creative Advisor", desc: "Get a detailed image brief for professional photography, infographics, and lifestyle shots.", color: "#f97316" },
  { icon: TrendingUp, title: "Growth Forecasting", desc: "See estimated sales uplift projections before you invest in changes — know the ROI upfront.", color: "#22c55e" },
  { icon: BarChart2, title: "Weekly Growth Manager", desc: "Your AI growth assistant re-analyzes listings every week and tracks your improvement over time.", color: "#ef4444" },
  { icon: Users, title: "Competitor Intelligence", desc: "See exactly what top competitors are doing better and close the gap with data-driven fixes.", color: "#f59e0b" },
  { icon: Globe, title: "Multi-Marketplace", desc: "Platform-specific recommendations for Amazon, Flipkart, and more — not generic advice.", color: "#10b981" },
];

const steps = [
  { step: "01", title: "Connect Your Marketplace", desc: "Link your Amazon or Flipkart seller account. We import your inventory and listings automatically.", icon: ShoppingCart },
  { step: "02", title: "AI Analyzes Everything", desc: "Our AI scans every product for 25+ performance factors — SEO, images, content, pricing, reviews, and more.", icon: Zap },
  { step: "03", title: "Fix, Generate & Grow", desc: "Get a prioritized action plan, generate content instantly, and watch your sales improve week over week.", icon: TrendingUp },
];

const marketplaces = ["Amazon", "Flipkart", "Shopify", "Meesho", "Myntra", "Walmart", "eBay", "Etsy"];

const testimonials = [
  { name: "Rahul Mehta", role: "Amazon Seller, Electronics", quote: "ListingX found 8 issues in my top product that I had completely missed. After fixing them, my sales went up 43% in 3 weeks.", stars: 5, avatar: "RM" },
  { name: "Priya Sharma", role: "Flipkart Brand Owner, Beauty", quote: "The AI content generator saved me hours. The bullets and A+ content it created are better than what I paid an agency for.", stars: 5, avatar: "PS" },
  { name: "James Carter", role: "Amazon Seller, Home & Kitchen", quote: "The competitor benchmarking alone is worth the subscription. I finally understand why I'm losing to competitors.", stars: 5, avatar: "JC" },
];

const pricing = [
  { name: "Starter", price: 29, period: "mo", products: 20, features: ["AI listing diagnosis", "Basic content generation", "2 marketplaces", "Weekly growth report", "Email support"], cta: "Start Free Trial", featured: false },
  { name: "Pro", price: 79, period: "mo", products: 100, features: ["Everything in Starter", "Advanced AI analysis", "Unlimited content gen", "Competitor intelligence", "Sales forecasting", "Priority support", "Team access (3 seats)"], cta: "Start Free Trial", featured: true },
  { name: "Agency", price: 199, period: "mo", products: 500, features: ["Everything in Pro", "500+ products", "Unlimited marketplaces", "White-label reports", "API access", "Dedicated account manager", "Unlimited team seats"], cta: "Contact Sales", featured: false },
];

const faqs = [
  { q: "Do I need technical knowledge to use ListingX?", a: "No. ListingX is built for ecommerce sellers, not developers. Everything is explained in plain business language with step-by-step action plans." },
  { q: "Which marketplaces does ListingX support?", a: "We currently support Amazon and Flipkart with full analysis. Shopify, Meesho, Myntra, and Walmart are coming soon. The platform is built to be marketplace-ready." },
  { q: "How accurate are the AI recommendations?", a: "Our AI is trained on marketplace best practices, top-listing patterns, and conversion data. All recommendations are backed by platform-specific logic, not generic advice." },
  { q: "Can the AI actually generate listing content?", a: "Yes. ListingX can generate optimized titles, bullet points, product descriptions, A+ content, FAQs, SEO keywords, ad copy, and image briefs — all tailored to your product and marketplace." },
  { q: "Is there a free trial?", a: "Yes. All plans include a 14-day free trial with no credit card required. You get full access to all features during your trial." },
  { q: "How does the weekly growth manager work?", a: "Every week, ListingX re-analyzes your listings, compares before vs. after, identifies new opportunities, and sends you a weekly action plan so you're always improving." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "#0f172a", color: "white", fontFamily: "Inter, sans-serif" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(15,23,42,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={18} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.02em" }}>ListingX</span>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: "0.9rem", color: "#94a3b8" }}>
          {["Features", "How It Works", "Pricing", "FAQ"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = "white")} onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}>{item}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/login" style={{ padding: "9px 20px", borderRadius: 9, fontSize: "0.875rem", fontWeight: 600, color: "white", textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.2s" }}>Log In</Link>
          <Link href="/signup" style={{ padding: "9px 20px", borderRadius: 9, fontSize: "0.875rem", fontWeight: 600, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", textDecoration: "none", boxShadow: "0 4px 12px rgba(99,102,241,0.4)" }}>Start Free Trial</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", top: "30%", left: "10%", width: 300, height: 300, background: "rgba(139,92,246,0.08)", borderRadius: "50%", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 250, height: 250, background: "rgba(99,102,241,0.1)", borderRadius: "50%", filter: "blur(60px)" }} />

        <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 16px", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 99, fontSize: "0.8rem", fontWeight: 600, color: "#a5b4fc", marginBottom: 32 }}>
            <Sparkles size={13} /> AI-Powered Ecommerce Growth Platform
          </div>

          <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 24 }}>
            Your AI Ecommerce<br />
            <span style={{ background: "linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 50%, #818cf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Growth Specialist</span>
          </h1>

          <p style={{ fontSize: "1.2rem", color: "#94a3b8", lineHeight: 1.7, maxWidth: 660, margin: "0 auto 40px" }}>
            Find what is stopping your products from selling — and fix it with AI. Analyze listings, discover missed opportunities, and generate everything needed to increase sales.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", borderRadius: 13, fontWeight: 700, fontSize: "1.05rem", textDecoration: "none", boxShadow: "0 8px 24px rgba(99,102,241,0.4)" }}>
              Start Free — 14 Days <ArrowRight size={18} />
            </Link>
            <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", background: "rgba(255,255,255,0.07)", color: "white", borderRadius: 13, fontWeight: 600, fontSize: "1.05rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)" }}>
              View Demo Dashboard
            </Link>
          </div>

          <p style={{ marginTop: 20, color: "#64748b", fontSize: "0.85rem" }}>No credit card required • Cancel anytime • 14-day free trial</p>

          {/* Stats */}
          <div style={{ display: "flex", gap: 48, justifyContent: "center", marginTop: 64, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
            {[["10,000+", "Sellers"], ["2M+", "Products Analyzed"], ["45%", "Avg Sales Uplift"], ["Amazon & Flipkart", "Supported"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, background: "linear-gradient(135deg,#a5b4fc,#c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{val}</div>
                <div style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE - Marketplaces */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px 0", overflow: "hidden", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ display: "flex", gap: 48, alignItems: "center", justifyContent: "center", flexWrap: "wrap", padding: "0 40px" }}>
          <span style={{ color: "#475569", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Supported Platforms</span>
          {marketplaces.map((m) => (
            <span key={m} style={{ color: "#64748b", fontWeight: 700, fontSize: "1rem" }}>{m}</span>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ color: "#818cf8", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>How It Works</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>From listing to growth<br />in three steps</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          {steps.map((s) => (
            <div key={s.step} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 36, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 16, right: 20, fontSize: "4rem", fontWeight: 900, color: "rgba(99,102,241,0.08)", lineHeight: 1 }}>{s.step}</div>
              <div style={{ width: 52, height: 52, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <s.icon size={24} color="white" />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: "0.95rem" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "80px 24px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: "#818cf8", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>Features</div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>Everything you need to grow</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {features.map((f) => (
              <div key={f.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 28, transition: "all 0.3s", cursor: "default" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                <div style={{ width: 44, height: 44, background: f.color + "20", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <f.icon size={20} color={f.color} />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>Sellers love ListingX</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 32 }}>
              <div style={{ display: "flex", marginBottom: 16 }}>
                {[...Array(t.stars)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p style={{ color: "#cbd5e1", lineHeight: 1.7, marginBottom: 24, fontSize: "0.95rem" }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{t.name}</div>
                  <div style={{ color: "#64748b", fontSize: "0.8rem" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "80px 24px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>Simple, transparent pricing</h2>
            <p style={{ color: "#94a3b8" }}>14-day free trial on all plans. No credit card required.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, alignItems: "center" }}>
            {pricing.map((p) => (
              <div key={p.name} style={{ background: p.featured ? "white" : "rgba(255,255,255,0.04)", border: `2px solid ${p.featured ? "#6366f1" : "rgba(255,255,255,0.08)"}`, borderRadius: 20, padding: 36, color: p.featured ? "#0f172a" : "white", position: "relative", transform: p.featured ? "scale(1.04)" : "scale(1)", transition: "all 0.3s", boxShadow: p.featured ? "0 0 0 6px rgba(99,102,241,0.15), 0 32px 64px rgba(99,102,241,0.2)" : "none" }}>
                {p.featured && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", padding: "4px 16px", borderRadius: 99, fontSize: "0.75rem", fontWeight: 700 }}>Most Popular</div>}
                <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: "2.5rem", fontWeight: 900 }}>${p.price}</span>
                  <span style={{ color: p.featured ? "#64748b" : "#94a3b8" }}>/{p.period}</span>
                </div>
                <div style={{ color: p.featured ? "#64748b" : "#94a3b8", fontSize: "0.85rem", marginBottom: 28 }}>Up to {p.products} products</div>
                <ul style={{ listStyle: "none", marginBottom: 32 }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12, fontSize: "0.9rem", color: p.featured ? "#374151" : "#cbd5e1" }}>
                      <CheckCircle size={16} color="#22c55e" style={{ marginTop: 2, flexShrink: 0 }} /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" style={{ display: "block", textAlign: "center", padding: "13px 24px", borderRadius: 12, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", background: p.featured ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.1)", color: "white", transition: "all 0.2s" }}>{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "100px 24px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>Frequently asked questions</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "none", border: "none", color: "white", fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", textAlign: "left", gap: 16 }}>
                {f.q}
                <ChevronDown size={18} style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              {openFaq === i && <div style={{ padding: "0 24px 20px", color: "#94a3b8", lineHeight: 1.7, fontSize: "0.9rem" }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "80px 24px", textAlign: "center", background: "rgba(99,102,241,0.06)", borderTop: "1px solid rgba(99,102,241,0.15)" }}>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 20 }}>Ready to grow your sales?</h2>
        <p style={{ color: "#94a3b8", fontSize: "1.1rem", marginBottom: 40 }}>Join 10,000+ sellers using ListingX to analyze, fix, and scale their ecommerce business.</p>
        <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "18px 40px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", borderRadius: 14, fontWeight: 700, fontSize: "1.05rem", textDecoration: "none", boxShadow: "0 8px 32px rgba(99,102,241,0.5)" }}>
          Start Free Trial — 14 Days <ArrowRight size={18} />
        </Link>
        <p style={{ marginTop: 16, color: "#475569", fontSize: "0.85rem" }}>No credit card required • Full access • Cancel anytime</p>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={14} color="white" /></div>
          <span style={{ fontWeight: 800, fontSize: "1rem" }}>ListingX</span>
        </div>
        <div style={{ color: "#475569", fontSize: "0.85rem" }}>© 2026 ListingX. All rights reserved. Built for global ecommerce sellers.</div>
        <div style={{ display: "flex", gap: 24, fontSize: "0.85rem", color: "#475569" }}>
          <a href="#" style={{ color: "#475569", textDecoration: "none" }}>Privacy</a>
          <a href="#" style={{ color: "#475569", textDecoration: "none" }}>Terms</a>
          <a href="#" style={{ color: "#475569", textDecoration: "none" }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}
