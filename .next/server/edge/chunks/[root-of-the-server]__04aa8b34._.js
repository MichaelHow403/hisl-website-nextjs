(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__04aa8b34._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/app/api/integai/route.ts [app-edge-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
const runtime = "edge";
const dynamic = "force-dynamic";
async function GET() {
    const mode = process.env.INTEGAI_GATEWAY_URL ? "gateway" : "stub";
    return Response.json({
        ok: true,
        mode,
        model: process.env.INTEGAI_MODEL ?? "gemma-fast"
    });
}
async function POST(req) {
    const now = new Date().toISOString();
    const { prompt = "" } = await req.json().catch(()=>({}));
    const gw = process.env.INTEGAI_GATEWAY_URL;
    if (gw) {
        const r = await fetch(`${gw}/v1/chat/completions`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                model: process.env.INTEGAI_MODEL ?? "gemma-fast",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.3
            })
        });
        const data = await r.json();
        return Response.json({
            source: "gateway",
            at: now,
            data
        });
    }
    const output = `IntegAI (stub): ${prompt ? prompt.slice(0, 140) : "Hello"} • ${now}`;
    return Response.json({
        source: "stub",
        at: now,
        output,
        tokens: output.split(/\s+/).length
    });
}
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__04aa8b34._.js.map