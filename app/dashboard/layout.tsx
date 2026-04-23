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

const G = "linear-gradient(135deg,#6366F1,#8B5CF6)";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showNotifs, setShowNotifs] = useState(false);
  const unread = MOCK_NOTIFICATIONS.filter(n => !n.read).length;
  const typeIcon: Record<string, string> = { urgent: "🚨", warning: "⚠️", success: "✅", info: "ℹ️" };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFC", fontFamily: "'Inter',-apple-system,sans-serif" }}>

      {/* SIDEBAR */}
      <aside style={{ width: 252, background: "white", borderRight: "1px solid #E2E8F0", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 50, flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: "16px 16px 14px", borderBottom: "1px solid #F1F5F9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: G, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(99,102,241,0.3)", flexShrink: 0 }}>
              <Zap size={16} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: "#0F172A", letterSpacing: "-0.02em", lineHeight: 1 }}>ListingX</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#6366F1", marginTop: 2 }}>AI Growth Platform</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8", padding: "4px 8px 6px" }}>MAIN MENU</div>

          {navItems.map(item => {
            const isActive = item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex", alignItems: "center", gap: 9,
                  padding: "9px 10px", borderRadius: 8,
                  color: isActive ? "#6366F1" : "#64748B",
                  textDecoration: "none",
                  fontSize: 13, fontWeight: isActive ? 700 : 500,
                  background: isActive ? "rgba(99,102,241,0.08)" : "transparent",
                  transition: "all 0.15s ease",
                }}
              >
                <item.icon size={15} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{ fontSize: 9, fontWeight: 700, background: G, color: "white", padding: "2px 6px", borderRadius: 99 }}>{item.badge}</span>
                )}
              </Link>
            );
          })}

          <div style={{ height: 1, background: "#F1F5F9", margin: "10px 4px" }} />
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8", padding: "2px 8px 6px" }}>QUICK ACTIONS</div>
          <Link
            href="/dashboard/chat"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "9px 12px", borderRadius: 8, margin: "0 0px",
              background: G, color: "white",
              fontSize: 13, fontWeight: 700, textDecoration: "none",
              boxShadow: "0 4px 12px rgba(99,102,241,0.25)",
            }}
          >
            <Plus size={14} /> Analyze Product
          </Link>
        </nav>

        {/* Bottom: Plan + User */}
        <div style={{ padding: "10px 12px 12px", borderTop: "1px solid #F1F5F9" }}>
          <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)", borderRadius: 8, padding: "10px 12px", marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#6366F1" }}>⚡ Pro Plan</span>
              <span style={{ fontSize: 11, color: "#94A3B8" }}>68/100</span>
            </div>
            <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 6 }}>68 of 100 products analyzed</div>
            <div style={{ height: 4, background: "#E2E8F0", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "68%", background: G, borderRadius: 99 }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "2px 0" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white", flexShrink: 0 }}>RM</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#0F172A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Rahul Mehta</div>
              <div style={{ fontSize: 11, color: "#94A3B8" }}>rahul@brand.com</div>
            </div>
            <Link href="/" style={{ color: "#CBD5E1", display: "flex", padding: 4 }} title="Log out"><LogOut size={13} /></Link>
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div style={{ marginLeft: 252, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* TOPBAR */}
        <header style={{ background: "white", borderBottom: "1px solid #E2E8F0", height: 54, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0, zIndex: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: "7px 14px", width: 280 }}>
            <Search size={13} color="#94A3B8" />
            <input type="text" placeholder="Search products, ASINs..." style={{ border: "none", background: "transparent", fontSize: 13, color: "#0F172A", outline: "none", fontFamily: "inherit", width: "100%" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", display: "flex", padding: 4 }}><HelpCircle size={17} /></button>
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowNotifs(!showNotifs)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", position: "relative", display: "flex", padding: 4 }}>
                <Bell size={17} />
                {unread > 0 && <span style={{ position: "absolute", top: 0, right: 0, width: 14, height: 14, background: "#EF4444", borderRadius: "50%", fontSize: 9, fontWeight: 700, color: "white", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white" }}>{unread}</span>}
              </button>
              {showNotifs && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", width: 320, zIndex: 100, background: "white", border: "1px solid #E2E8F0", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.12)", overflow: "hidden" }}>
                  <div style={{ padding: "12px 16px", borderBottom: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>Notifications</span>
                    <span style={{ fontSize: 12, color: "#6366F1", fontWeight: 600, cursor: "pointer" }}>Mark all read</span>
                  </div>
                  {MOCK_NOTIFICATIONS.map(n => (
                    <div key={n.id} style={{ padding: "10px 16px", borderBottom: "1px solid #F8FAFC", display: "flex", gap: 8, alignItems: "flex-start", cursor: "pointer", background: n.read ? "white" : "#F8FAFC" }}>
                      <span style={{ fontSize: 13, marginTop: 1 }}>{typeIcon[n.type]}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.5 }}>{n.message}</div>
                        <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{n.time}</div>
                      </div>
                      {!n.read && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#EF4444", marginTop: 4, flexShrink: 0 }} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ height: 20, width: 1, background: "#E2E8F0" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white" }}>RM</div>
              <ChevronDown size={11} color="#94A3B8" />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main style={{ flex: 1, padding: "28px 32px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
