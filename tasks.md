# NetLearnHub Milestones

## Milestone 1: Foundation
Objective: Establish the frontend app baseline, routing shell, design tokens, and persistence scaffolding needed for all product work.
Deliverables: React + Vite + TypeScript project setup, nested route structure, global design system tokens, app shell and exam shell, and initial state stores with browser persistence wiring.
Dependencies: None.
Tasks:
- Finalize the premium dark design tokens, typography pairing, spacing scale, and glass-surface styles used across the app.
- Build the shared shell primitives: collapsed sidebar rail, floating dashboard top navigation pill, widget card surface, pill buttons, and progress track styles.
- Establish the full route tree with stubbed screens for dashboard, learn, lesson, simulation, lab, quiz, exam, flashcards, vault, and profile.
- Wire the baseline Zustand stores for progression, labs, flashcards, and exams with browser persistence.
- Create shared UI foundations for headings, status pills, empty states, and locked-state treatment so later milestones reuse one visual language.

## Milestone 2: Course Map and Lesson Shell
Objective: Build the gated learning structure and the reusable lesson-reading experience that anchors the core progression flow.
Deliverables: Course map with domain and lesson lock states, lesson layout, callout blocks, video placeholder, lesson navigation, and MDX-based lesson content pipeline.
Dependencies: Milestone 1.
Tasks:
- Build the course map page with domain cards, lesson nodes, completion states, and lock overlays tied to progression data.
- Implement the left-side domain navigation pattern and current-domain highlighting to match the desktop-first learning flow.
- Create the lesson reading layout with centered content column, sticky reading progress bar, and reusable section spacing rules.
- Add reusable MDX lesson components for callouts, diagrams, code-style blocks, checkpoints, and video placeholder embeds.
- Implement previous and next lesson navigation plus theory, simulation, lab, and quiz handoff links.
- Seed enough lesson content structure to validate gating, navigation, and layout behavior end to end.

## Milestone 3: Quiz System
Objective: Deliver lesson quizzes and domain assessment logic that validate mastery and drive progression.
Deliverables: Question data model, adaptive difficulty selection, quiz UI for supported question types, pass/fail results, and progress store integration for lesson unlocks.
Dependencies: Milestone 2.
Tasks:
- Define the quiz question schema for single-answer, multi-answer, drag-and-drop, and fill-in-the-blank prompts.
- Build the single-question focus layout with progress track, difficulty badge, keyboard shortcuts, and animated card transitions.
- Implement answer selection, validation, explanation handling, and pass or fail outcomes for lesson quizzes.
- Add adaptive difficulty cursor logic so quiz flow responds to correct and incorrect performance.
- Wire quiz completion into the progression store so passed lessons unlock the next lesson in sequence.
- Build the domain exam quiz variant that reuses the same renderer without lesson-mode feedback.

## Milestone 4: Simulation Engines
Objective: Implement the two simulation systems that reinforce theory through guided visual interaction and configuration-based topology feedback.
Deliverables: Visual Simulation Engine for passive and active concept walkthroughs, Config Simulation Engine for topology rendering from JSON, and initial lesson simulations wired into lesson routes.
Dependencies: Milestone 2.
Tasks:
- Build the visual simulation player shell with a full-height canvas, floating control bar, play and pause controls, and speed settings.
- Implement passive walkthrough mode with authored step playback, annotations, and guided emphasis states.
- Implement active simulation mode with constrained user interaction, validation feedback, and retry support.
- Build the config-driven topology renderer from JSON for switches, routers, hosts, links, and state updates.
- Define the simulation content format so authored lesson simulations can load into either engine consistently.
- Wire initial lesson simulations for concepts such as OSI flow, ARP, and basic switching into lesson routes.

## Milestone 5: Lab System
Objective: Add the two-phase CLI lab experience that validates guided and independent hands-on practice.
Deliverables: Terminal integration, command interpreter, guided lab phase with step validation and hints, independent lab phase with end-state validation, and topology updates linked to CLI state.
Dependencies: Milestones 2 and 4.
Tasks:
- Integrate the terminal experience with lazy-loaded `xterm` and a layout that pairs instructions with live CLI output.
- Build the command interpreter using whitelist and pattern-based parsing for supported Cisco-style commands.
- Implement guided phase validation with step-by-step objectives, hint states, and immediate correctness feedback.
- Implement independent lab mode with objective-only instructions and final end-state validation.
- Sync CLI commands to topology state changes so interface, VLAN, and addressing actions update the visual lab canvas.
- Persist active lab progress and completion outcomes so learners can resume and review lab work.

## Milestone 6: Exam Mode
Objective: Ship the configurable full-session mock exam flow that benchmarks readiness outside the gated lesson path.
Deliverables: Exam configuration screen, full-screen exam session shell with timer and navigator, lab-question handling, results and review screen, and persisted exam history.
Dependencies: Milestones 3 and 5.
Tasks:
- Build the exam configuration screen with domain selection, question count, time estimate, and lab inclusion controls.
- Implement the dedicated exam session shell with fixed header, timer states, question counter, and collapsible navigator panel.
- Reuse quiz question renderers in exam mode without immediate feedback or lesson progression behavior.
- Add the exam lab question flow with stripped tooling, topology canvas, and multi-path end-state validation.
- Build the exam results screen with overall score, per-domain breakdown, review list, and readiness messaging.
- Persist active session state in session storage and completed exam history in local storage for later profile views.

## Milestone 7: Flashcards and Vault
Objective: Provide always-available reinforcement systems for spaced repetition and rapid reference.
Deliverables: Flashcard session engine with review scheduling and flip-card UI, domain deck entry points, vault data model, and vault search and filtering experience.
Dependencies: Milestone 2.
Tasks:
- Define the flashcard scheduling model, review states, and due-card prioritization rules.
- Build the flashcard session screen with centered 3D flip card, progress track, and keyboard-friendly rating actions.
- Add domain deck entry points and context-aware links from lessons and dashboard surfaces.
- Define the vault entry schema for commands, protocols, diagrams, and reference snippets.
- Build the vault page with search, filters, result counts, and compact reference cards.
- Persist flashcard review outcomes and recent vault usage so reinforcement surfaces can appear elsewhere in the product.

## Milestone 8: Dashboard, Profile, and Product Polish
Objective: Complete the core product loop with progress visibility, study nudges, profile insights, and final UX hardening.
Deliverables: Dashboard widgets for progression and study state, profile page with exam history and admin bypass, achievement and transition polish, accessibility review, and performance review.
Dependencies: Milestones 2, 6, and 7.
Tasks:
- Build the dashboard layout around the orbit-style progress centerpiece, floating top nav, quadrant widgets, and domain progression rail from the approved visual direction.
- Implement dashboard widgets for study time, current lesson resume state, due flashcards, next exam readiness, and last exam score.
- Build the profile page with learner stats, exam history trend chart, completion summaries, and admin bypass entry.
- Add achievement toasts, route transitions, and reduced-motion-safe animation patterns across the main product flow.
- Run accessibility hardening for keyboard navigation, focus visibility, screen-reader labels, and non-color status cues.
- Run final performance review and bundle cleanup to keep the desktop-first app responsive as simulation and lab features land.
