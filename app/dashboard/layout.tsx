"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, LayoutDashboard, FileText, Sparkles, TrendingUp, Users, Settings, Bell, Search, ChevronDown, LogOut, HelpCircle, Plus, MessageSquare } from "lucide-react";
import { useState } from "react";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";

const navItems = [
  { href: "/dashboard/chat", icon: MessageSquare, label: "AI Chat", badge: "NEW" },
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
    urgent: { bg: "rgba(239,68,68,0.06)", dot: "#EF4444" },
    warning: { bg: "rgba(249,115,22,0.06)", dot: "#F97316" },
    success: { bg: "rgba(16,185,129,0.06)", dot: "#10B981" },
    info: { bg: "rgba(79,140,255,0.06)", dot: "#4F8CFF" },
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)", fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif" }}>
      {/* SIDEBAR */}
      <aside style={{ width: 258, background: "white", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 50, boxShadow: "1px 0 16px rgba(0,0,0,0.04)" }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid var(--border-subtle)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-primary)" }}>
              <Zap size={18} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1 }}>ListingX</div>
              <div style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--primary)", marginTop: 1 }}>AI Growth Platform</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 3, overflowY: "auto" }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 8px", marginBottom: 8 }}>Main Menu</div>
          {navItems.map(item => {
            const isChat = item.href === "/dashboard/chat";
            const isActive = item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={`sidebar-link${isActive ? " active" : ""}`} style={isChat && !isActive ? { background: "linear-gradient(135deg, rgba(79,140,255,0.06), rgba(168,85,247,0.04))" } : undefined}>
                <item.icon size={16} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{ fontSize: "0.6rem", fontWeight: 700, background: "var(--gradient-primary)", color: "white", padding: "2px 7px", borderRadius: 99, letterSpacing: "0.04em" }}>{item.badge}</span>
                )}
              </Link>
            );
          })}

          <div style={{ height: 1, background: "var(--border-subtle)", margin: "12px 8px" }} />
          <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 8px", marginBottom: 8 }}>Quick Actions</div>
          <Link href="/dashboard/chat" className="btn btn-primary btn-sm" style={{ textDecoration: "none", margin: "0 4px", justifyContent: "flex-start", gap: 8 }}>
            <Plus size={14} /> Analyze New Product
          </Link>
        </nav>

        {/* Plan + User */}
        <div style={{ padding: "14px 12px", borderTop: "1px solid var(--border-subtle)" }}>
          <div style={{ background: "var(--gradient-primary-soft)", border: "1px solid rgba(79,140,255,0.12)", borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)" }}>⚡ Pro Plan</span>
              <span style={{ fontSize: "0.68rem", color: "var(--text-light)", fontWeight: 500 }}>68/100</span>
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 8 }}>68 of 100 products analyzed</div>
            <div className="progress-track slim">
              <div className="progress-fill" style={{ width: "68%", background: "var(--gradient-primary)" }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 4px" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700, color: "white", flexShrink: 0 }}>RM</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Rahul Mehta</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-light)" }}>rahul@brand.com</div>
            </div>
            <Link href="/" style={{ color: "var(--text-light)", display: "flex", padding: 4 }} title="Log out"><LogOut size={14} /></Link>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ marginLeft: 258, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* TOPBAR */}
        <header style={{ background: "white", borderBottom: "1px solid var(--border)", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 1px 8px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 16px", width: 320, transition: "all 0.2s" }}>
            <Search size={15} color="var(--text-light)" />
            <input type="text" placeholder="Search products, ASINs, reports..." style={{ border: "none", background: "transparent", fontSize: "0.875rem", color: "var(--text)", outline: "none", fontFamily: "'Inter', sans-serif", width: "100%" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <a href="#" style={{ color: "var(--text-light)", display: "flex", padding: 4 }} title="Help"><HelpCircle size={19} /></a>

            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowNotifs(!showNotifs)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", position: "relative", display: "flex", padding: 4 }}>
                <Bell size={19} />
                {unread > 0 && (
                  <span style={{ position: "absolute", top: 0, right: 0, width: 16, height: 16, background: "#EF4444", borderRadius: "50%", fontSize: "0.62rem", fontWeight: 700, color: "white", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white" }}>{unread}</span>
                )}
              </button>
              {showNotifs && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 10px)", width: 360, background: "white", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "var(--shadow-xl)", zIndex: 100, overflow: "hidden" }}>
                  <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text)" }}>Notifications</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 600, cursor: "pointer" }}>Mark all read</span>
                  </div>
                  {MOCK_NOTIFICATIONS.map(n => {
                    const tc = typeColors[n.type] || typeColors.info;
                    return (
                      <div key={n.id} style={{ padding: "12px 18px", borderBottom: "1px solid var(--bg)", background: n.read ? "white" : tc.bg, display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
                        <span style={{ fontSize: "0.95rem", marginTop: 1 }}>{typeIcon[n.type]}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.815rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{n.message}</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-light)", marginTop: 3 }}>{n.time}</div>
                        </div>
                        {!n.read && <div style={{ width: 7, height: 7, background: tc.dot, borderRadius: "50%", marginTop: 5, flexShrink: 0 }} />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div style={{ height: 26, width: 1, background: "var(--border)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, color: "white" }}>RM</div>
              <ChevronDown size={13} color="var(--text-light)" />
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
