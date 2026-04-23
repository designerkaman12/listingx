"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { GENERATED_CONTENT_TEMPLATES } from "@/lib/mock-ai";
import { Sparkles, Copy, CheckCircle, RefreshCw, Download } from "lucide-react";

const GENERATION_TYPES = [
  { id: "title", label: "Product Title", icon: "📝" },
  { id: "bullets", label: "Bullet Points", icon: "•" },
  { id: "description", label: "Description", icon: "📄" },
  { id: "seoKeywords", label: "SEO Keywords", icon: "🔍" },
  { id: "faq", label: "FAQ", icon: "❓" },
  { id: "adCopy", label: "Ad Copy", icon: "📣" },
  { id: "brandStory", label: "Brand Story", icon: "🏷️" },
  { id: "imageBrief", label: "Image Brief", icon: "🖼️" },
];

function GenerateContent() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product") || MOCK_PRODUCTS[0].id;
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [selectedType, setSelectedType] = useState(GENERATION_TYPES[0].id);
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const product = MOCK_PRODUCTS.find(p => p.id === selectedProduct) || MOCK_PRODUCTS[0];
  const typeConfig = GENERATION_TYPES.find(t => t.id === selectedType)!;

  const generate = async () => {
    setGenerating(true);
    setOutput("");
    await new Promise(r => setTimeout(r, 800));
    const fn = GENERATED_CONTENT_TEMPLATES[selectedType];
    const text = fn ? fn(product) : "Content generated successfully.";
    setGenerating(false);
    // Typing effect
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setOutput(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 8);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>AI Content Generator</h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Generate optimized listing content, keywords, and creative briefs instantly.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24, alignItems: "start" }}>
        {/* Left Panel */}
        <div>
          {/* Product Selector */}
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: 20, marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Select Product</div>
            <select
              value={selectedProduct}
              onChange={e => setSelectedProduct(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: "0.875rem", fontFamily: "Inter, sans-serif", color: "#0f172a", background: "white", outline: "none" }}
            >
              {MOCK_PRODUCTS.map(p => (
                <option key={p.id} value={p.id}>{p.title.substring(0, 50)}...</option>
              ))}
            </select>
            {/* Product preview */}
            <div style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "center" }}>
              <img src={product.image} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover" }} />
              <div>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>{product.title.substring(0, 45)}...</div>
                <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 2 }}>{product.marketplace} · {product.asin}</div>
              </div>
            </div>
          </div>

          {/* Content Type Selector */}
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Content Type</div>
            <div style={{ display: "grid", gap: 6 }}>
              {GENERATION_TYPES.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedType(t.id); setOutput(""); }}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${selectedType === t.id ? "#6366f1" : "#f1f5f9"}`, background: selectedType === t.id ? "rgba(99,102,241,0.08)" : "#fafafa", color: selectedType === t.id ? "#6366f1" : "#374151", fontSize: "0.875rem", fontWeight: selectedType === t.id ? 700 : 500, cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
                >
                  <span style={{ fontSize: "1rem" }}>{t.icon}</span> {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Output */}
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          {/* Header */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a" }}>{typeConfig.icon} {typeConfig.label}</div>
              <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: 2 }}>Platform-optimized for {product.marketplace}</div>
            </div>
            {output && (
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={generate} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", border: "1.5px solid #e2e8f0", borderRadius: 9, background: "white", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", color: "#64748b" }}>
                  <RefreshCw size={13} /> Regenerate
                </button>
                <button onClick={copy} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", border: "1.5px solid #e2e8f0", borderRadius: 9, background: "white", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", color: copied ? "#22c55e" : "#64748b" }}>
                  {copied ? <CheckCircle size={13} /> : <Copy size={13} />} {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            )}
          </div>

          {/* Output area */}
          <div style={{ padding: 24, minHeight: 400 }}>
            {!output && !generating && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 360, textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>✨</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Ready to generate</div>
                <p style={{ color: "#94a3b8", fontSize: "0.9rem", maxWidth: 320, lineHeight: 1.6, marginBottom: 28 }}>
                  Click generate to create an AI-optimized {typeConfig.label.toLowerCase()} tailored for your product on {product.marketplace}.
                </p>
                <button onClick={generate} style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 32px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 12, fontWeight: 700, fontSize: "1rem", cursor: "pointer", boxShadow: "0 6px 20px rgba(99,102,241,0.35)" }}>
                  <Sparkles size={18} /> Generate {typeConfig.label}
                </button>
              </div>
            )}
            {generating && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 360 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, animation: "spinAnim 1s linear infinite" }}>
              <style>{`@keyframes spinAnim { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                  <Sparkles size={22} color="white" />
                </div>
                <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>AI is writing your {typeConfig.label.toLowerCase()}...</div>
                <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Analyzing {product.marketplace} best practices and your product data</div>
              </div>
            )}
            {output && !generating && (
              <div>
                <pre style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, whiteSpace: "pre-wrap", wordBreak: "break-word", background: "#f8fafc", borderRadius: 12, padding: 20, border: "1px solid #f1f5f9", maxHeight: 500, overflow: "auto" }}>{output}</pre>
                <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button onClick={generate} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", border: "none", borderRadius: 10, fontSize: "0.875rem", fontWeight: 700, cursor: "pointer" }}>
                    <RefreshCw size={14} /> Regenerate
                  </button>
                  <button onClick={copy} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "white", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", color: copied ? "#22c55e" : "#374151" }}>
                    {copied ? <CheckCircle size={14} /> : <Copy size={14} />} {copied ? "Copied!" : "Copy to Clipboard"}
                  </button>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "white", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", color: "#374151" }}>
                    <Download size={14} /> Save to Reports
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div style={{ marginTop: 24, background: "linear-gradient(135deg,rgba(99,102,241,0.06),rgba(139,92,246,0.06))", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 14, padding: "16px 20px" }}>
        <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#6366f1", marginBottom: 8 }}>💡 Pro Tips for {product.marketplace}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {(product.marketplace === "Amazon"
            ? ["Keep titles under 200 characters for Amazon", "Use all 5 bullet points — each max 250 characters", "Add A+ content for 5-10% conversion boost"]
            : ["Flipkart titles work best with feature-first format", "Include Hindi-friendly keywords for regional reach", "Activate Flipkart Smart Content for ranking boost"]
          ).map((tip, i) => (
            <div key={i} style={{ fontSize: "0.82rem", color: "#64748b", display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ color: "#6366f1", flexShrink: 0 }}>✦</span> {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center", color: "#64748b" }}>Loading...</div>}>
      <GenerateContent />
    </Suspense>
  );
}
