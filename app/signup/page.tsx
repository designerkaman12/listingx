"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleOAuth = async (provider: string) => {
    setLoading(provider);
    await new Promise(r => setTimeout(r, 1500));
    router.push("/onboarding");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("email");
    await new Promise(r => setTimeout(r, 1000));
    router.push("/onboarding");
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", fontFamily: "Inter, sans-serif" }}>
      {/* LEFT */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 48, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", left: "15%", width: 200, height: 200, background: "rgba(99,102,241,0.15)", borderRadius: "50%", filter: "blur(50px)" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 250, height: 250, background: "rgba(139,92,246,0.1)", borderRadius: "50%", filter: "blur(60px)" }} />
        <div style={{ position: "relative", textAlign: "center", color: "white", maxWidth: 400 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 48 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={24} color="white" /></div>
            <span style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.02em" }}>ListingX</span>
          </div>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 16 }}>Start growing your<br />sales today</h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: 40 }}>Join 10,000+ sellers who use ListingX to diagnose listing issues and generate everything needed to sell more.</p>
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 24, textAlign: "left" }}>
            <div style={{ color: "#f59e0b", fontWeight: 700, marginBottom: 12, fontSize: "0.85rem" }}>✦ FREE 14-DAY TRIAL INCLUDES</div>
            {["Full AI listing diagnosis on all products", "AI content generation (titles, bullets, A+)", "Competitor benchmarking & gap analysis", "Weekly growth reports & action plans", "Sales uplift forecasting"].map(item => (
              <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10, fontSize: "0.875rem", color: "#e2e8f0" }}>
                <span style={{ color: "#22c55e", marginTop: 1 }}>✓</span> {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 48, background: "#f8fafc" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Create your account</h1>
            <p style={{ color: "#64748b" }}>14-day free trial · No credit card needed</p>
          </div>

          <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
            {[
              { id: "google", label: "Continue with Google", emoji: "🔵" },
              { id: "amazon", label: "Continue with Amazon", emoji: "🟡" },
              { id: "flipkart", label: "Continue with Flipkart", emoji: "🔷" },
            ].map(p => (
              <button key={p.id} onClick={() => handleOAuth(p.id)} disabled={!!loading} style={{ width: "100%", padding: "13px 20px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "white", display: "flex", alignItems: "center", gap: 12, fontSize: "0.9rem", fontWeight: 600, color: "#0f172a", cursor: "pointer", opacity: loading && loading !== p.id ? 0.5 : 1, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <span style={{ fontSize: "1.1rem" }}>{p.emoji}</span>
                {loading === p.id ? "Connecting..." : p.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            <span style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: 500 }}>or sign up with email</span>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Full Name</label>
              <div style={{ position: "relative" }}>
                <User size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required style={{ width: "100%", padding: "11px 16px 11px 40px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: "0.9rem", outline: "none", fontFamily: "Inter, sans-serif", color: "#0f172a", background: "white", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Work Email</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input type="email" placeholder="you@brand.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required style={{ width: "100%", padding: "11px 16px 11px 40px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: "0.9rem", outline: "none", fontFamily: "Inter, sans-serif", color: "#0f172a", background: "white", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input type={show ? "text" : "password"} placeholder="Min 8 characters" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required minLength={8} style={{ width: "100%", padding: "11px 44px 11px 40px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: "0.9rem", outline: "none", fontFamily: "Inter, sans-serif", color: "#0f172a", background: "white", boxSizing: "border-box" }} />
                <button type="button" onClick={() => setShow(s => !s)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={!!loading} style={{ width: "100%", padding: "13px 24px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 10, fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 12px rgba(99,102,241,0.3)", marginTop: 4 }}>
              {loading === "email" ? "Creating account..." : <><span>Create Free Account</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 16, color: "#94a3b8", fontSize: "0.8rem" }}>
            By signing up, you agree to our{" "}
            <a href="#" style={{ color: "#6366f1" }}>Terms of Service</a> and{" "}
            <a href="#" style={{ color: "#6366f1" }}>Privacy Policy</a>
          </p>

          <p style={{ textAlign: "center", marginTop: 20, color: "#64748b", fontSize: "0.875rem" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#6366f1", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
