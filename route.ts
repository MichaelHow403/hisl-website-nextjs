export const runtime = 'edge'
import { NextRequest } from 'next/server'
import type { AIRequest, AIResponse } from './types'
import { evaluatePolicy } from './policy'

function okConsent(token: string | undefined){ return !!token && token.length > 0 }

export async function POST(req: NextRequest) {
  const body = await req.json() as AIRequest
  if (!okConsent(body.consent_token)) return new Response(JSON.stringify({ error:'policy_denied', policy_id:'consent', rule:'missing_consent' }), { status: 403 })

  const pol = await evaluatePolicy(body)
  if (!pol.allow) return new Response(JSON.stringify({ error:'policy_denied', policy_id:pol.policy_id, rule:pol.rule }), { status: 403 })

  const submit = await fetch(new URL('/api/broker/submit', req.url), { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) })
  const submitJson = await submit.json()

  const AiRes: AIResponse = {
    id: body.runId,
    output: { type:'text', content: 'Simulation Mode: accepted & queued. Open /globe to watch streaming.' },
    usage: { prompt_tokens: 12, completion_tokens: 20, total_tokens: 32 },
    metrics: { latency_ms: 1200 },
    xai: { reasoning_trace_ref:'urn:trace:demo', model_votes:[{model:'demo',vote:'yes'}], regulation_map:[{law:'GDPR',article:'5(1)(c)',note:'data minimization (demo)'}], provenance_chain:[body.metadata?.promptHash ?? 'hash:demo'] },
    traceIds: {}
  }
  return new Response(JSON.stringify({ ...AiRes, broker: submitJson }), { headers: { 'Content-Type':'application/json' } })
}
