# NetLearnHub Delivery Plan

## How To Use This File
- This plan translates `docs/PRD.md` into milestone-based execution tasks.
- Tasks are ordered by dependency, not just by feature popularity.
- Each milestone should end with a demoable product increment.
- The current repo starts from a static `index.html` served by `server.js`, so early tasks focus on establishing the real app foundation.
- Check off tasks as they are completed and adjust scope only when repo reality forces a change.

## Milestone 0: Foundation And App Shell
**Objective:** Turn the current static prototype into a maintainable React application foundation.

**Depends on:** Existing repo baseline only.

### Tasks
- [ ] Audit the current static dashboard in `index.html` and identify reusable layout sections, styling tokens, and interactions.
- [ ] Stand up the real React + TypeScript + Vite application entry point.
- [ ] Create the initial `src/` structure for pages, components, content, hooks, stores, and shared utilities.
- [ ] Replace placeholder npm workflow with real application scripts for `dev`, `build`, and `preview`.
- [ ] Fix the cross-platform clean workflow so it works on Windows as well as Unix-like shells.
- [ ] Add core app dependencies required by the PRD architecture, especially routing and persisted state management.
- [ ] Add baseline engineering checks: typecheck, linting, and a lightweight test setup appropriate for the frontend stack.
- [ ] Build the app shell: sidebar, top navigation, page shell, route container, and not-found state.
- [ ] Extract the current visual design into global tokens for dark background, emerald accent, glass surfaces, and typography.
- [ ] Add `Outfit` and `JetBrains Mono` typography handling for UI and CLI contexts.
- [ ] Build reusable primitives: button, card, badge, modal, tooltip, progress ring.
- [ ] Create the persisted profile store and progress store.
- [ ] Implement the guest profile setup flow and persist profile data locally.
- [ ] Migrate the current dashboard from static HTML into reusable React components.
- [ ] Add route placeholders for all major PRD pages so the navigation model exists early.
- [ ] Document the resulting scripts, architecture decisions, and repo workflow updates.

### Done When
- [ ] The app boots through the React/Vite entry point.
- [ ] The dashboard is rendered from React components rather than raw static markup.
- [ ] App-level state persists correctly across refreshes.
- [ ] Core routes exist and navigation works end to end.

## Milestone 1: Domain Navigation And Lesson Reader
**Objective:** Deliver the first meaningful learning flow for reading lessons.

**Depends on:** Milestone 0.

### Tasks
- [ ] Define TypeScript models for lessons, sections, callouts, CLI spotlights, checkpoints, and summary cards.
- [ ] Build the domain overview page with lesson list, progress indicators, and lock-state presentation.
- [ ] Build lesson list item components with locked, available, in-progress, passed, and failed states.
- [ ] Build the lesson reader layout with sticky section navigation.
- [ ] Build callout block components for `WHY THIS MATTERS`, `EXAM TRAP`, `REMEMBER THIS`, `REAL WORLD`, and `ANALOGY`.
- [ ] Build CLI spotlight rendering with code formatting and explanation support.
- [ ] Build visual block support for inline diagrams and topology illustrations.
- [ ] Build concept checkpoint interactions with immediate feedback and no grading pressure.
- [ ] Build summary card rendering and prepare the hook-in point for vault review storage.
- [ ] Implement lesson progress updates for started, resumed, and viewed states.
- [ ] Author Domain 1 lesson content as typed modules.
- [ ] Review Domain 1 lesson ordering against the PRD domain structure.
- [ ] Connect dashboard widgets to real lesson progress and last-session data.
- [ ] Add accessibility coverage for keyboard navigation, heading structure, and reading flow.

### Done When
- [ ] A user can open Domain 1 and navigate a complete lesson-reading experience.
- [ ] Lesson content is driven by structured data modules.
- [ ] Domain overview and dashboard both reflect real stored lesson progress.

## Milestone 2: Quiz Engine And Unlock Logic
**Objective:** Complete the first gated progression loop for lessons and domains.

**Depends on:** Milestone 1.

### Tasks
- [ ] Define the typed quiz question model for all PRD-supported question types.
- [ ] Build the quiz state engine for loading questions, tracking answers, and final submission.
- [ ] Build UI support for single-choice questions.
- [ ] Build UI support for multi-select questions.
- [ ] Build UI support for true/false questions.
- [ ] Build UI support for fill-in-the-blank questions.
- [ ] Enforce PRD quiz rules: randomized questions, randomized options, no back-navigation, explanations always shown.
- [ ] Build the quiz progress bar, timing display, and animated answer states.
- [ ] Build the results screen with score ring, breakdown, and missed-question review actions.
- [ ] Persist quiz attempts, scores, dates, and missed-question IDs.
- [ ] Implement the pure unlock engine for lessons and domains.
- [ ] Update progress state when lesson quizzes are passed or failed.
- [ ] Wire quiz outcomes into next-lesson unlock behavior.
- [ ] Build domain quiz support and domain completion behavior.
- [ ] Author Domain 1 lesson quizzes and the Domain 1 domain quiz.
- [ ] Validate the full Domain 1 progression from lesson to quiz to unlock.

