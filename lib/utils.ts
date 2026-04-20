import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatCurrency(n: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "#22c55e";
  if (score >= 65) return "#84cc16";
  if (score >= 50) return "#f59e0b";
  if (score >= 35) return "#f97316";
  return "#ef4444";
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 65) return "Good";
  if (score >= 50) return "Average";
  if (score >= 35) return "Poor";
  return "Critical";
}

export function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "high-selling": return "badge-high-selling";
    case "potential": return "badge-potential";
    case "not-selling": return "badge-not-selling";
    case "needs-fix": return "badge-needs-fix";
    default: return "badge-neutral";
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case "high-selling": return "High Selling";
    case "potential": return "Have Potential";
    case "not-selling": return "Not Selling";
    case "needs-fix": return "Needs Fix";
    default: return "Stable";
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
