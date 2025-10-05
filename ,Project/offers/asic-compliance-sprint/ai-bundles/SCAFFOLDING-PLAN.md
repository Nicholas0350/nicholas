Plan: Scaffold minimal API routes and keep UI unchanged until approved. Progressive enhancement via static fallbacks.

Affected Files

- NEW src/app/api/hero-chat/route.ts
  - POST handler returning concise one-line pitch using offer JSON.
  - No AI dependencies. Plain text response for immediate fallback.

- NEW src/app/api/pricing/route.ts
  - POST handler returning tier summary using offer JSON fields.
  - No AI dependencies. Plain text response.

Not Wired Yet (pending approval)

- src/components/landing/Hero.tsx → add micro-chat (useChat) under headline
- src/components/landing/Pricing.tsx → add compact Q&A bar (useStreamText) above tiers

Guardrails

- No refunds; no guaranteed outcomes; no legal advice
- If later enabling AI streaming, preserve static fallback behavior

Next Steps

1) Approve wiring Hero and Pricing UI to call the new endpoints
2) After approval, add minimal client components with progressive enhancement
3) When ready, swap endpoint internals to Vercel AI SDK calls