### Done When
- [ ] A user can pass a lesson quiz and unlock the next lesson.
- [ ] Domain completion status updates correctly after the domain quiz.
- [ ] Quiz history survives refresh and return visits.

## Milestone 3: Simulation MVP
**Objective:** Add the first lesson-linked simulations that make abstract networking concepts visual.

**Depends on:** Milestones 0 through 2.

### Tasks
- [ ] Define the shared simulation contract for lesson-specific simulation components.
- [ ] Build the shared simulation shell with play, pause, step-through, speed control, and caption panel.
- [ ] Add simulation state tracking so progress can reflect whether the sim was viewed.
- [ ] Build desktop-only guard behavior for simulation routes.
- [ ] Implement reduced-motion behavior where motion is minimized but content remains understandable.
- [ ] Build the Packet Flow simulation.
- [ ] Build the Subnetting Visualizer simulation.
- [ ] Build the VLAN Segmentation simulation.
- [ ] Ensure each simulation has labels, caption updates, and clear visual state mapping.
- [ ] Connect lesson flow into simulation routes and back out to lab or quiz progression.
- [ ] Validate layout stability so simulations do not break page structure.
- [ ] Run content and UX review to confirm each simulation teaches a specific concept rather than acting as decoration.

### Done When
- [ ] At least three lesson-specific simulations are working in the product.
- [ ] Simulation routes respect desktop-only constraints.
- [ ] Simulation completion fits into the lesson progression experience.

## Milestone 4: Hands-On Lab MVP
**Objective:** Deliver the first CLI-based lab experience with deterministic validation.

**Depends on:** Milestones 0 through 3.

### Tasks
- [ ] Define the lab content model for topology, objectives, hints, initial state, and validation.
- [ ] Build the lab shell with topology panel, terminal panel, and lab brief/objectives area.
- [ ] Build the CLI prompt and mode-switching state machine.
- [ ] Support IOS-style mode transitions such as `enable`, `configure terminal`, interface config, and router config modes.
- [ ] Add command history navigation.
- [ ] Add tab completion for known commands.
- [ ] Add contextual `?` help support.
- [ ] Add deterministic unknown-command and typo feedback.
- [ ] Support abbreviated command forms defined in the PRD.
- [ ] Build formatted output rendering for key `show` commands.
- [ ] Build the topology renderer for routers, switches, PCs, servers, firewall, cloud nodes, and link types.
- [ ] Build the validation engine against expected configuration state.
- [ ] Build objective completion tracking.
- [ ] Add guided mode with next-command assistance.
- [ ] Add hint toggling that does not penalize progress.
- [ ] Add full lab reset behavior.
- [ ] Author the first set of Domain 1 labs.
- [ ] Connect lab completion to lesson progress state.
- [ ] Test lab determinism so repeated command sequences produce consistent outcomes.

### Done When
- [ ] A user can complete a guided lab and see objectives update correctly.
- [ ] CLI, topology, and validation state remain synchronized.
- [ ] Labs can be reset safely without corrupting progress.

## Milestone 5: Flashcards And Vault
**Objective:** Deliver the review systems that remain available outside the gated lesson loop.

**Depends on:** Milestone 0 for base architecture. Lesson progression integration benefits from Milestones 1 and 2.

### Tasks
- [ ] Define the flashcard state model and deck content model.
- [ ] Implement the simplified SM-2 scheduling logic from the PRD.
- [ ] Build the flashcard store and persist card progress locally.
- [ ] Build the flashcard deck picker.
- [ ] Build the active flashcard session view.
- [ ] Build card flip interaction and difficulty rating controls.
- [ ] Add session stats and due-card handling.
- [ ] Add keyboard shortcuts for flip and rating.
- [ ] Add support for optional diagram and CLI-backed cards.
- [ ] Author all six domain flashcard decks.
- [ ] Define the vault content model.
- [ ] Build the vault layout with category navigation and content area.
- [ ] Build client-side search across vault content.
- [ ] Add bookmark persistence and a personal saved-items view.
- [ ] Build category pages for must-know facts, OSI/TCP-IP, CLI reference, protocol facts, glossary, and exam traps.
- [ ] Author vault content across all required categories.
- [ ] Add links between vault items and related lesson content.
- [ ] Add the soft "study before quiz" nudge where appropriate.

### Done When
- [ ] Users can study due cards and keep long-term progress.
- [ ] Vault content is searchable, bookmarkable, and accessible outside lesson progression.
- [ ] Flashcards and vault both use stable local persistence.

