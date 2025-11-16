# Repository Guidelines

This repository is a Bun + Turborepo monorepo. Apps live in `apps/*` and shared code in `packages/*`. Use Biome for formatting/linting and Turbo tasks for build, dev, and test.

## Project Structure & Module Organization
- Apps: `apps/api`, `apps/dashboard`, `apps/desktop`, `apps/engine`, `apps/website`, `apps/docs`
- Packages: shared libraries in `packages/*` (e.g., `@midday/db`, `@midday/ui`, `@midday/utils`)
- Types: global type shims in `types/*`
- Config: `turbo.json`, `biome.json`, `tsconfig.json`

Prefer small, focused packages; export from `src/index.ts`. Use workspace aliases like `@midday/<pkg>`.

## Build, Test, and Development Commands
- Install: `bun install`
- Develop all: `bun run dev` (Turbo, parallel)
- Develop one: `bun run dev:api` (or `:dashboard`, `:website`, `:engine`, `:desktop`)
- Build: `bun run build`
- Test: `bun run test`
- Lint: `bun run lint` (Biome + manypkg)
- Format: `bun run format`
- Types: `bun run typecheck`

## Coding Style & Naming Conventions
- Language: TypeScript (strict, NodeNext modules via `packages/tsconfig`).
- Indentation: 2 spaces; format with Biome (`biome.json`).
- Imports: organized automatically; no unused vars/exports.
- Naming: kebab-case for folders, PascalCase for components/types, camelCase for vars/functions. Package names are `@midday/<name>`.

## Testing Guidelines
- Runner: Bun test by default (`bun test`), some legacy packages use Jest.
- Files: colocate as `*.test.ts` next to source (e.g., `src/foo.test.ts`).
- Scope: unit tests for pure logic; avoid network calls; mock I/O.
- Run: `bun run test` (root) or `bun test` in a workspace.

## Commit & Pull Request Guidelines
- Commits: imperative, concise; optional scope, e.g., `fix(dashboard): align icons`.
- PRs: include summary, linked issues (`Closes #123`), screenshots for UI, and notes on env/config changes.
- CI: ensure `lint`, `typecheck`, `build`, and tests pass locally before opening.

## Security & Configuration Tips
- Env: create `.env` at root and per-app as needed; see usages in code (e.g., `NEXT_PUBLIC_*`, `SUPABASE_*`, `PLAID_CLIENT_ID`).
- Secrets: never commit; Turbo passes specific vars (see `turbo.json`).
- Local dev URLs: prefer `NEXT_PUBLIC_URL=http://localhost:3000` for dashboard/website.

## Agent-Specific Instructions
- Follow Biome and existing patterns; keep diffs minimal and focused.
- Update adjacent docs (`README.md`, in-package docs) when behavior changes.
- Prefer additive changes in packages; avoid breaking public exports without a migration note.
