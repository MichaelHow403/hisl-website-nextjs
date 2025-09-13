# Interfaces & Contracts

This document defines **drop‑in interfaces** for the HISL website to interoperate with the IntegAI orchestrator (RAVEN) while preserving sovereignty, privacy, and observability.

---

## 1) Edge Preflight — `/api/ai` (no vendor calls here)

**Method:** `POST`  
**Runtime:** Edge  
**Purpose:** Verify consent, enforce policy (OPA), create **redaction proof**, forward as broker job.

### Request — `AIRequest`
```ts
export type AIRequest = {
  runId: string;
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  agency_level: "draft_only" | "review_window" | "guardrailed_auto";
  consent_token: string;
  model?: string; temperature?: number; max_tokens?: number;
  metadata: {
    promptHash: string;
    data_class: "demo"|"user_provided"|"public"|"internal"|"secret";
    sector: string;
    pii_tags?: string[];
    reg_context?: string[];
    lens_profiles?: string[];
  };
}
```

### Response — `AIResponse`
```ts
export type AIResponse = {
  id: string;
  output: { type: "text" | "stream"; content?: string };
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
  metrics?: { latency_ms: number; energy_Wh?: number };
  xai: {
    reasoning_trace_ref: string;
    model_votes: { model: string; vote: "yes"|"no"|"weak_yes"|"weak_no" }[];
    regulation_map: { law: string; article: string; note?: string }[];
    provenance_chain: string[];
  };
  traceIds?: { langfuse?: string; sentry?: string };
}
```

### Policy deny (structured)
```json
{ "error":"policy_denied", "policy_id":"opa#weapons", "rule":"export_control", "hint":"Contact support for sovereign use-case review." }
```

---

## 2) Node Broker Endpoints

### 2.1 `POST /api/broker/submit`
Creates an encrypted job and returns a short‑lived **jobToken**.

**Body:** `AIRequest` + broker metadata.  
**Response:**
```json
{ "jobToken":"jwt-like", "runId":"uuid", "expiresIn": 180 }
```

### 2.2 `GET /api/broker/events?jobToken=...` (SSE)
Server‑Sent Events stream of job status and output tokens.

**Events:**
```text
event: status
data: {"phase":"queued"|"running"|"denied"|"complete","runId":"..."}

event: token
data: {"content":"...", "index":123}

event: usage
data: {"prompt_tokens":N,"completion_tokens":M,"total_tokens":N+M}

event: error
data: {"code":"policy_denied|broker_timeout|link_offline","message":"..."}

event: done
data: {"ok":true}
```

### 2.3 `POST /api/broker/append`
RAVEN callback to append streamed tokens or status updates to a job.

**Body:**
```json
{ "jobToken":"...", "append":[{"type":"token","content":"..."},{"type":"status","phase":"running"}] }
```

### 2.4 `POST /api/broker/pull` (optional)
RAVEN Link pulls jobs (long‑poll/WebSocket) to avoid inbound ports/NAT.

---

## 3) Data Schemas (Zod)

```ts
import { z } from "zod";

export const DataClass = z.enum(["demo","user_provided","public","internal","secret"]);
export const PIITag = z.enum(["name","email","phone","address","id_number","health","finance"]);
export const Sector = z.enum(["pharma","construction","agriculture","conservation","environmental","medical","legal","economics","logistics"]);

// Env guard (build fails if missing)
export const EnvSchema = z.object({
  SENTRY_DSN: z.string().min(1),
  NEXT_PUBLIC_SUBSTACK_URL: z.string().url().optional(),
  NEXT_PUBLIC_LINKEDIN_URL: z.string().url().optional(),
});
```

---

## 4) Explainability Bundle (XAI)

Returned on every successful AI response to power the “Why/How” pane:

```json
{
  "xai": {
    "reasoning_trace_ref":"urn:trace:...",
    "model_votes":[{"model":"claude","vote":"yes"}],
    "regulation_map":[{"law":"GDPR","article":"5(1)(c)","note":"data minimization"}],
    "provenance_chain":["promptHash","doc:kb:123","agent:MethodScan@1.2.0"]
  }
}
```

---

## 5) Security Headers (deploy)

- **CSP**: `default-src 'self'; script-src 'self' 'nonce-<nonce>' 'strict-dynamic'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://images.vercel.com; connect-src 'self' https://sentry.io https://*.vercel.app https://langfuse.eu; frame-ancestors 'none'; base-uri 'self'`  
- **Permissions-Policy**: disable sensors/camera/mic  
- **Referrer-Policy**: strict-origin-when-cross-origin  
- **HSTS**, **X-Frame-Options: DENY**, remove `x-powered-by`

---

## 6) CI/CD Requirements

- Required checks: `lint`, `typecheck`, `build`, **Playwright smoke** (`/`, `/globe`, `/deploy`, `/consent`, 9 sector pages, `/api/ai` simulation).  
- Sentry release & sourcemaps on deploy; **secret scanning** on PRs.  
- Build must **fail** if EnvSchema validation fails.

---

## 7) Consent, Agency & Receipts

- `/consent` allows edit/revoke/download (“consent receipt” JSON).  
- Agency affects `agency_level` in `AIRequest`.  
- Receipts and logs store **hashes only**; attach `data_class`, `sector`, `pii_tags` (no raw PII).

---

## 8) Admin Console (gated)

- Runs (link Sentry/Langfuse), Soul Metrics, Lens Engine toggles, Bias monitor, Broker queue (pause/resume).  
- Correlate by `runId`; show XAI elements for audits.

---

## 9) Sector Ambassadors (safe demos)

- 9 sector pages using **sanitized corpora** and curated demo prompts (no advice).  
- Mini “Why/How” panel and CTA to `/deploy` wizard.

---

## 10) SSE client snippet (frontend)

```ts
export function streamJob(jobToken: string, onEvent: (e: MessageEvent) => void) {
  const ev = new EventSource(`/api/broker/events?jobToken=${encodeURIComponent(jobToken)}`);
  ev.onmessage = onEvent;
  ev.onerror = () => ev.close();
  return () => ev.close();
}
```

---

**End of interfaces.** Keep this file in `docs/interfaces.md`. The main README summarizes goals and checklists; this file defines exact contracts and event formats.
