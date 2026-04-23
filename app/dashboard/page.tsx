"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { MOCK_PRODUCTS, Product } from "@/lib/mock-data";
import { getScoreColor, formatCurrency, formatNumber } from "@/lib/utils";
import { Filter, Zap, TrendingUp, TrendingDown, Minus, Star, RefreshCw, Eye, FileText, Sparkles, AlertTriangle, Target, Package, DollarSign, BarChart2 } from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string; dot: string }> = {
  "high-selling": { label: "High Selling", bg: "#dcfce7", color: "#16a34a", dot: "#22c55e" },
  "potential": { label: "Have Potential", bg: "#fff7ed", color: "#ea580c", dot: "#f97316" },
  "not-selling": { label: "Not Selling", bg: "#fef2f2", color: "#dc2626", dot: "#ef4444" },
  "needs-fix": { label: "Needs Fix", bg: "#fef2f2", color: "#dc2626", dot: "#ef4444" },
  "stable": { label: "Stable", bg: "#eff6ff", color: "#2563eb", dot: "#3b82f6" },
};

function ScoreBar({ value }: { value: number }) {
  const color = getScoreColor(value);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 5, background: "#f1f5f9", borderRadius: 99, width: 60, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 99, transition: "width 0.9s cubic-bezier(0.34,1.56,0.64,1)" }} />
      </div>
      <span style={{ fontSize: "0.8rem", fontWeight: 700, color, minWidth: 22 }}>{value}</span>
    </div>
  );
}

