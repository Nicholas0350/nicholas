# Agent Guidelines for This Repo

Scope: This file applies to the entire repository rooted at `.`.

## Expectations

- Keep changes minimal, focused, and in the existing style.
- Prefer surgical fixes over broad refactors unless requested.
- Update or add small docs when behavior changes.
- Do not add dependencies or tooling that require network install unless asked.

## Tech Stack

- Framework: Next.js 15 (App Router)
- Language: TypeScript (strict mode enabled)
- Linting: ESLint (flat config at `eslint.config.mjs`)

## Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint` (or `npm run lint:fix` if present)
- Type-check: `npm run typecheck` (if present)

## Conventions

- Place application sources under `src/`. Use path alias `@/` for imports.
- Prefer function components and React hooks.
- Keep server components/server actions separate from client components; add `"use client"` only when needed.
- Use descriptive variable and function names; avoid one-letter names.
- Avoid inline comments unless the user explicitly asks for them.
- Write accessible, semantic HTML and keep CSS in `src/app/globals.css` or co-located modules as appropriate.

## PR/Change Hygiene

- Touch only what is necessary for the task.
- Add or update brief README notes when adding new scripts or features.
- If adding files, keep names kebab-case for files and PascalCase for components.

## What Not To Do

- Do not change licenses or add headers.
- Do not introduce unrelated fixes.
- Do not run destructive git commands.

## Useful Paths

- App entry: `src/app/page.tsx`
- Layout: `src/app/layout.tsx`
- Global styles: `src/app/globals.css`

If uncertain about scope or intent, ask for clarification before large changes.