## Milestone 6: Exam Mode
**Objective:** Deliver the capstone assessment experience for completed domains.

**Depends on:** Milestones 0 through 5, especially quiz and progression systems.

### Tasks
- [ ] Define the exam session model separate from long-lived study progress.
- [ ] Build the exam mode home screen.
- [ ] Build domain-scope selection based on completed domains only.
- [ ] Build the active exam shell with timer, question area, flagging, and submission flow.
- [ ] Implement timed-session behavior aligned to the PRD target.
- [ ] Add support for mixed-domain exam assembly.
- [ ] Build drag-and-drop question interactions.
- [ ] Build embedded simulation question interactions.
- [ ] Build exam results with overall score, timing, and per-domain performance breakdown.
- [ ] Build weak-area callouts and post-exam review guidance.
- [ ] Author the first full exam question bank.
- [ ] Validate availability rules so incomplete domains cannot be used in exam scope selection.
- [ ] Validate timer expiry, submission, and restart/reset flows.

### Done When
- [ ] A user can start and complete a full exam session from eligible domains.
- [ ] Exam results clearly explain performance by domain.
- [ ] Exam session behavior stays separate from persistent study state.

## Milestone 7: Content Completion Across All Domains
**Objective:** Expand from a Domain 1 MVP into a complete six-domain CCNA platform.

**Depends on:** Milestones 0 through 6.

### Tasks
- [ ] Create a content production plan for Domains 2 through 6 across lessons, quizzes, labs, simulations, flashcards, and vault references.
- [ ] Author Domain 2 content package.
- [ ] Author Domain 3 content package.
- [ ] Author Domain 4 content package.
- [ ] Author Domain 5 content package.
- [ ] Author Domain 6 content package.
- [ ] Fill in lesson diagrams, CLI spotlights, checkpoints, and summary cards across all domains.
- [ ] Fill in simulations across all domain topics that require them.
- [ ] Fill in lab scenarios, objectives, and validation rules across all domains.
- [ ] Fill in lesson and domain quiz coverage across all domains.
- [ ] Expand flashcards and vault references to fully support all domains.
- [ ] Expand exam question coverage across all domains.
- [ ] Review lesson ordering and dependency correctness across the curriculum.
- [ ] Run naming and terminology review to keep content aligned with the PRD.

### Done When
- [ ] All six domains are available in the product.
- [ ] Every core learning system has multi-domain coverage.
- [ ] Cross-domain content quality and terminology are consistent.

## Milestone 8: Quality, Accessibility, And Launch Readiness
**Objective:** Harden the experience for a reliable launch-quality release.

**Depends on:** All previous milestones.

### Tasks
- [ ] Run a full accessibility audit across lessons, quizzes, simulations, labs, flashcards, vault, and exam mode.
- [ ] Fix keyboard navigation gaps.
- [ ] Fix missing labels, semantics, and screen-reader issues.
- [ ] Validate contrast and reduced-motion compliance.
- [ ] Run performance profiling across dashboard, lesson reader, simulations, labs, and exam flows.
- [ ] Add route-level lazy loading where it materially improves startup cost.
- [ ] Defer or split heavy simulation and lab code where appropriate.
- [ ] Audit local persistence behavior for profile, progress, flashcards, bookmarks, and exam session state.
- [ ] Validate streak logic, achievements, resume flow, and unlock transitions.
- [ ] Run regression testing across first-visit, returning-user, and completion-state scenarios.
- [ ] Review desktop guard behavior for simulations and labs on smaller screens.
- [ ] Tighten copy, error states, and edge-case messaging.
- [ ] Update README, AGENTS guidance, scripts, and setup docs to match final repo behavior.
- [ ] Prepare a launch checklist covering smoke tests, content completeness, and known-risk signoff.

### Done When
- [ ] Accessibility issues are reduced to an acceptable launch threshold.
- [ ] Performance is acceptable on primary desktop flows.
- [ ] Persistence and progression are stable under normal use.
- [ ] Project documentation matches the implemented product.

## Recommended Execution Sequence
1. Milestone 0: Foundation And App Shell
2. Milestone 1: Domain Navigation And Lesson Reader
3. Milestone 2: Quiz Engine And Unlock Logic
4. Milestone 3: Simulation MVP
5. Milestone 4: Hands-On Lab MVP
6. Milestone 5: Flashcards And Vault
7. Milestone 6: Exam Mode
8. Milestone 7: Content Completion Across All Domains
9. Milestone 8: Quality, Accessibility, And Launch Readiness

## Suggested Release Gates
- **Vertical Slice Release:** Milestones 0 through 4 with a subset of Domain 1 fully playable.
- **MVP Release:** Milestones 0 through 6 with Domain 1 complete and supporting review systems live.
- **PRD-Complete Release:** Milestones 0 through 8 across all six domains.
