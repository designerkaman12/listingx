"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, ShoppingCart, Package, CheckCircle, ArrowRight, Loader2 } from "lucide-react";

const steps = ["Your Profile", "Connect Marketplace", "Import Inventory", "AI Analysis", "Done"];

const goals = ["Increase sales", "Improve listings", "Build brand", "Improve conversion", "Launch products", "All-in-one growth"];
const categories = ["Electronics", "Fashion & Apparel", "Home & Kitchen", "Beauty & Personal Care", "Sports & Fitness", "Books & Media", "Toys & Games", "Automotive", "Health & Wellness", "Other"];
const countries = ["India", "United States", "United Kingdom", "UAE", "Germany", "Australia", "Canada", "Singapore"];

const ANALYSIS_MESSAGES = [
  "Scanning product titles and keywords...",
  "Analyzing image quality and count...",
  "Checking A+ content presence...",
  "Evaluating pricing vs competitors...",
  "Assessing review strength and ratings...",
  "Calculating SEO keyword gaps...",
  "Building conversion score models...",
  "Generating growth potential scores...",
  "Identifying missed opportunities...",
  "Preparing your dashboard...",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ marketplaces: [] as string[], category: "", brand: "", country: "", goal: "" });
  const [connected, setConnected] = useState<string[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [analysisMsg, setAnalysisMsg] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);

  const toggleMarketplace = (m: string) => {
    setProfile(p => ({ ...p, marketplaces: p.marketplaces.includes(m) ? p.marketplaces.filter(x => x !== m) : [...p.marketplaces, m] }));
  };

  const handleConnect = async (platform: string) => {
    setConnecting(platform);
    await new Promise(r => setTimeout(r, 2000));
    setConnected(c => [...c, platform]);
    setConnecting(null);
  };

  const handleImport = async () => {
    setImporting(true);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 200));
      setImportProgress(i);
    }
    setTimeout(() => setStep(3), 500);
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    for (let i = 0; i < ANALYSIS_MESSAGES.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setAnalysisMsg(i);
      setAnalysisProgress(Math.round(((i + 1) / ANALYSIS_MESSAGES.length) * 100));
    }
    setTimeout(() => setStep(4), 500);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      {/* Top bar */}
      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={16} color="white" /></div>
          <span style={{ fontWeight: 800, color: "#0f172a", fontSize: "1.1rem" }}>ListingX</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: i < step ? "#22c55e" : i === step ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: i <= step ? "white" : "#94a3b8", flexShrink: 0 }}>
                {i < step ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span style={{ fontSize: "0.8rem", fontWeight: i === step ? 600 : 400, color: i === step ? "#0f172a" : "#94a3b8", display: i === step ? "block" : "none" }}>{s}</span>
              {i < steps.length - 1 && <div style={{ width: 24, height: 1, background: "#e2e8f0" }} />}
            </div>
          ))}
        </div>
        <div style={{ width: 120 }} />
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "60px 24px" }}>

        {/* STEP 0 - Profile */}
        {step === 0 && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Tell us about your business</h1>
            <p style={{ color: "#64748b", marginBottom: 40 }}>This helps us personalize your ListingX experience from day one.</p>

            <div style={{ display: "grid", gap: 24 }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, color: "#374151", marginBottom: 10, fontSize: "0.9rem" }}>Where do you sell? (select all that apply)</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {["Amazon", "Flipkart", "Shopify", "Meesho", "Myntra", "Walmart"].map(m => (
                    <button key={m} onClick={() => toggleMarketplace(m)} style={{ padding: "9px 18px", borderRadius: 9, fontSize: "0.875rem", fontWeight: 600, border: `2px solid ${profile.marketplaces.includes(m) ? "#6366f1" : "#e2e8f0"}`, background: profile.marketplaces.includes(m) ? "rgba(99,102,241,0.1)" : "white", color: profile.marketplaces.includes(m) ? "#6366f1" : "#64748b", cursor: "pointer", transition: "all 0.2s" }}>{m}</button>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, color: "#374151", marginBottom: 6, fontSize: "0.9rem" }}>Your Category</label>
                  <select value={profile.category} onChange={e => setProfile(p => ({ ...p, category: e.target.value }))} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: "0.9rem", fontFamily: "Inter, sans-serif", color: "#0f172a", background: "white", outline: "none" }}>
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, color: "#374151", marginBottom: 6, fontSize: "0.9rem" }}>Your Country</label>
                  <select value={profile.country} onChange={e => setProfile(p => ({ ...p, country: e.target.value }))} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: "0.9rem", fontFamily: "Inter, sans-serif", color: "#0f172a", background: "white", outline: "none" }}>
                    <option value="">Select country</option>
                    {countries.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontWeight: 600, color: "#374151", marginBottom: 6, fontSize: "0.9rem" }}>Brand Name</label>
                <input type="text" placeholder="e.g. NovaBrand, TechPro, etc." value={profile.brand} onChange={e => setProfile(p => ({ ...p, brand: e.target.value }))} style={{ width: "100%", padding: "11px 16px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: "0.9rem", fontFamily: "Inter, sans-serif", color: "#0f172a", background: "white", outline: "none", boxSizing: "border-box" }} />
              </div>

              <div>
                <label style={{ display: "block", fontWeight: 600, color: "#374151", marginBottom: 10, fontSize: "0.9rem" }}>Your Main Goal</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {goals.map(g => (
                    <button key={g} onClick={() => setProfile(p => ({ ...p, goal: g }))} style={{ padding: "12px 16px", borderRadius: 10, fontSize: "0.875rem", fontWeight: 600, border: `2px solid ${profile.goal === g ? "#6366f1" : "#e2e8f0"}`, background: profile.goal === g ? "rgba(99,102,241,0.08)" : "white", color: profile.goal === g ? "#6366f1" : "#64748b", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>{g}</button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => setStep(1)} style={{ marginTop: 32, padding: "14px 32px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 12, fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}>
              Continue <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 1 - Connect */}
        {step === 1 && (
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Connect your marketplace</h1>
            <p style={{ color: "#64748b", marginBottom: 40 }}>Securely connect your seller accounts to import your inventory and listings.</p>

            <div style={{ display: "grid", gap: 16 }}>
              {[
                { id: "Amazon", logo: "🟡", desc: "Import all ASINs, listings, and performance data from Amazon Seller Central", color: "#FF9900" },
                { id: "Flipkart", logo: "🔷", desc: "Connect Flipkart Seller Hub and sync your full catalog automatically", color: "#2874F0" },
              ].map(mp => (
                <div key={mp.id} style={{ background: "white", border: `2px solid ${connected.includes(mp.id) ? "#22c55e" : "#e2e8f0"}`, borderRadius: 16, padding: 24, display: "flex", alignItems: "center", gap: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <div style={{ fontSize: "2.5rem" }}>{mp.logo}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#0f172a", marginBottom: 4 }}>{mp.id}</div>
                    <div style={{ color: "#64748b", fontSize: "0.875rem" }}>{mp.desc}</div>
                  </div>
                  {connected.includes(mp.id) ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#22c55e", fontWeight: 700, fontSize: "0.9rem" }}><CheckCircle size={18} /> Connected</div>
                  ) : (
                    <button onClick={() => handleConnect(mp.id)} disabled={connecting === mp.id} style={{ padding: "10px 22px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 10, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", minWidth: 120 }}>
                      {connecting === mp.id ? "Connecting..." : "Connect"}
                    </button>
                  )}
                </div>
              ))}
              <div style={{ background: "#f8fafc", border: "2px dashed #e2e8f0", borderRadius: 16, padding: 24, textAlign: "center", color: "#94a3b8", fontSize: "0.875rem" }}>
                ⚡ More marketplaces coming soon: Shopify, Meesho, Myntra, Walmart, eBay
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
              <button onClick={() => setStep(0)} style={{ padding: "13px 24px", background: "white", color: "#64748b", border: "1.5px solid #e2e8f0", borderRadius: 12, fontWeight: 600, cursor: "pointer" }}>Back</button>
              <button onClick={() => setStep(2)} disabled={connected.length === 0} style={{ padding: "13px 28px", background: connected.length > 0 ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#e2e8f0", color: "white", border: "none", borderRadius: 12, fontWeight: 700, cursor: connected.length > 0 ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8 }}>
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 - Import */}
        {step === 2 && (
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Import your inventory</h1>
            <p style={{ color: "#64748b", marginBottom: 40 }}>We&apos;ll pull in all your product listings from your connected marketplaces.</p>

            {!importing ? (
              <div>
                <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 32, textAlign: "center", marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <Package size={48} color="#6366f1" style={{ margin: "0 auto 16px" }} />
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#0f172a", marginBottom: 8 }}>Ready to import</div>
                  <div style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: 8 }}>Connected accounts: <strong>{connected.join(", ")}</strong></div>
                  <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Estimated: 10 products found · 2-3 min import time</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => setStep(1)} style={{ padding: "13px 24px", background: "white", color: "#64748b", border: "1.5px solid #e2e8f0", borderRadius: 12, fontWeight: 600, cursor: "pointer" }}>Back</button>
                  <button onClick={handleImport} style={{ flex: 1, padding: "14px 24px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 12, fontWeight: 700, cursor: "pointer", fontSize: "0.95rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <ShoppingCart size={18} /> Start Import
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 40, textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>📦</div>
                <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#0f172a", marginBottom: 24 }}>Importing your inventory...</div>
                <div style={{ height: 8, background: "#f1f5f9", borderRadius: 99, overflow: "hidden", marginBottom: 12 }}>
                  <div style={{ height: "100%", width: `${importProgress}%`, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 99, transition: "width 0.3s" }} />
                </div>
                <div style={{ color: "#64748b", fontSize: "0.875rem" }}>{importProgress}% complete · {Math.round((100 - importProgress) / 10 * 0.3)} seconds remaining</div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3 - AI Analysis */}
        {step === 3 && (
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>AI is analyzing your products</h1>
            <p style={{ color: "#64748b", marginBottom: 40 }}>Our AI will check 25+ performance factors for each of your listings.</p>

            {!analyzing ? (
              <div>
                <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 32, marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <div style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a", marginBottom: 16 }}>What we analyze:</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {["Listing title quality", "Bullet points & content", "A+ content presence", "Image quality & count", "SEO & keyword gaps", "Pricing vs competitors", "Review strength", "Conversion bottlenecks", "Brand presence", "Category fit & SEO", "Growth potential score", "Missed opportunities"].map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.875rem", color: "#64748b" }}>
                        <CheckCircle size={14} color="#22c55e" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={handleAnalyze} style={{ width: "100%", padding: "15px 24px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 12, fontWeight: 700, fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 6px 20px rgba(99,102,241,0.35)" }}>
                  <Zap size={18} /> Run AI Analysis
                </button>
              </div>
            ) : (
              <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 40, textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>🤖</div>
                <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#0f172a", marginBottom: 8 }}>Analyzing your listings...</div>
                <div style={{ color: "#6366f1", fontSize: "0.875rem", fontWeight: 500, marginBottom: 24, minHeight: 20 }}>✦ {ANALYSIS_MESSAGES[analysisMsg]}</div>
                <div style={{ height: 8, background: "#f1f5f9", borderRadius: 99, overflow: "hidden", marginBottom: 12 }}>
                  <div style={{ height: "100%", width: `${analysisProgress}%`, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 99, transition: "width 0.4s" }} />
                </div>
                <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{analysisProgress}% · Analyzing {Math.ceil(analysisProgress / 10)} of 10 products</div>
              </div>
            )}
          </div>
        )}

        {/* STEP 4 - Done */}
        {step === 4 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "5rem", marginBottom: 24 }}>🎉</div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>You&apos;re all set!</h1>
            <p style={{ color: "#64748b", fontSize: "1.05rem", marginBottom: 16 }}>ListingX has analyzed <strong>10 products</strong> and found <strong>47 optimization opportunities</strong> to grow your sales.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, margin: "40px 0", textAlign: "center" }}>
              {[["3", "Needs Immediate Fix", "#ef4444"], ["5", "Have Potential", "#f97316"], ["2", "High Selling", "#22c55e"]].map(([val, label, color]) => (
                <div key={label} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color }}>{val}</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500, marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => router.push("/dashboard")} style={{ padding: "16px 40px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 13, fontWeight: 700, fontSize: "1.05rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "0 8px 24px rgba(99,102,241,0.4)" }}>
              Go to Dashboard <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
