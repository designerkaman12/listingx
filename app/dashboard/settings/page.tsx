"use client";
import { useState } from "react";
import { User, Store, CreditCard, Bell, Shield, Users, ChevronRight, CheckCircle, Zap } from "lucide-react";

const TABS = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "marketplaces", icon: Store, label: "Marketplaces" },
  { id: "billing", icon: CreditCard, label: "Billing" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "security", icon: Shield, label: "Security" },
  { id: "team", icon: Users, label: "Team" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>Settings</h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Manage your account, connections, and preferences</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 24 }}>
        {/* Sidebar */}
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: 12, height: "fit-content", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none", background: activeTab === tab.id ? "rgba(99,102,241,0.08)" : "transparent", color: activeTab === tab.id ? "#6366f1" : "#64748b", fontSize: "0.875rem", fontWeight: activeTab === tab.id ? 700 : 500, cursor: "pointer", textAlign: "left", marginBottom: 2, transition: "all 0.2s" }}>
              <tab.icon size={16} /> {tab.label}
              {activeTab === tab.id && <ChevronRight size={14} style={{ marginLeft: "auto" }} />}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          {/* PROFILE */}
          {activeTab === "profile" && (
            <div style={{ padding: 32 }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: 24 }}>Profile Settings</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32, padding: 20, background: "#f8fafc", borderRadius: 14 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", fontWeight: 800, color: "white" }}>RM</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#0f172a" }}>Rahul Mehta</div>
                  <div style={{ color: "#64748b", fontSize: "0.875rem" }}>rahul@brand.com · Pro Plan</div>
                  <button style={{ marginTop: 8, padding: "5px 14px", background: "white", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", color: "#374151" }}>Change Photo</button>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                {[["Full Name", "Rahul Mehta"], ["Brand Name", "NovaTech Store"], ["Email", "rahul@brand.com"], ["Country", "India"], ["Phone", "+91 98765 43210"], ["Time Zone", "Asia/Kolkata (IST)"]].map(([label, val]) => (
                  <div key={label}>
                    <label style={{ display: "block", fontWeight: 600, color: "#374151", marginBottom: 6, fontSize: "0.875rem" }}>{label}</label>
                    <input defaultValue={val} style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: "0.875rem", fontFamily: "Inter, sans-serif", color: "#0f172a", outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
              <button onClick={save} style={{ padding: "11px 28px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 10, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                {saved ? <><CheckCircle size={15} /> Saved!</> : "Save Changes"}
              </button>
            </div>
          )}

          {/* MARKETPLACES */}
          {activeTab === "marketplaces" && (
            <div style={{ padding: 32 }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: 24 }}>Connected Marketplaces</h2>
              <div style={{ display: "grid", gap: 14 }}>
                {[
                  { name: "Amazon", logo: "🟡", status: "connected", account: "rahul@brand.com · Seller Central", region: "IN, US" },
                  { name: "Flipkart", logo: "🔷", status: "connected", account: "seller-12345 · Flipkart Seller Hub", region: "IN" },
                  { name: "Shopify", logo: "🟢", status: "coming_soon", account: "-", region: "-" },
                  { name: "Meesho", logo: "🟣", status: "coming_soon", account: "-", region: "-" },
                ].map(mp => (
                  <div key={mp.name} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", border: `1.5px solid ${mp.status === "connected" ? "#bbf7d0" : "#e2e8f0"}`, borderRadius: 13, background: mp.status === "connected" ? "#f0fdf4" : "#fafafa" }}>
                    <span style={{ fontSize: "2rem" }}>{mp.logo}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a" }}>{mp.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: 2 }}>{mp.account} {mp.region !== "-" ? `· Regions: ${mp.region}` : ""}</div>
                    </div>
                    {mp.status === "connected" ? (
                      <div style={{ display: "flex", gap: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#22c55e", fontWeight: 700, fontSize: "0.85rem" }}><CheckCircle size={15} /> Connected</div>
                        <button style={{ padding: "7px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "white", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", color: "#64748b" }}>Disconnect</button>
                      </div>
                    ) : (
                      <span style={{ padding: "5px 12px", background: "#f1f5f9", color: "#94a3b8", borderRadius: 7, fontSize: "0.78rem", fontWeight: 600 }}>Coming Soon</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BILLING */}
          {activeTab === "billing" && (
            <div style={{ padding: 32 }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: 24 }}>Subscription & Billing</h2>
              <div style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 16, padding: 24, color: "white", marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, opacity: 0.8, marginBottom: 4 }}>CURRENT PLAN</div>
                    <div style={{ fontSize: "1.8rem", fontWeight: 900 }}>Pro Plan</div>
                    <div style={{ opacity: 0.8, fontSize: "0.875rem", marginTop: 4 }}>$79/month · Up to 100 products</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "8px 16px", fontSize: "0.8rem", fontWeight: 700 }}>Active</div>
                </div>
                <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
                  <button style={{ padding: "9px 20px", background: "white", color: "#6366f1", border: "none", borderRadius: 9, fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}>Upgrade to Agency</button>
                  <button style={{ padding: "9px 20px", background: "rgba(255,255,255,0.15)", color: "white", border: "none", borderRadius: 9, fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Manage Billing</button>
                </div>
              </div>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14, padding: 20, marginBottom: 20 }}>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: 12 }}>Usage This Month</div>
                <div style={{ display: "grid", gap: 10 }}>
                  {[["Products Analyzed", "68 / 100"], ["Content Generated", "34 pieces"], ["Reports Shared", "3"], ["Team Members", "1 / 3"]].map(([label, val]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
                      <span style={{ fontSize: "0.875rem", color: "#64748b" }}>{label}</span>
                      <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0f172a" }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: 12 }}>Billing History</div>
                {[["Apr 1, 2026", "$79.00", "Pro Plan"], ["Mar 1, 2026", "$79.00", "Pro Plan"], ["Feb 1, 2026", "$79.00", "Pro Plan"]].map(([date, amt, plan]) => (
                  <div key={date} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f1f5f9", fontSize: "0.875rem" }}>
                    <span style={{ color: "#64748b" }}>{date}</span>
                    <span style={{ color: "#64748b" }}>{plan}</span>
                    <span style={{ fontWeight: 700, color: "#0f172a" }}>{amt}</span>
                    <button style={{ padding: "4px 10px", background: "white", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: "0.75rem", cursor: "pointer", color: "#6366f1", fontWeight: 600 }}>Receipt</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div style={{ padding: 32 }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: 24 }}>Notification Preferences</h2>
              <div style={{ display: "grid", gap: 14 }}>
                {[
                  { label: "Weekly Growth Report", desc: "Receive your weekly AI growth summary every Monday", enabled: true },
                  { label: "Urgent Listing Alerts", desc: "Get notified when a product drops in score or stops selling", enabled: true },
                  { label: "New AI Suggestions", desc: "Be notified when AI adds new optimization recommendations", enabled: true },
                  { label: "Competitor Changes", desc: "Alerts when competitors in your category make significant moves", enabled: false },
                  { label: "Content Generation Complete", desc: "Notification when AI finishes generating your content", enabled: true },
                  { label: "Marketing Tips & Updates", desc: "Periodic ecommerce growth tips and platform updates", enabled: false },
                ].map((n, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", border: "1px solid #f1f5f9", borderRadius: 12, background: "#fafafa" }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#0f172a" }}>{n.label}</div>
                      <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: 2 }}>{n.desc}</div>
                    </div>
                    <div style={{ width: 44, height: 24, borderRadius: 99, background: n.enabled ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#e2e8f0", position: "relative", cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "white", position: "absolute", top: 3, left: n.enabled ? 22 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={save} style={{ marginTop: 20, padding: "11px 28px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 10, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" }}>
                {saved ? "Saved!" : "Save Preferences"}
              </button>
            </div>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <div style={{ padding: 32 }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: 24 }}>Security</h2>
              <div style={{ display: "grid", gap: 20 }}>
                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14, padding: 20 }}>
                  <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Change Password</div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: 14 }}>Update your account password regularly for security.</div>
                  <div style={{ display: "grid", gap: 12 }}>
                    {["Current Password", "New Password", "Confirm New Password"].map(label => (
                      <div key={label}>
                        <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>{label}</label>
                        <input type="password" style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 9, fontSize: "0.875rem", fontFamily: "Inter, sans-serif", outline: "none", boxSizing: "border-box" }} />
                      </div>
                    ))}
                  </div>
                  <button onClick={save} style={{ marginTop: 14, padding: "10px 22px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 9, fontWeight: 700, cursor: "pointer" }}>Update Password</button>
                </div>
                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#0f172a" }}>Two-Factor Authentication</div>
                      <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: 4 }}>Add an extra layer of security to your account</div>
                    </div>
                    <button style={{ padding: "9px 18px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 9, fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>Enable 2FA</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TEAM */}
          {activeTab === "team" && (
            <div style={{ padding: 32 }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: 24 }}>Team Access</h2>
              <div style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.06),rgba(139,92,246,0.06))", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 14, padding: 20, marginBottom: 24 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Zap size={18} color="#6366f1" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Pro Plan includes 3 team seats</div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Invite team members to collaborate on listings, reports, and optimization tasks. Upgrade to Agency for unlimited seats.</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <input type="email" placeholder="Enter team member email..." style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: "0.875rem", fontFamily: "Inter, sans-serif", outline: "none" }} />
                <select style={{ padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: "0.875rem", fontFamily: "Inter, sans-serif", color: "#0f172a", background: "white", outline: "none" }}>
                  <option>Manager</option><option>Editor</option><option>Viewer</option>
                </select>
                <button style={{ padding: "10px 20px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: "0.875rem" }}>Invite</button>
              </div>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.85rem" }}>RM</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a" }}>Rahul Mehta</div>
                  <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>rahul@brand.com</div>
                </div>
                <span style={{ padding: "4px 10px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", borderRadius: 7, fontSize: "0.75rem", fontWeight: 700 }}>Owner</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
