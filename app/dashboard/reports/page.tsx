"use client";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { getScoreColor } from "@/lib/utils";
import { FileText, Download, Share2, Eye, ExternalLink } from "lucide-react";

const MOCK_REPORTS = MOCK_PRODUCTS.slice(0, 6).map((p, i) => ({
  id: `RPT-${p.id}`,
  product: p,
  generatedAt: new Date(Date.now() - i * 86400000 * 2).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  issues: p.issues.length,
  score: p.overallGrowthScore,
  status: p.status,
}));

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  "high-selling": { label: "High Selling", bg: "#dcfce7", color: "#16a34a" },
  "potential": { label: "Have Potential", bg: "#fff7ed", color: "#ea580c" },
  "not-selling": { label: "Not Selling", bg: "#fef2f2", color: "#dc2626" },
  "needs-fix": { label: "Needs Fix", bg: "#fef2f2", color: "#dc2626" },
  "stable": { label: "Stable", bg: "#eff6ff", color: "#2563eb" },
};

export default function ReportsPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>Reports</h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>All generated product analysis reports</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", background: "white", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", color: "#374151" }}>
            <Download size={15} /> Export All (CSV)
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Reports", value: 10, icon: "📋" },
          { label: "This Week", value: 6, icon: "📅" },
          { label: "Shared Reports", value: 3, icon: "🔗" },
          { label: "Avg Growth Score", value: "54/100", icon: "📈" },
        ].map(s => (
          <div key={s.label} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 13, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "1.1rem", marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a" }}>{s.value}</div>
            <div style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Reports List */}
      <div style={{ display: "grid", gap: 14 }}>
        {MOCK_REPORTS.map(report => {
          const sc = STATUS_CONFIG[report.status];
          return (
            <div key={report.id} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 18 }}>
              <img src={report.product.image} alt="" style={{ width: 52, height: 52, borderRadius: 10, objectFit: "cover", border: "1px solid #f1f5f9", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{report.product.title.substring(0, 60)}...</div>
                  <span style={{ padding: "3px 9px", background: sc.bg, color: sc.color, fontSize: "0.72rem", fontWeight: 700, borderRadius: 6, flexShrink: 0 }}>{sc.label}</span>
                </div>
                <div style={{ display: "flex", gap: 16, fontSize: "0.8rem", color: "#94a3b8", flexWrap: "wrap" }}>
                  <span>ID: {report.id}</span>
                  <span>ASIN: {report.product.asin}</span>
                  <span>{report.product.marketplace}</span>
                  <span>Generated: {report.generatedAt}</span>
                  <span style={{ color: report.issues > 4 ? "#ef4444" : "#f97316", fontWeight: 600 }}>{report.issues} issues found</span>
                </div>
              </div>
              <div style={{ display: "flex", flex: "none", alignItems: "center", gap: 12 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.4rem", fontWeight: 900, color: getScoreColor(report.score) }}>{report.score}</div>
                  <div style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 500 }}>Growth Score</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Link href={`/dashboard/product/${report.product.id}`} title="View Report" style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(99,102,241,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6366f1", textDecoration: "none" }}><Eye size={15} /></Link>
                  <button title="Share" style={{ width: 34, height: 34, borderRadius: 9, background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", cursor: "pointer" }}><Share2 size={15} /></button>
                  <button title="Download PDF" style={{ width: 34, height: 34, borderRadius: 9, background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", cursor: "pointer" }}><Download size={15} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Saved Content */}
      <div style={{ marginTop: 28, background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>💾 Saved Generated Content</h2>
        <div style={{ display: "grid", gap: 10 }}>
          {[
            { type: "Product Title", product: "Wireless Earbuds Pro X5", date: "Apr 19", chars: 187 },
            { type: "Bullet Points", product: "LED Desk Lamp", date: "Apr 18", chars: 820 },
            { type: "A+ Content Structure", product: "Yoga Mat", date: "Apr 17", chars: 1240 },
            { type: "SEO Keywords (50)", product: "Smart Security Camera", date: "Apr 16", chars: 680 },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#f8fafc", borderRadius: 10, border: "1px solid #f1f5f9" }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}><FileText size={16} color="white" /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0f172a" }}>{item.type}</div>
                <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>{item.product} · {item.date} · {item.chars} chars</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ padding: "6px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "white", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", color: "#374151" }}>View</button>
                <button style={{ padding: "6px 12px", border: "none", borderRadius: 8, background: "rgba(99,102,241,0.1)", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", color: "#6366f1" }}>Copy</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
