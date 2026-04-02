# NetLearnHub Agent Guide

This file is for coding agents working in `C:\Users\Admin\Documents\Projects\netlearnhub-v2`.

## Scope

- The checked-in repository is still docs-first in product maturity, but now includes a runnable frontend scaffold.
- Verified top-level content today includes `docs/`, `resources/`, `.opencode/`, `src/`, `public/`, and root app config files.
- A root `package.json` now exists and is the source of truth for scripts and dependencies.
- A checked-in `src/` tree now exists and contains the initial app shell, routes, stores, and content seeds.
- This file is the repo-local `AGENTS.md`.
- An unrelated `AGENTS.md` exists in another repo under `C:\Users\Admin\Documents\GitHub\cml-mcp`; ignore it for this project.

## Source Of Truth

- Read `docs/PRD.md` before making substantial product changes.
- Treat `docs/PRD.md` as the source of truth for product goals, flows, IA, and domain language.
- Treat actual checked-in repo config as the source of truth for tooling.
- Treat `.opencode/agents/engineering-frontend-developer.md` as important repo-local implementation guidance.
- If the PRD and the checked-in tooling conflict, follow the real repo/tooling for implementation details and the PRD for product behavior and naming.

## Editor Rules

- No `.cursorrules` file was found in this repo.
- No files were found under `.cursor/rules/` in this repo.
- No `.github/copilot-instructions.md` file was found in this repo.
- Do not claim extra editor-specific rules exist unless they are added later.

## Current Repo Reality

- The repository now contains product documentation, study resources, and a runnable frontend scaffold.
- The current app is an implementation baseline with route, store, layout, and content placeholders rather than a feature-complete product.
- Do not invent package scripts, CI jobs, or test infrastructure that are not present.
- Repo-local agent guidance says the intended implementation baseline is React 19, TypeScript 5.9, Vite 8, ESLint 9, and npm.
- Repo-local agent guidance also says no path aliases are configured.
- Repo-local agent guidance says no Prettier or test runner is configured today.
- Repo-local agent guidance says the verified styling baseline is plain CSS, with global tokens in `src/index.css`, not assumed Tailwind.

## Commands

- `npm install`: Installs the frontend dependencies from the repo root.
- `npm run dev`: Starts the Vite dev server from the repo root.
- `npm run lint`: Runs ESLint for the current frontend codebase.
- `npm run build`: Runs `tsc -b && vite build` for the current frontend codebase.
- `npm test`: Not available today because no test runner is configured.
- Single-test command: Not available today because no test runner is configured.
- There is no verified Vitest, Jest, Playwright, or Cypress config in the repo right now.
- Do not tell users that lint, build, or tests passed unless you actually ran them successfully in the current repo state.
- If future work changes scripts or adds a test runner, update this file with the real commands immediately.

## What To Verify Today

- For docs-only changes, verify paths and content against `docs/PRD.md` and other checked-in files.
- For code changes, run `npm run lint` and `npm run build` when feasible.
- For future tests, document the exact file or filter syntax once a runner is added.
- Until then, explicitly state that no automated single-test workflow exists in this repository.

## Product Context

- NetLearnHub is a desktop-first CCNA 200-301 study platform.
- Core product nouns from the PRD: `lesson`, `domain`, `simulation`, `lab`, `quiz`, `exam`, `flashcard`, `vault`.
- Use those nouns consistently in code, UI copy, docs, state, and file names.
- Prefer PRD terminology over generic names like `module`, `unit`, `task`, or `item` when the PRD already defines a better term.
- Preserve the PRD's sequencing model: theory -> simulation -> lab -> quiz -> unlock.
- Preserve the PRD's exam/history/progression vocabulary.

## Implementation Priorities

- Start from the smallest correct change.
- Inspect nearby files before introducing new patterns.
- Keep changes local unless a broader refactor is clearly required.
- Prefer product-driven names over framework-driven names.
- Avoid infrastructure additions unless the task clearly requires them.
- Do not create extra abstraction layers without a concrete reuse need.

## TypeScript Guidelines

