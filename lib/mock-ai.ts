import { Product } from "./mock-data";

export interface AnalysisReport {
  productId: string;
  headline: string;
  tldr: string;
  problems: Problem[];
  opportunities: Opportunity[];
  requiredResources: Resource[];
  platformInsights: PlatformInsight[];
  actionPlan7Day: ActionItem[];
  actionPlan30Day: ActionItem[];
  upliftForecast: UpliftForecast;
  generatedAt: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  whyItMatters: string;
  category: "seo" | "content" | "visual" | "pricing" | "brand" | "reviews" | "listing";
  severity: "critical" | "high" | "medium" | "low";
  expectedResult: string;
  priority: number;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  estimatedImpact: string;
  difficulty: "easy" | "medium" | "hard";
  timeToSeeResults: string;
}

export interface Resource {
  id: string;
  type: string;
  title: string;
  whyNeeded: string;
  salesImpact: "high" | "medium" | "low";
  difficulty: "easy" | "medium" | "hard";
  priority: number;
  aiCanGenerate: boolean;
}

export interface PlatformInsight {
  platform: string;
  bestPractice: string;
  sellerGap: string;
  topCompetitorAdvantage: string;
  recommendation: string;
}

export interface ActionItem {
  day: string;
  task: string;
  type: "content" | "seo" | "visual" | "pricing" | "review" | "strategy";
  impact: "high" | "medium" | "low";
  completed?: boolean;
}

export interface UpliftForecast {
  timelineMin: number;
  timelineMax: number;
  impressionsUplift: { min: number; max: number };
  clicksUplift: { min: number; max: number };
  conversionUplift: { min: number; max: number };
  salesUplift: { min: number; max: number };
  confidenceScore: number;
  disclaimer: string;
}

const SEVERITY_MAP: Record<string, Problem["severity"]> = {
  "Weak title keywords": "critical",
  "No A+ content": "high",
  "Only 3 images": "high",
  "Low review count": "medium",
  "Missing infographic": "medium",
  "Terrible listing title": "critical",
  "No description": "critical",
  "Only 1 image": "critical",
  "Zero keywords": "critical",
  "No bullet points": "critical",
  "No brand identity": "high",
  "Pricing too high vs competitors": "critical",
  "Title missing key search terms": "critical",
  "Bullet points too generic": "high",
  "No lifestyle images": "high",
  "Poor description": "high",
  "Pricing above category average": "high",
  "Generic product title": "critical",
  "Missing key cooking keywords": "high",
  "No size comparison visual": "medium",
};

function generateProblems(product: Product): Problem[] {
  return product.issues.map((issue, i) => {
    const severity = SEVERITY_MAP[issue] || "medium";
    const categoryMap: Record<string, Problem["category"]> = {
      "keyword": "seo", "title": "seo", "keywords": "seo", "SEO": "seo",
      "images": "visual", "image": "visual", "visual": "visual", "lifestyle": "visual", "infographic": "visual",
      "content": "content", "description": "content", "bullet": "content", "A+": "content", "FAQ": "content",
      "Pricing": "pricing", "pricing": "pricing", "price": "pricing",
      "brand": "brand", "Brand": "brand", "branding": "brand",
      "review": "reviews", "Review": "reviews",
    };
    let category: Problem["category"] = "listing";
    for (const [key, val] of Object.entries(categoryMap)) {
      if (issue.toLowerCase().includes(key.toLowerCase())) { category = val; break; }
    }
    return {
      id: `PROB-${product.id}-${i}`,
      title: issue,
      description: getIssueDescription(issue, product),
      whyItMatters: getWhyItMatters(issue, product.marketplace),
      category,
      severity,
      expectedResult: getExpectedResult(issue),
      priority: i + 1,
    };
  });
}

