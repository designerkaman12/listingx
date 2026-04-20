import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ListingX — AI Ecommerce Growth Specialist",
  description: "Find what is stopping your products from selling — and fix it with AI. Analyze listings, discover missed opportunities, and generate everything needed to increase sales.",
  keywords: "ecommerce growth, listing optimization, Amazon seller tools, Flipkart optimization, AI ecommerce",
  openGraph: {
    title: "ListingX — AI Ecommerce Growth Specialist",
    description: "Your AI-powered ecommerce growth platform for global sellers",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
