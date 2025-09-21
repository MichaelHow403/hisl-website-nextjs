import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HISL - Human Intelligence Systems Laboratory",
  description: "Sovereign AI agents that respect your data, privacy, and humanity. IntegAI platform for secure, auditable AI orchestration with human-aligned behavior.",
  keywords: "sovereign AI, AI agents, data privacy, GDPR compliance, NIS2, local-first AI, on-prem AI, air-gap AI, IntegAI, RAVEN orchestrator, data sovereignty, privacy shield, audit trail, ethics core",
  authors: [{ name: "Michael Howard", url: "https://hisl.ie" }, { name: "HISL Team" }],
  creator: "Michael Howard - IntegAI Architect",
  publisher: "HISL - Human Intelligence Systems Laboratory",
  robots: "index, follow",
  metadataBase: new URL('https://hisl.ie'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "HISL - Human Intelligence Systems Laboratory",
    description: "Sovereign AI agents with human-aligned behavior. IntegAI platform for secure, auditable AI orchestration that respects data privacy and sovereignty.",
    type: "website",
    url: "https://hisl.ie",
    siteName: "HISL",
    locale: "en_IE",
    images: [
      {
        url: "/media/hero/reach-for-the-stars.png",
        width: 1200,
        height: 800,
        alt: "HISL - AI with human soul and sovereignty",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HISL - Human Intelligence Systems Laboratory",
    description: "Sovereign AI agents that respect your data, privacy, and humanity.",
    images: ["/media/hero/reach-for-the-stars.png"],
  },
  other: {
    'application-name': 'HISL',
    'msapplication-TileColor': '#06080B',
    'theme-color': '#06080B',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "HISL - Human Intelligence Systems Laboratory",
              "legalName": "Human Intelligence Systems Laboratory",
              "url": "https://hisl.ie",
              "logo": "https://hisl.ie/media/logos/hisl-logo.jpeg",
              "description": "Sovereign AI agents that respect your data, privacy, and humanity. IntegAI platform for secure, auditable AI orchestration.",
              "founder": {
                "@type": "Person",
                "name": "Michael Howard",
                "jobTitle": "IntegAI Architect",
                "knowsAbout": ["AI Ethics", "Data Sovereignty", "GDPR Compliance", "AI Orchestration"]
              },
              "industry": ["Artificial Intelligence", "Data Privacy", "Cybersecurity", "AI Ethics"],
              "serviceArea": {
                "@type": "Country",
                "name": "Ireland"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "IntegAI Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Sovereign AI Agents",
                      "description": "Local-first, air-gap-ready AI orchestration with data sovereignty"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "IntegAI Platform",
                      "description": "Secure, auditable AI agent deployment with human-aligned behavior"
                    }
                  }
                ]
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "url": "https://hisl.ie/contact",
                "contactType": "Business"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        
        {children}
      </body>
    </html>
  );
}
