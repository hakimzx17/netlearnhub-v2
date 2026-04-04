# AGENTS.md

## Purpose
This file is for coding agents working in `netlearnhub-v2`.
Read it before making changes.

## Source Of Truth
- Read `docs/PRD.md` before substantial product work.
- For lesson-section UI work, read `docs/buildingLesson.md` first and treat it as the source of truth for the Domains Directory grid, Lesson Detail View, module sidebar, tab structure, centered content framing, and sidebar-safe spacing.
- Treat `docs/PRD.md` as the product source of truth for naming, flows, and domain language.
- Treat the checked-in code as the implementation source of truth for what exists today.
- Prefer repo reality over aspirational docs when they conflict.

## Repo Reality
- The checked-in app now boots through Vite and renders from `src/main.tsx`.
- `src/` now contains the app shell, dashboard, real lesson UI, quiz engine, simulation platform, lab platform, persisted stores, authored sample content, and frontend tests.
- The current UI is React + TypeScript with CSS variables in `src/styles.css`.
- React Router now includes the lesson-detail experience plus real lesson quiz, simulation, and lab flows; later-product areas such as flashcards, vault, exam mode, and broader curriculum content are still ahead of the repo.
- Zustand persistence is in place for guest profile and progress state, including quiz, simulation, and lab progression.
- `project-specs/` now exists and stores milestone setup specs used during implementation.
- Milestones 1 through 4 are implemented in repo reality; later milestones remain partially or fully aspirational.
- There is no Prettier config.
- `server.js` still exists but is no longer the primary local dev workflow.
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
- Current `dev` command: `vite`
- Current `preview` command: `vite preview`
- Current dev server port: `3000`
- Current build script: `npm run build`
- Current build behavior: runs `npm run typecheck` and then `vite build`
- Current lint script: `npm run lint`
- Current lint behavior: runs `eslint src vite.config.ts`
- Current typecheck command: `npm run typecheck`
- Current test command: `npm test`
- Current test behavior: runs `vitest run`
- Watch tests: `npm run test:watch`
- `npm run clean` uses `rimraf dist coverage`

## Single Test Guidance
- Test files currently live in `src/test/`.
- Run a single test file with `npx vitest run src/test/dashboardPage.test.tsx`.
- Run a single test by name with `npx vitest run -t "renders persisted progress widgets and resume action"`.
- Use `npm run test:watch` during active frontend work.

## Verification Rules
- Be explicit about which commands you actually ran.
- Distinguish real checks from visual inspection.
- If you use DevTools for validation, say which routes and breakpoints you checked.
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
- `JetBrains Mono` is now available and should be used for CLI-oriented UI.
- When implementing the lessons section, follow the two-tier pattern from `docs/buildingLesson.md`: centered Domains Directory grid plus Lesson Detail View with module sidebar and tabs for Theory, Simulation, Practice Lab, Flash cards, and Lesson Quiz.
- Keep primary content visually centered within the main content area. UI elements, lesson text, headers, diagrams, and similar learning surfaces should not be anchored to the top-left or left edge in a way that visually collides with the sidebar.
- Leave enough horizontal spacing and use sensible max-width constraints so opening the sidebar does not interfere with, crowd, or overlap the main content.
- Keep accessibility intact.
- Use semantic HTML before adding ARIA.
- Preserve visible focus states and keyboard interaction.
- Prefer function components.
- Keep components focused on one responsibility.
- Keep hooks at the top level.
- Prefer local state before introducing shared state.
- Do not add memoization by default.
- Follow the current styling system in `src/styles.css`; use the existing tokens and component classes before introducing a new styling layer.

## State And Persistence
- The PRD expects frontend-only persistence with `localStorage`.
- Do not scatter direct `localStorage` reads across components.
- Centralize persistence behind Zustand stores or future shared hooks.
- Keep persistence keys explicit and stable: current keys are `nlh_profile` and `nlh_progress`.
- Treat long-lived study progress differently from ephemeral exam-session state.

## Comments, Docs, And Generated Files
- Add comments only when the code is not self-explanatory.
- Prefer comments that explain why, not what.
- Keep README and docs aligned with actual behavior.
- Update `docs/tasks.md` in the same working pass when completed tasks or milestone outcomes change the project status.
- If the user introduces a lasting workflow note or major structural convention, codify it in `docs/AGENTS.md` as part of the same change.
- If you add tests, linting, or build steps, document them here.
- Do not edit `dist/` or generated output unless the task specifically requires it.
- Do not commit secrets.

## Practical Workflow
- Read `package.json`, `vite.config.ts`, `src/router.tsx`, `src/store/profileStore.ts`, `src/store/progressStore.ts`, and `docs/PRD.md` before substantial changes.
- Before building or changing the lessons section, use the Read tool on `docs/buildingLesson.md` first.
- Inspect nearby code before introducing new patterns.
- Verify commands honestly.
- Call out placeholder routes and incomplete milestone work instead of pretending features exist.
- Keep `docs/tasks.md` checkboxes synchronized with completed work instead of leaving finished milestones unchecked.
- When you add new repo conventions, codify them in `AGENTS.md`.
