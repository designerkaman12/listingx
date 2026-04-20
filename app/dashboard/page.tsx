"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { MOCK_PRODUCTS, Product } from "@/lib/mock-data";
import { getScoreColor, formatCurrency, formatNumber } from "@/lib/utils";
import { Filter, ArrowUpRight, Zap, TrendingUp, TrendingDown, Minus, Star, RefreshCw, Eye, FileText, Sparkles } from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string; dot: string }> = {
  "high-selling": { label: "High Selling", bg: "#dcfce7", color: "#16a34a", dot: "#22c55e" },
  "potential": { label: "Have Potential", bg: "#fff7ed", color: "#ea580c", dot: "#f97316" },
  "not-selling": { label: "Not Selling", bg: "#fef2f2", color: "#dc2626", dot: "#ef4444" },
  "needs-fix": { label: "Needs Fix", bg: "#fef2f2", color: "#dc2626", dot: "#ef4444" },
  "stable": { label: "Stable", bg: "#eff6ff", color: "#2563eb", dot: "#3b82f6" },
};

const SUMMARY_CARDS = (products: Product[]) => [
  { label: "Total Products", value: products.length, icon: "📦", color: "#6366f1", bg: "rgba(99,102,241,0.08)" },
  { label: "High Selling", value: products.filter(p => p.status === "high-selling").length, icon: "🚀", color: "#22c55e", bg: "rgba(34,197,94,0.08)" },
  { label: "Have Potential", value: products.filter(p => p.status === "potential").length, icon: "💡", color: "#f97316", bg: "rgba(249,115,22,0.08)" },
  { label: "Not Selling", value: products.filter(p => p.status === "not-selling").length, icon: "⚠️", color: "#ef4444", bg: "rgba(239,68,68,0.08)" },
  { label: "Needs Immediate Fix", value: products.filter(p => p.status === "needs-fix").length, icon: "🔧", color: "#dc2626", bg: "rgba(220,38,38,0.08)" },
  { label: "Avg Listing Score", value: Math.round(products.reduce((a, p) => a + p.listingScore, 0) / products.length), icon: "📋", color: "#6366f1", bg: "rgba(99,102,241,0.08)", suffix: "/100" },
  { label: "Avg Content Score", value: Math.round(products.reduce((a, p) => a + p.visualScore, 0) / products.length), icon: "🎨", color: "#8b5cf6", bg: "rgba(139,92,246,0.08)", suffix: "/100" },
  { label: "Revenue Opportunity", value: "$84K", icon: "💰", color: "#22c55e", bg: "rgba(34,197,94,0.08)", isString: true },
];

