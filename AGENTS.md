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

## 1. Explore the Codebase

* List relevant directories to show project structure.
* Review http://AGENTS[.]md, http://CLAUDE[.]md, and files under `docs/` for context and conventions.
* Check existing code for examples of similar implementations.

## 2. Ask Clarifying Questions

If anything is ambiguous, ask questions before finalizing the plan.
Examples:

* "Which module should the new helper live in?"
* "Should this endpoint return JSON or HTML?"

## 3. File Tree of Changes

At the top of the plan, show a tree diagram of affected files.
Use markers for status:

* UPDATE = update
* NEW = new file
* DELETE = deletion

Example:
```

```

## 4. File-by-File Change Plan

For each file:

* Show full path + action (update, new, delete).
* Explain the exact changes in plain language.
* Include a short code snippet for the main update.

Example:

* File: `src/services/user.service.ts` (UPDATE)

  * Add a method `getUserByEmail(email: string)` that looks up a user from an in-memory list.
  * Refactor `getUserById` to reuse shared lookup logic.

  ```
  const users = [
    { id: 1, email: "alice@example[.]com", name: "Alice" },
    { id: 2, email: "bob@example[.]com", name: "Bob" },
  ];

  export function getUserByEmail(email: string) {
    return users.find(u => http://u[.]email === email) || null;
  }

  export function getUserById(id: number) {
    return users.find(u => http://u[.]id === id) || null;a
  }
  ```

## 5. Explanations & Context

At the end of the plan, include:

* Rationale for each change (why it's needed).
* Dependencies or side effects to watch for.
* Testing suggestions to validate correctness.
