import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
type Bucket = { tokens: number; updatedAt: number }
const RATE = (globalThis as any).__RATE__ as Map<string, Bucket> | undefined
const BUCKETS = RATE ?? ((globalThis as any).__RATE__ = new Map<string, Bucket>())
function rateLimit(key: string, capacity = 30, refillPerSec = 10) {
  const now = Date.now()
  const b = BUCKETS.get(key) ?? { tokens: capacity, updatedAt: now }
  const elapsed = (now - b.updatedAt) / 1000
  b.tokens = Math.min(capacity, b.tokens + elapsed * refillPerSec)
  b.updatedAt = now
  if (b.tokens < 1) { BUCKETS.set(key, b); return false }
  b.tokens -= 1; BUCKETS.set(key, b); return true
}
export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), accelerometer=(), magnetometer=(), gyroscope=()'
  )
  res.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'strict-dynamic'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.vercel.com",
      "connect-src 'self' https://sentry.io https://*.vercel.app https://*.vercel-infra.com https://*.langfuse.cloud https://*.eu",
      "frame-ancestors 'none'",
      "base-uri 'self'",
    ].join('; ')
  )
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const ip = req.ip ?? req.headers.get('x-forwarded-for') ?? 'unknown'
    if (!rateLimit(String(ip))) {
      return new NextResponse(JSON.stringify({ error: 'rate_limited' }), {
        status: 429, headers: { 'Content-Type': 'application/json' },
      })
    }
  }
  return res
}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}