## Milestone 1: Foundation
Objective: Establish the core frontend platform, routing, persistence, and UI shell needed for all later product work.
Deliverables: React + Vite app scaffolded with TypeScript, global design tokens and fonts, persisted state store scaffolding, `AppLayout` and `ExamLayout`, and stubbed route structure for the MVP surfaces.
Dependencies: None.
Tasks:
- Install and configure the core routing, state, and UI libraries needed for the MVP foundation.
- Define the premium dark design tokens, typography, spacing, and reusable surface styles that match the PRD and dashboard mock direction.
- Build `AppLayout` with the left navigation rail, top utility navigation, and reusable content shell.
- Build `ExamLayout` with the standard app chrome removed for full-screen exam routes.
- Stub the full MVP route tree for dashboard, learn, domain exam, exam mode, vault, flashcards, and profile.
- Scaffold persisted store shells for progress, flashcards, lab state, and exam state.

## Milestone 2: Course Map and Lesson Shell
Objective: Enable learners to navigate the course structure and enter a complete lesson experience shell with progression context.
Deliverables: Course map with domain and lesson lock states, lesson layout with reading progress and callout patterns, lesson navigation, video placeholder, and MDX-based lesson content pipeline.
Dependencies: Milestone 1.
Tasks:
- Model the MVP course structure for Domain 1 and the minimum Domain 2 lesson set needed to prove cross-domain unlock flow.
- Build the course map with domain blocks, lesson nodes, lock states, and completion indicators.
- Create the lesson shell with reading progress, callout blocks, diagram frames, and previous/next navigation.
- Add the `VideoPlaceholder` component with clear Coming Soon labeling.
- Configure the MDX lesson content pipeline and map lesson-specific components into authored content.
- Author the initial lesson content set required for the MVP learning flow.

## Milestone 3: Quiz System
Objective: Deliver the adaptive lesson assessment system that gates lesson progression.
Deliverables: Seeded lesson question model and data, adaptive difficulty logic, quiz experience supporting the defined question types, pass/fail results, and progress-state integration for unlocks.
Dependencies: Milestones 1-2.
Tasks:
- Define the quiz and domain exam question models, validation rules, and seed data format.
- Seed the Domain 1 lesson quizzes and the minimum Domain 2 question set needed for unlock and exam coverage.
- Implement the adaptive difficulty cursor and question selection logic.
- Build the lesson quiz UI for single-answer, multi-select, drag-to-order, fill-in-the-blank, and scenario-based questions.
- Add submission feedback, explanations, retry flow, and pass/fail results states.
- Build the gated domain exam flow for completed lessons within a domain.
- Wire quiz and domain exam outcomes into progression unlock state.

## Milestone 4: Simulation Engines
Objective: Build the two reusable simulation systems that power visual concept demos and configuration-based topology lessons.
Deliverables: Visual simulation engine with passive and active modes, configuration simulation engine driven by topology JSON, and initial lesson simulations wired into the learning flow.
Dependencies: Milestones 1-2.
Tasks:
- Define the JSON config contracts for visual simulations and configuration topologies.
- Build `SimulationShell` with passive and active mode switching, playback controls, speed controls, and legend support.
- Implement the `VisualSimEngine` state-machine renderer for animated concept walkthroughs.
- Implement the `ConfigSimEngine` topology renderer for lesson-specific device and link states.
- Wire the initial MVP simulations for OSI flow, ARP, and one configuration-based topology lesson.
- Connect simulation completion state back into the lesson experience.

## Milestone 5: Lab System
Objective: Provide the guided and independent CLI lab experience that validates hands-on network configuration skills.
Deliverables: xterm.js-backed terminal, command interpreter with whitelisted validation, guided Phase 1 and independent Phase 2 lab flows, and topology state updates linked to CLI actions.
Dependencies: Milestone 4.
Tasks:
- Integrate xterm.js as a lazy-loaded terminal for lesson labs and exam lab reuse.
- Build the CLI command interpreter with whitelist-based matching, realistic outputs, and no command execution risk.
- Define the lesson lab content format for steps, hints, expected commands, outputs, and accepted end states.
- Implement the guided Phase 1 lab flow with step validation, contextual hints, and progress tracking.
- Implement the independent Phase 2 lab flow with end-state validation, scoring, and feedback.
- Synchronize CLI actions with topology updates and persisted lesson lab progress.
- Author the two MVP lesson labs required by the PRD scope.

## Milestone 6: Exam Mode
Objective: Ship the configurable full-session exam simulator with timed delivery, navigation, lab questions, scoring, and review.
Deliverables: Exam configuration screen, full-screen exam session shell with timer and question navigator, exam lab question support, results and review experience, and persisted exam history.
Dependencies: Milestones 1, 3, and 5.
Tasks:
- Build the exam configuration screen with domain selection, question count, time limit, lab toggle, difficulty mix, and preview summary.
- Implement `useExamStore` with active-session persistence in sessionStorage and results history in localStorage.
- Build the full-screen exam shell with timer states, question counter, flagging, answer persistence, and collapsible navigator.
- Reuse the quiz question renderer in exam mode without live correctness feedback.
- Implement the exam lab question flow with stripped CLI and topology UI plus multi-path accepted end-state validation.
- Build scoring, scaled score, pass/fail, domain breakdown, and full review results screens.
- Surface exam history, score trend, and weakest-domain analysis on the profile experience.
- Seed the MVP exam pool from Domain 1 and Domain 2 content, including one exam lab question.

## Milestone 7: Flashcards and Vault
Objective: Add the always-available reinforcement systems for spaced repetition and rapid reference lookup.
Deliverables: Flashcard scheduling and review flow, domain deck entry point, vault data model, and searchable/filterable reference experience.
Dependencies: Milestones 1-2.
Tasks:
- Define the flashcard and vault data models plus the seed content structure for MVP content.
- Implement the flashcard scheduler, due-card queue, and persisted review state.
- Build the flashcard session flow with flip interaction, rating actions, and end-of-session summary.
- Ship the Domain 1 flashcard deck and expose due-card data for dashboard surfacing.
- Build the vault search, debounced filtering, and reference card grid experience.
- Seed vault entries for Domains 1 and 2 with related lesson links and tag metadata.

## Milestone 8: Dashboard, Profile, and Polish
Objective: Tie the MVP together with progress visibility, profile tooling, and final UX quality work.
Deliverables: Dashboard with progress and exam summary widgets, profile page with exam history and admin bypass, motion and interaction polish, and accessibility and performance review for the MVP experience.
Dependencies: Milestones 1-7.
Tasks:
- Build the dashboard using the provided mock as directional reference for the premium dark shell, progress centerpiece, and quick-access panels.
- Add dashboard widgets for overall progress, domain progression, due flashcards, current lesson resume, and last exam score.
- Build the profile page with exam history, score trend chart, weakest-domain summary, and hidden admin bypass flow.
- Add page transitions and interaction polish with reduced-motion-safe fallbacks.
- Complete the MVP accessibility pass across keyboard flow, focus states, labels, and non-color status cues.
- Complete the MVP performance pass, including route-level code splitting and lazy loading for heavy lab and simulation features.
- Run an end-to-end content and progression validation pass for Domain 1 and partial Domain 2.
