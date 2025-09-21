export type Message = { role: "system" | "user" | "assistant"; content: string }
export type AIRequest = {
  runId: string; messages: Message[]; agency_level: "draft_only"|"review_window"|"guardrailed_auto"; consent_token: string;
  model?: string; temperature?: number; max_tokens?: number;
  metadata: { promptHash: string; data_class: "demo"|"user_provided"|"public"|"internal"|"secret"; sector: string; pii_tags?: string[]; reg_context?: string[]; lens_profiles?: string[]; }
}
export type AIResponse = {
  id: string; output: { type: "text"|"stream"; content?: string };
  usage?: { prompt_tokens:number; completion_tokens:number; total_tokens:number };
  metrics?: { latency_ms:number; energy_Wh?:number };
  xai: { reasoning_trace_ref:string; model_votes:{model:string;vote:"yes"|"no"|"weak_yes"|"weak_no"}[]; regulation_map:{law:string;article:string;note?:string}[]; provenance_chain:string[] };
  traceIds?: { langfuse?:string; sentry?:string }
}