- Prefer strict TypeScript.
- Do not use `any` when a concrete type is reasonable.
- Prefer explicit prop, state, and return types where they improve clarity.
- Use `import type` for type-only imports.
- Keep types close to their usage unless they are reused.
- Prefer simple discriminated unions and narrow object shapes over weakly typed blobs.
- Avoid stringly-typed state when a union type or enum-like constant is clearer.
- Do not leave unused imports, locals, or parameters behind.

## Imports And Module Boundaries

- Put third-party imports before local imports.
- Prefer relative imports because no alias system is configured.
- Do not introduce path aliases unless the repo is explicitly configured for them.
- Keep modules focused and cohesive.
- Prefer importing from stable public files instead of deep internal paths when both exist.

## React Guidelines

- Use function components.
- Preserve `StrictMode` unless the user explicitly asks otherwise.
- Keep hooks at the top level.
- Prefer local state before introducing shared state.
- Derive simple values inline instead of storing redundant state.
- Do not add `memo`, `useMemo`, or `useCallback` by default.
- Reach for memoization only when there is a demonstrated need.
- Keep components focused on one clear responsibility.
- Prefer composition over oversized all-in-one components.

## Styling Guidelines

- Follow the styling system that actually exists in the repo.
- Do not assume Tailwind is available unless it is explicitly added and configured.
- Default to plain CSS if that is the checked-in implementation style.
- Prefer semantic class names over utility-style naming.
- BEM-like class names are acceptable when they match nearby code.
- Keep design implementation aligned with the PRD's premium dark, technical tone.
- Preserve visible focus states.
- Respect keyboard accessibility and reduced-motion needs.

## Accessibility Guidelines

- Prefer semantic HTML before adding ARIA.
- Ensure interactive elements are keyboard reachable.
- Use meaningful `alt` text for informative images.
- Use empty `alt` only for decorative images.
- Do not remove focus outlines without a clear replacement.
- Avoid color-only status indicators when text or icons can reinforce meaning.

## Naming Conventions

- Use PascalCase for React component names and exported component files.
- Use camelCase for variables, functions, hooks, and store actions.
- Reserve `useX` names for actual hooks.
- Use product-specific names such as `LessonCard`, `DomainProgress`, `ExamHistory`, or `VaultEntry` when applicable.
- Avoid vague names like `data`, `info`, `handler2`, or `temp`.
- Keep CSS class names descriptive and stable.

## Error Handling

- Do not silently swallow errors.
- Prefer failing fast in development instead of hiding broken state.
- If an error is shown to users, keep the message plain and actionable.
- Validate external or user-provided input at the boundary.
- Never use `eval()` for simulated CLI behavior.
- For CLI-style inputs described in the PRD, use whitelist or pattern-based parsing only.

## Data And Persistence

- The PRD expects browser persistence via `localStorage` and `IndexedDB`.
- Treat persisted state shape as product behavior, not incidental implementation detail.
- Do not store secrets in frontend code or browser storage.
- If a future feature needs credentials or real access control, call that out explicitly.
- The PRD's admin bypass is UX-only and not real security.

## Testing And Reporting

- Be explicit about what you verified.
- Do not claim tests passed unless a test runner exists and you executed it.
- Do not claim build success unless you ran the real build command in the current repo.
- When tooling is absent, say so directly.
- If you add tooling, scripts, or workflow changes, update this file in the same change.

## Agent Behavior Expectations

- Read the PRD before substantial product work.
- Keep explanations concise and concrete.
- Preserve repo constraints rather than importing generic best-practice checklists.
- Do not edit generated output such as `dist/` if it appears later.
- Prefer truthful limitations over confident guesses.

## Quick Summary

- Current repo state: docs and resources plus a Vite React frontend scaffold.
- Current verified root commands: `npm install`, `npm run dev`, `npm run lint`, `npm run build`.
- Intended future workflow from repo-local guidance: npm + React 19 + TypeScript 5.9 + Vite 8 + ESLint 9.
- Current verified testing status: no runner, no single-test command.
- Current verified styling guidance: do not assume Tailwind; prefer actual checked-in styling implementation.
