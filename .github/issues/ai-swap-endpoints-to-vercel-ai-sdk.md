---
title: AI: Swap /api/hero-chat and /api/pricing internals to Vercel AI SDK
labels: [feature, ai, backend]
assignees: []
---

Goal
- Replace static fallback responses with Vercel AI SDK calls while preserving progressive enhancement and error fallbacks.

Scope
- Update `src/app/api/hero-chat/route.ts` to use `streamText` and the Hero bundle prompt.
- Update `src/app/api/pricing/route.ts` to use `streamText` and the Pricing bundle prompt.
- Ground from `,Project/offers/asic-compliance-sprint/filled-offers-data.json` (prompt-only) and respect guardrails.
- Keep current plain-text fallback if SDK or provider fails.

Acceptance Criteria
- Endpoints stream tokenized responses on success.
- On failure, return current plain text fallbacks with 200 OK to avoid UI breakage.
- No new UI changes; Hero/ Pricing UI continue to work.
- Typecheck and lint pass; env var keys documented in README if required.

References
- Bundles: `,Project/offers/asic-compliance-sprint/ai-bundles/{hero,pricing}.json`
- Config: `.claude/ai-sdk-integrator-1/config.json`

Branches
- Create: `feat/ai-sdk-endpoints`

