"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, LayoutDashboard, Package, FileText, Sparkles, TrendingUp, Users, Settings, Bell, Search, ChevronDown, BarChart2, LogOut, HelpCircle } from "lucide-react";
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

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      {/* SIDEBAR */}
      <aside style={{ width: 250, background: "white", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 50 }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={17} color="white" /></div>
            <span style={{ fontWeight: 900, fontSize: "1.15rem", color: "#0f172a", letterSpacing: "-0.02em" }}>ListingX</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 8px", marginBottom: 8 }}>Main Menu</div>
          {navItems.map(item => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, fontSize: "0.875rem", fontWeight: 500, color: isActive ? "white" : "#64748b", background: isActive ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "transparent", textDecoration: "none", transition: "all 0.2s", boxShadow: isActive ? "0 4px 12px rgba(99,102,241,0.3)" : "none" }}>
                <item.icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid #f1f5f9" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))", borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6366f1", marginBottom: 4 }}>⚡ Pro Plan</div>
            <div style={{ fontSize: "0.8rem", color: "#64748b" }}>68 / 100 products analyzed</div>
            <div style={{ height: 4, background: "#e2e8f0", borderRadius: 99, marginTop: 8, overflow: "hidden" }}>
              <div style={{ width: "68%", height: "100%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 99 }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700, color: "white", flexShrink: 0 }}>RM</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Rahul Mehta</div>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>rahul@brand.com</div>
            </div>
            <Link href="/" style={{ color: "#94a3b8" }}><LogOut size={15} /></Link>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ marginLeft: 250, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* TOPBAR */}
        <header style={{ background: "white", borderBottom: "1px solid #e2e8f0", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", position: "sticky", top: 0, zIndex: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "8px 16px", width: 320 }}>
            <Search size={15} color="#94a3b8" />
            <input type="text" placeholder="Search products, ASINs, reports..." style={{ border: "none", background: "transparent", fontSize: "0.875rem", color: "#0f172a", outline: "none", fontFamily: "Inter, sans-serif", width: "100%" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="#" style={{ color: "#94a3b8", display: "flex" }}><HelpCircle size={20} /></a>
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowNotifs(!showNotifs)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", position: "relative", display: "flex" }}>
                <Bell size={20} />
                {unread > 0 && <span style={{ position: "absolute", top: -4, right: -4, width: 17, height: 17, background: "#ef4444", borderRadius: "50%", fontSize: "0.65rem", fontWeight: 700, color: "white", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white" }}>{unread}</span>}
              </button>
              {showNotifs && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", width: 340, background: "white", border: "1px solid #e2e8f0", borderRadius: 14, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 100, overflow: "hidden" }}>
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", fontWeight: 700, fontSize: "0.9rem", color: "#0f172a" }}>Notifications</div>
                  {MOCK_NOTIFICATIONS.map(n => (
                    <div key={n.id} style={{ padding: "12px 16px", borderBottom: "1px solid #f8fafc", background: n.read ? "white" : "rgba(99,102,241,0.04)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ fontSize: "1rem", marginTop: 1 }}>{n.type === "urgent" ? "🚨" : n.type === "warning" ? "⚠️" : n.type === "success" ? "✅" : "ℹ️"}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.825rem", color: "#374151", lineHeight: 1.5 }}>{n.message}</div>
                        <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 3 }}>{n.time}</div>
                      </div>
                      {!n.read && <div style={{ width: 7, height: 7, background: "#6366f1", borderRadius: "50%", marginTop: 5, flexShrink: 0 }} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ height: 28, width: 1, background: "#e2e8f0" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "white" }}>RM</div>
              <ChevronDown size={14} color="#94a3b8" />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main style={{ flex: 1, padding: "28px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
