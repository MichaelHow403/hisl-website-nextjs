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
  title: "HISL - Construction Safety AI & Management Consultancy",
  description: "HISL delivers advanced construction safety AI solutions and project management consultancy. Expert construction management with cutting-edge artificial intelligence for safer, more efficient building projects.",
  keywords: "construction safety AI, construction management, project management consultancy, construction safety, AI construction, building safety technology, construction consulting, MCIOB, construction AI solutions",
  authors: [{ name: "Michael Howard", url: "https://hisl.ie" }, { name: "HISL Team" }],
  creator: "Michael Howard - Chartered Construction Manager",
  publisher: "HISL - Human Intelligence Systems Laboratory",
  robots: "index, follow",
  metadataBase: new URL('https://hisl.ie'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "HISL - Construction Safety AI & Management Consultancy",
    description: "Expert construction management consultancy with cutting-edge AI solutions for safer, more efficient building projects. Led by Michael Howard, Chartered Construction Manager.",
    type: "website",
    url: "https://hisl.ie",
    siteName: "HISL",
    locale: "en_IE",
    images: [
      {
        url: "/imagery/processed/general/ai_construction_bridge-1200w.webp",
        width: 1200,
        height: 800,
        alt: "HISL Construction AI - Advanced building safety technology",
      },
      {
        url: "/imagery/processed/earth/earth_daymap-1200w.webp", 
        width: 1200,
        height: 1200,
        alt: "HISL Global Construction Solutions",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HISL - Construction Safety AI & Management Consultancy",
    description: "Expert construction management with cutting-edge AI solutions for safer building projects.",
    images: ["/imagery/processed/general/ai_construction_bridge-1200w.webp"],
  },
  other: {
    'application-name': 'HISL',
    'msapplication-TileColor': '#D9A441',
    'theme-color': '#D9A441',
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
              "logo": "https://hisl.ie/images/HISL_Logo.jpeg",
              "description": "Construction Safety AI & Management Consultancy delivering advanced AI solutions for safer, more efficient building projects.",
              "founder": {
                "@type": "Person",
                "name": "Michael Howard",
                "jobTitle": "Chartered Construction Manager",
                "memberOf": "MCIOB"
              },
              "industry": ["Construction Management", "Artificial Intelligence", "Safety Technology"],
              "serviceArea": {
                "@type": "Country",
                "name": "Ireland"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Construction AI Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Construction Safety AI Solutions",
                      "description": "AI-powered construction safety monitoring and risk assessment"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Project Management Consultancy",
                      "description": "Expert construction project management and consulting services"
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
        {children}
      </body>
    </html>
  );
}
