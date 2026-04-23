"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Sparkles, Zap, AlertTriangle, CheckCircle, TrendingUp, FileText, Image, Search, Target, BarChart2, MessageSquare, Copy } from "lucide-react";
import { processMessage, generateMessageId, WELCOME_SUGGESTIONS, ChatMessage, ChatResultData } from "@/lib/chat-ai";
import { getScoreColor } from "@/lib/utils";

const G = "linear-gradient(135deg,#6366F1,#8B5CF6)";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: generateMessageId(), role: "ai", content: "Hey! 👋 I'm your AI ecommerce specialist. I can analyze any product listing, find what's hurting your sales, and generate everything you need to fix it.\n\nWhat would you like to work on today?", timestamp: new Date(), resultData: { type: "welcome" } },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentResult, setCurrentResult] = useState<ChatResultData | null>(null);
  const [currentProductId, setCurrentProductId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, []);
  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);

  const handleSend = useCallback(async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setMessages(prev => [...prev, { id: generateMessageId(), role: "user", content: msg, timestamp: new Date() }]);
    setInput("");
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    try {
      const { aiMessage, resultData } = processMessage(msg, currentProductId);
      if (resultData?.product) setCurrentProductId(resultData.product.id);
      if (resultData) setCurrentResult(resultData);
      setMessages(prev => [...prev, { id: generateMessageId(), role: "ai", content: aiMessage, timestamp: new Date(), resultData }]);
    } catch {
      setMessages(prev => [...prev, { id: generateMessageId(), role: "ai", content: "Sorry, I ran into an issue. Please try again.", timestamp: new Date() }]);
    }
    setIsTyping(false);
  }, [input, currentProductId]);

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  const sev: Record<string, { bg: string; border: string; color: string }> = {
    critical: { bg: "#FEF2F2", border: "#FECACA", color: "#DC2626" },
    high:     { bg: "#FFF7ED", border: "#FED7AA", color: "#EA580C" },
    medium:   { bg: "#FFFBEB", border: "#FDE68A", color: "#CA8A04" },
    low:      { bg: "#F0FDF4", border: "#A7F3D0", color: "#16A34A" },
  };

  return (
    <div style={{ margin: "-28px -32px", height: "calc(100vh - 54px)", display: "flex", overflow: "hidden" }}>
      {/* LEFT — Chat panel */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", borderRight: "1px solid #E2E8F0", background: "white", overflow: "hidden", minWidth: 0 }}>
        {/* Header */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: G, display: "flex", alignItems: "center", justifyContent: "center" }}><Sparkles size={14} color="white" /></div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#0F172A" }}>ListingX AI</div>
            <div style={{ fontSize: 11, color: "#94A3B8", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} /> Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: "flex", gap: 8, alignItems: "flex-start", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: msg.role === "ai" ? G : "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 10, fontWeight: 700, color: "white" }}>
                {msg.role === "ai" ? <Zap size={12} color="white" /> : "RM"}
              </div>
              <div style={{
                maxWidth: "80%", padding: "10px 14px", fontSize: 13, lineHeight: 1.65, wordBreak: "break-word",
                borderRadius: msg.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                background: msg.role === "user" ? G : "#F8FAFC",
                color: msg.role === "user" ? "white" : "#475569",
                border: msg.role === "user" ? "none" : "1px solid #F1F5F9",
              }}>
                {msg.content.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
                      part.startsWith("**") && part.endsWith("**")
                        ? <strong key={j} style={{ color: msg.role === "user" ? "white" : "#0F172A" }}>{part.slice(2, -2)}</strong>
                        : <span key={j}>{part}</span>
                    )}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Zap size={12} color="white" /></div>
              <div style={{ padding: "12px 14px", background: "#F8FAFC", border: "1px solid #F1F5F9", borderRadius: "4px 16px 16px 16px", display: "flex", gap: 4, alignItems: "center" }}>
                {[0, 200, 400].map(d => <div key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: "#94A3B8", animation: `typing 1.2s ease-in-out ${d}ms infinite` }} />)}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion chips */}
        {messages.length <= 2 && (
          <div style={{ padding: "8px 16px 10px", borderTop: "1px solid #F1F5F9", display: "flex", gap: 6, flexWrap: "wrap", flexShrink: 0 }}>
            {WELCOME_SUGGESTIONS.slice(0, 4).map(s => (
              <button key={s} onClick={() => handleSend(s)} style={{ padding: "5px 12px", borderRadius: 99, border: "1.5px solid #E2E8F0", background: "white", color: "#475569", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "10px 14px", borderTop: "1px solid #E2E8F0", flexShrink: 0 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your listings..."
            disabled={isTyping}
            style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: 10, fontSize: 13, outline: "none", fontFamily: "inherit", color: "#0F172A", background: "#F8FAFC" }}
          />
          <button onClick={() => handleSend()} disabled={!input.trim() || isTyping} style={{ width: 38, height: 38, borderRadius: 10, background: G, border: "none", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: (!input.trim() || isTyping) ? 0.4 : 1 }}>
            <Send size={15} />
          </button>
        </div>
      </div>

      {/* RIGHT — Results panel */}
      <div style={{ width: 360, overflow: "auto", background: "#F8FAFC", padding: 16, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {!currentResult || currentResult.type === "welcome" ? (
          <WelcomePanel onAction={handleSend} />
        ) : currentResult.type === "analysis" && currentResult.product && currentResult.analysis ? (
          <AnalysisPanel result={currentResult} onAction={handleSend} sev={sev} />
        ) : currentResult.type === "content" && currentResult.generatedContent ? (
          <ContentPanel result={currentResult} onAction={handleSend} />
        ) : <WelcomePanel onAction={handleSend} />}
      </div>

      <style>{`@keyframes typing{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}`}</style>
    </div>
  );
}

function WelcomePanel({ onAction }: { onAction: (p: string) => void }) {
  const items = [
    { icon: Search,       label: "Analyze Product",   desc: "Paste a link or name",          prompt: "Analyze my earbuds listing",            color: "#4F46E5" },
    { icon: FileText,     label: "Generate Content",   desc: "Titles, bullets, descriptions",  prompt: "Generate bullet points for my top product", color: "#9333EA" },
    { icon: Image,        label: "Image Brief",        desc: "Professional photo plan",        prompt: "Create an image brief",                 color: "#F97316" },
    { icon: TrendingUp,   label: "Growth Plan",        desc: "7-day action plan",              prompt: "Build me a growth plan",                color: "#10B981" },
    { icon: Target,       label: "Competitor Intel",   desc: "Benchmark vs top sellers",       prompt: "Compare my product with competitors",   color: "#EC4899" },
    { icon: BarChart2,    label: "SEO Keywords",       desc: "Keyword research",               prompt: "Find SEO keywords for my product",       color: "#06B6D4" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 16 }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#6366F1,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
        <MessageSquare size={22} color="white" />
      </div>
      <h2 style={{ fontWeight: 800, fontSize: 16, marginBottom: 6, textAlign: "center", color: "#0F172A" }}>AI Workspace</h2>
      <p style={{ fontSize: 13, color: "#64748B", textAlign: "center", maxWidth: 280, marginBottom: 24, lineHeight: 1.6 }}>Start a conversation — results and insights will appear here.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%" }}>
        {items.map(a => (
          <button key={a.label} onClick={() => onAction(a.prompt)} style={{ padding: 14, cursor: "pointer", textAlign: "left", border: "1px solid #E2E8F0", borderRadius: 10, background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", fontFamily: "inherit", transition: "all 0.18s ease" }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: `${a.color}14`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
              <a.icon size={15} color={a.color} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#0F172A", marginBottom: 2 }}>{a.label}</div>
            <div style={{ fontSize: 11, color: "#94A3B8" }}>{a.desc}</div>
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
      <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 12, padding: 14, marginBottom: 10, display: "flex", gap: 12, alignItems: "center" }}>
        <img src={product.image} alt="" style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover", border: "1px solid #F1F5F9" }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#0F172A" }}>{product.title}</div>
          <div style={{ fontSize: 11, color: "#94A3B8" }}>{product.asin} · {product.marketplace}</div>
        </div>
      </div>
      <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 12, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94A3B8", marginBottom: 12 }}>Performance Scores</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {([["Listing", product.listingScore], ["SEO", product.seoScore], ["Conversion", product.conversionScore]] as [string, number][]).map(([label, val]) => (
            <div key={label} style={{ textAlign: "center", background: "#F8FAFC", borderRadius: 8, padding: "10px 6px" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: getScoreColor(val), lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 3 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 12, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94A3B8", marginBottom: 10 }}>Issues ({analysis.problems.length})</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {analysis.problems.slice(0, 4).map(p => {
            const s = sev[p.severity] || sev.medium;
            return (
              <div key={p.id} style={{ padding: "9px 11px", borderRadius: 8, background: s.bg, border: `1px solid ${s.border}`, display: "flex", gap: 8, alignItems: "flex-start" }}>
                <AlertTriangle size={12} color={s.color} style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#0F172A" }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>{p.expectedResult}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {actions && actions.length > 0 && (
        <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 12, padding: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94A3B8", marginBottom: 10 }}>Quick Actions</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
            {actions.map(a => (
              <button key={a.id} onClick={() => onAction(a.prompt)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 10px", border: "1.5px solid #E2E8F0", borderRadius: 8, background: "white", fontSize: 11, fontWeight: 600, color: "#475569", cursor: "pointer", fontFamily: "inherit" }}>
                <span style={{ fontSize: 12 }}>{a.icon}</span> {a.label}
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
  const [copied, setCopied] = useState(false);
  if (!generatedContent) return null;
  const copy = () => { navigator.clipboard.writeText(generatedContent.content); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div>
      {product && (
        <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 12, padding: 12, marginBottom: 10, display: "flex", gap: 10, alignItems: "center" }}>
          <img src={product.image} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#0F172A" }}>{product.title.substring(0, 48)}...</div>
            <div style={{ fontSize: 11, color: "#94A3B8" }}>{product.marketplace}</div>
          </div>
        </div>
      )}
      <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 12, padding: 14, marginBottom: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <CheckCircle size={14} color="#22C55E" />
            <span style={{ fontWeight: 700, fontSize: 13, color: "#0F172A" }}>{generatedContent.type}</span>
          </div>
          <button onClick={copy} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", background: copied ? "#F0FDF4" : "white", border: `1.5px solid ${copied ? "#BBF7D0" : "#E2E8F0"}`, borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer", color: copied ? "#16A34A" : "#64748B", fontFamily: "inherit" }}>
            <Copy size={11} /> {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#374151", lineHeight: 1.75, whiteSpace: "pre-wrap", wordBreak: "break-word", background: "#F8FAFC", borderRadius: 8, padding: 12, border: "1px solid #F1F5F9", maxHeight: 320, overflow: "auto", margin: 0 }}>
          {generatedContent.content}
        </pre>
      </div>
      {actions && actions.length > 0 && (
        <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 12, padding: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94A3B8", marginBottom: 10 }}>Generate More</div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {actions.slice(0, 4).map(a => (
              <button key={a.id} onClick={() => onAction(a.prompt)} style={{ padding: "6px 11px", border: "1.5px solid #E2E8F0", borderRadius: 8, background: "white", fontSize: 11, fontWeight: 600, color: "#475569", cursor: "pointer", fontFamily: "inherit" }}>
                {a.icon} {a.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