function getIssueDescription(issue: string, product: Product): string {
  const descriptions: Record<string, string> = {
    "Weak title keywords": `Your current title for "${product.title.substring(0, 40)}..." is missing 3-5 high-volume search terms that customers actively use on ${product.marketplace}. This directly hurts your organic search ranking and impressions.`,
    "No A+ content": `${product.marketplace === "Amazon" ? "Amazon A+ Content" : "Flipkart Enhanced Content"} is available for your listing but has not been activated. Listings with enhanced content see 5-10% higher conversion rates on average.`,
    "Only 3 images": `Your listing has insufficient images. ${product.marketplace} recommends at least 7-9 images covering angles, lifestyle use, infographics, and comparison visuals.`,
    "Low review count": `With only ${product.reviews} reviews and a ${product.rating}-star rating, your social proof is significantly weaker than competing products in your category.`,
    "Terrible listing title": `Your listing title is non-descriptive, keyword-sparse, and fails to communicate the product's key benefits. This is causing your listing to be invisible in ${product.marketplace} search results.`,
    "No description": `Your product has no HTML description or story content. This is a critical gap — it leaves buyers without confidence and hurts ${product.marketplace}'s indexing of your product.`,
    "Only 1 image": `Your listing has only one image, which is the absolute minimum. Customers cannot see the product from multiple angles, in use, or compared to alternatives.`,
    "Zero keywords": `No backend keywords or SEO phrases have been added to this listing. Your product is effectively invisible to ${product.marketplace}'s search algorithm.`,
    "No bullet points": `Your product has no feature highlights/bullet points. This is a critical trust and conversion gap. Buyers rely on bullets to make quick purchase decisions.`,
    "No brand identity": `Your listing has no brand story, logo, or visual brand elements. In a competitive category, brand recognition is a key conversion driver.`,
    "Pricing too high vs competitors": `Your price of ${product.currency} ${product.price} is above comparable competitor listings. With your current low review count, buyers are choosing better-reviewed alternatives at similar or lower prices.`,
    "Title missing key search terms": `Your title is missing high-volume search terms for your category. Customers searching for key features cannot find your product.`,
    "Bullet points too generic": `Your bullet points list basic features without communicating benefits, use cases, or differentiators. They don't answer the customer's key question: "Why should I buy this?"`,
    "No lifestyle images": `Your listing lacks lifestyle photography showing the product in real use. This is one of the highest-impact conversion improvements available to you.`,
    "Poor description": `Your product description lacks structure, storytelling, and keyword density. It doesn't build purchase confidence or differentiate your product.`,
    "Pricing above category average": `Your pricing positions you as a premium option without the reviews, brand recognition, or visual content to justify that premium.`,
  };
  return descriptions[issue] || `Your listing has a significant gap in "${issue}" which is negatively impacting your ${product.marketplace} performance and search visibility.`;
}

function getWhyItMatters(issue: string, marketplace: string): string {
  const matters: Record<string, string> = {
    "Weak title keywords": `On ${marketplace}, the title is the #1 factor for search indexing. Products in the top 3 search results have 60-80% more title keyword density than average.`,
    "No A+ content": `${marketplace === "Amazon" ? "Amazon" : "Flipkart"} data shows enhanced content listings convert 8% better on average and reduce return rates by 12%.`,
    "Only 3 images": `Customers view 5+ images before purchasing in most categories. Low image count is directly correlated with cart abandonment on ${marketplace}.`,
    "Low review count": `Social proof is the #1 trust driver on marketplaces. 87% of shoppers won't buy a product with fewer than 10 reviews when alternatives exist.`,
    "Terrible listing title": `${marketplace} search algorithm weights title keywords heavily. A poor title means near-zero organic discoverability regardless of how competitive your price is.`,
    "Zero keywords": `Without backend keywords, your product cannot appear in relevant searches. On ${marketplace}, this means missing out on thousands of daily searches.`,
    "Pricing too high vs competitors": `On ${marketplace}, buyers compare 3-5 options before purchasing. With fewer reviews, price becomes a key decision factor — a higher price with low credibility loses every time.`,
  };
  return matters[issue] || `This gap directly impacts your ${marketplace} search ranking, conversion rate, and buyer trust — all three of which drive sales.`;
}

function getExpectedResult(issue: string): string {
  const results: Record<string, string> = {
    "Weak title keywords": "15-35% increase in organic impressions within 2-4 weeks",
    "No A+ content": "5-12% conversion rate improvement",
    "Only 3 images": "8-15% click-through rate improvement",
    "Low review count": "Higher trust score, 10-25% conversion improvement over 60 days",
    "Terrible listing title": "Dramatic improvement in search visibility and impressions",
    "No description": "Improved buyer confidence and reduced bounce rate",
    "Only 1 image": "Significant increase in CTR and time-on-listing",
    "Zero keywords": "Organic search visibility from near-zero to competitive",
    "No bullet points": "10-20% improvement in conversion from better-informed buyers",
    "No brand identity": "Improved brand recall and repeat purchase potential",
    "Pricing too high vs competitors": "Immediate improvement in units sold if paired with review growth",
  };
  return results[issue] || "Measurable improvement in listing health score and conversion metrics";
}

