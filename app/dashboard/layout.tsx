"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, LayoutDashboard, FileText, Sparkles, TrendingUp, Users, Settings, Bell, Search, ChevronDown, LogOut, HelpCircle, Plus } from "lucide-react";
import { useState } from "react";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/generate", icon: Sparkles, label: "Content Generator" },
  { href: "/dashboard/growth", icon: TrendingUp, label: "Weekly Growth" },
  { href: "/dashboard/competitors", icon: Users, label: "Competitor Intel" },
  { href: "/dashboard/reports", icon: FileText, label: "Reports" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showNotifs, setShowNotifs] = useState(false);
  const unread = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  const typeIcon: Record<string, string> = { urgent: "🚨", warning: "⚠️", success: "✅", info: "ℹ️" };
  const typeColors: Record<string, { bg: string; dot: string }> = {
    urgent: { bg: "rgba(239,68,68,0.06)", dot: "#ef4444" },
    warning: { bg: "rgba(249,115,22,0.06)", dot: "#f97316" },
    success: { bg: "rgba(34,197,94,0.06)", dot: "#22c55e" },
    info: { bg: "rgba(99,102,241,0.06)", dot: "#6366f1" },
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      {/* SIDEBAR */}
      <aside style={{ width: 258, background: "white", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 50, boxShadow: "1px 0 12px rgba(0,0,0,0.04)" }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}>
              <Zap size={18} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1 }}>ListingX</div>
              <div style={{ fontSize: "0.65rem", fontWeight: 600, color: "#6366f1", marginTop: 1 }}>AI Growth Platform</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 3, overflowY: "auto" }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 8px", marginBottom: 8 }}>Main Menu</div>
          {navItems.map(item => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} className={`sidebar-link${isActive ? " active" : ""}`}>
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}

          <div style={{ height: 1, background: "#f1f5f9", margin: "12px 8px" }} />
          <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 8px", marginBottom: 8 }}>Quick Actions</div>
          <Link href="/dashboard/generate" className="btn btn-primary btn-sm" style={{ textDecoration: "none", margin: "0 4px", justifyContent: "flex-start", gap: 8 }}>
            <Plus size={14} /> Analyze New Product
          </Link>
        </nav>

        {/* Plan + User */}
        <div style={{ padding: "14px 12px", borderTop: "1px solid #f1f5f9" }}>
          <div style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.06))", border: "1px solid rgba(99,102,241,0.12)", borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#6366f1" }}>⚡ Pro Plan</span>
              <span style={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 500 }}>68/100</span>
            </div>
            <div style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: 8 }}>68 of 100 products analyzed</div>
            <div className="progress-track slim">
              <div className="progress-fill" style={{ width: "68%", background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 4px" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700, color: "white", flexShrink: 0 }}>RM</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Rahul Mehta</div>
              <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>rahul@brand.com</div>
            </div>
            <Link href="/" style={{ color: "#94a3b8", display: "flex", padding: 4 }} title="Log out"><LogOut size={14} /></Link>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ marginLeft: 258, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* TOPBAR */}
        <header style={{ background: "white", borderBottom: "1px solid #e2e8f0", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "8px 16px", width: 300, transition: "all 0.2s" }}>
            <Search size={15} color="#94a3b8" />
            <input type="text" placeholder="Search products, ASINs, reports..." style={{ border: "none", background: "transparent", fontSize: "0.875rem", color: "#0f172a", outline: "none", fontFamily: "Inter, sans-serif", width: "100%" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <a href="#" style={{ color: "#94a3b8", display: "flex", padding: 4 }} title="Help"><HelpCircle size={19} /></a>

            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowNotifs(!showNotifs)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", position: "relative", display: "flex", padding: 4 }}>
                <Bell size={19} />
                {unread > 0 && (
                  <span style={{ position: "absolute", top: 0, right: 0, width: 16, height: 16, background: "#ef4444", borderRadius: "50%", fontSize: "0.62rem", fontWeight: 700, color: "white", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white" }}>{unread}</span>
                )}
              </button>
              {showNotifs && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 10px)", width: 360, background: "white", border: "1px solid #e2e8f0", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 100, overflow: "hidden" }}>
                  <div style={{ padding: "14px 18px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a" }}>Notifications</span>
                    <span style={{ fontSize: "0.72rem", color: "#6366f1", fontWeight: 600, cursor: "pointer" }}>Mark all read</span>
                  </div>
                  {MOCK_NOTIFICATIONS.map(n => {
                    const tc = typeColors[n.type] || typeColors.info;
                    return (
                      <div key={n.id} style={{ padding: "12px 18px", borderBottom: "1px solid #f8fafc", background: n.read ? "white" : tc.bg, display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
                        <span style={{ fontSize: "0.95rem", marginTop: 1 }}>{typeIcon[n.type]}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.815rem", color: "#374151", lineHeight: 1.5 }}>{n.message}</div>
                          <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 3 }}>{n.time}</div>
                        </div>
                        {!n.read && <div style={{ width: 7, height: 7, background: tc.dot, borderRadius: "50%", marginTop: 5, flexShrink: 0 }} />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div style={{ height: 26, width: 1, background: "#e2e8f0" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, color: "white" }}>RM</div>
              <ChevronDown size={13} color="#94a3b8" />
            </div>
          </div>
        </header>

        {/* PAGE */}
        <main style={{ flex: 1, padding: "28px 32px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