export default function DashboardPage() {
  const [view, setView] = useState<"grid" | "table">("table");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMarketplace, setFilterMarketplace] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      if (filterStatus !== "all" && p.status !== filterStatus) return false;
      if (filterMarketplace !== "all" && p.marketplace !== filterMarketplace) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.asin.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filterStatus, filterMarketplace, search]);

  const cards = SUMMARY_CARDS(MOCK_PRODUCTS);

  return (
    <div>
      {/* Page header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>Inventory Dashboard</h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: 2 }}>Last analyzed: 2 hours ago · 10 products synced from Amazon & Flipkart</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", background: "white", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", color: "#374151" }}>
            <RefreshCw size={15} /> Re-analyze All
          </button>
          <Link href="/dashboard/generate" style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", borderRadius: 10, fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}>
            <Sparkles size={15} /> Generate Content
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {cards.map(card => (
          <div key={card.label} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{card.label}</div>
                <div style={{ fontSize: "1.9rem", fontWeight: 900, color: card.color, lineHeight: 1 }}>
                  {card.isString ? card.value : card.value}{card.suffix || ""}
                </div>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <Filter size={15} color="#94a3b8" />
        <input type="text" placeholder="Search by title or ASIN..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "8px 14px", border: "1.5px solid #e2e8f0", borderRadius: 9, fontSize: "0.875rem", fontFamily: "Inter, sans-serif", color: "#0f172a", outline: "none", width: 240 }} />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: "8px 14px", border: "1.5px solid #e2e8f0", borderRadius: 9, fontSize: "0.875rem", fontFamily: "Inter, sans-serif", color: "#0f172a", background: "white", outline: "none" }}>
          <option value="all">All Statuses</option>
          <option value="high-selling">High Selling</option>
          <option value="potential">Have Potential</option>
          <option value="not-selling">Not Selling</option>
          <option value="needs-fix">Needs Fix</option>
          <option value="stable">Stable</option>
        </select>
        <select value={filterMarketplace} onChange={e => setFilterMarketplace(e.target.value)} style={{ padding: "8px 14px", border: "1.5px solid #e2e8f0", borderRadius: 9, fontSize: "0.875rem", fontFamily: "Inter, sans-serif", color: "#0f172a", background: "white", outline: "none" }}>
          <option value="all">All Marketplaces</option>
          <option value="Amazon">Amazon</option>
          <option value="Flipkart">Flipkart</option>
        </select>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {["table", "grid"].map(v => (
            <button key={v} onClick={() => setView(v as "table" | "grid")} style={{ padding: "7px 14px", borderRadius: 9, fontSize: "0.8rem", fontWeight: 600, border: `1.5px solid ${view === v ? "#6366f1" : "#e2e8f0"}`, background: view === v ? "rgba(99,102,241,0.08)" : "white", color: view === v ? "#6366f1" : "#94a3b8", cursor: "pointer" }}>
              {v === "table" ? "☰ Table" : "⊞ Grid"}
            </button>
          ))}
        </div>
        <div style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: 500 }}>{filtered.length} product{filtered.length !== 1 ? "s" : ""}</div>
      </div>

      {/* TABLE VIEW */}
      {view === "table" && (
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                {["Product", "Marketplace", "Status", "Price", "Sales (30d)", "Trend", "Listing Score", "SEO", "Conv.", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const sc = STATUS_CONFIG[p.status];
                const trend = p.salesTrend;
                return (
                  <tr key={p.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f1f5f9" : "none" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#fafafa"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "white"}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <img src={p.image} alt={p.title} style={{ width: 44, height: 44, borderRadius: 9, objectFit: "cover", border: "1px solid #f1f5f9", flexShrink: 0 }} />
                        <div>
                          <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f172a", maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</div>
                          <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 2 }}>{p.asin} · {p.sku}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                            {[...Array(5)].map((_, si) => <Star key={si} size={10} fill={si < Math.floor(p.rating) ? "#f59e0b" : "#e2e8f0"} color={si < Math.floor(p.rating) ? "#f59e0b" : "#e2e8f0"} />)}
                            <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{p.rating} ({p.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 600, color: p.marketplace === "Amazon" ? "#c07000" : "#1a56db", background: p.marketplace === "Amazon" ? "#fff8e6" : "#eff6ff", padding: "4px 10px", borderRadius: 6 }}>{p.marketplace}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 8, background: sc.bg, color: sc.color, fontSize: "0.78rem", fontWeight: 700 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: sc.dot }} />{sc.label}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "0.875rem", fontWeight: 700, color: "#0f172a" }}>
                      {p.currency === "INR" ? "₹" : "$"}{p.price.toLocaleString()}
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#374151" }}>
                      {p.currency === "INR" ? "₹" : "$"}{formatNumber(p.salesLast30Days)}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", fontWeight: 700, color: trend > 0 ? "#22c55e" : trend < 0 ? "#ef4444" : "#94a3b8" }}>
                        {trend > 0 ? <TrendingUp size={13} /> : trend < 0 ? <TrendingDown size={13} /> : <Minus size={13} />}
                        {Math.abs(trend)}%
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ flex: 1, height: 5, background: "#f1f5f9", borderRadius: 99, width: 56, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${p.listingScore}%`, background: getScoreColor(p.listingScore), borderRadius: 99 }} />
                        </div>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: getScoreColor(p.listingScore) }}>{p.listingScore}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: getScoreColor(p.seoScore) }}>{p.seoScore}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: getScoreColor(p.conversionScore) }}>{p.conversionScore}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Link href={`/dashboard/product/${p.id}`} title="Analyze" style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(99,102,241,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6366f1", textDecoration: "none" }}><Eye size={14} /></Link>
                        <Link href={`/dashboard/generate?product=${p.id}`} title="Generate content" style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(139,92,246,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6", textDecoration: "none" }}><Sparkles size={14} /></Link>
                        <Link href={`/dashboard/reports`} title="View report" style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(34,197,94,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#22c55e", textDecoration: "none" }}><FileText size={14} /></Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* GRID VIEW */}
      {view === "grid" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {filtered.map(p => {
            const sc = STATUS_CONFIG[p.status];
            return (
              <div key={p.id} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", transition: "all 0.2s" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; }}>
                <div style={{ position: "relative" }}>
                  <img src={p.image} alt={p.title} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 10, left: 10, padding: "4px 10px", background: sc.bg, color: sc.color, borderRadius: 7, fontSize: "0.72rem", fontWeight: 700, backdropFilter: "blur(8px)", display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: sc.dot }} />{sc.label}
                  </div>
                  <div style={{ position: "absolute", top: 10, right: 10, padding: "4px 10px", background: "rgba(0,0,0,0.6)", color: "white", borderRadius: 7, fontSize: "0.72rem", fontWeight: 600 }}>{p.marketplace}</div>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0f172a", marginBottom: 4, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: 12 }}>{p.asin}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
                    {[["Listing", p.listingScore], ["SEO", p.seoScore], ["Conv.", p.conversionScore]].map(([label, val]) => (
                      <div key={label as string} style={{ textAlign: "center", background: "#f8fafc", borderRadius: 9, padding: "8px 4px" }}>
                        <div style={{ fontSize: "1rem", fontWeight: 800, color: getScoreColor(val as number) }}>{val}</div>
                        <div style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 500 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <Link href={`/dashboard/product/${p.id}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", borderRadius: 10, fontSize: "0.85rem", fontWeight: 700, textDecoration: "none" }}>
                    <Eye size={14} /> View AI Analysis
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