function generateOpportunities(product: Product) {
  return product.opportunities.map((opp, i) => ({
    id: `OPP-${product.id}-${i}`,
    title: opp,
    description: `${opp} represents a significant untapped growth channel for your product on ${product.marketplace}.`,
    estimatedImpact: i === 0 ? "High — 20-40% sales increase potential" : i === 1 ? "Medium — 10-25% uplift" : "Medium — 8-18% growth",
    difficulty: (["easy", "medium", "hard"] as const)[i % 3],
    timeToSeeResults: i === 0 ? "14-21 days" : i === 1 ? "21-45 days" : "30-60 days",
  }));
}

function generateResources(product: Product): Resource[] {
  const resources: Resource[] = [
    { id: "R1", type: "Optimized Title", title: "SEO-Optimized Product Title", whyNeeded: "Your title is missing critical search keywords that drive organic traffic", salesImpact: "high", difficulty: "easy", priority: 1, aiCanGenerate: true },
    { id: "R2", type: "Bullet Points", title: "Benefit-Focused Bullet Points (5)", whyNeeded: "Current bullets are feature-only and don't convert browsers to buyers", salesImpact: "high", difficulty: "easy", priority: 2, aiCanGenerate: true },
    { id: "R3", type: "Product Description", title: "Full HTML Product Description", whyNeeded: "No persuasive copy to build purchase confidence", salesImpact: "medium", difficulty: "easy", priority: 3, aiCanGenerate: true },
    { id: "R4", type: "SEO Keywords", title: "Keyword Research & Cluster (50+ keywords)", whyNeeded: "Systematic keyword targeting is missing from your listing strategy", salesImpact: "high", difficulty: "medium", priority: 4, aiCanGenerate: true },
    { id: "R5", type: "Image Brief", title: "7-Image Creative Brief", whyNeeded: "Your image set is incomplete and missing lifestyle and infographic content", salesImpact: "high", difficulty: "medium", priority: 5, aiCanGenerate: true },
    { id: "R6", type: "A+ Content", title: "A+ Content Structure & Copy", whyNeeded: product.marketplace === "Amazon" ? "Amazon A+ is not active — direct 8% conversion impact" : "Flipkart enhanced content not activated", salesImpact: "high", difficulty: "medium", priority: 6, aiCanGenerate: true },
    { id: "R7", type: "FAQ", title: "Product FAQ (10 Q&A pairs)", whyNeeded: "Reduce buyer hesitation and improve customer trust signals", salesImpact: "medium", difficulty: "easy", priority: 7, aiCanGenerate: true },
    { id: "R8", type: "Review Strategy", title: "Review Generation Action Plan", whyNeeded: "Low review count is a critical conversion barrier", salesImpact: "high", difficulty: "medium", priority: 8, aiCanGenerate: false },
  ];
  return resources.slice(0, product.status === "not-selling" ? 8 : product.status === "needs-fix" ? 6 : 4);
}

