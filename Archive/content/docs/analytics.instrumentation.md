# Analytics Instrumentation

## Events
- `page_view` — props: route, ts
- `globe_run` — props: route, hops[], estWh, tokens, runId
- `deploy_assess_submit` — props: sector, orgSize, residency
- `lead_submit` — props: referrer, sector

## PostHog Snippet (Next.js)
```ts
import { posthog } from 'posthog-js'
export function track(event: string, props?: Record<string, any>) {
  if (typeof window === 'undefined') return
  posthog.capture(event, props)
}
```
Use: `track('globe_run', { hops, estWh, tokens, runId })`