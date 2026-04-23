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

  const G = "linear-gradient(135deg, #4F46E5, #9333EA)";
  const GS = "linear-gradient(135deg, rgba(79,70,229,0.06), rgba(147,51,234,0.04))";
  const B = "#E2E8F0";
  const T1 = "#0F172A";
  const T2 = "#475569";
  const TM = "#94A3B8";
  const SP = "0 4px 16px rgba(79,70,229,0.25)";
  const ctn: React.CSSProperties = { maxWidth: 1200, margin: "0 auto", padding: "0 24px" };
  const btnP: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: G, color: "white", padding: "14px 28px", borderRadius: 10, fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer", textDecoration: "none", boxShadow: SP, transition: "all .2s" };
  const btnS: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: "white", color: T1, padding: "14px 28px", borderRadius: 10, fontSize: 16, fontWeight: 600, border: `1.5px solid ${B}`, cursor: "pointer", textDecoration: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", transition: "all .2s" };
  const cardS: React.CSSProperties = { background: "white", border: `1px solid ${B}`, borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: 24 };
  const secH: React.CSSProperties = { textAlign: "center", marginBottom: 48 };
  const olS: React.CSSProperties = { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4F46E5", marginBottom: 16, display: "block" };

  return (
    <div style={{ background: "#fff", color: T1, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${B}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: G, display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={16} color="white" /></div>
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>ListingX</span>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 14 }}>
          {["Features", "How It Works", "Pricing", "FAQ"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} style={{ color: T2, textDecoration: "none", fontWeight: 500 }}>{item}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href="/login" style={{ ...btnS, padding: "8px 16px", fontSize: 14 }}>Log In</Link>
          <Link href="/signup" style={{ ...btnP, padding: "8px 16px", fontSize: 14 }}>Start Free Trial</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 96, paddingBottom: 80, background: "linear-gradient(150deg, #F8F9FF 0%, #EEF0FF 45%, #F5F0FF 100%)" }}>
        <div style={{ ...ctn, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", width: "100%" }}>

          {/* LEFT */}
          <div>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 99, background: "rgba(79,70,229,0.07)", border: "1px solid rgba(79,70,229,0.18)", fontSize: 12, fontWeight: 700, color: "#4F46E5", marginBottom: 28, letterSpacing: "0.01em" }}>
              <Sparkles size={12} /> Chat-First AI Ecommerce OS
            </div>

            {/* Heading */}
            <h1 style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", color: "#0F172A", marginBottom: 20, margin: "0 0 20px" }}>
              Your AI Ecommerce<br />
              <span style={{ background: G, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Specialist — Just Ask</span>
            </h1>

            {/* Subtext */}
            <p style={{ fontSize: 17, lineHeight: 1.75, color: "#475569", maxWidth: 460, margin: "0 0 36px" }}>
              Type what you need. ListingX finds what&apos;s broken in your listings, generates fixes, and delivers results — all in one conversation.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
              <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: G, color: "white", padding: "13px 24px", borderRadius: 10, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", textDecoration: "none", boxShadow: "0 4px 14px rgba(79,70,229,0.35)", whiteSpace: "nowrap" }}>
                Start Free — 14 Days <ArrowRight size={15} />
              </Link>
              <Link href="/dashboard/chat" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", color: "#0F172A", padding: "13px 24px", borderRadius: 10, fontSize: 15, fontWeight: 600, border: "1.5px solid #E2E8F0", cursor: "pointer", textDecoration: "none", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", whiteSpace: "nowrap" }}>
                <MessageSquare size={15} /> Try Live Demo
              </Link>
            </div>

            {/* Trust line */}
            <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 28 }}>No credit card required · Cancel anytime · Full access</p>

            {/* Prompt chips */}
            <div>
              <p style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Try asking:</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {PROMPTS.map(p => (
                  <span key={p} style={{ padding: "7px 14px", border: "1px solid #E2E8F0", borderRadius: 99, fontSize: 13, color: "#475569", background: "white", boxShadow: "0 1px 2px rgba(0,0,0,0.04)", cursor: "pointer" }}>{p}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Chat Preview Card */}
          <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 20, boxShadow: "0 20px 60px rgba(79,70,229,0.12), 0 4px 16px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            {/* Window chrome */}
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 6, background: "#FAFBFF" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FC5C65" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FED330" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#26DE81" }} />
              <span style={{ marginLeft: 10, fontSize: 12, fontWeight: 600, color: "#94A3B8" }}>ListingX AI Chat</span>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#10B981", fontWeight: 600 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} /> Online
              </div>
            </div>

            {/* Chat messages */}
            <div style={{ padding: "20px 20px 0" }}>
              {/* User message */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                <div style={{ background: G, color: "white", padding: "11px 16px", borderRadius: "18px 18px 4px 18px", fontSize: 14, maxWidth: "78%", lineHeight: 1.5, boxShadow: "0 2px 8px rgba(79,70,229,0.25)" }}>
                  Why is my yoga mat not selling on Flipkart?
                </div>
              </div>

              {/* AI message */}
              <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 6px rgba(79,70,229,0.3)" }}>
                  <Zap size={13} color="white" />
                </div>
                <div style={{ background: "#F8FAFC", border: "1px solid #F1F5F9", padding: "12px 16px", borderRadius: "18px 18px 18px 4px", fontSize: 14, lineHeight: 1.65, color: "#475569", flex: 1 }}>
                  <strong style={{ color: "#0F172A", display: "block", marginBottom: 8 }}>🚨 Critical: Product is invisible on Flipkart</strong>
                  Found <strong style={{ color: "#EF4444" }}>7 critical issues</strong> — no keywords in title, missing description, only 1 image, price ₹200 above top competitors.<br /><br />
                  <span style={{ color: "#4F46E5", fontWeight: 600 }}>Shall I fix the title first? It&apos;ll get you 3× more clicks.</span>
                </div>
              </div>
            </div>

            {/* Action chips */}
            <div style={{ padding: "0 20px 16px 20px", display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["✏️ Fix Title", "📝 Bullets", "📸 Image Plan", "📈 Growth"].map(a => (
                <span key={a} style={{ padding: "6px 13px", border: "1px solid #E2E8F0", borderRadius: 99, fontSize: 12, fontWeight: 600, color: "#475569", background: "white", cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>{a}</span>
              ))}
            </div>

            {/* Input bar */}
            <div style={{ margin: "0 16px 16px", display: "flex", alignItems: "center", gap: 8, background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "10px 14px" }}>
              <span style={{ fontSize: 13, color: "#94A3B8", flex: 1 }}>Ask anything about your listing...</span>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <ArrowRight size={13} color="white" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STATS */}
      <div style={{ borderTop: `1px solid ${B}`, borderBottom: `1px solid ${B}`, padding: "32px 0", background: "white" }}>
        <div style={{ ...ctn, display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap" }}>
          {[["10,000+", "Active Sellers"], ["2M+", "Products Analyzed"], ["45%", "Avg Sales Uplift"], ["Amazon & Flipkart", "Fully Supported"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, background: G, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{v}</div>
              <div style={{ fontSize: 12, color: TM, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "80px 0" }}>
        <div style={ctn}>
          <div style={secH}>
            <span style={olS}>How It Works</span>
            <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>From listing to growth in three steps</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {steps.map(s => (
              <div key={s.n} style={{ ...cardS, position: "relative", overflow: "hidden", padding: "32px 24px", transition: "all .25s" }}>
                <div style={{ position: "absolute", top: 12, right: 16, fontSize: 56, fontWeight: 900, color: "rgba(79,70,229,0.04)", lineHeight: 1 }}>{s.n}</div>
                <div style={{ width: 44, height: 44, background: G, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: SP }}>
                  <s.icon size={20} color="white" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: T2, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "80px 0", background: "#F8FAFC", borderTop: `1px solid ${B}`, borderBottom: `1px solid ${B}` }}>
        <div style={ctn}>
          <div style={secH}>
            <span style={olS}>Features</span>
            <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>Everything you need to grow</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {features.map(f => (
              <div key={f.title} style={{ ...cardS, transition: "all .25s" }}>
                <div style={{ width: 40, height: 40, background: "rgba(79,70,229,0.06)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <f.icon size={18} color="#4F46E5" />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: TM, lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 0" }}>
        <div style={ctn}>
          <div style={secH}>
            <span style={olS}>Testimonials</span>
            <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>Sellers love ListingX</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ ...cardS, transition: "all .25s" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {[...Array(t.stars)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <p style={{ fontSize: 14, color: T2, marginBottom: 24, lineHeight: 1.7 }}>&quot;{t.quote}&quot;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white" }}>{t.initials}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: TM }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "80px 0", background: "#F8FAFC", borderTop: `1px solid ${B}` }}>
        <div style={ctn}>
          <div style={secH}>
            <span style={olS}>Pricing</span>
            <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>Simple, transparent pricing</h2>
            <p style={{ fontSize: 16, color: T2, marginTop: 16 }}>14-day free trial on all plans. No credit card required.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "start" }}>
            {pricing.map(p => (
              <div key={p.name} style={{ ...cardS, position: "relative", borderColor: p.featured ? "#4F46E5" : B, borderWidth: p.featured ? 2 : 1, boxShadow: p.featured ? "0 0 0 3px rgba(79,70,229,0.08), 0 8px 24px rgba(0,0,0,0.08)" : cardS.boxShadow, padding: 32 }}>
                {p.featured && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: G, color: "white", padding: "4px 16px", borderRadius: 99, fontSize: 12, fontWeight: 700 }}>Most Popular</div>}
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: 36, fontWeight: 800 }}>${p.price}</span>
                  <span style={{ fontSize: 12, color: TM }}>/mo</span>
                </div>
                <div style={{ fontSize: 12, color: TM, marginBottom: 24 }}>Up to {p.products} products</div>
                <ul style={{ listStyle: "none", marginBottom: 24, padding: 0 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 14, color: T2 }}>
                      <CheckCircle size={14} color="#10B981" style={{ flexShrink: 0 }} /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" style={p.featured ? { ...btnP, width: "100%", justifyContent: "center" } : { ...btnS, width: "100%", justifyContent: "center" }}>Start Free Trial</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
          <div style={secH}>
            <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>Frequently asked questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ ...cardS, overflow: "hidden", padding: 0 }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", background: "none", border: "none", color: T1, fontWeight: 600, fontSize: 15, cursor: "pointer", textAlign: "left", gap: 16, fontFamily: "inherit" }}>
                  {f.q}
                  <ChevronDown size={16} style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform .25s", color: TM }} />
                </button>
                {openFaq === i && <div style={{ padding: "0 24px 16px", color: T2, lineHeight: 1.7, fontSize: 14, borderTop: "1px solid #F1F5F9" }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", textAlign: "center", background: GS, borderTop: "1px solid rgba(79,70,229,0.1)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.15)", borderRadius: 99, padding: "4px 14px", fontSize: 12, fontWeight: 700, color: "#059669", marginBottom: 24 }}>
          <Shield size={12} /> SOC2 · SSL · GDPR
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 16 }}>Ready to grow your sales?</h2>
        <p style={{ fontSize: 16, color: T2, marginBottom: 32 }}>Join 10,000+ sellers using ListingX to analyze, fix, and scale.</p>
        <Link href="/signup" style={btnP}>
          Start Free Trial — 14 Days <ArrowRight size={16} />
        </Link>
        <p style={{ fontSize: 13, color: TM, marginTop: 16 }}>No credit card required · Full access · Cancel anytime</p>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "24px 32px", borderTop: `1px solid ${B}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, background: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: G, display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={12} color="white" /></div>
          <span style={{ fontWeight: 800, fontSize: 14 }}>ListingX</span>
        </div>
        <div style={{ fontSize: 12, color: TM }}>© 2026 ListingX. Built for global ecommerce sellers.</div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Contact"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: TM, textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