function generatePlatformInsights(product: Product): PlatformInsight[] {
  if (product.marketplace === "Amazon") {
    return [
      { platform: "Amazon", bestPractice: "Titles should be 150-200 characters with primary keyword in first 80 characters", sellerGap: "Your title is under-optimized and keyword-sparse", topCompetitorAdvantage: "Top sellers use 5-7 high-volume keywords in their titles", recommendation: "Rewrite title following Amazon's keyword-first title formula" },
      { platform: "Amazon", bestPractice: "All top-3 listings have A+ Premium content with comparison charts", sellerGap: "No A+ content activated on your listing", topCompetitorAdvantage: "Competitors use A+ content to showcase features visually and reduce returns", recommendation: "Activate Brand Registry and create A+ content with comparison table" },
      { platform: "Amazon", bestPractice: "Minimum 7 images including infographic, lifestyle, and dimensional", sellerGap: "You have fewer images than the category minimum best practice", topCompetitorAdvantage: "Top listings use 8-9 images including video walkthroughs", recommendation: "Add 4+ images: infographic, lifestyle, size chart, and use-case scenario" },
    ];
  } else {
    return [
      { platform: "Flipkart", bestPractice: "Flipkart listings reward keyword density in title and bullet highlights", sellerGap: "Your listing title lacks Flipkart-specific search terms", topCompetitorAdvantage: "Top Flipkart sellers use category-specific Hindi-English hybrid keywords", recommendation: "Add category-specific terms and feature highlights in title for Flipkart algorithm" },
      { platform: "Flipkart", bestPractice: "Flipkart Smart Content (FSC) boosts search ranking for brand-registered sellers", sellerGap: "Smart Content is not activated on your listing", topCompetitorAdvantage: "Top sellers use FSC with lifestyle imagery and feature callouts", recommendation: "Register brand on Flipkart Brand Hub and activate Smart Content" },
      { platform: "Flipkart", bestPractice: "Flipkart buyers heavily rely on verified ratings — 4.0+ is critical", sellerGap: `Your ${product.rating}-star rating is below the 4.0 threshold that filters most Flipkart buyers use`, topCompetitorAdvantage: "Competitors have 200+ reviews with 4.3+ average rating", recommendation: "Launch a review request campaign through Flipkart's post-order communication system" },
    ];
  }
}

function generateActionPlan7Day(product: Product): ActionItem[] {
  return [
    { day: "Day 1-2", task: "Rewrite product title with primary and secondary keywords optimized for " + product.marketplace, type: "seo", impact: "high" },
    { day: "Day 1-2", task: "Rewrite all 5 bullet points to highlight benefits, not just features", type: "content", impact: "high" },
    { day: "Day 3", task: "Write full product description with structured HTML formatting and keyword integration", type: "content", impact: "medium" },
    { day: "Day 3-4", task: "Build a 50+ keyword research cluster and update backend keywords", type: "seo", impact: "high" },
    { day: "Day 4-5", task: "Create image brief and order 4 new professional images (lifestyle + infographic)", type: "visual", impact: "high" },
    { day: "Day 5-6", task: "Review pricing strategy vs top 5 competitors in your category", type: "strategy", impact: "medium" },
    { day: "Day 6-7", task: "Activate A+ content module and draft initial layout", type: "content", impact: "high" },
  ];
}

function generateActionPlan30Day(product: Product): ActionItem[] {
  return [
    { day: "Week 1", task: "Complete all listing copy updates (title, bullets, description, keywords)", type: "seo", impact: "high" },
    { day: "Week 1-2", task: "Upload new image set including lifestyle, infographic, and comparison images", type: "visual", impact: "high" },
    { day: "Week 2", task: "Publish A+ content with comparison module and brand story", type: "content", impact: "high" },
    { day: "Week 2-3", task: "Launch automated review request sequence for all new orders", type: "review", impact: "high" },
    { day: "Week 3", task: "Run sponsored ads to boost new listing visibility and gather sales data", type: "strategy", impact: "medium" },
    { day: "Week 3-4", task: "Analyze first 2 weeks of performance data and iterate on keywords", type: "seo", impact: "medium" },
    { day: "Week 4", task: "Assess conversion rate and plan next optimization round", type: "strategy", impact: "medium" },
  ];
}

function generateUpliftForecast(product: Product): UpliftForecast {
  const isLowPerformer = product.status === "not-selling" || product.status === "needs-fix";
  const isMidPerformer = product.status === "potential";
  return {
    timelineMin: isLowPerformer ? 21 : isMidPerformer ? 14 : 10,
    timelineMax: isLowPerformer ? 45 : isMidPerformer ? 30 : 21,
    impressionsUplift: { min: isLowPerformer ? 40 : 20, max: isLowPerformer ? 120 : 55 },
    clicksUplift: { min: isLowPerformer ? 25 : 12, max: isLowPerformer ? 80 : 35 },
    conversionUplift: { min: isLowPerformer ? 8 : 5, max: isLowPerformer ? 28 : 18 },
    salesUplift: { min: isLowPerformer ? 20 : 10, max: isLowPerformer ? 65 : 35 },
    confidenceScore: isLowPerformer ? 72 : 81,
    disclaimer: "These are AI-powered projections based on listing optimization patterns and marketplace benchmarks. Actual results depend on implementation quality, market conditions, ad spend, and other factors. These are not guaranteed outcomes.",
  };
}

