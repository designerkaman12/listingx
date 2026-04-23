"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Zap, Target, TrendingUp, CheckCircle, Star, ChevronDown, ShoppingCart, Search, Image, FileText, Users, Sparkles, Shield, MessageSquare, BarChart2, Globe } from "lucide-react";

const features = [
  { icon: Search, title: "AI Listing Diagnosis", desc: "Instantly identify why your product isn't selling — keywords, images, pricing, content." },
  { icon: Target, title: "Conversion Optimizer", desc: "Get a prioritized action plan to fix every listing gap and turn browsers into buyers." },
  { icon: FileText, title: "AI Content Generator", desc: "Generate optimized titles, bullets, descriptions, A+ content, and ad copy in seconds." },
  { icon: Image, title: "Creative Advisor", desc: "Get a detailed image brief for professional photography, infographics, and lifestyle shots." },
  { icon: TrendingUp, title: "Growth Forecasting", desc: "See estimated sales uplift projections before you invest — know the ROI upfront." },
  { icon: BarChart2, title: "Weekly Growth Manager", desc: "Your AI growth assistant re-analyzes listings every week and tracks improvement." },
  { icon: Users, title: "Competitor Intelligence", desc: "See what top competitors do better and close the gap with data-driven fixes." },
  { icon: Globe, title: "Multi-Marketplace", desc: "Platform-specific recommendations for Amazon, Flipkart, and more." },
];

const steps = [
  { n: "01", title: "Connect Your Store", desc: "Link your Amazon or Flipkart seller account. We import your inventory automatically.", icon: ShoppingCart },
  { n: "02", title: "AI Analyzes Everything", desc: "Our AI scans every product for 25+ performance factors — SEO, images, content, pricing.", icon: Zap },
  { n: "03", title: "Fix, Generate & Grow", desc: "Get a prioritized action plan, generate content instantly, and watch sales improve.", icon: TrendingUp },
];

const testimonials = [
  { name: "Rahul Mehta", role: "Amazon · Electronics", quote: "ListingX found 8 issues in my top product. After fixing them, sales went up 43% in 3 weeks.", stars: 5, initials: "RM" },
  { name: "Priya Sharma", role: "Flipkart · Beauty", quote: "The AI content generator saved me hours. Better than what I paid an agency for.", stars: 5, initials: "PS" },
  { name: "James Carter", role: "Amazon · Home & Kitchen", quote: "The competitor benchmarking alone is worth the subscription. I finally understand why I'm losing.", stars: 5, initials: "JC" },
];

const pricing = [
  { name: "Starter", price: 29, products: 20, features: ["AI listing diagnosis", "Basic content generation", "2 marketplaces", "Weekly growth report", "Email support"], featured: false },
  { name: "Pro", price: 79, products: 100, features: ["Everything in Starter", "Advanced AI analysis", "Unlimited content gen", "Competitor intelligence", "Sales forecasting", "Priority support", "Team access (3 seats)"], featured: true },
  { name: "Agency", price: 199, products: 500, features: ["Everything in Pro", "500+ products", "Unlimited marketplaces", "White-label reports", "API access", "Dedicated account manager"], featured: false },
];

const faqs = [
  { q: "Do I need technical knowledge?", a: "No. ListingX is built for ecommerce sellers. Everything is explained in plain business language with step-by-step action plans." },
  { q: "Which marketplaces are supported?", a: "Amazon and Flipkart with full analysis. Shopify, Meesho, Myntra, and Walmart are coming soon." },
  { q: "How accurate are the AI recommendations?", a: "Our AI is trained on marketplace best practices, top-listing patterns, and conversion data. All recommendations are platform-specific." },
  { q: "Can the AI generate listing content?", a: "Yes — titles, bullet points, descriptions, A+ content, FAQs, SEO keywords, ad copy, and image briefs." },
  { q: "Is there a free trial?", a: "Yes. All plans include a 14-day free trial with no credit card required." },
];

