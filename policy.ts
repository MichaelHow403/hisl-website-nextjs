import type { AIRequest } from './types'
// Minimal OPA/Rego loader stub: tries to fetch Wasm policy if present; otherwise allows.
export async function evaluatePolicy(_req: AIRequest): Promise<{ allow: boolean; policy_id?: string; rule?: string }>() {
  try {
    const res = await fetch('/policy/opa_policy.wasm', { cache:'no-store' })
    if (!res.ok) return { allow: true }
    // TODO: instantiate Wasm and evaluate input. For now, allow by default.
    return { allow: true }
  } catch {
    return { allow: true }
  }
}
