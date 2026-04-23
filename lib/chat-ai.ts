import { MOCK_PRODUCTS, Product } from "./mock-data";
import { generateAnalysis, GENERATED_CONTENT_TEMPLATES, AnalysisReport } from "./mock-ai";

export type MessageRole = "user" | "ai";
export type IntentType = "analyze" | "fix_title" | "generate_bullets" | "generate_description" | "generate_seo" | "generate_faq" | "generate_ad" | "generate_aplus" | "image_brief" | "growth_plan" | "competitor" | "general" | "greeting";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  intent?: IntentType;
  productId?: string;
  resultData?: ChatResultData | null;
}

export interface ChatResultData {
  type: "analysis" | "content" | "action_plan" | "welcome";
  product?: Product;
  analysis?: AnalysisReport;
  generatedContent?: { type: string; content: string };
  actions?: ActionSuggestion[];
}

export interface ActionSuggestion {
  id: string;
  label: string;
  icon: string;
  intent: IntentType;
  prompt: string;
}

const INTENT_PATTERNS: { intent: IntentType; patterns: RegExp[] }[] = [
  { intent: "analyze", patterns: [/analy[zs]e/i, /diagnos/i, /check/i, /scan/i, /review my/i, /why.*(not|isn't|ain't).*(sell|convert)/i, /what's wrong/i, /how is my/i, /listing score/i, /product.*link/i, /asin/i] },
  { intent: "fix_title", patterns: [/fix.*title/i, /improve.*title/i, /rewrite.*title/i, /better title/i, /optimize.*title/i, /title.*fix/i] },
  { intent: "generate_bullets", patterns: [/bullet/i, /feature.*point/i, /highlight/i, /key.*feature/i] },
  { intent: "generate_description", patterns: [/description/i, /product.*copy/i, /write.*desc/i, /listing.*content/i] },
  { intent: "generate_seo", patterns: [/keyword/i, /seo/i, /search.*term/i, /backend.*keyword/i, /search.*optim/i] },
  { intent: "generate_faq", patterns: [/faq/i, /question.*answer/i, /q&a/i, /q\s*and\s*a/i] },
  { intent: "generate_ad", patterns: [/ad.*copy/i, /advertisement/i, /sponsored/i, /ppc/i, /campaign/i] },
  { intent: "generate_aplus", patterns: [/a\+/i, /a\s*plus/i, /enhanced.*content/i, /brand.*content/i, /brand.*story/i] },
  { intent: "image_brief", patterns: [/image/i, /photo/i, /visual/i, /picture/i, /creative.*brief/i, /infographic/i] },
  { intent: "growth_plan", patterns: [/growth/i, /action.*plan/i, /strategy/i, /scale/i, /improve.*sales/i, /increase.*sales/i, /boost/i] },
  { intent: "competitor", patterns: [/competitor/i, /competition/i, /benchmark/i, /compare/i, /vs\b/i, /versus/i] },
  { intent: "greeting", patterns: [/^(hi|hello|hey|good\s*(morning|afternoon|evening)|what's up|sup)/i] },
];

function detectIntent(message: string): IntentType {
  for (const { intent, patterns } of INTENT_PATTERNS) {
    for (const pattern of patterns) {
      if (pattern.test(message)) return intent;
    }
  }
  return "general";
}

function findProduct(message: string): Product | undefined {
  const lower = message.toLowerCase();
  // Try matching by ASIN
  const asinMatch = lower.match(/b[0-9a-z]{9}/i);
  if (asinMatch) {
    const found = MOCK_PRODUCTS.find(p => p.asin.toLowerCase() === asinMatch[0].toLowerCase());
    if (found) return found;
  }
  // Try matching by product name keywords
  let bestMatch: Product | undefined;
  let bestScore = 0;
  for (const p of MOCK_PRODUCTS) {
    const titleWords = p.title.toLowerCase().split(/\s+/);
    let score = 0;
    for (const word of titleWords) {
      if (word.length > 3 && lower.includes(word)) score++;
    }
    if (score > bestScore) { bestScore = score; bestMatch = p; }
  }
  if (bestScore >= 2) return bestMatch;
  // Default to first product with issues
  return MOCK_PRODUCTS.find(p => p.status === "potential" || p.status === "not-selling" || p.status === "needs-fix") || MOCK_PRODUCTS[0];
}

const CONTENT_MAP: Record<string, keyof typeof GENERATED_CONTENT_TEMPLATES> = {
  fix_title: "title",
  generate_bullets: "bullets",
  generate_description: "description",
  generate_seo: "seoKeywords",
  generate_faq: "faq",
  generate_ad: "adCopy",
  generate_aplus: "brandStory",
  image_brief: "imageBrief",
};

const CONTENT_LABELS: Record<string, string> = {
  fix_title: "Optimized Title",
  generate_bullets: "Bullet Points",
  generate_description: "Product Description",
  generate_seo: "SEO Keywords",
  generate_faq: "Product FAQ",
  generate_ad: "Ad Copy",
  generate_aplus: "A+ / Brand Story Content",
  image_brief: "Image Brief",
};

function getAnalysisActions(product: Product): ActionSuggestion[] {
  return [
    { id: "a1", label: "Fix My Title", icon: "✏️", intent: "fix_title", prompt: `Fix the title for ${product.title.substring(0, 40)}` },
    { id: "a2", label: "Generate Bullets", icon: "📝", intent: "generate_bullets", prompt: `Generate bullet points for ${product.title.substring(0, 40)}` },
    { id: "a3", label: "Generate Description", icon: "📄", intent: "generate_description", prompt: `Write a description for ${product.title.substring(0, 40)}` },
    { id: "a4", label: "SEO Keywords", icon: "🔍", intent: "generate_seo", prompt: `Find SEO keywords for ${product.title.substring(0, 40)}` },
    { id: "a5", label: "Image Brief", icon: "📸", intent: "image_brief", prompt: `Create image brief for ${product.title.substring(0, 40)}` },
    { id: "a6", label: "Growth Plan", icon: "📈", intent: "growth_plan", prompt: `Create a growth plan for ${product.title.substring(0, 40)}` },
  ];
}

export function processMessage(userMessage: string, currentProductId?: string): { aiMessage: string; resultData: ChatResultData | null; suggestions: string[] } {
  const intent = detectIntent(userMessage);
  let product = currentProductId ? MOCK_PRODUCTS.find(p => p.id === currentProductId) : undefined;
  if (!product) product = findProduct(userMessage);

  if (intent === "greeting") {
    return {
      aiMessage: "Hey! 👋 I'm your AI ecommerce specialist. I can analyze any product listing, find what's hurting your sales, and generate everything you need to fix it.\n\nTry asking me things like:\n• \"Analyze my earbuds listing\"\n• \"Why is my yoga mat not selling?\"\n• \"Fix my product title\"\n• \"Generate bullet points\"\n\nWhat would you like to work on?",
      resultData: { type: "welcome", actions: [] },
      suggestions: ["Analyze my worst product", "Show my product inventory", "Why aren't my products selling?", "Generate content for my listing"],
    };
  }

  if (intent === "analyze" && product) {
    const analysis = generateAnalysis(product);
    const topIssues = analysis.problems.slice(0, 3).map(p => `• **${p.title}** — ${p.whyItMatters.substring(0, 80)}...`).join("\n");
    return {
      aiMessage: `${analysis.headline}\n\n${analysis.tldr}\n\n**Top Issues Found:**\n${topIssues}\n\nI've loaded the full analysis in the results panel →\nWhat would you like to fix first?`,
      resultData: { type: "analysis", product, analysis, actions: getAnalysisActions(product) },
      suggestions: ["Fix my title", "Generate bullet points", "Create image brief", "Build growth plan"],
    };
  }

  if (intent === "growth_plan" && product) {
    const analysis = generateAnalysis(product);
    const plan7 = analysis.actionPlan7Day.map(a => `• **${a.day}:** ${a.task}`).join("\n");
    return {
      aiMessage: `📈 **7-Day Growth Plan for ${product.title.substring(0, 45)}...**\n\n${plan7}\n\n**Projected Impact:**\n• Impressions: +${analysis.upliftForecast.impressionsUplift.min}-${analysis.upliftForecast.impressionsUplift.max}%\n• Conversion: +${analysis.upliftForecast.conversionUplift.min}-${analysis.upliftForecast.conversionUplift.max}%\n• Sales: +${analysis.upliftForecast.salesUplift.min}-${analysis.upliftForecast.salesUplift.max}%`,
      resultData: { type: "analysis", product, analysis, actions: getAnalysisActions(product) },
      suggestions: ["Fix my title first", "Generate all content", "Show competitor analysis"],
    };
  }

  if (intent === "competitor" && product) {
    return {
      aiMessage: `🔍 **Competitor Analysis for ${product.title.substring(0, 40)}...**\n\nYour listing score: **${product.listingScore}/100** vs top competitor average: **85/100**\n\n**Key Gaps:**\n• Your SEO score (${product.seoScore}) is ${85 - product.seoScore} points below top sellers\n• Visual content score (${product.visualScore}) needs ${80 - product.visualScore} point improvement\n• Review count (${product.reviews}) is significantly below category leaders (500+ avg)\n\nWant me to help close these gaps?`,
      resultData: { type: "analysis", product, analysis: generateAnalysis(product), actions: getAnalysisActions(product) },
      suggestions: ["Fix my listing gaps", "Generate better content", "Create image brief"],
    };
  }

  const contentKey = CONTENT_MAP[intent];
  if (contentKey && product) {
    const template = GENERATED_CONTENT_TEMPLATES[contentKey];
    const generated = template(product);
    const label = CONTENT_LABELS[intent] || "Content";
    return {
      aiMessage: `✅ **${label} Generated** for *${product.title.substring(0, 45)}...*\n\nI've generated optimized ${label.toLowerCase()} based on your product category, marketplace best practices, and competitor analysis. The full content is in the results panel →\n\nWant me to generate something else?`,
      resultData: { type: "content", product, generatedContent: { type: label, content: generated }, actions: getAnalysisActions(product).filter(a => a.intent !== intent) },
      suggestions: intent === "fix_title" ? ["Generate bullets next", "Generate description", "Full SEO keywords"] : ["Fix my title", "Generate description", "Create A+ content"],
    };
  }

  // General fallback with product context
  if (product) {
    const analysis = generateAnalysis(product);
    return {
      aiMessage: `I can help with that! I'm looking at **${product.title.substring(0, 50)}...** on ${product.marketplace}.\n\nThis listing currently scores **${product.listingScore}/100** with ${product.issues.length} issues to fix. Here's what I can do:\n\n• Analyze the full listing\n• Fix the title for better SEO\n• Generate bullet points, description, A+ content\n• Create an image brief\n• Build a growth action plan\n\nWhat would you like to start with?`,
      resultData: { type: "analysis", product, analysis, actions: getAnalysisActions(product) },
      suggestions: ["Analyze this product", "Fix my title", "Generate bullet points", "Growth plan"],
    };
  }

  return {
    aiMessage: "I'd love to help! Could you tell me which product you'd like to work on? You can:\n\n• Paste a product name or ASIN\n• Say \"analyze my earbuds\" or any product keyword\n• Ask me to \"show my products\"\n\nI'll then diagnose issues and help you fix them!",
    resultData: null,
    suggestions: ["Analyze earbuds listing", "Check my yoga mat", "Why is desk lamp not selling?"],
  };
}

export const WELCOME_SUGGESTIONS = [
  "Analyze my worst performing product",
  "Why is my yoga mat not selling?",
  "Fix my earbuds title for better SEO",
  "Generate bullet points for my water bottle",
  "Show me a growth plan",
  "Create an image brief",
];

export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}
