---
title: AI: Wire Hero micro-chat with /api/hero-chat
labels: [feature, ai, hero]
assignees: []
---

Goal
- Add a small micro-chat to the Hero section using progressive enhancement.

Scope
- Render a compact input below Hero CTAs that POSTs to `/api/hero-chat` and displays a concise reply.
- Keep static Hero copy primary; if request fails, no visual regressions.
- Emit `ai_section_interaction` events (section=Hero, intent inferred basic).

Acceptance Criteria
- Static Hero renders unchanged with JS disabled.
- With JS, users can ask a short question and get a one-line answer.
- Typecheck and lint pass; no new deps.

Branch
- feat/ai-asic-hero

Notes
- Endpoints already exist with static fallback replies.
- Later we can swap internals to Vercel AI SDK (`streamText`).

