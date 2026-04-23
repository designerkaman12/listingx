"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Sparkles, Zap, ArrowRight, AlertTriangle, CheckCircle, TrendingUp, FileText, Image, Search, Target, BarChart2, MessageSquare, Copy } from "lucide-react";
import { processMessage, generateMessageId, WELCOME_SUGGESTIONS, ChatMessage, ChatResultData } from "@/lib/chat-ai";
import { getScoreColor } from "@/lib/utils";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: generateMessageId(), role: "ai", content: "Hey! 👋 I'm your AI ecommerce specialist. I can analyze any product listing, find what's hurting your sales, and generate everything you need to fix it.\n\nWhat would you like to work on today?", timestamp: new Date(), resultData: { type: "welcome" } },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentResult, setCurrentResult] = useState<ChatResultData | null>(null);
  const [currentProductId, setCurrentProductId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, []);
  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);

  const handleSend = useCallback(async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setMessages(prev => [...prev, { id: generateMessageId(), role: "user", content: msg, timestamp: new Date() }]);
    setInput("");
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    const { aiMessage, resultData } = processMessage(msg, currentProductId);
    if (resultData?.product) setCurrentProductId(resultData.product.id);
    if (resultData) setCurrentResult(resultData);
    setMessages(prev => [...prev, { id: generateMessageId(), role: "ai", content: aiMessage, timestamp: new Date(), resultData }]);
    setIsTyping(false);
  }, [input, currentProductId]);

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  const sev: Record<string, { bg: string; border: string; color: string }> = {
    critical: { bg: "#FEF2F2", border: "#FECACA", color: "#DC2626" },
    high: { bg: "#FFF7ED", border: "#FED7AA", color: "#EA580C" },
    medium: { bg: "#FFFBEB", border: "#FDE68A", color: "#CA8A04" },
    low: { bg: "#F0FDF4", border: "#A7F3D0", color: "#16A34A" },
  };

  return (
    <div className="chat-layout" style={{ margin: "-28px -32px", height: "calc(100vh - 56px)" }}>
      {/* LEFT — Chat */}
      <div className="chat-panel">
        {/* Header */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center" }}><Sparkles size={14} color="white" /></div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>ListingX AI</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--success)", display: "inline-block" }} /> Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-msg ${msg.role}`}>
              <div className={`chat-avatar ${msg.role === "ai" ? "ai-avatar" : "user-avatar"}`}>
                {msg.role === "ai" ? <Zap size={13} /> : "RM"}
              </div>
              <div className="chat-bubble">
                {msg.content.split("\n").map((line, i) => (
                  <span key={i}>
                    {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
                      part.startsWith("**") && part.endsWith("**")
                        ? <strong key={j} style={{ color: "var(--text-primary)" }}>{part.slice(2, -2)}</strong>
                        : <span key={j}>{part}</span>
                    )}
                    {i < msg.content.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-msg ai">
              <div className="chat-avatar ai-avatar"><Zap size={13} /></div>
              <div className="typing-indicator"><div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" /></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div className="suggestion-chips">
            {WELCOME_SUGGESTIONS.slice(0, 4).map(s => (
              <button key={s} className="suggestion-chip" onClick={() => handleSend(s)}>{s}</button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chat-input-bar">
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask anything..." disabled={isTyping} />
          <button className="chat-send-btn" onClick={() => handleSend()} disabled={!input.trim() || isTyping}><Send size={16} /></button>
        </div>
      </div>

      {/* RIGHT — Results */}
      <div className="results-panel hide-tablet">
        {!currentResult || currentResult.type === "welcome" ? (
          <WelcomePanel onAction={handleSend} />
        ) : currentResult.type === "analysis" && currentResult.product && currentResult.analysis ? (
          <AnalysisPanel result={currentResult} onAction={handleSend} sev={sev} />
        ) : currentResult.type === "content" && currentResult.generatedContent ? (
          <ContentPanel result={currentResult} onAction={handleSend} />
        ) : <WelcomePanel onAction={handleSend} />}
      </div>
    </div>
  );
}

function WelcomePanel({ onAction }: { onAction: (p: string) => void }) {
  const items = [
    { icon: Search, label: "Analyze Product", desc: "Paste a link or name", prompt: "Analyze my earbuds listing", color: "#4F46E5" },
    { icon: FileText, label: "Generate Content", desc: "Titles, bullets, descriptions", prompt: "Generate bullet points for my top product", color: "#9333EA" },
    { icon: Image, label: "Image Brief", desc: "Professional photo plan", prompt: "Create an image brief", color: "#F97316" },
    { icon: TrendingUp, label: "Growth Plan", desc: "7-day action plan", prompt: "Build me a growth plan", color: "#10B981" },
    { icon: Target, label: "Competitor Intel", desc: "Benchmark vs top sellers", prompt: "Compare my product with competitors", color: "#EC4899" },
    { icon: BarChart2, label: "SEO Keywords", desc: "Keyword research", prompt: "Find SEO keywords for my product", color: "#06B6D4" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 32 }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <MessageSquare size={22} color="white" />
      </div>
      <h2 className="h3" style={{ marginBottom: 8, textAlign: "center" }}>AI Workspace</h2>
      <p className="body" style={{ textAlign: "center", maxWidth: 360, marginBottom: 32 }}>Start a conversation to analyze, fix, and optimize your listings. Results appear here.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%", maxWidth: 400 }}>
        {items.map(a => (
          <button key={a.label} onClick={() => onAction(a.prompt)} className="card card-hover" style={{ padding: 16, cursor: "pointer", textAlign: "left", border: "1px solid var(--border)" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `${a.color}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
              <a.icon size={16} color={a.color} />
            </div>
            <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)", marginBottom: 2 }}>{a.label}</div>
            <div className="caption">{a.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function AnalysisPanel({ result, onAction, sev }: { result: ChatResultData; onAction: (p: string) => void; sev: Record<string, { bg: string; border: string; color: string }> }) {
  const { product, analysis, actions } = result;
  if (!product || !analysis) return null;
  return (
    <div>
      {/* Product Summary */}
      <div className="result-card" style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <img src={product.image} alt="" style={{ width: 56, height: 56, borderRadius: 12, objectFit: "cover", border: "1px solid var(--border)" }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, lineHeight: 1.35, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.title}</div>
          <div className="caption">{product.asin} · {product.marketplace}</div>
        </div>
      </div>

      {/* Scores */}
      <div className="result-card">
        <div className="section-label" style={{ marginBottom: 16 }}>Performance Scores</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {([["Listing", product.listingScore], ["SEO", product.seoScore], ["Conversion", product.conversionScore]] as [string, number][]).map(([label, val]) => (
            <div key={label} style={{ textAlign: "center", background: "var(--bg-alt)", borderRadius: 8, padding: "12px 8px" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: getScoreColor(val), lineHeight: 1 }}>{val}</div>
              <div className="caption" style={{ marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Issues */}
      <div className="result-card">
        <div className="section-label" style={{ marginBottom: 12 }}>Issues ({analysis.problems.length})</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {analysis.problems.slice(0, 4).map(p => {
            const s = sev[p.severity] || sev.medium;
            return (
              <div key={p.id} style={{ padding: "10px 12px", borderRadius: 8, background: s.bg, border: `1px solid ${s.border}`, display: "flex", gap: 8, alignItems: "flex-start" }}>
                <AlertTriangle size={13} color={s.color} style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{p.title}</div>
                  <div className="caption" style={{ marginTop: 2 }}>{p.expectedResult}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div className="result-card">
          <div className="section-label" style={{ marginBottom: 12 }}>Quick Actions</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {actions.map(a => (
              <button key={a.id} onClick={() => onAction(a.prompt)} className="action-btn action-btn-outline" style={{ justifyContent: "flex-start", width: "100%" }}>
                <span style={{ fontSize: 13 }}>{a.icon}</span> {a.label}
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
        <div className="result-card" style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <img src={product.image} alt="" style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover", border: "1px solid var(--border)" }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{product.title.substring(0, 50)}...</div>
            <div className="caption">{product.marketplace}</div>
          </div>
        </div>
      )}
      <div className="result-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle size={15} color="var(--success)" />
            <span style={{ fontWeight: 600, fontSize: 14 }}>{generatedContent.type}</span>
          </div>
          <button className="action-btn action-btn-primary" style={{ gap: 4 }}><Copy size={12} /> Copy</button>
        </div>
        <div style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", borderRadius: 8, padding: 16, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, whiteSpace: "pre-wrap", maxHeight: 400, overflowY: "auto" }}>
          {generatedContent.content}
        </div>
      </div>
      {actions && actions.length > 0 && (
        <div className="result-card">
          <div className="section-label" style={{ marginBottom: 12 }}>Generate More</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {actions.slice(0, 4).map(a => (
              <button key={a.id} onClick={() => onAction(a.prompt)} className="action-btn action-btn-outline">{a.icon} {a.label}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
