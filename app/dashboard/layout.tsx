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

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)", fontFamily: "'Inter', sans-serif" }}>
      {/* SIDEBAR */}
      <aside style={{ width: 256, background: "white", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 50 }}>
        {/* Logo */}
        <div style={{ padding: "16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={16} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1 }}>ListingX</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--primary)", marginTop: 2 }}>AI Growth Platform</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
          <div className="section-label" style={{ padding: "0 8px", marginBottom: 8, fontSize: 11 }}>MAIN MENU</div>
          {navItems.map(item => {
            const isActive = item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={`sidebar-link${isActive ? " active" : ""}`}>
                <item.icon size={16} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{ fontSize: 10, fontWeight: 700, background: "var(--gradient)", color: "white", padding: "2px 6px", borderRadius: 99 }}>{item.badge}</span>
                )}
              </Link>
            );
          })}

          <div style={{ height: 1, background: "var(--border-light)", margin: "12px 8px" }} />
          <div className="section-label" style={{ padding: "0 8px", marginBottom: 8, fontSize: 11 }}>QUICK ACTIONS</div>
          <Link href="/dashboard/chat" className="btn btn-primary btn-sm" style={{ textDecoration: "none", margin: "0 4px", justifyContent: "flex-start", gap: 8 }}>
            <Plus size={14} /> Analyze Product
          </Link>
        </nav>

        {/* Plan + User */}
        <div style={{ padding: 12, borderTop: "1px solid var(--border)" }}>
          <div style={{ background: "var(--gradient-soft)", border: "1px solid rgba(79,70,229,0.1)", borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)" }}>⚡ Pro Plan</span>
              <span className="caption">68/100</span>
            </div>
            <div className="caption" style={{ marginBottom: 8 }}>68 of 100 products analyzed</div>
            <div className="progress-track slim">
              <div className="progress-fill" style={{ width: "68%", background: "var(--gradient)" }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white", flexShrink: 0 }}>RM</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Rahul Mehta</div>
              <div className="caption">rahul@brand.com</div>
            </div>
            <Link href="/" style={{ color: "var(--text-muted)", display: "flex", padding: 4 }} title="Log out"><LogOut size={14} /></Link>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ marginLeft: 256, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* TOPBAR */}
        <header style={{ background: "white", borderBottom: "1px solid var(--border)", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0, zIndex: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg-alt)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 16px", width: 300 }}>
            <Search size={14} color="var(--text-muted)" />
            <input type="text" placeholder="Search products, ASINs..." style={{ border: "none", background: "transparent", fontSize: 14, color: "var(--text-primary)", outline: "none", fontFamily: "inherit", width: "100%" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", padding: 4 }}><HelpCircle size={18} /></button>

            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowNotifs(!showNotifs)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", position: "relative", display: "flex", padding: 4 }}>
                <Bell size={18} />
                {unread > 0 && <span style={{ position: "absolute", top: 0, right: 0, width: 14, height: 14, background: "#EF4444", borderRadius: "50%", fontSize: 10, fontWeight: 700, color: "white", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white" }}>{unread}</span>}
              </button>
              {showNotifs && (
                <div className="card" style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", width: 340, zIndex: 100, boxShadow: "var(--shadow-xl)", overflow: "hidden" }}>
                  <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Notifications</span>
                    <span style={{ fontSize: 12, color: "var(--primary)", fontWeight: 600, cursor: "pointer" }}>Mark all read</span>
                  </div>
                  {MOCK_NOTIFICATIONS.map(n => (
                    <div key={n.id} style={{ padding: "10px 16px", borderBottom: "1px solid var(--border-light)", display: "flex", gap: 8, alignItems: "flex-start", cursor: "pointer", background: n.read ? "white" : "var(--bg-alt)" }}>
                      <span style={{ fontSize: 14, marginTop: 1 }}>{typeIcon[n.type]}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{n.message}</div>
                        <div className="caption" style={{ marginTop: 2 }}>{n.time}</div>
                      </div>
                      {!n.read && <div className="status-dot pulsing" style={{ background: "#EF4444", marginTop: 4 }} />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ height: 24, width: 1, background: "var(--border)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white" }}>RM</div>
              <ChevronDown size={12} color="var(--text-muted)" />
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
