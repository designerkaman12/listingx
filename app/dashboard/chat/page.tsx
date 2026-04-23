"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Sparkles, Zap, ArrowRight, AlertTriangle, CheckCircle, TrendingUp, FileText, Image, Search, Target, BarChart2, MessageSquare } from "lucide-react";
import { processMessage, generateMessageId, WELCOME_SUGGESTIONS, ChatMessage, ChatResultData } from "@/lib/chat-ai";
import { getScoreColor } from "@/lib/utils";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateMessageId(),
      role: "ai",
      content: "Hey! 👋 I'm your AI ecommerce specialist. I can analyze any product listing, find what's hurting your sales, and generate everything you need to fix it.\n\nWhat would you like to work on today?",
      timestamp: new Date(),
      resultData: { type: "welcome" },
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentResult, setCurrentResult] = useState<ChatResultData | null>(null);
  const [currentProductId, setCurrentProductId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);

  const handleSend = useCallback(async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;

    const userMsg: ChatMessage = {
      id: generateMessageId(), role: "user", content: msg, timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise(r => setTimeout(r, 800 + Math.random() * 700));

    const { aiMessage, resultData, suggestions } = processMessage(msg, currentProductId);

    if (resultData?.product) setCurrentProductId(resultData.product.id);
    if (resultData) setCurrentResult(resultData);

    const aiMsg: ChatMessage = {
      id: generateMessageId(), role: "ai", content: aiMessage, timestamp: new Date(),
      resultData,
    };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  }, [input, currentProductId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleActionClick = (prompt: string) => { handleSend(prompt); };

  const severityColor: Record<string, string> = {
    critical: "#DC2626", high: "#EA580C", medium: "#CA8A04", low: "#16A34A",
  };
  const severityBg: Record<string, string> = {
    critical: "#FEF2F2", high: "#FFF7ED", medium: "#FFFBEB", low: "#F0FDF4",
  };

  return (
    <div className="chat-layout" style={{ margin: "-28px -32px", height: "calc(100vh - 64px)" }}>
      {/* LEFT — Chat Panel */}
      <div className="chat-panel">
        {/* Chat Header */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10, background: "white" }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-primary)" }}>
            <Sparkles size={16} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text)" }}>ListingX AI</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-light)", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
              Online — Ready to help
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-msg ${msg.role}`}>
              <div className={`chat-avatar ${msg.role === "ai" ? "ai-avatar" : "user-avatar"}`}>
                {msg.role === "ai" ? <Zap size={16} /> : "RM"}
              </div>
              <div className="chat-bubble">
                {msg.content.split("\n").map((line, i) => (
                  <span key={i}>
                    {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
                      part.startsWith("**") && part.endsWith("**")
                        ? <strong key={j}>{part.slice(2, -2)}</strong>
                        : part.split(/(\*[^*]+\*)/g).map((sub, k) =>
                            sub.startsWith("*") && sub.endsWith("*") && !sub.startsWith("**")
                              ? <em key={k}>{sub.slice(1, -1)}</em>
                              : <span key={k}>{sub}</span>
                          )
                    )}
                    {i < msg.content.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-msg ai">
              <div className="chat-avatar ai-avatar"><Zap size={16} /></div>
              <div className="typing-indicator">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {messages.length <= 2 && (
          <div className="suggestion-chips">
            {WELCOME_SUGGESTIONS.slice(0, 4).map(s => (
              <button key={s} className="suggestion-chip" onClick={() => handleSend(s)}>{s}</button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="chat-input-bar">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything... analyze a product, fix a title, generate content..."
            disabled={isTyping}
          />
          <button className="chat-send-btn" onClick={() => handleSend()} disabled={!input.trim() || isTyping}>
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* RIGHT — Results Panel */}
      <div className="results-panel hide-tablet">
        {!currentResult || currentResult.type === "welcome" ? (
          <WelcomePanel onAction={handleActionClick} />
        ) : currentResult.type === "analysis" && currentResult.product && currentResult.analysis ? (
          <AnalysisPanel result={currentResult} onAction={handleActionClick} severityColor={severityColor} severityBg={severityBg} />
        ) : currentResult.type === "content" && currentResult.generatedContent ? (
          <ContentPanel result={currentResult} onAction={handleActionClick} />
        ) : (
          <WelcomePanel onAction={handleActionClick} />
        )}
      </div>
    </div>
  );
}

/* ===== SUB-COMPONENTS ===== */

function WelcomePanel({ onAction }: { onAction: (p: string) => void }) {
  const quickActions = [
    { icon: Search, label: "Analyze a Product", desc: "Paste a link or product name", prompt: "Analyze my earbuds listing", color: "#4F8CFF" },
    { icon: FileText, label: "Generate Content", desc: "Titles, bullets, descriptions", prompt: "Generate bullet points for my top product", color: "#A855F7" },
    { icon: Image, label: "Image Brief", desc: "Professional photo plan", prompt: "Create an image brief for my listing", color: "#F97316" },
    { icon: TrendingUp, label: "Growth Plan", desc: "7-day action plan", prompt: "Build me a growth plan", color: "#10B981" },
    { icon: Target, label: "Competitor Analysis", desc: "Benchmark vs top sellers", prompt: "Compare my product with competitors", color: "#EC4899" },
    { icon: BarChart2, label: "SEO Optimization", desc: "Keyword research & gaps", prompt: "Find SEO keywords for my product", color: "#06B6D4" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", padding: 32 }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: "var(--shadow-primary)" }}>
        <MessageSquare size={26} color="white" />
      </div>
      <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.02em" }}>AI Workspace</h2>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: 400, lineHeight: 1.6, marginBottom: 36 }}>
        Start a conversation to analyze, fix, and optimize your ecommerce listings. Results will appear here.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%", maxWidth: 440 }}>
        {quickActions.map(a => (
          <button key={a.label} onClick={() => onAction(a.prompt)} style={{ background: "white", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 14px", cursor: "pointer", textAlign: "left", transition: "all 0.2s ease", boxShadow: "var(--shadow-xs)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-xs)"; }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${a.color}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
              <a.icon size={18} color={a.color} />
            </div>
            <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "var(--text)", marginBottom: 2 }}>{a.label}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-light)" }}>{a.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function AnalysisPanel({ result, onAction, severityColor, severityBg }: { result: ChatResultData; onAction: (p: string) => void; severityColor: Record<string, string>; severityBg: Record<string, string> }) {
  const { product, analysis, actions } = result;
  if (!product || !analysis) return null;

  return (
    <div>
      {/* Product Summary */}
      <div className="result-card" style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <img src={product.image} alt={product.title} style={{ width: 64, height: 64, borderRadius: 14, objectFit: "cover", border: "1px solid var(--border)" }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text)", marginBottom: 4, lineHeight: 1.35 }}>{product.title.substring(0, 60)}...</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>{product.asin} · {product.marketplace}</div>
        </div>
      </div>

      {/* Scores */}
      <div className="result-card">
        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Performance Scores</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            ["Listing", product.listingScore],
            ["SEO", product.seoScore],
            ["Conversion", product.conversionScore],
          ].map(([label, val]) => (
            <div key={label as string} style={{ textAlign: "center", background: "var(--bg)", borderRadius: 12, padding: "14px 8px" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: getScoreColor(val as number), lineHeight: 1 }}>{val as number}</div>
              <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--text-light)", marginTop: 4 }}>{label as string}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Issues */}
      <div className="result-card">
        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Issues Found ({analysis.problems.length})</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {analysis.problems.slice(0, 4).map(p => (
            <div key={p.id} style={{ padding: "10px 14px", borderRadius: 10, background: severityBg[p.severity] || "#F8FAFC", border: `1px solid ${severityColor[p.severity] || "#E2E8F0"}22`, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <AlertTriangle size={14} color={severityColor[p.severity]} style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)" }}>{p.title}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{p.expectedResult}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      {actions && actions.length > 0 && (
        <div className="result-card">
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Quick Actions</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {actions.map(a => (
              <button key={a.id} onClick={() => onAction(a.prompt)} className="action-btn action-btn-outline" style={{ justifyContent: "flex-start", width: "100%" }}>
                <span>{a.icon}</span> {a.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ContentPanel({ result, onAction }: { result: ChatResultData; onAction: (p: string) => void }) {
  const { product, generatedContent, actions } = result;
  if (!generatedContent) return null;

  return (
    <div>
      {product && (
        <div className="result-card" style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <img src={product.image} alt={product.title} style={{ width: 52, height: 52, borderRadius: 12, objectFit: "cover", border: "1px solid var(--border)" }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text)" }}>{product.title.substring(0, 50)}...</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-light)" }}>{product.marketplace}</div>
          </div>
        </div>
      )}

      <div className="result-card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle size={16} color="#10B981" />
            <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--text)" }}>{generatedContent.type}</span>
          </div>
          <button className="action-btn action-btn-primary" style={{ padding: "6px 14px", fontSize: "0.72rem" }}>
            Copy <ArrowRight size={12} />
          </button>
        </div>
        <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "18px 16px", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "'Inter', sans-serif", maxHeight: 400, overflowY: "auto" }}>
          {generatedContent.content}
        </div>
      </div>

      {actions && actions.length > 0 && (
        <div className="result-card">
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Generate More</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {actions.slice(0, 4).map(a => (
              <button key={a.id} onClick={() => onAction(a.prompt)} className="action-btn action-btn-outline">
                {a.icon} {a.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
