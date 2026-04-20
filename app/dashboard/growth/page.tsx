"use client";
import Link from "next/link";
import { MOCK_PRODUCTS, WEEKLY_DATA } from "@/lib/mock-data";
import { getScoreColor } from "@/lib/utils";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Bell, ArrowRight, Zap } from "lucide-react";

const WEEKLY_ACTIONS = [
  { product: "Wireless Bluetooth Earbuds Pro X5", action: "Add A+ content", type: "content", urgent: true, id: "P001" },
  { product: "Yoga Mat Anti-Slip 6mm", action: "Rewrite listing title with keywords", type: "seo", urgent: true, id: "P003" },
  { product: "LED Desk Lamp with USB", action: "Add 4 new product images", type: "visual", urgent: false, id: "P004" },
  { product: "Moisturizing Face Cream", action: "Request reviews from recent buyers", type: "review", urgent: false, id: "P005" },
  { product: "Smart Security Camera", action: "Fix backend keywords", type: "seo", urgent: false, id: "P007" },
  { product: "Portable Hand Mixer", action: "Reduce price by 8% to match category average", type: "pricing", urgent: false, id: "P010" },
];

const NOTIF_TYPES: Record<string, { bg: string; color: string; icon: string }> = {
  content: { bg: "#eff6ff", color: "#2563eb", icon: "📝" },
  seo: { bg: "#f0fdf4", color: "#16a34a", icon: "🔍" },
  visual: { bg: "#fdf4ff", color: "#9333ea", icon: "🖼️" },
  review: { bg: "#fff7ed", color: "#ea580c", icon: "⭐" },
  pricing: { bg: "#fef9c3", color: "#ca8a04", icon: "💰" },
};

const improved = MOCK_PRODUCTS.filter(p => p.status === "high-selling");
const needsWork = MOCK_PRODUCTS.filter(p => p.status === "not-selling" || p.status === "needs-fix");
const potential = MOCK_PRODUCTS.filter(p => p.status === "potential");

export default function GrowthPage() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>Weekly Growth Center</h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Week of April 14–20, 2026 · AI re-analyzed 10 products · 6 new actions added</p>
      </div>

      {/* Summary Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Improved This Week", value: 2, icon: "📈", color: "#22c55e", bg: "rgba(34,197,94,0.08)" },
          { label: "Still Need Work", value: 5, icon: "🔧", color: "#f97316", bg: "rgba(249,115,22,0.08)" },
          { label: "New Suggestions", value: 6, icon: "💡", color: "#6366f1", bg: "rgba(99,102,241,0.08)" },
          { label: "Ready to Scale", value: 2, icon: "🚀", color: "#22c55e", bg: "rgba(34,197,94,0.08)" },
        ].map(card => (
          <div key={card.label} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{card.label}</div>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: card.color }}>{card.value}</div>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        {/* Urgent Attention */}
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <AlertTriangle size={17} color="#ef4444" /> Urgent Attention Required
          </h2>
          <div style={{ display: "grid", gap: 10 }}>
            {needsWork.map(p => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#fef2f2", borderRadius: 10, border: "1px solid #fecaca" }}>
                <img src={p.image} alt="" style={{ width: 36, height: 36, borderRadius: 7, objectFit: "cover" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.825rem", fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title.substring(0, 38)}...</div>
                  <div style={{ fontSize: "0.75rem", color: "#dc2626", fontWeight: 600, marginTop: 2 }}>{p.issues.length} critical issues · Score: {p.listingScore}</div>
                </div>
                <Link href={`/dashboard/product/${p.id}`} style={{ padding: "6px 12px", background: "#dc2626", color: "white", borderRadius: 8, fontSize: "0.75rem", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>Fix Now</Link>
              </div>
            ))}
          </div>
        </div>

        {/* Ready to Scale */}
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle size={17} color="#22c55e" /> Ready to Scale
          </h2>
          <div style={{ display: "grid", gap: 10 }}>
            {improved.map(p => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#f0fdf4", borderRadius: 10, border: "1px solid #bbf7d0" }}>
                <img src={p.image} alt="" style={{ width: 36, height: 36, borderRadius: 7, objectFit: "cover" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.825rem", fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title.substring(0, 38)}...</div>
                  <div style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 600, marginTop: 2 }}>Score: {p.listingScore} · +{p.salesTrend}% this week</div>
                </div>
                <Link href={`/dashboard/product/${p.id}`} style={{ padding: "6px 12px", background: "#16a34a", color: "white", borderRadius: 8, fontSize: "0.75rem", fontWeight: 700, textDecoration: "none" }}>Scale</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Action Checklist */}
      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <Zap size={17} color="#6366f1" /> This Week&apos;s Action Plan
        </h2>
        <div style={{ display: "grid", gap: 10 }}>
          {WEEKLY_ACTIONS.map((action, i) => {
            const cfg = NOTIF_TYPES[action.type];
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, border: `1px solid ${action.urgent ? "#fecaca" : "#f1f5f9"}`, background: action.urgent ? "#fef9f9" : "white" }}>
                <input type="checkbox" style={{ width: 17, height: 17, flexShrink: 0, accentColor: "#6366f1" }} />
                <span style={{ fontSize: "1.1rem" }}>{cfg.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0f172a" }}>{action.action}</div>
                  <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: 2 }}>{action.product}</div>
                </div>
                {action.urgent && <span style={{ padding: "3px 9px", background: "#fef2f2", color: "#dc2626", fontSize: "0.72rem", fontWeight: 700, borderRadius: 6 }}>URGENT</span>}
                <span style={{ padding: "3px 9px", background: cfg.bg, color: cfg.color, fontSize: "0.72rem", fontWeight: 700, borderRadius: 6, textTransform: "uppercase" }}>{action.type}</span>
                <Link href={`/dashboard/product/${action.id}`} style={{ color: "#94a3b8", display: "flex" }}><ArrowRight size={15} /></Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress over time */}
      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", marginBottom: 20 }}>📊 Month-over-Month Progress</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {WEEKLY_DATA.map(w => (
            <div key={w.week} style={{ background: "#f8fafc", borderRadius: 12, padding: "16px" }}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#64748b", marginBottom: 12 }}>{w.week}</div>
              <div style={{ display: "grid", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.78rem", color: "#22c55e", fontWeight: 600 }}>✅ Improved</span>
                  <span style={{ fontWeight: 800, color: "#22c55e" }}>{w.improved}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.78rem", color: "#f97316", fontWeight: 600 }}>⏳ Pending</span>
                  <span style={{ fontWeight: 800, color: "#f97316" }}>{w.pending}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.78rem", color: "#6366f1", fontWeight: 600 }}>🆕 New Alerts</span>
                  <span style={{ fontWeight: 800, color: "#6366f1" }}>{w.newAlerts}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