const PROMPTS = ["Why is my product not selling?", "Fix my listing title", "Generate bullet points", "Create a growth plan"];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "var(--bg)", color: "var(--text-primary)", fontFamily: "'Inter', sans-serif" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={16} color="white" /></div>
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>ListingX</span>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 14 }}>
          {["Features", "How It Works", "Pricing", "FAQ"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} style={{ color: "var(--text-secondary)", textDecoration: "none", fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>{item}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href="/login" className="btn btn-ghost btn-sm" style={{ textDecoration: "none" }}>Log In</Link>
          <Link href="/signup" className="btn btn-primary btn-sm" style={{ textDecoration: "none" }}>Start Free Trial</Link>
        </div>
      </nav>

      {/* HERO — Split Layout */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "96px 0 64px", background: "linear-gradient(160deg, #FAFBFF 0%, #F0F2FF 50%, #FAF5FF 100%)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          {/* Left — Copy */}
          <div className="animate-fade-in-up">
            <div className="hero-badge" style={{ marginBottom: 24 }}>
              <MessageSquare size={13} /> Chat-First AI Ecommerce OS
            </div>
            <h1 className="heading-display" style={{ marginBottom: 24 }}>
              Your AI Ecommerce<br />Specialist — <span className="text-gradient">Just Ask</span>
            </h1>
            <p className="body-lg" style={{ maxWidth: 480, marginBottom: 32, lineHeight: 1.7 }}>
              Type what you need. ListingX analyzes your listings, finds what&apos;s broken, generates content, and gives you one-click fixes — all through a single conversation.
            </p>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <Link href="/signup" className="btn btn-primary btn-xl" style={{ textDecoration: "none" }}>
                Start Free — 14 Days <ArrowRight size={16} />
              </Link>
              <Link href="/dashboard/chat" className="btn btn-secondary btn-xl" style={{ textDecoration: "none" }}>
                <MessageSquare size={16} /> Try Demo
              </Link>
            </div>
            <p className="caption" style={{ marginBottom: 32 }}>No credit card required · Cancel anytime</p>

            {/* Example Prompts */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {PROMPTS.map(p => (
                <span key={p} style={{ padding: "6px 14px", border: "1px solid var(--border)", borderRadius: 99, fontSize: 13, color: "var(--text-secondary)", background: "white" }}>{p}</span>
              ))}
            </div>
          </div>

          {/* Right — Chat Preview */}
          <div className="animate-fade-in-up delay-200" style={{ background: "white", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "var(--shadow-xl)", overflow: "hidden" }}>
            {/* Window Bar */}
            <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 6, background: "var(--bg-alt)" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
              <span style={{ marginLeft: 8, fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>ListingX AI Chat</span>
            </div>
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              {/* User */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ background: "var(--gradient)", color: "white", padding: "10px 16px", borderRadius: "16px 16px 4px 16px", fontSize: 14, maxWidth: "75%" }}>Why is my yoga mat not selling on Flipkart?</div>
              </div>
              {/* AI */}
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Zap size={12} color="white" /></div>
                <div style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", padding: "12px 16px", borderRadius: "16px 16px 16px 4px", fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)" }}>
                  <strong style={{ color: "var(--text-primary)" }}>🚨 Critical: Invisible on Flipkart</strong><br /><br />
                  Found <strong>7 issues</strong> — zero keywords, no description, only 1 image, pricing above competitors.<br /><br />
                  <span style={{ color: "var(--primary)", fontWeight: 600 }}>Shall I fix the title first?</span>
                </div>
              </div>
              {/* Actions */}
              <div style={{ display: "flex", gap: 6, paddingLeft: 36, flexWrap: "wrap" }}>
                {["✏️ Fix Title", "📝 Bullets", "📸 Images", "📈 Growth Plan"].map(a => (
                  <span key={a} style={{ padding: "5px 12px", border: "1px solid var(--border)", borderRadius: 99, fontSize: 12, fontWeight: 600, color: "var(--text-muted)", background: "white" }}>{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "32px 0", background: "white" }}>
        <div className="container" style={{ display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap" }}>
          {[["10,000+", "Active Sellers"], ["2M+", "Products Analyzed"], ["45%", "Avg Sales Uplift"], ["Amazon & Flipkart", "Fully Supported"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800 }} className="text-gradient">{v}</div>
              <div className="caption" style={{ marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="section">
        <div className="container">
          <div className="section-header">
            <span className="overline">How It Works</span>
            <h2 className="h2">From listing to growth in three steps</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {steps.map(s => (
              <div key={s.n} className="step-card card-hover">
                <div style={{ position: "absolute", top: 12, right: 16, fontSize: 56, fontWeight: 900, color: "rgba(79,70,229,0.05)", lineHeight: 1 }}>{s.n}</div>
                <div style={{ width: 44, height: 44, background: "var(--gradient)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <s.icon size={20} color="white" />
                </div>
                <h3 className="h4" style={{ marginBottom: 8 }}>{s.title}</h3>
                <p className="body">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section section-alt" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="section-header">
            <span className="overline">Features</span>
            <h2 className="h2">Everything you need to grow</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {features.map(f => (
              <div key={f.title} className="feature-card">
                <div style={{ width: 40, height: 40, background: "rgba(79,70,229,0.06)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <f.icon size={18} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: "var(--text-primary)" }}>{f.title}</h3>
                <p className="body-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="overline">Testimonials</span>
            <h2 className="h2">Sellers love ListingX</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {testimonials.map(t => (
              <div key={t.name} className="card card-hover" style={{ padding: 24 }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {[...Array(t.stars)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <p className="body" style={{ marginBottom: 24, lineHeight: 1.7 }}>&quot;{t.quote}&quot;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white" }}>{t.initials}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                    <div className="caption">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section section-alt" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="section-header">
            <span className="overline">Pricing</span>
            <h2 className="h2">Simple, transparent pricing</h2>
            <p className="body-lg">14-day free trial on all plans. No credit card required.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "start" }}>
            {pricing.map(p => (
              <div key={p.name} className={`pricing-card${p.featured ? " featured" : ""}`} style={{ position: "relative" }}>
                {p.featured && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--gradient)", color: "white", padding: "4px 16px", borderRadius: 99, fontSize: 12, fontWeight: 700 }}>Most Popular</div>}
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: 36, fontWeight: 800 }}>${p.price}</span>
                  <span className="caption">/mo</span>
                </div>
                <div className="caption" style={{ marginBottom: 24 }}>Up to {p.products} products</div>
                <ul style={{ listStyle: "none", marginBottom: 24 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 14, color: "var(--text-secondary)" }}>
                      <CheckCircle size={14} color="var(--success)" style={{ flexShrink: 0 }} /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className={`btn ${p.featured ? "btn-primary" : "btn-secondary"} btn-lg`} style={{ textDecoration: "none", width: "100%", justifyContent: "center" }}>Start Free Trial</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 32px" }}>
          <div className="section-header">
            <h2 className="h2">Frequently asked questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {faqs.map((f, i) => (
              <div key={i} className="card" style={{ overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "none", border: "none", color: "var(--text-primary)", fontWeight: 600, fontSize: 15, cursor: "pointer", textAlign: "left", gap: 16, fontFamily: "inherit" }}>
                  {f.q}
                  <ChevronDown size={16} style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform .25s", color: "var(--text-muted)" }} />
                </button>
                {openFaq === i && <div style={{ padding: "0 20px 16px", color: "var(--text-secondary)", lineHeight: 1.7, fontSize: 14, borderTop: "1px solid var(--border-light)" }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "64px 24px", textAlign: "center", background: "var(--gradient-soft)", borderTop: "1px solid rgba(79,70,229,0.1)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.15)", borderRadius: 99, padding: "4px 14px", fontSize: 12, fontWeight: 700, color: "#059669", marginBottom: 24 }}>
          <Shield size={12} /> SOC2 · SSL · GDPR
        </div>
        <h2 className="h2" style={{ marginBottom: 16 }}>Ready to grow your sales?</h2>
        <p className="body-lg" style={{ marginBottom: 32 }}>Join 10,000+ sellers using ListingX to analyze, fix, and scale.</p>
        <Link href="/signup" className="btn btn-primary btn-xl" style={{ textDecoration: "none" }}>
          Start Free Trial — 14 Days <ArrowRight size={16} />
        </Link>
        <p className="caption" style={{ marginTop: 16 }}>No credit card required · Full access · Cancel anytime</p>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "24px 32px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, background: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={12} color="white" /></div>
          <span style={{ fontWeight: 800, fontSize: 14 }}>ListingX</span>
        </div>
        <div className="caption">© 2026 ListingX. Built for global ecommerce sellers.</div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Contact"].map(l => (
            <a key={l} href="#" className="caption" style={{ textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