export function generateAnalysis(product: Product): AnalysisReport {
  return {
    productId: product.id,
    headline: getHeadline(product),
    tldr: getTldr(product),
    problems: generateProblems(product),
    opportunities: generateOpportunities(product),
    requiredResources: generateResources(product),
    platformInsights: generatePlatformInsights(product),
    actionPlan7Day: generateActionPlan7Day(product),
    actionPlan30Day: generateActionPlan30Day(product),
    upliftForecast: generateUpliftForecast(product),
    generatedAt: new Date().toISOString(),
  };
}

function getHeadline(product: Product): string {
  switch (product.status) {
    case "not-selling": return "🚨 Critical: This product is invisible on " + product.marketplace;
    case "needs-fix": return "⚠️ Underperforming: Fixable issues are hurting your sales";
    case "potential": return "🚀 High Potential: This product can grow 2-3x with the right fixes";
    case "high-selling": return "✅ Strong Performer: Optimize to maintain and expand growth";
    default: return "📊 Stable: Room for improvement identified";
  }
}

function getTldr(product: Product): string {
  switch (product.status) {
    case "not-selling": return `This product is effectively invisible to buyers on ${product.marketplace}. It has ${product.issues.length} critical listing gaps — including missing content, poor SEO, and weak visuals — that are preventing any meaningful sales. With focused fixes over the next 3-6 weeks, this product has the potential to generate consistent sales in its category.`;
    case "needs-fix": return `This product is losing sales to competitors due to ${product.issues.length} key gaps in its listing. It used to perform better, and the downward trend can be reversed with targeted optimization of the title, content, images, and pricing strategy.`;
    case "potential": return `This product is in a high-demand category and has real growth potential — but it's leaving significant sales on the table due to ${product.issues.length} fixable gaps. Resolving these gaps could grow revenue by 25-65% within 30 days.`;
    case "high-selling": return `This is your strongest product. To maintain growth and expand, focus on the 2-3 optimization opportunities identified. Scaling ad spend and enhancing brand content will help defend and grow your position.`;
    default: return `This product is performing stably but has room for improvement. Addressing the identified gaps will improve its ranking and conversion rate over the next 30 days.`;
  }
}

