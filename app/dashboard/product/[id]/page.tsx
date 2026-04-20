"use client";
import { use } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { generateAnalysis } from "@/lib/mock-ai";
import { getScoreColor, getScoreLabel } from "@/lib/utils";
import { ArrowLeft, AlertTriangle, CheckCircle, Zap, TrendingUp, Star, ExternalLink, Sparkles } from "lucide-react";

const SEVERITY_COLOR = { critical: "#ef4444", high: "#f97316", medium: "#f59e0b", low: "#22c55e" };
const SEVERITY_BG = { critical: "#fef2f2", high: "#fff7ed", medium: "#fffbeb", low: "#f0fdf4" };
const CATEGORY_ICON: Record<string, string> = { seo: "🔍", content: "📝", visual: "🖼️", pricing: "💰", brand: "🏷️", reviews: "⭐", listing: "📋" };
const IMPACT_COLOR = { high: "#ef4444", medium: "#f97316", low: "#22c55e" };

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  if (!product) return <div style={{ padding: 40, color: "#ef4444" }}>Product not found. <Link href="/dashboard">Go back</Link></div>;

  const report = generateAnalysis(product);
  const scores = [
    { label: "Listing Quality", value: product.listingScore },
    { label: "SEO Score", value: product.seoScore },
    { label: "Visual Content", value: product.visualScore },
    { label: "Conversion", value: product.conversionScore },
    { label: "Brand Strength", value: product.brandScore },
    { label: "Growth Potential", value: product.growthPotentialScore },
    { label: "Marketplace Fit", value: product.marketplaceFitScore },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      {/* Back */}
      <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#64748b", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500, marginBottom: 20 }}>
        <ArrowLeft size={15} /> Back to Dashboard
      </Link>

      {/* Product Header */}
      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.05)", display: "flex", gap: 20, alignItems: "flex-start" }}>
        <img src={product.image} alt={product.title} style={{ width: 90, height: 90, borderRadius: 12, objectFit: "cover", border: "1px solid #f1f5f9", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{ padding: "4px 12px", background: product.marketplace === "Amazon" ? "#fff8e6" : "#eff6ff", color: product.marketplace === "Amazon" ? "#c07000" : "#1a56db", borderRadius: 7, fontSize: "0.78rem", fontWeight: 700 }}>{product.marketplace}</span>
            <span style={{ padding: "4px 12px", background: "#f1f5f9", color: "#64748b", borderRadius: 7, fontSize: "0.78rem", fontWeight: 600 }}>{product.category}</span>
            <span style={{ padding: "4px 12px", background: "#f1f5f9", color: "#64748b", borderRadius: 7, fontSize: "0.78rem", fontWeight: 600 }}>ASIN: {product.asin}</span>
          </div>
          <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: 8, lineHeight: 1.4 }}>{product.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: "0.85rem", color: "#64748b" }}>
            <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>{product.currency === "INR" ? "₹" : "$"}{product.price}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>{[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "#f59e0b" : "#e2e8f0"} color={i < Math.floor(product.rating) ? "#f59e0b" : "#e2e8f0"} />)} {product.rating} ({product.reviews} reviews)</span>
            <span>Sales 30d: <strong>{product.currency === "INR" ? "₹" : "$"}{product.salesLast30Days.toLocaleString()}</strong></span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <Link href={`/dashboard/generate?product=${product.id}`} style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", borderRadius: 10, fontSize: "0.875rem", fontWeight: 700, textDecoration: "none" }}>
            <Sparkles size={14} /> Generate Content
          </Link>
        </div>
      </div>

      {/* AI Headline */}
      <div style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)", border: "1px solid #312e81", borderRadius: 16, padding: "20px 24px", marginBottom: 24, color: "white" }}>
        <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>✦ AI Diagnosis</div>
        <div style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>{report.headline}</div>
        <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: "0.9rem" }}>{report.tldr}</p>
      </div>

      {/* Score Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {scores.slice(0, 4).map(s => (
          <div key={s.label} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: "18px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: getScoreColor(s.value), marginBottom: 4 }}>{s.value}</div>
            <div style={{ height: 5, background: "#f1f5f9", borderRadius: 99, margin: "8px 0", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${s.value}%`, background: getScoreColor(s.value), borderRadius: 99 }} />
            </div>
            <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: "0.72rem", color: getScoreColor(s.value), fontWeight: 700, marginTop: 2 }}>{getScoreLabel(s.value)}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        {scores.slice(4).map(s => (
          <div key={s.label} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: "18px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: getScoreColor(s.value), marginBottom: 4 }}>{s.value}</div>
            <div style={{ height: 5, background: "#f1f5f9", borderRadius: 99, margin: "8px 0", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${s.value}%`, background: getScoreColor(s.value), borderRadius: 99 }} />
            </div>
            <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: "0.72rem", color: getScoreColor(s.value), fontWeight: 700, marginTop: 2 }}>{getScoreLabel(s.value)}</div>
          </div>
        ))}
        <div style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 14, padding: "18px 16px", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", fontWeight: 900, color: "white", marginBottom: 4 }}>{product.overallGrowthScore}</div>
          <div style={{ height: 5, background: "rgba(255,255,255,0.3)", borderRadius: 99, margin: "8px 0", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${product.overallGrowthScore}%`, background: "white", borderRadius: 99 }} />
          </div>
          <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>Growth Readiness</div>
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.9)", fontWeight: 700, marginTop: 2 }}>{getScoreLabel(product.overallGrowthScore)}</div>
        </div>
      </div>

      {/* Problems */}
      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <AlertTriangle size={18} color="#ef4444" /> What&apos;s Blocking Your Sales ({report.problems.length} issues)
        </h2>
        <div style={{ display: "grid", gap: 14 }}>
          {report.problems.map((prob, i) => (
            <div key={prob.id} style={{ border: `1px solid ${SEVERITY_COLOR[prob.severity]}30`, borderLeft: `4px solid ${SEVERITY_COLOR[prob.severity]}`, borderRadius: 12, padding: "16px 18px", background: SEVERITY_BG[prob.severity] }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: "1rem" }}>{CATEGORY_ICON[prob.category]}</span>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a" }}>#{i + 1} — {prob.title}</div>
                </div>
                <span style={{ padding: "3px 10px", background: SEVERITY_COLOR[prob.severity], color: "white", borderRadius: 6, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", flexShrink: 0 }}>{prob.severity}</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.6, marginBottom: 8 }}>{prob.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                <div style={{ background: "white", borderRadius: 8, padding: "10px 12px", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 4 }}>Why It Matters</div>
                  <div style={{ fontSize: "0.82rem", color: "#374151" }}>{prob.whyItMatters}</div>
                </div>
                <div style={{ background: "white", borderRadius: 8, padding: "10px 12px", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 4 }}>Expected Result</div>
                  <div style={{ fontSize: "0.82rem", color: "#22c55e", fontWeight: 600 }}>{prob.expectedResult}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Required Resources */}
      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: 20 }}>📦 Required Resources to Increase Sales</h2>
        <div style={{ display: "grid", gap: 12 }}>
          {report.requiredResources.map((r, i) => (
            <div key={r.id} style={{ border: "1px solid #f1f5f9", borderRadius: 12, padding: "16px 18px", display: "flex", alignItems: "center", gap: 16, background: "#fafafa" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.8rem", fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: 3 }}>{r.title}</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>{r.whyNeeded}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                <span style={{ padding: "3px 8px", background: r.salesImpact === "high" ? "#fef2f2" : r.salesImpact === "medium" ? "#fff7ed" : "#f0fdf4", color: IMPACT_COLOR[r.salesImpact], fontSize: "0.72rem", fontWeight: 700, borderRadius: 6 }}>
                  {r.salesImpact.toUpperCase()} IMPACT
                </span>
                {r.aiCanGenerate && (
                  <Link href={`/dashboard/generate?product=${product.id}&type=${r.type.toLowerCase().replace(" ", "_")}`} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", borderRadius: 8, fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }}>
                    <Sparkles size={12} /> Generate
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Insights */}
      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: 20 }}>🎯 {product.marketplace}-Specific Intelligence</h2>
        <div style={{ display: "grid", gap: 14 }}>
          {report.platformInsights.map((insight, i) => (
            <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ background: "#f8fafc", padding: "10px 16px", fontWeight: 700, fontSize: "0.85rem", color: "#374151", borderBottom: "1px solid #f1f5f9" }}>{insight.bestPractice}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                <div style={{ padding: "12px 16px", borderRight: "1px solid #f1f5f9" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#ef4444", textTransform: "uppercase", marginBottom: 4 }}>Your Gap</div>
                  <div style={{ fontSize: "0.83rem", color: "#374151" }}>{insight.sellerGap}</div>
                </div>
                <div style={{ padding: "12px 16px" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#22c55e", textTransform: "uppercase", marginBottom: 4 }}>Recommended Fix</div>
                  <div style={{ fontSize: "0.83rem", color: "#374151" }}>{insight.recommendation}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Action Plan */}
      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: 20 }}>⚡ 7-Day Action Plan</h2>
        <div style={{ display: "grid", gap: 10 }}>
          {report.actionPlan7Day.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 14px", background: "#fafafa", borderRadius: 10, border: "1px solid #f1f5f9" }}>
              <div style={{ padding: "4px 10px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", borderRadius: 7, fontSize: "0.72rem", fontWeight: 700, flexShrink: 0, whiteSpace: "nowrap" }}>{item.day}</div>
              <div style={{ flex: 1, fontSize: "0.875rem", color: "#374151", fontWeight: 500 }}>{item.task}</div>
              <span style={{ padding: "3px 8px", background: item.impact === "high" ? "#fef2f2" : item.impact === "medium" ? "#fff7ed" : "#f0fdf4", color: IMPACT_COLOR[item.impact], borderRadius: 6, fontSize: "0.72rem", fontWeight: 700, flexShrink: 0 }}>{item.impact.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sales Uplift Forecast */}
      <div style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)", border: "1px solid #312e81", borderRadius: 16, padding: 24, marginBottom: 24, color: "white" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: 6 }}>📈 Sales Uplift Forecast</h2>
        <p style={{ color: "#94a3b8", fontSize: "0.82rem", marginBottom: 20 }}>If you implement all recommended fixes, here's what the AI projects:</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
          {[
            ["Timeline", `${report.upliftForecast.timelineMin}–${report.upliftForecast.timelineMax} days`],
            ["Impressions", `+${report.upliftForecast.impressionsUplift.min}–${report.upliftForecast.impressionsUplift.max}%`],
            ["Conversion Rate", `+${report.upliftForecast.conversionUplift.min}–${report.upliftForecast.conversionUplift.max}%`],
            ["Sales Uplift", `+${report.upliftForecast.salesUplift.min}–${report.upliftForecast.salesUplift.max}%`],
          ].map(([label, val]) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#a5b4fc", marginBottom: 4 }}>{val}</div>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", fontSize: "0.78rem", color: "#64748b", lineHeight: 1.6 }}>
          <strong style={{ color: "#94a3b8" }}>⚠️ Disclaimer:</strong> {report.upliftForecast.disclaimer}
        </div>
      </div>

      {/* 30-Day Plan */}
      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: 20 }}>🗓️ 30-Day Growth Plan</h2>
        <div style={{ display: "grid", gap: 10 }}>
          {report.actionPlan30Day.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 14px", background: "#fafafa", borderRadius: 10, border: "1px solid #f1f5f9" }}>
              <div style={{ padding: "4px 10px", background: "#f1f5f9", color: "#6366f1", borderRadius: 7, fontSize: "0.72rem", fontWeight: 700, flexShrink: 0, whiteSpace: "nowrap" }}>{item.day}</div>
              <div style={{ flex: 1, fontSize: "0.875rem", color: "#374151", fontWeight: 500 }}>{item.task}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
