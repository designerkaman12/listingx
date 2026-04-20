"use client";
import { MOCK_COMPETITORS, MOCK_PRODUCTS } from "@/lib/mock-data";
import { getScoreColor } from "@/lib/utils";
import Link from "next/link";

const METRICS = ["listingScore", "imageScore", "reviewScore", "pricingScore", "contentScore", "brandScore", "conversionScore"] as const;
const METRIC_LABELS: Record<string, string> = {
  listingScore: "Listing Quality", imageScore: "Image Richness", reviewScore: "Review Strength",
  pricingScore: "Pricing Position", contentScore: "Content Quality", brandScore: "Brand Presence", conversionScore: "Conversion"
};

const YOUR_PRODUCT = MOCK_PRODUCTS[0];

export default function CompetitorsPage() {
  const you = MOCK_COMPETITORS.find(c => c.name === "Your Product")!;
  const competitors = MOCK_COMPETITORS.filter(c => c.name !== "Your Product");

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>Competitor Intelligence</h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Benchmarking: {YOUR_PRODUCT.title.substring(0, 60)}... vs top Amazon competitors</p>
      </div>

      {/* Product selector */}
      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: "14px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#64748b" }}>Comparing:</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={YOUR_PRODUCT.image} alt="" style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover" }} />
          <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0f172a" }}>{YOUR_PRODUCT.title.substring(0, 50)}...</div>
        </div>
        <select style={{ marginLeft: "auto", padding: "8px 14px", border: "1.5px solid #e2e8f0", borderRadius: 9, fontSize: "0.875rem", fontFamily: "Inter, sans-serif", color: "#0f172a", background: "white", outline: "none" }}>
          {MOCK_PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.title.substring(0, 50)}...</option>)}
        </select>
      </div>

      {/* Score Comparison Table */}
      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, overflow: "hidden", marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #f1f5f9" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a" }}>📊 Side-by-Side Comparison</h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                <th style={{ padding: "12px 24px", fontSize: "0.8rem", fontWeight: 700, color: "#94a3b8", textAlign: "left", textTransform: "uppercase" }}>Metric</th>
                {MOCK_COMPETITORS.map(c => (
                  <th key={c.name} style={{ padding: "12px 20px", fontSize: "0.8rem", fontWeight: 700, color: c.name === "Your Product" ? "#6366f1" : "#94a3b8", textAlign: "center", textTransform: "uppercase", background: c.name === "Your Product" ? "rgba(99,102,241,0.05)" : "transparent" }}>
                    {c.name === "Your Product" ? "⭐ YOU" : c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {METRICS.map((metric, i) => (
                <tr key={metric} style={{ borderTop: "1px solid #f1f5f9", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                  <td style={{ padding: "14px 24px", fontSize: "0.875rem", fontWeight: 600, color: "#374151" }}>{METRIC_LABELS[metric]}</td>
                  {MOCK_COMPETITORS.map(c => {
                    const val = c[metric];
                    const isYou = c.name === "Your Product";
                    const isWorse = isYou && MOCK_COMPETITORS.filter(x => x.name !== "Your Product").some(x => x[metric] > val);
                    return (
                      <td key={c.name} style={{ padding: "14px 20px", textAlign: "center", background: isYou ? "rgba(99,102,241,0.04)" : "transparent" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: "1rem", fontWeight: 800, color: isYou && isWorse ? "#ef4444" : getScoreColor(val) }}>{val}</span>
                          <div style={{ height: 4, width: 60, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${val}%`, background: isYou && isWorse ? "#ef4444" : getScoreColor(val), borderRadius: 99 }} />
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr style={{ borderTop: "1px solid #f1f5f9", background: "#f8fafc" }}>
                <td style={{ padding: "14px 24px", fontSize: "0.875rem", fontWeight: 700, color: "#374151" }}>Reviews</td>
                {MOCK_COMPETITORS.map(c => (
                  <td key={c.name} style={{ padding: "14px 20px", textAlign: "center", fontWeight: 800, fontSize: "0.9rem", color: c.name === "Your Product" ? "#ef4444" : "#22c55e", background: c.name === "Your Product" ? "rgba(99,102,241,0.04)" : "transparent" }}>
                    {c.reviews.toLocaleString()} ({c.rating}★)
                  </td>
                ))}
              </tr>
              <tr style={{ borderTop: "1px solid #f1f5f9" }}>
                <td style={{ padding: "14px 24px", fontSize: "0.875rem", fontWeight: 700, color: "#374151" }}>Price</td>
                {MOCK_COMPETITORS.map(c => (
                  <td key={c.name} style={{ padding: "14px 20px", textAlign: "center", fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", background: c.name === "Your Product" ? "rgba(99,102,241,0.04)" : "transparent" }}>
                    ${c.price}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Gap Analysis */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <div style={{ background: "white", border: "1px solid #fecaca", borderRadius: 16, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#dc2626", marginBottom: 16 }}>🔴 Where You&apos;re Behind</h2>
          {[
            { metric: "Reviews", gap: "23 vs 1,000+", fix: "Launch a review request campaign immediately" },
            { metric: "Listing Quality", gap: "52 vs 85-92", fix: "Rewrite title, bullets, and description" },
            { metric: "Visual Content", gap: "45 vs 88-91", fix: "Add 6 new images including lifestyle and infographic" },
            { metric: "Brand Presence", gap: "30 vs 79-85", fix: "Activate A+ content and brand story" },
          ].map(item => (
            <div key={item.metric} style={{ marginBottom: 12, padding: "12px 14px", background: "#fef2f2", borderRadius: 10, border: "1px solid #fecaca" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0f172a" }}>{item.metric}</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#dc2626" }}>You: {item.gap.split(" vs ")[0]} vs Top: {item.gap.split(" vs ")[1]}</span>
              </div>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>👉 {item.fix}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "white", border: "1px solid #bbf7d0", borderRadius: 16, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#16a34a", marginBottom: 16 }}>🟢 Where You Can Win</h2>
          {[
            { metric: "Pricing", advantage: "You're priced competitively at $49.99 vs $52.99 top seller", action: "Highlight value-for-money in your content" },
            { metric: "Product Quality", advantage: "Untested but category gap for genuine premium quality", action: "Build trust with detailed specs and quality imagery" },
            { metric: "Delivery Speed", advantage: "If FBA-eligible, leverage faster delivery promise", action: "Ensure FBA enrollment and highlight in bullets" },
          ].map(item => (
            <div key={item.metric} style={{ marginBottom: 12, padding: "12px 14px", background: "#f0fdf4", borderRadius: 10, border: "1px solid #bbf7d0" }}>
              <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0f172a", marginBottom: 4 }}>{item.metric}</div>
              <div style={{ fontSize: "0.8rem", color: "#16a34a", fontWeight: 500, marginBottom: 4 }}>✓ {item.advantage}</div>
              <div style={{ fontSize: "0.78rem", color: "#64748b" }}>👉 {item.action}</div>
            </div>
          ))}
          <div style={{ marginTop: 8, padding: "10px 14px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 10 }}>
            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#6366f1", marginBottom: 4 }}>💡 Differentiation Strategy</div>
            <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Focus on quality storytelling and trust-building. Your competitors have reviews — you can win on transparency, brand story, and visual quality until you build review momentum.</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)", borderRadius: 16, padding: 28, display: "flex", justifyContent: "space-between", alignItems: "center", color: "white" }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: 6 }}>Close the gap in 30 days</div>
          <div style={{ color: "#94a3b8", fontSize: "0.875rem" }}>Get a complete action plan to match and surpass your top competitors</div>
        </div>
        <Link href={`/dashboard/product/${YOUR_PRODUCT.id}`} style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 24px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", borderRadius: 12, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", boxShadow: "0 6px 20px rgba(99,102,241,0.4)", whiteSpace: "nowrap" }}>
          View Full Action Plan →
        </Link>
      </div>
    </div>
  );
}