export default function DashboardPage() {
  const [view, setView] = useState<"grid" | "table">("table");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMarketplace, setFilterMarketplace] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => MOCK_PRODUCTS.filter(p => {
    if (filterStatus !== "all" && p.status !== filterStatus) return false;
    if (filterMarketplace !== "all" && p.marketplace !== filterMarketplace) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.asin.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [filterStatus, filterMarketplace, search]);

  const totalRevenue = MOCK_PRODUCTS.reduce((a, p) => a + p.salesLast30Days, 0);
  const highSelling = MOCK_PRODUCTS.filter(p => p.status === "high-selling").length;
  const atRisk = MOCK_PRODUCTS.filter(p => p.status === "not-selling" || p.status === "needs-fix").length;
  const potential = MOCK_PRODUCTS.filter(p => p.status === "potential").length;

  const summaryCards = [
    { label: "Total Products", value: MOCK_PRODUCTS.length, icon: Package, color: "#6366f1", bg: "rgba(99,102,241,0.08)", trend: "+2 this week" },
    { label: "Revenue at Risk", value: atRisk, icon: AlertTriangle, color: "#ef4444", bg: "rgba(239,68,68,0.08)", trend: `${atRisk} need fixing` },
    { label: "High Potential", value: potential, icon: Target, color: "#f97316", bg: "rgba(249,115,22,0.08)", trend: "Ready to grow" },
    { label: "Top Performers", value: highSelling, icon: TrendingUp, color: "#22c55e", bg: "rgba(34,197,94,0.08)", trend: "Strong & scaling" },
  ];

  const getActionBtn = (p: Product) => {
    if (p.status === "not-selling" || p.status === "needs-fix")
      return <Link href={`/dashboard/product/${p.id}`} style={{ padding: "5px 12px", background: "linear-gradient(135deg,#ef4444,#f97316)", color: "white", borderRadius: 7, fontSize: "0.72rem", fontWeight: 700, textDecoration: "none" }}>Fix Now</Link>;
    if (p.status === "potential")
      return <Link href={`/dashboard/product/${p.id}`} style={{ padding: "5px 12px", background: "linear-gradient(135deg,#f97316,#ec4899)", color: "white", borderRadius: 7, fontSize: "0.72rem", fontWeight: 700, textDecoration: "none" }}>Optimize</Link>;
    return <Link href={`/dashboard/product/${p.id}`} style={{ padding: "5px 12px", background: "linear-gradient(135deg,#22c55e,#14b8a6)", color: "white", borderRadius: 7, fontSize: "0.72rem", fontWeight: 700, textDecoration: "none" }}>Scale</Link>;
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>Inventory Dashboard</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: 3 }}>Last analyzed: 2 hours ago · 10 products synced from Amazon & Flipkart</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-sm dbtn-secondary" style={{background:"white",border:"1.5px solid #E2E8F0",color:"#475569",display:"inline-flex",alignItems:"center",gap:6,padding:"7px 14px",fontSize:13,fontWeight:600,borderRadius:8}}><RefreshCw size={14} /> Re-analyze All</button>
          <Link href="/dashboard/generate" className="btn btn-sm dbtn-primary" style={{textDecoration:"none",display:"inline-flex",alignItems:"center",gap:6,padding:"7px 14px",fontSize:13,fontWeight:700,borderRadius:8,background:"linear-gradient(135deg,#6366F1,#8B5CF6)",color:"white",boxShadow:"0 4px 14px rgba(79,70,229,0.3)"}}><Sparkles size={14} /> Generate Content</Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20, minWidth: 0 }}>
        {summaryCards.map(card => (
          <div key={card.label} style={{ background:"white", border:"1px solid #E2E8F0", borderRadius:12, boxShadow:"0 2px 8px rgba(0,0,0,0.06)", padding: "20px 18px", overflow:"hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <card.icon size={19} color={card.color} />
              </div>
              <span style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 500 }}>{card.trend}</span>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: card.color, lineHeight: 1 }}>{card.value}</div>
            <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Urgent Alert Strip */}
      {atRisk > 0 && (
        <div style={{ background: "linear-gradient(135deg,rgba(239,68,68,0.06),rgba(249,115,22,0.04))", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, padding: "13px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <AlertTriangle size={16} color="#ef4444" />
          <span style={{ fontSize: "0.875rem", color: "#374151", fontWeight: 500 }}><strong style={{ color: "#dc2626" }}>{atRisk} products</strong> need immediate attention — they are losing sales right now.</span>
          <Link href="/dashboard/growth" style={{ marginLeft: "auto", padding: "6px 14px", background: "#dc2626", color: "white", borderRadius: 8, fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }}>View Action Plan</Link>
        </div>
      )}

      {/* Filters */}
      <div style={{ background:"white", border:"1px solid #E2E8F0", borderRadius:12, boxShadow:"0 2px 8px rgba(0,0,0,0.06)", padding: "14px 18px", marginBottom: 18, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Filter size={14} color="#94a3b8" />
        <input type="text" placeholder="Search by title or ASIN..." value={search} onChange={e => setSearch(e.target.value)} className="input" style={{ width: 240, padding: "8px 14px" }} />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="input" style={{ width: "auto", padding: "8px 14px" }}>
          <option value="all">All Statuses</option>
          <option value="high-selling">High Selling</option>
          <option value="potential">Have Potential</option>
          <option value="not-selling">Not Selling</option>
          <option value="needs-fix">Needs Fix</option>
          <option value="stable">Stable</option>
        </select>
        <select value={filterMarketplace} onChange={e => setFilterMarketplace(e.target.value)} className="input" style={{ width: "auto", padding: "8px 14px" }}>
          <option value="all">All Marketplaces</option>
          <option value="Amazon">Amazon</option>
          <option value="Flipkart">Flipkart</option>
        </select>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>{filtered.length} product{filtered.length !== 1 ? "s" : ""}</span>
          {["table", "grid"].map(v => (
            <button key={v} onClick={() => setView(v as "table" | "grid")} style={{ padding: "6px 13px", borderRadius: 8, fontSize: "0.8rem", fontWeight: 600, border: `1.5px solid ${view === v ? "#6366f1" : "#e2e8f0"}`, background: view === v ? "rgba(99,102,241,0.08)" : "white", color: view === v ? "#6366f1" : "#94a3b8", cursor: "pointer" }}>
              {v === "table" ? "☰ Table" : "⊞ Grid"}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE VIEW */}
      {view === "table" && (
        <div style={{ background:"white", border:"1px solid #E2E8F0", borderRadius:12, boxShadow:"0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                {["Product", "Marketplace", "Status", "Price", "Sales (30d)", "Trend", "Listing Score", "SEO", "Conv.", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const sc = STATUS_CONFIG[p.status];
                const trend = p.salesTrend;
                return (
                  <tr key={p.id} className="table-row" style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f8fafc" : "none" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <img src={p.image} alt={p.title} style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover", border: "1px solid #f1f5f9", flexShrink: 0 }} />
                        <div>
                          <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f172a", maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</div>
                          <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 2 }}>{p.asin} · {p.sku}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 3 }}>
                            {[...Array(5)].map((_, si) => <Star key={si} size={9} fill={si < Math.floor(p.rating) ? "#f59e0b" : "#e2e8f0"} color={si < Math.floor(p.rating) ? "#f59e0b" : "#e2e8f0"} />)}
                            <span style={{ fontSize: "0.68rem", color: "#94a3b8", marginLeft: 2 }}>{p.rating} ({p.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: p.marketplace === "Amazon" ? "#c07000" : "#1a56db", background: p.marketplace === "Amazon" ? "#fff8e6" : "#eff6ff", padding: "4px 10px", borderRadius: 6 }}>{p.marketplace}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 20, background: sc.bg, color: sc.color, fontSize: "0.75rem", fontWeight: 700 }}>
                        <div className="status-dot pulsing" style={{ background: sc.dot }} />{sc.label}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "0.875rem", fontWeight: 700, color: "#0f172a" }}>
                      {p.currency === "INR" ? "₹" : "$"}{p.price.toLocaleString()}
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#374151", fontWeight: 500 }}>
                      {p.currency === "INR" ? "₹" : "$"}{formatNumber(p.salesLast30Days)}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", fontWeight: 700, color: trend > 0 ? "#22c55e" : trend < 0 ? "#ef4444" : "#94a3b8" }}>
                        {trend > 0 ? <TrendingUp size={13} /> : trend < 0 ? <TrendingDown size={13} /> : <Minus size={13} />}
                        {Math.abs(trend)}%
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", minWidth: 100 }}><ScoreBar value={p.listingScore} /></td>
                    <td style={{ padding: "14px 16px" }}><span style={{ fontSize: "0.8rem", fontWeight: 700, color: getScoreColor(p.seoScore) }}>{p.seoScore}</span></td>
                    <td style={{ padding: "14px 16px" }}><span style={{ fontSize: "0.8rem", fontWeight: 700, color: getScoreColor(p.conversionScore) }}>{p.conversionScore}</span></td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        {getActionBtn(p)}
                        <Link href={`/dashboard/product/${p.id}`} title="Analyze" style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(99,102,241,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6366f1", textDecoration: "none" }}><Eye size={13} /></Link>
                        <Link href={`/dashboard/generate?product=${p.id}`} title="Generate" style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(139,92,246,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6", textDecoration: "none" }}><Sparkles size={13} /></Link>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
          {filtered.map(p => {
            const sc = STATUS_CONFIG[p.status];
            return (
              <div key={p.id} style={{ background:"white", border:"1px solid #E2E8F0", borderRadius:12, boxShadow:"0 2px 8px rgba(0,0,0,0.06)", overflow:"hidden", transition:"transform 0.2s" }}>
                <div style={{ position: "relative" }}>
                  <img src={p.image} alt={p.title} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 10, left: 10, display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, background: sc.bg, color: sc.color, fontSize: "0.72rem", fontWeight: 700, backdropFilter: "blur(8px)" }}>
                    <div className="status-dot pulsing" style={{ background: sc.dot }} />{sc.label}
                  </div>
                  <div style={{ position: "absolute", top: 10, right: 10, padding: "4px 10px", background: "rgba(0,0,0,0.55)", color: "white", borderRadius: 7, fontSize: "0.72rem", fontWeight: 600, backdropFilter: "blur(4px)" }}>{p.marketplace}</div>
                </div>
                <div style={{ padding: 18 }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0f172a", marginBottom: 4, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.title}</div>
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: 14 }}>{p.asin}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
                    {[["Listing", p.listingScore], ["SEO", p.seoScore], ["Conv.", p.conversionScore]].map(([label, val]) => (
                      <div key={label as string} style={{ textAlign: "center", background: "#f8fafc", borderRadius: 10, padding: "8px 4px" }}>
                        <div style={{ fontSize: "1.1rem", fontWeight: 900, color: getScoreColor(val as number) }}>{val}</div>
                        <div style={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 600 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <Link href={`/dashboard/product/${p.id}`} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"8px 14px", borderRadius:8, fontSize:13, fontWeight:700, background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"white", textDecoration:"none" }}>
                    <Eye size={13} /> View AI Analysis
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
