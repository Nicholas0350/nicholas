---
title: AI: Add Pricing Q&A bar with /api/pricing
labels: [feature, ai, pricing]
assignees: []
---

Goal
- Add a compact input above Pricing tiers for Q&A, using progressive enhancement.

Scope
- Render an input that POSTs to `/api/pricing` and displays a text reply.
- Preserve static tiers; failures degrade gracefully.
- Emit `ai_section_interaction` events (section=Pricing, basic intent inference).

Acceptance Criteria
- Static tiers always render.
- With JS, responses show; failures don’t break layout.
- Typecheck and lint pass; no new deps.

Branch
- feat/ai-asic-pricing

Notes
- Endpoint exists with a static fallback reply sourced from offer JSON.
- Later we can swap internals to Vercel AI SDK (`streamText`).

