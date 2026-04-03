# AGENTS.md

## Purpose
This file is for coding agents working in `netlearnhub-v2`.
Read it before making changes.

## Source Of Truth
- Read `docs/PRD.md` before substantial product work.
- Treat `docs/PRD.md` as the product source of truth for naming, flows, and domain language.
- Treat the checked-in code as the implementation source of truth for what exists today.
- Prefer repo reality over aspirational docs when they conflict.

## Repo Reality
- The checked-in app is currently a static `index.html` served by `server.js`.
- `package.json` lists React, Vite, Tailwind, Motion, and TypeScript, but the current app does not yet use that full stack.
- `vite.config.ts` exists, but `npm run dev` does not run Vite today.
- There is no `src/` directory yet.
- There are no checked-in tests.
- There is no configured test runner.
- There is no real lint setup despite a `lint` script existing.
- There is no Prettier config.
- `server.js` uses Express and serves the project root as static files.
- The PRD is ahead of the current implementation; build incrementally from what exists.

## Rule Files
- No `.cursor/rules/` files were found in this repo.
- No `.cursorrules` file was found.
- No `.github/copilot-instructions.md` file was found.
- The repo does contain `.opencode/agents/engineering-frontend-developer.md`.
- Treat this `AGENTS.md` as the primary instruction file when there is overlap.

## Setup And Env
- Install dependencies first with `npm install`.
- `.env*` files are git-ignored except `.env.example`.
- Do not commit secrets or local environment files.
- `GEMINI_API_KEY` is documented in `.env.example`.

## Commands
- Start local server: `npm run dev`
- Preview locally: `npm run preview`
- List available scripts: `npm run`
- Current `dev` command: `node server.js`
- Current `preview` command: `node server.js`
- Current dev server port: `3000`
- Current build script: `npm run build`
- Current build behavior: prints `No build step needed`
- Current lint script: `npm run lint`
- Current lint behavior: prints `No linting needed`
- Current test command: `npm test`
- Current test behavior: fails because there is no `test` script
- Best available manual type check after install: `npx tsc --noEmit`
- `npm run clean` currently uses `rm -rf dist` and fails in Windows `cmd`

## Single Test Guidance
- There is no supported single-test command today.
- There is no `tests/` directory and no `*.test.*` or `*.spec.*` files.
- Do not claim to have run a single test unless you first add a real test runner and test files.
- If you add a test framework, update this file with exact commands for full run, watch mode, single file, and single test name pattern.

## Verification Rules
- Be explicit about which commands you actually ran.
- Distinguish real checks from placeholder scripts.
- Do not say lint passed when the lint script only echoes text.
- Do not say build passed when the build script is a placeholder.
- Do not say tests passed when no test runner exists.
- If you add tooling, update both `package.json` scripts and this file.

## Change Strategy
- Make the smallest correct change.
- Keep changes local unless a broader refactor is clearly necessary.
- Do not rewrite unrelated files for style only.
- Preserve user changes you did not make.
- Do not assume the PRD architecture already exists in code.
- When implementing PRD features, grow the repo from the current baseline instead of jumping straight to the end state.

## Modules And Imports
- Use ESM syntax only.
- Prefer `import` and `export`, not CommonJS.
- Put third-party imports before local imports.
- Use `import type` for type-only imports.
- Do not add unused imports.
- Prefer relative imports for now.
- Do not introduce `@/` imports opportunistically just because `tsconfig.json` contains a path mapping.

## Formatting
- There is no automated formatter configured.
- Preserve the surrounding file's style instead of normalizing the whole repo.
- Prefer single quotes.
- Prefer semicolons.
- Keep trailing commas in multiline objects and arrays when the file already uses them.
- Match the existing whitespace and brace style of the file you touch.
- Avoid broad formatting-only edits unless requested.

## JavaScript And TypeScript
- Prefer TypeScript for new structured application logic.
- Use plain JavaScript only when modifying existing JS-only files that should stay JS.
- Avoid `any` when a concrete type is practical.
- Prefer explicit parameter and return types in shared code.
- Keep types close to usage unless they are reused broadly.
- Prefer narrow unions and literal types over loose strings when the domain is fixed.
- Use `const` by default and `let` only when reassignment is required.
- Avoid unnecessary helpers and abstraction in this still-small codebase.

## Naming
- Use PRD language consistently: `lesson`, `domain`, `simulation`, `lab`, `quiz`, `exam`, `flashcard`, `vault`.
- Use `PascalCase` for React components.
- Use `camelCase` for variables, functions, hooks, and most module filenames.
- Use `UPPER_SNAKE_CASE` for true constants and env-derived constants.
- Prefer descriptive names such as `lessonId` and `domainId` over generic names like `id` when context is unclear.
- Keep CSS class names semantic and readable.

## Error Handling
- Do not silently swallow errors.
- Fail fast in development when state is invalid.
- Surface actionable error messages.
- Validate assumptions at boundaries such as env vars, parsed data, and user input.
- Use `try` and `catch` when recovery or cleanup is meaningful.
- If you catch an error, either handle it clearly or rethrow with added context.

## Frontend Guidance
- Preserve the product direction from the PRD: dark UI, emerald accent, glassy surfaces, and `Outfit` typography.
- Keep accessibility intact.
- Use semantic HTML before adding ARIA.
- Preserve visible focus states and keyboard interaction.
- Prefer function components if and when React components are introduced.
- Keep components focused on one responsibility.
- Keep hooks at the top level.
- Prefer local state before introducing shared state.
- Do not add memoization by default.
- Follow the actual styling system in the files you touch; today that means plain CSS in `index.html`, not a mature Tailwind component system.

## State And Persistence
- The PRD expects frontend-only persistence with `localStorage`.
- For future React work, do not scatter direct `localStorage` reads across components.
- Centralize persistence behind stores or hooks.
- Keep persistence keys explicit and stable.
- Treat long-lived study progress differently from ephemeral exam-session state.

## Comments, Docs, And Generated Files
- Add comments only when the code is not self-explanatory.
- Prefer comments that explain why, not what.
- Keep README and docs aligned with actual behavior.
- If you add tests, linting, or build steps, document them here.
- Do not edit `dist/` or generated output unless the task specifically requires it.
- Do not commit secrets.

## Practical Workflow
- Read `package.json`, `server.js`, `vite.config.ts`, and `docs/PRD.md` before substantial changes.
- Inspect nearby code before introducing new patterns.
- Verify commands honestly.
- Call out placeholders and missing tooling instead of pretending they exist.
- When you add new repo conventions, codify them in `AGENTS.md`.