export const GENERATED_CONTENT_TEMPLATES: Record<string, (product: Product) => string> = {
  title: (p) => `[Brand] ${p.title.split(" ").slice(0, 6).join(" ")} — Premium Quality | ${p.marketplace === "Amazon" ? "Amazon Choice" : "Flipkart Assured"} | Fast Delivery | Best in Category`,
  bullets: (p) => `• ✅ SUPERIOR QUALITY: Built with premium materials that outperform competitors — designed for long-lasting performance and daily reliability\n• 🎯 PERFECT FIT FOR YOUR NEEDS: Whether you're at home, in the office, or on the go, this product adapts to your lifestyle seamlessly\n• 🚀 EASY TO USE: Simple setup with no tools required — be up and running in minutes with our intuitive design\n• 💯 BACKED BY OUR GUARANTEE: 30-day hassle-free return policy and dedicated customer support that actually responds\n• 🎁 GREAT GIFT IDEA: Premium packaging makes this the perfect gift for family, friends, and colleagues`,
  description: (p) => `<p><strong>Introducing the ${p.title.substring(0, 50)} — Your Premium Solution</strong></p>\n<p>Tired of products that overpromise and underdeliver? We built this product differently. Starting from customer feedback and real-world use cases, every feature has been designed to solve the problems that matter most to you.</p>\n<p><strong>Why Customers Choose Us:</strong></p>\n<ul><li>Engineered for durability with premium-grade materials</li><li>Tested by 500+ customers before launch</li><li>Designed for everyday use with long-lasting performance</li><li>Backed by our industry-leading satisfaction guarantee</li></ul>\n<p><strong>Perfect For:</strong> Home use, office professionals, gifting, travel, and everyday lifestyle needs.</p>\n<p>Join thousands of satisfied customers who upgraded to the smarter choice. Order today and experience the difference quality makes.</p>`,
  seoKeywords: (p) => `Primary Keywords:\n1. ${p.title.split(" ").slice(0, 3).join(" ").toLowerCase()}\n2. best ${p.category.split(" > ").pop()?.toLowerCase()} ${new Date().getFullYear()}\n3. premium ${p.title.split(" ")[0].toLowerCase()} online\n4. top rated ${p.title.split(" ").slice(0, 2).join(" ").toLowerCase()}\n5. buy ${p.title.split(" ")[0].toLowerCase()} ${p.marketplace.toLowerCase()}\n\nLong-Tail Keywords:\n6. ${p.title.split(" ").slice(0, 3).join(" ").toLowerCase()} for home use\n7. affordable ${p.title.split(" ")[0].toLowerCase()} with fast delivery\n8. ${p.title.split(" ")[0].toLowerCase()} best quality reviews\n9. ${p.category.split(" > ").pop()?.toLowerCase()} buy online india\n10. ${p.title.split(" ").slice(0, 2).join(" ").toLowerCase()} top brand`,
  faq: (p) => `Q1: Is this product genuine and of good quality?\nA1: Absolutely. Our product is manufactured with premium-grade materials and undergoes strict quality control. Every unit is tested before shipping.\n\nQ2: What is the return policy?\nA2: We offer a 30-day hassle-free return policy. If you're not 100% satisfied, contact us for a full refund or replacement — no questions asked.\n\nQ3: How long does delivery take?\nA3: Most orders are delivered within 3-5 business days. Express delivery options are available at checkout.\n\nQ4: Is this suitable for gifting?\nA4: Yes! Our product comes in premium packaging, making it an ideal gift for birthdays, housewarmings, and other special occasions.\n\nQ5: Do you have customer support?\nA5: Yes. Our dedicated support team responds within 24 hours. Reach us through the ${p.marketplace} messaging system.`,
  adCopy: (p) => `🔥 LIMITED TIME OFFER — Don't Miss Out!\n\n${p.title.split(" ").slice(0, 5).join(" ")} — The #1 Choice for Smart Buyers\n\n✅ Premium Quality | ✅ Fast Delivery | ✅ 30-Day Guarantee\n\n"Best purchase I made this year!" — Verified Buyer\n\nShop Now → Link in Bio\n\n#BestBuy #SmartShopping #PremiumQuality #${p.marketplace}Deals`,
  brandStory: (p) => `Our Brand Story\n\nWe didn't start as a big company. We started with a simple belief: everyday products should be premium quality without premium prices.\n\nFounded by a team of product designers and e-commerce veterans, our brand was built on the feedback of thousands of real customers who told us exactly what they needed — and what they were tired of getting wrong from others.\n\nEvery product we sell goes through a 47-point quality checklist. We obsess over materials, design, durability, and usability so you don't have to. We want you to open the package and smile.\n\nToday, we serve customers across the globe through ${p.marketplace} and our growing network of marketplaces. But our mission remains the same: deliver products you'll love and trust, backed by service you can count on.`,
  imageBrief: (p) => `📸 Image Brief for ${p.title.substring(0, 40)}\n\nImage 1 — HERO (Main Image):\n• White background, pure product shot\n• High resolution, centered, no props\n• Show all colors/variants if applicable\n\nImage 2 — FEATURE CALLOUT:\n• Overlay key features with icons and text callouts\n• Highlight top 3-4 selling points\n• Clean, professional typography\n\nImage 3 — LIFESTYLE:\n• Product in real-world use by aspirational character\n• Bright, modern environment\n• Evokes emotion: comfort, efficiency, joy\n\nImage 4 — INFOGRAPHIC:\n• How-it-works or what-makes-it-special visual\n• Icons + short benefit statements\n• Match brand color palette\n\nImage 5 — SIZE/SCALE COMPARISON:\n• Show product next to common object\n• Include dimensions in graphic\n\nImage 6 — TRUST BUILDER:\n• Quality certifications, guarantee badges\n• "Why Choose Us" comparison points\n• Social proof elements\n\nImage 7 — PACKAGING:\n• Show product packaging and unboxing experience\n• Premium presentation for gifting perception`,
};
