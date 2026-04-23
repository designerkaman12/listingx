"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Eye, EyeOff, Mail, Lock, User, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleOAuth = async (provider: string) => {
    setLoading(provider);
    await new Promise(r => setTimeout(r, 1500));
    router.push("/onboarding");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("email");
    await new Promise(r => setTimeout(r, 1000));
    router.push("/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", fontFamily: "Inter, sans-serif" }}>
      {/* LEFT - Brand panel */}
      <div style={{ background: "linear-gradient(135deg, #F0F4FF 0%, #E8E0FF 50%, #F5F0FF 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 48, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", left: "15%", width: 200, height: 200, background: "rgba(79,140,255,0.12)", borderRadius: "50%", filter: "blur(50px)" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 250, height: 250, background: "rgba(168,85,247,0.08)", borderRadius: "50%", filter: "blur(60px)" }} />
        <div style={{ position: "relative", textAlign: "center", color: "var(--text)", maxWidth: 400 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 48 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-primary)" }}><Zap size={24} color="white" /></div>
            <span style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.02em" }}>ListingX</span>
          </div>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>Your AI Ecommerce<br />Growth Specialist</h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 48 }}>Analyze listings, fix what&apos;s broken, generate content, and grow your sales — all in one platform.</p>
          <div style={{ display: "grid", gap: 16 }}>
            {["🔍 AI-powered listing diagnosis", "✍️ Instant content generation", "📈 Sales uplift forecasting", "🏆 Competitor benchmarking"].map(item => (
              <div key={item} style={{ background: "rgba(79,140,255,0.06)", border: "1px solid rgba(79,140,255,0.12)", borderRadius: 12, padding: "14px 20px", textAlign: "left", fontSize: "0.9rem", color: "var(--text-secondary)" }}>{item}</div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT - Login form */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 48, background: "white" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Welcome back</h1>
            <p style={{ color: "#64748b" }}>Sign in to your ListingX account</p>
          </div>

          {/* OAuth buttons */}
          <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
            {[
              { id: "google", label: "Continue with Google", emoji: "🔵", color: "#4285F4" },
              { id: "amazon", label: "Continue with Amazon", emoji: "🟡", color: "#FF9900" },
              { id: "flipkart", label: "Continue with Flipkart", emoji: "🔷", color: "#2874F0" },
            ].map(p => (
              <button key={p.id} onClick={() => handleOAuth(p.id)} disabled={!!loading} style={{ width: "100%", padding: "13px 20px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "white", display: "flex", alignItems: "center", gap: 12, fontSize: "0.9rem", fontWeight: 600, color: "#0f172a", cursor: "pointer", transition: "all 0.2s", opacity: loading && loading !== p.id ? 0.5 : 1, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <span style={{ fontSize: "1.1rem" }}>{p.emoji}</span>
                {loading === p.id ? "Connecting..." : p.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            <span style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: 500 }}>or continue with email</span>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input type="email" placeholder="you@brand.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required style={{ width: "100%", padding: "11px 16px 11px 40px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: "0.9rem", outline: "none", fontFamily: "Inter, sans-serif", color: "#0f172a", background: "white", boxSizing: "border-box" }} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input type={show ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required style={{ width: "100%", padding: "11px 44px 11px 40px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: "0.9rem", outline: "none", fontFamily: "Inter, sans-serif", color: "#0f172a", background: "white", boxSizing: "border-box" }} />
                <button type="button" onClick={() => setShow(s => !s)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <a href="#" style={{ fontSize: "0.85rem", color: "#6366f1", textDecoration: "none", fontWeight: 500 }}>Forgot password?</a>
            </div>
            <button type="submit" disabled={!!loading} style={{ width: "100%", padding: "13px 24px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 10, fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}>
              {loading === "email" ? "Signing in..." : <><span>Sign In</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 24, color: "#64748b", fontSize: "0.875rem" }}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" style={{ color: "#6366f1", fontWeight: 600, textDecoration: "none" }}>Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
