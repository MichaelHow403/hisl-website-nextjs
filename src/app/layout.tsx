import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HISL - AI + Human... with soul',
  description: 'Sovereign AI agents that respect your data, privacy, and humanity. Where your prompts go - transparent AI infrastructure.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'HISL - AI + Human... with soul',
    description: 'Sovereign AI agents that respect your data, privacy, and humanity.',
    type: 'website',
  },
  keywords: 'AI, sovereignty, privacy, GDPR, NIS2, compliance, IntegAI',
  authors: [{ name: 'Howard Integritas Solutions Ltd' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-text antialiased">{children}</body>
    </html>
  )
}
