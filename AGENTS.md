# AGENTS.md

## Repo Snapshot
- Project root: `C:\Users\Admin\Documents\Projects\netlearnhub-v2`
- Current stack: React 19, TypeScript 5.9, Vite 8, ESLint 9.
- Package manager: `npm` (`package-lock.json` is present).
- The app is still close to the default Vite starter.
- The product direction is defined in `docs/PRD.md`.
- Treat `docs/PRD.md` as the source of truth for feature names and domain language.
- Important PRD nouns: `lesson`, `domain`, `simulation`, `lab`, `quiz`, `exam`, `flashcard`, `vault`.
- There is no existing repo-local `AGENTS.md`; this file is the primary agent guide for this repository.

## Read First
- `docs/PRD.md`
- `package.json` and `eslint.config.js`
- `tsconfig.app.json`, `tsconfig.node.json`, and `vite.config.ts`
- `src/main.tsx`, `src/App.tsx`, `src/index.css`, and `src/App.css`

## Testing Guidance
- Do not claim that tests passed unless a test runner is actually added and executed.
- If a user asks to run tests today, explain that the repo has no test script yet.
- If a user asks to run a single test today, explain that single-test execution is not available yet.
- Do not invent test commands unless the tooling is first added to the repo.
- If you add a test runner, also add npm scripts and update this file immediately.
- Preferred future direction is Vitest because the repo already uses Vite, but that is not configured yet.

## Tooling Constraints
- No path aliases are configured.
- No Prettier, Tailwind, or test config is present.
- ESLint uses the flat config in `eslint.config.js`.
- TypeScript runs in strict mode via `tsconfig.app.json` and `tsconfig.node.json`.
- `allowImportingTsExtensions` and `verbatimModuleSyntax` are enabled.
- `noUnusedLocals` and `noUnusedParameters` are enabled.

## Agent Workflow
- Read the PRD before making substantial product changes.
- Inspect nearby files before introducing new patterns.
- Keep changes minimal and local unless the task clearly requires broader refactoring.
- For code changes, run `npm run lint` and `npm run build` before finishing when feasible.
- Do not edit generated output in `dist/`.
- If you add new scripts or tooling, document them here.

## Imports
- Put third-party imports first.
- Put local modules and assets after third-party imports.
- Keep side-effect style imports explicit, usually after local value imports.
- Use `import type` for type-only imports.
- Prefer relative imports because no alias system exists.
- Explicit `.ts` and `.tsx` import extensions are allowed in this repo.
- Do not add unused imports; TypeScript and ESLint will flag them.

## Naming
- Use `PascalCase` for React component names.
- Use `PascalCase` for component file names.
- Use `camelCase` for variables, functions, and helpers.
- Hooks must start with `use`.
- Use descriptive domain names from the PRD instead of vague names.
- Prefer `lessonProgress` over generic names like `data`.
- Boolean names should read naturally: `isReady`, `hasPassed`, `canRetry`, `shouldShowTimer`.
- Event handlers should usually be named `handleX`.

## React Conventions
- Use function components.
- Keep hooks at the top level.
- Prefer local state before introducing shared state.
- Derive simple values inline instead of creating unnecessary state.
- Do not add memoization by default.
- Keep components focused on one clear responsibility.
- Preserve `StrictMode` in the app entry unless the user asks otherwise.

## Error Handling
- Do not silently swallow errors.
- Catch errors only when you can add context, recover, or render a useful fallback.
- Prefer failing fast in development over hiding broken state.
- When reading external or dynamic data, validate shape before using it.
- If surfacing an error to users, make the message actionable and plain.
- Avoid broad `try/catch` wrappers around entire components.

## CSS And Styling
- Tailwind CSS v4 exclusively - no inline style= unless dynamic values require it
- Current styling is plain CSS imported from TSX files.
- Global design tokens live in `src/index.css` via CSS custom properties.
- Nested CSS is already used and is acceptable.
- Media queries are colocated with the rules they affect.
- Prefer semantic class names over purely visual names.
- Keep accessibility in mind when styling focus, hover, and contrast states.
- Do not introduce a new styling system unless the user asks for it.

## Accessibility
- Use meaningful `alt` text for informative images.
- Use empty `alt` text only for decorative images.
- Preserve keyboard accessibility for interactive elements.
- Do not remove visible focus styles without a replacement.

## File And Project Structure
- Keep root config files in the repo root.
- Keep app entry logic in `src/main.tsx`.
- Keep top-level app composition in `src/App.tsx` until the app grows enough to justify more structure.
- As the PRD is implemented, prefer the structure it describes: `routes/`, `layouts/`, `components/`, `lib/`, `types/`, `content/`.
- Keep related assets close to the components or routes that use them.

## When Adding New Infrastructure
- Add the smallest viable toolset.
- Wire it through `package.json` scripts.
- Document exact commands in this file.
- Avoid speculative architecture that is not yet needed by the current task.

## Completion Checklist
- Changes match `docs/PRD.md` unless the user requested a deviation.
- Imports are clean and ordered.
- Types satisfy strict mode.
- Lint passes.
- Build passes.
- Test status is reported honestly.
- `AGENTS.md` is updated if workflow or tooling changed.
