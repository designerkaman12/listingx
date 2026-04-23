"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, BarChart2, Zap, Target, TrendingUp, CheckCircle, Star, ChevronDown, Globe, ShoppingCart, Package, Search, Image, FileText, Users, Sparkles, AlertTriangle, Shield, MessageSquare, Send } from "lucide-react";

const features = [
  { icon: Search, title: "AI Listing Diagnosis", desc: "Instantly identify why your product isn't selling — from keyword gaps to image problems to pricing issues.", color: "#6366f1", bg: "rgba(99,102,241,0.08)" },
  { icon: Target, title: "Conversion Optimizer", desc: "Get a prioritized action plan to fix every listing gap and turn browsers into buyers.", color: "#8b5cf6", bg: "rgba(139,92,246,0.08)" },
  { icon: FileText, title: "AI Content Generator", desc: "Generate optimized titles, bullets, descriptions, A+ content, FAQs, and ad copy in seconds.", color: "#06b6d4", bg: "rgba(6,182,212,0.08)" },
  { icon: Image, title: "Creative Advisor", desc: "Get a detailed image brief for professional photography, infographics, and lifestyle shots.", color: "#f97316", bg: "rgba(249,115,22,0.08)" },
  { icon: TrendingUp, title: "Growth Forecasting", desc: "See estimated sales uplift projections before you invest in changes — know the ROI upfront.", color: "#22c55e", bg: "rgba(34,197,94,0.08)" },
  { icon: BarChart2, title: "Weekly Growth Manager", desc: "Your AI growth assistant re-analyzes listings every week and tracks your improvement over time.", color: "#ef4444", bg: "rgba(239,68,68,0.08)" },
  { icon: Users, title: "Competitor Intelligence", desc: "See exactly what top competitors are doing better and close the gap with data-driven fixes.", color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
  { icon: Globe, title: "Multi-Marketplace", desc: "Platform-specific recommendations for Amazon, Flipkart, and more — not generic advice.", color: "#10b981", bg: "rgba(16,185,129,0.08)" },
];

const steps = [
  { step: "01", title: "Connect Your Marketplace", desc: "Link your Amazon or Flipkart seller account. We import your inventory and listings automatically.", icon: ShoppingCart },
  { step: "02", title: "AI Analyzes Everything", desc: "Our AI scans every product for 25+ performance factors — SEO, images, content, pricing, reviews, and more.", icon: Zap },
  { step: "03", title: "Fix, Generate & Grow", desc: "Get a prioritized action plan, generate content instantly, and watch your sales improve week over week.", icon: TrendingUp },
];

const marketplaces = ["Amazon", "Flipkart", "Shopify", "Meesho", "Myntra", "Walmart", "eBay", "Etsy"];

const testimonials = [
  { name: "Rahul Mehta", role: "Amazon Seller · Electronics", quote: "ListingX found 8 issues in my top product that I completely missed. After fixing them, my sales went up 43% in 3 weeks.", stars: 5, initials: "RM", color: "#6366f1" },
  { name: "Priya Sharma", role: "Flipkart Brand Owner · Beauty", quote: "The AI content generator saved me hours. The bullets and A+ content it created are better than what I paid an agency for.", stars: 5, initials: "PS", color: "#ec4899" },
  { name: "James Carter", role: "Amazon Seller · Home & Kitchen", quote: "The competitor benchmarking alone is worth the subscription. I finally understand why I'm losing to competitors.", stars: 5, initials: "JC", color: "#f97316" },
];

const pricing = [
  { name: "Starter", price: 29, products: 20, features: ["AI listing diagnosis", "Basic content generation", "2 marketplaces", "Weekly growth report", "Email support"], cta: "Start Free Trial", featured: false },
  { name: "Pro", price: 79, products: 100, features: ["Everything in Starter", "Advanced AI analysis", "Unlimited content gen", "Competitor intelligence", "Sales forecasting", "Priority support", "Team access (3 seats)"], cta: "Start Free Trial", featured: true },
  { name: "Agency", price: 199, products: 500, features: ["Everything in Pro", "500+ products", "Unlimited marketplaces", "White-label reports", "API access", "Dedicated account manager", "Unlimited team seats"], cta: "Contact Sales", featured: false },
];

const faqs = [
  { q: "Do I need technical knowledge to use ListingX?", a: "No. ListingX is built for ecommerce sellers, not developers. Everything is explained in plain business language with step-by-step action plans." },
  { q: "Which marketplaces does ListingX support?", a: "We currently support Amazon and Flipkart with full analysis. Shopify, Meesho, Myntra, and Walmart are coming soon." },
  { q: "How accurate are the AI recommendations?", a: "Our AI is trained on marketplace best practices, top-listing patterns, and conversion data. All recommendations are backed by platform-specific logic, not generic advice." },
  { q: "Can the AI actually generate listing content?", a: "Yes. ListingX can generate optimized titles, bullet points, product descriptions, A+ content, FAQs, SEO keywords, ad copy, and image briefs — all tailored to your product and marketplace." },
  { q: "Is there a free trial?", a: "Yes. All plans include a 14-day free trial with no credit card required. You get full access to all features during your trial." },
  { q: "How does the weekly growth manager work?", a: "Every week, ListingX re-analyzes your listings, compares before vs. after, identifies new opportunities, and sends you a weekly action plan so you're always improving." },
];

const CHAT_PROMPTS = [
  "Why is my yoga mat not selling on Flipkart?",
  "Fix my product title for better SEO",
  "Generate bullet points for my earbuds",
  "Create an image brief for my listing",
  "Build me a 7-day growth plan",
  "Compare my product with competitors",
];

const S: Record<string, React.CSSProperties> = {
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 32px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", boxShadow: "0 1px 12px rgba(0,0,0,0.04)" },
  hero: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #FAFBFF 0%, #F0F4FF 40%, #F5F0FF 100%)" },
};

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif" }}>
      {/* NAV */}
      <nav style={S.nav}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-primary)" }}>
            <Zap size={18} color="white" />
          </div>
          <span style={{ fontWeight: 900, fontSize: "1.2rem", color: "var(--text)", letterSpacing: "-0.02em" }}>ListingX</span>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: "0.875rem" }}>
          {["Features", "How It Works", "Pricing", "FAQ"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} style={{ color: "#64748b", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0f172a")}
              onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}>{item}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/login" className="btn btn-secondary btn-sm" style={{ textDecoration: "none" }}>Log In</Link>
          <Link href="/signup" className="btn btn-primary btn-sm" style={{ textDecoration: "none" }}>Start Free Trial</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={S.hero}>
        {/* BG blobs */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", top: "20%", right: "5%", width: 350, height: 350, background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "30%", width: 300, height: 300, background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />

        <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>
          <div className="hero-badge animate-fade-in-up" style={{ marginBottom: 28 }}>
            <MessageSquare size={13} />
            <span>Chat-First AI Ecommerce Operating System</span>
          </div>

          <h1 className="heading-display animate-fade-in-up delay-100" style={{ marginBottom: 24, color: "var(--text)" }}>
            Your AI Ecommerce<br />
            Specialist — <span className="text-gradient-primary">Just Ask</span>
          </h1>

          <p className="animate-fade-in-up delay-200" style={{ fontSize: "1.15rem", color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 40px" }}>
            Type what you need. ListingX analyzes your listings, finds what&apos;s broken, generates content, and gives you one-click fixes — all through a single conversation.
          </p>

          <div className="animate-fade-in-up delay-300" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
            <Link href="/signup" className="btn btn-primary btn-xl" style={{ textDecoration: "none", gap: 10 }}>
              Start Free — 14 Days <ArrowRight size={18} />
            </Link>
            <Link href="/dashboard/chat" className="btn btn-secondary btn-xl" style={{ textDecoration: "none", gap: 8 }}>
              <MessageSquare size={16} /> Try AI Chat Demo
            </Link>
          </div>
          <p className="animate-fade-in-up delay-400" style={{ color: "#94a3b8", fontSize: "0.82rem" }}>No credit card required · Cancel anytime · Full access trial</p>

          {/* Chat Demo Card */}
          <div className="animate-fade-in-up delay-500 chat-demo-container" style={{ marginTop: 60, textAlign: "left" }}>
            <div className="chat-demo-header">
              <div className="chat-demo-dot" style={{ background: "#EF4444" }} />
              <div className="chat-demo-dot" style={{ background: "#F59E0B" }} />
              <div className="chat-demo-dot" style={{ background: "#10B981" }} />
              <span style={{ marginLeft: 8, fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)" }}>ListingX AI Chat</span>
            </div>
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              {/* User msg */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ background: "var(--gradient-primary)", color: "white", padding: "12px 18px", borderRadius: "18px 18px 6px 18px", fontSize: "0.88rem", maxWidth: "70%", boxShadow: "var(--shadow-primary)" }}>Why is my yoga mat not selling on Flipkart?</div>
              </div>
              {/* AI msg */}
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Zap size={14} color="white" /></div>
                <div style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)", padding: "14px 18px", borderRadius: "18px 18px 18px 6px", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: "80%" }}>
                  <strong>🚨 Critical: This product is invisible on Flipkart</strong><br /><br />
                  Found <strong>7 issues</strong> — your title has zero keywords, no description, only 1 image, and pricing is above competitors.<br /><br />
                  <span style={{ color: "var(--primary)", fontWeight: 600 }}>Shall I fix the title first?</span>
                </div>
              </div>
              {/* Action buttons */}
              <div style={{ display: "flex", gap: 8, paddingLeft: 42, flexWrap: "wrap" }}>
                {["✏️ Fix My Title", "📝 Generate Bullets", "📸 Image Brief", "📈 Growth Plan"].map(a => (
                  <span key={a} style={{ padding: "7px 14px", border: "1.5px solid var(--border)", borderRadius: 99, fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", background: "white" }}>{a}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up delay-600" style={{ display: "flex", gap: 48, justifyContent: "center", marginTop: 64, paddingTop: 48, borderTop: "1px solid #e2e8f0", flexWrap: "wrap" }}>
            {[["10,000+", "Active Sellers"], ["2M+", "Products Analyzed"], ["45%", "Avg Sales Uplift"], ["Amazon & Flipkart", "Fully Supported"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 900 }} className="text-gradient-primary">{val}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.825rem", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", padding: "18px 0", background: "white" }}>
        <div style={{ display: "flex", gap: 40, alignItems: "center", justifyContent: "center", flexWrap: "wrap", padding: "0 32px" }}>
          <span style={{ color: "#94a3b8", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Supported Platforms</span>
          {marketplaces.map(m => (
            <span key={m} style={{ color: "#64748b", fontWeight: 700, fontSize: "0.9rem" }}>{m}</span>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>How It Works</div>
          <h2 className="heading-xl">From listing to growth<br />in three steps</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 28 }}>
          {steps.map(s => (
            <div key={s.step} className="step-card card-hover">
              <div style={{ position: "absolute", top: 16, right: 20, fontSize: "4.5rem", fontWeight: 900, color: "rgba(99,102,241,0.07)", lineHeight: 1 }}>{s.step}</div>
              <div style={{ width: 52, height: 52, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}>
                <s.icon size={24} color="white" />
              </div>
              <h3 className="heading-md" style={{ marginBottom: 12 }}>{s.title}</h3>
              <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: "0.95rem" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "80px 24px", background: "white", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label" style={{ marginBottom: 16 }}>Features</div>
            <h2 className="heading-xl">Everything you need to grow</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 20 }}>
            {features.map(f => (
              <div key={f.title} className="feature-card">
                <div style={{ width: 44, height: 44, background: f.bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <f.icon size={20} color={f.color} />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 8, color: "#0f172a" }}>{f.title}</h3>
                <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Social Proof</div>
          <h2 className="heading-xl">Sellers love ListingX</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 24 }}>
          {testimonials.map(t => (
            <div key={t.name} className="card card-hover" style={{ padding: 32 }}>
              <div style={{ display: "flex", marginBottom: 16 }}>
                {[...Array(t.stars)].map((_, i) => <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p style={{ color: "#374151", lineHeight: 1.75, marginBottom: 24, fontSize: "0.95rem" }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg,${t.color},${t.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.82rem", fontWeight: 800, color: "white" }}>{t.initials}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a" }}>{t.name}</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.78rem" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "80px 24px", background: "white", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label" style={{ marginBottom: 16 }}>Pricing</div>
            <h2 className="heading-xl" style={{ marginBottom: 12 }}>Simple, transparent pricing</h2>
            <p style={{ color: "#64748b" }}>14-day free trial on all plans. No credit card required.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 24, alignItems: "center" }}>
            {pricing.map(p => (
              <div key={p.name} className={`pricing-card${p.featured ? " featured" : ""}`} style={{ transform: p.featured ? "scale(1.04)" : "scale(1)", position: "relative" }}>
                {p.featured && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", padding: "4px 18px", borderRadius: 99, fontSize: "0.75rem", fontWeight: 700 }}>Most Popular</div>}
                <div style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 8, color: "#0f172a" }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: "2.8rem", fontWeight: 900, color: "#0f172a" }}>${p.price}</span>
                  <span style={{ color: "#94a3b8" }}>/mo</span>
                </div>
                <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: 28 }}>Up to {p.products} products</div>
                <ul style={{ listStyle: "none", marginBottom: 32 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12, fontSize: "0.875rem", color: "#374151" }}>
                      <CheckCircle size={15} color="#22c55e" style={{ marginTop: 2, flexShrink: 0 }} /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className={`btn ${p.featured ? "btn-primary" : "btn-secondary"} btn-lg`} style={{ textDecoration: "none", width: "100%", justifyContent: "center" }}>{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "100px 24px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 className="heading-xl">Frequently asked questions</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {faqs.map((f, i) => (
            <div key={i} className="card" style={{ overflow: "hidden" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "none", border: "none", color: "#0f172a", fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", textAlign: "left", gap: 16, fontFamily: "Inter,sans-serif" }}>
                {f.q}
                <ChevronDown size={17} style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.25s", color: "#94a3b8" }} />
              </button>
              {openFaq === i && <div style={{ padding: "0 24px 20px", color: "#64748b", lineHeight: 1.75, fontSize: "0.9rem", borderTop: "1px solid #f1f5f9" }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", textAlign: "center", background: "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.04) 100%)", borderTop: "1px solid rgba(99,102,241,0.12)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 99, padding: "5px 14px", fontSize: "0.78rem", fontWeight: 700, color: "#16a34a", marginBottom: 24 }}>
          <Shield size={12} /> SOC2 Compliant · SSL Encrypted · GDPR Ready
        </div>
        <h2 className="heading-xl" style={{ marginBottom: 20 }}>Ready to grow your sales?</h2>
        <p style={{ color: "#64748b", fontSize: "1.05rem", marginBottom: 40 }}>Join 10,000+ sellers using ListingX to analyze, fix, and scale their ecommerce business.</p>
        <Link href="/signup" className="btn btn-primary btn-xl" style={{ textDecoration: "none", gap: 10 }}>
          Start Free Trial — 14 Days <ArrowRight size={18} />
        </Link>
        <p style={{ marginTop: 16, color: "#94a3b8", fontSize: "0.82rem" }}>No credit card required · Full access · Cancel anytime</p>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "36px 32px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, background: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={14} color="white" /></div>
          <span style={{ fontWeight: 900, fontSize: "1rem", color: "#0f172a" }}>ListingX</span>
        </div>
        <div style={{ color: "#94a3b8", fontSize: "0.82rem" }}>© 2026 ListingX. Built for global ecommerce sellers.</div>
        <div style={{ display: "flex", gap: 24, fontSize: "0.82rem" }}>
          {["Privacy", "Terms", "Contact"].map(l => (
            <a key={l} href="#" style={{ color: "#94a3b8", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
