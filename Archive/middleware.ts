import { NextResponse, NextRequest } from 'next/server'

const SECURITY_HEADERS: Record<string,string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
}

const LIMIT = { windowMs: 20_000, limit: 60 }
const BUCKET = new Map<string, { n:number, t:number }>()

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  for (const [k,v] of Object.entries(SECURITY_HEADERS)) res.headers.set(k,v)

  if (req.nextUrl.pathname.startsWith('/api/')) {
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'anon'
    const now = Date.now()
    const b = BUCKET.get(ip) ?? { n:0, t: now }
    if (now - b.t > LIMIT.windowMs) { b.n = 0; b.t = now }
    if (++b.n > LIMIT.limit) {
      return new NextResponse(JSON.stringify({ error: "rate_limited" }), {
        status: 429, headers: { "Content-Type":"application/json", ...SECURITY_HEADERS }
      })
    }
    BUCKET.set(ip,b)
  }
  return res
}
export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] }
