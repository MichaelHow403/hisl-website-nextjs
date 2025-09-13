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
  title: "HISL - AI Assistant & Research Platform",
  description: "HISL (Human Intelligence Systems Laboratory) - Advanced AI research and development platform featuring cutting-edge AI assistants and intelligent systems.",
  keywords: "AI, artificial intelligence, research, HISL, machine learning, AI assistant",
  authors: [{ name: "HISL Team" }],
  openGraph: {
    title: "HISL - AI Assistant & Research Platform",
    description: "Advanced AI research and development platform",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
