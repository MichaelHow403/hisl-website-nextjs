import { NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  const mode = process.env.INTEGAI_GATEWAY_URL ? "gateway" : "stub";
  return Response.json({ ok: true, mode, model: process.env.INTEGAI_MODEL ?? "gemma-fast" });
}

export async function POST(req: NextRequest) {
  const now = new Date().toISOString();
  const { prompt = "" } = await req.json().catch(() => ({}));
  const gw = process.env.INTEGAI_GATEWAY_URL;

  if (gw) {
    const r = await fetch(`${gw}/v1/chat/completions`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: process.env.INTEGAI_MODEL ?? "gemma-fast",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
      })
    });
    const data = await r.json();
    return Response.json({ source: "gateway", at: now, data });
  }

  const output = `IntegAI (stub): ${prompt ? prompt.slice(0, 140) : "Hello"} • ${now}`;
  return Response.json({ source: "stub", at: now, output, tokens: output.split(/\s+/).length });
}
