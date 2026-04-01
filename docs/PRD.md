# NetLearnHub
> Frontend PRD & Implementation Blueprint — CCNA 200-301 v1.1 Study Platform

---

## Summary

NetLearnHub is a self-study platform for Cisco CCNA 200-301 v1.1 candidates. It combines structured deep-dive lessons, interactive simulations, guided CLI labs, adaptive quizzes, a full configurable Exam Mode, spaced-repetition flashcards, and a rapid-reference vault into one cohesive frontend experience. The product is desktop-first, frontend-only (React + Vite), with all progress persisted in browser localStorage/IndexedDB. The UX feel is premium dark — Linear meets Coursera — immersive, technical, and motivating without hacker/cyberpunk aesthetics. Think HTB/THM in terms of structured progression and earned access, but with the polish of a world-class learning product.

---

## Problem

CCNA students suffer from fragmented study: one tool for videos, another for labs, another for flashcards, another for practice exams. No single platform combines deep theory, visual simulation, hands-on CLI practice, and spaced repetition in one coherent, motivating experience. Cisco's own materials are dry. Third-party platforms (Udemy, CBT Nuggets) are passive. Packet Tracer is intimidating and isolated. The result is low retention, poor exam readiness, and high dropout rates.

---

## User

**Primary:** Self-studying CCNA candidate. Technical background, 18–35, studying on a desktop. Motivated but easily bored by static content. Familiar with interactive platforms (HTB, TryHackMe, LeetCode). Expects immediate feedback, visual engagement, and a sense of measurable progress. Studies in 45–90 minute sessions.

**Secondary (post-MVP):** Bootcamp students, IT professionals recertifying.

**Mindset:** "Show me how it works, let me touch it, test me on it, and tell me when I've mastered it."

---

## Product Vision

A study platform that makes CCNA mastery feel inevitable — not a grind. Every concept is taught visually, reinforced through interaction, validated through labs and quizzes, and burned into memory through spaced repetition. Progress is earned, not assumed. The platform guides the student from zero to exam-ready through a structured unlock engine that rewards mastery before advancing.

---

## Core Experience

The student moves through a strict linear progression inside each domain:

```
Lesson Theory → Video Placeholder → Simulation → Lab (Phase 1 → Phase 2) → Quiz → Unlock Next Lesson
```

At the domain level:
```
All Lessons Passed → Domain Exam (30Q) → Next Domain Unlocked
```

Supporting systems (Vault, Flashcards) are always accessible. Flashcards and Vault reinforce the current lesson context.

---

## Main Feature Systems

### 1. Lesson System (Theory Deepdive)
- Storytelling-first content presentation
- Rich callout blocks (Why This Matters, Analogy, Warning, Key Concept, Real World)
- Inline diagrams (SVG/MDX components)
- Video placeholder component (YouTube embed slot, clearly labeled "Coming Soon")
- Structured sections with scroll-based reading progress indicator
- Estimated read time displayed upfront
- Content sourced from CCNA PDFs/books in `/Resources` — parsed and structured per lesson

### 2. Simulation Engine (Two Distinct Engines)

**Engine A — Visual Simulation Engine** (non-config lessons)
For concepts: OSI model, TCP/IP, packet flow, ARP, VLANs, subnetting
- Two modes per simulation: Passive (watch animated flow) and Active (interact with the simulation)
- Active examples: drag OSI layer boundary to explore inter/intra-layer interactions, click a device to intercept a packet, configure subnet masks and see IP range update live
- Step-through controls: Play / Pause / Rewind / Speed (0.5x–2x)
- State machine drives each simulation (each frame is a defined state)

**Engine B — Config Simulation Engine** (configuration lessons)
- Reusable topology canvas (devices + cables)
- Device types: Router, Switch, PC, Firewall, Server
- Configurable per lesson via a JSON schema (topology definition)
- Shows real-time state changes on devices as commands are entered
- Linked to Lab CLI for visual feedback during lab phase

### 3. Lab System (Two-Phase CLI Lab)

**Phase 1 — Guided**
- Step-by-step instruction panel (left)
- CLI terminal panel (right)
- Each step has: objective, expected command, hint (togglable), validation logic
- On correct command: visual confirmation + topology updates
- On wrong command: gentle error with contextual hint, no penalty
- Progress tracker per step

**Phase 2 — Independent**
- No step instructions, only the scenario objective
- Same CLI + topology interface
- System validates final configuration state against expected end state
- Score and feedback shown on completion

CLI is simulated — a command interpreter that matches input against expected strings/patterns and returns pre-defined realistic outputs (e.g., `show ip interface brief` returns a formatted table).

### 4. Quiz System

**Lesson Quiz:** 10 questions, 80% pass threshold
**Domain Exam:** 30 questions, pulled from completed lessons in that domain only, 80% pass threshold

**Adaptive Difficulty:**
- Question pool tagged: Easy / Medium / Hard
- Each correct answer shifts the next question toward higher difficulty (up to Hard)
- Each wrong answer drops one difficulty tier
- Implemented via a simple difficulty cursor (int 0–4) that maps to question tier

**UX:**
- One question at a time, full-screen focus mode
- Animated transitions between questions
- Progress bar with difficulty indicator
- Instant feedback after submission (correct/wrong + explanation)
- Results screen: score, time, per-question breakdown, retry option

**Question Types:**
- Multiple choice (single answer)
- Multiple choice (multi-select)
- Drag-to-order (OSI layers, protocol stack)
- Fill-in-the-blank (CLI command completion)
- Scenario-based (short setup paragraph + question)

### 5. Vault (Rapid Reference)

Always-accessible sidebar/page. Organized into:
- **CCNA Must Know**: ports, protocol numbers, timers, default values
- **Networking Principles**: OSI layers, TCP/IP layers, encapsulation
- **Networking Concepts**: protocol summaries, topology types
- **CLI Command Reference**: organized by device type and function
- **Glossary**: searchable term definitions
- **Exam Cheat Sheet**: condensed one-page exam-day reference

Each Vault entry is a card. Filterable by category and domain. Searchable.

### 6. Flashcard System

- Decks auto-generated from lesson content (terms, concepts, commands)
- Organized by the 6 CCNA domains
- Rating system: **Know It** / **Unsure** / **Don't Know**
- Review scheduling:
  - Know It → next review in 10 min → next review 1 day
  - Unsure → next review in 1 min
  - Don't Know → re-queued in current session immediately
- Due cards surfaced on dashboard
- Smooth card flip animation (3D CSS flip)
- Session summary: cards reviewed, mastery %, due tomorrow

### 7. Exam Mode

A full CCNA exam simulator that mimics real Cisco exam conditions. Configurable per session. Accessible from the main nav — not gated by progression (students should be able to attempt a mock exam at any time to benchmark themselves).

**Configuration Screen (pre-exam):**
The student builds their exam session before starting:
- **Domain selection**: toggle any combination of the 6 domains (at least 1 required)
- **Question count**: slider — 30 / 60 / 120 questions
- **Time limit**: set in minutes (default auto-calculates at 1 min/question; fully editable)
- **Include hands-on labs**: toggle on/off (adds 1–3 sim lab questions to the session)
- **Difficulty mix**: All / Weighted toward Hard / Exam-realistic distribution
- Preview card shows estimated session length and domain breakdown before starting

**Exam Shell (in-session):**
- Full-screen, distraction-free interface — sidebar and topbar hidden entirely
- Fixed header: exam title, question counter (e.g., "Question 14 of 60"), global countdown timer
- Timer turns amber at 20% time remaining, red at 10%
- One question displayed at a time — no peeking ahead
- **Flag button** on every question — marks it for review, visually distinct in question navigator
- **Question navigator panel** (collapsible sidebar): grid of all question numbers, color-coded:
  - White = unanswered
  - Blue = answered
  - Amber = flagged
  - Amber + Blue = answered but flagged (student wants to revisit)
- No feedback during exam — selecting an answer does not indicate correct/wrong
- Student can freely navigate between any question via the navigator
- **Submit Exam** button only appears when all questions are answered OR time expires (auto-submits)
- Confirmation modal before final submission

**Hands-On Lab Questions (in-exam):**
- Appear as a distinct question type: "Simulation Task"
- Same CLI terminal + topology canvas interface as the lab system, but stripped of all guidance
- No hints, no step instructions, no phase labels — only the scenario objective and topology
- Student configures the device(s), then clicks "Submit Configuration"
- The CLI interpreter validates the final device state against ALL accepted valid command sequences
  - Multiple valid paths to correct end-state are pre-defined per lab question
  - Any command sequence that produces the correct end-state = full credit
- No partial credit at MVP — pass/fail per lab question
- Time continues counting down during lab questions
- Student can leave a lab question unanswered and return via navigator (state is preserved)

**Results Screen (post-exam):**
- Score displayed as percentage and scaled score (e.g., 820/1000 Cisco-style)
- Pass/Fail verdict against the 825/1000 threshold
- Time used vs. time allowed
- Per-domain breakdown: score % per selected domain (radar chart or horizontal bar)
- Full question review:
  - Every question shown with student's answer, correct answer, explanation
  - Flagged questions highlighted for easy review
  - Lab questions show: expected end-state vs. student's submitted state, diff-style
- "Retake with same config" and "New Exam" CTAs
- Result is saved to exam history in localStorage (date, score, domain config, pass/fail)

**Exam History (Profile page):**
- List of all past exam sessions
- Per-session: date, question count, domains, score, pass/fail, time used
- Trend line (Recharts) showing score improvement over attempts
- Weakest domain identified from historical data (prompt to study that domain)

### 8. Progression / Unlock Engine

- Hard-gated: Lesson N+1 unlocked only after Lesson N quiz passed (≥80%)
- Domain N+1 unlocked only after Domain N exam passed
- Visual state per lesson: Locked / Available / In Progress / Completed
- Admin bypass: Profile page → hidden button "Admin Privileges" → password `admin` → unlocks entire course map
- Achievement events: lesson complete, domain complete, first lab phase 2 cleared, 7-day streak
- Dashboard shows overall % complete, current domain progress, due flashcards, next unlock, last exam score widget
- Profile shows full exam history, domain weakness chart, score trend

---

## Information Architecture

```
/                             → Dashboard (progress, due cards, current lesson CTA)
/learn                        → Course Map (all domains, lessons, lock states)
/learn/[domain]/[lesson]/
  ├── theory                  → Theory Deepdive
  ├── simulation               → Lesson Simulation
  ├── lab                     → Hands-On Lab
  └── quiz                    → Lesson Quiz
/domain-exam/[domain]         → Domain Exam (30Q, post-domain gate)
/exam                         → Exam Mode: Configuration Screen
/exam/session                 → Exam Mode: Active Session (full-screen)
/exam/results/:sessionId      → Exam Mode: Results + Review
/vault                        → Vault Reference
/flashcards                   → Flashcard Mode
/flashcards/[domain]          → Domain Flashcard Deck
/profile                      → User Profile + Progress Stats + Exam History + Admin Bypass
```

---

## User Flow

```
Dashboard
  └─→ Course Map
        └─→ Lesson: Theory Deepdive (scroll-based, rich content)
              └─→ Lesson: Simulation (passive → active)
                    └─→ Lesson: Lab Phase 1 (guided CLI)
                          └─→ Lesson: Lab Phase 2 (independent CLI)
                                └─→ Lesson Quiz (10Q, adaptive)
                                      └─→ Pass → Next Lesson Unlocked
                                      └─→ Fail → Review options + retry
  └─→ Domain Exam (after all lessons in domain complete)
        └─→ Pass → Next Domain Unlocked
  └─→ Exam Mode
        └─→ Config Screen (select domains, count, time, labs toggle)
              └─→ Active Session (full-screen, timed, flag + navigator)
                    └─→ Results + Full Review
                          └─→ Saved to Exam History (Profile)
  └─→ Vault (anytime)
  └─→ Flashcards (anytime, due-card priority)
  └─→ Profile (stats, exam history, admin bypass)
```

---

## Domain / Lesson Structure

Mapped to CCNA 200-301 v1.1 official exam topics (6 domains):

| # | Domain | Weight |
|---|--------|--------|
| 1 | Network Fundamentals | 20% |
| 2 | Network Access | 20% |
| 3 | IP Connectivity | 25% |
| 4 | IP Services | 10% |
| 5 | Security Fundamentals | 15% |
| 6 | Automation & Programmability | 10% |

Each domain contains 8–14 lessons sourced from the `/Resources` PDF/book material. Lesson content is structured into MDX files during build time.

**Content Ingestion Strategy (Future):**
When a backend is added, a content pipeline will parse PDFs from `/Resources`, chunk by topic heading, and store structured lesson objects. For now, content is hand-structured into JSON/MDX lesson files per lesson slug.

---

## Simulation Design Principles

1. **Every simulation has a defined learning objective** — not decoration
2. **Passive mode always first** — student watches before interacting
3. **Active mode is opt-in** — clear CTA to switch modes
4. **State machine architecture** — simulation is a sequence of named states, not imperative animation code
5. **Configurable via JSON** — each lesson passes a simulation config object, not bespoke code
6. **Visual Engine uses Canvas (via Konva.js or plain Canvas API)** for complex animations; SVG for static/semi-static diagrams
7. **Config Engine topology** is a declarative JSON → rendered D3-force or custom canvas layout
8. **No simulation should take more than 90 seconds to fully observe passively**
9. **Always include a legend** for symbols, colors, and flow direction

**Visual Engine Config Shape:**
```json
{
  "id": "osi-packet-flow",
  "type": "visual",
  "mode": "passive|active|both",
  "states": [...],
  "activeInteractions": [
    { "trigger": "click", "target": "router-node", "effect": "intercept-packet" }
  ],
  "legend": [...]
}
```

**Config Engine Topology Shape:**
```json
{
  "id": "vlan-lab-topology",
  "type": "config",
  "devices": [
    { "id": "sw1", "type": "switch", "label": "SW1", "position": { "x": 200, "y": 150 } }
  ],
  "links": [
    { "from": "sw1", "to": "pc1", "type": "ethernet" }
  ],
  "initialState": {},
  "expectedState": {}
}
```

---

## Lab Design Principles

1. **Two-panel layout always**: Instructions/Topology left, CLI terminal right
2. **Phase 1 never leaves the student stuck** — hints are always available, never penalized
3. **Phase 2 validates end-state, not command sequence** — student may use different valid commands
4. **CLI interpreter is a pattern-matching engine** — regex-based command matching, pre-defined outputs
5. **Topology updates visually** as commands are correctly entered (e.g., interface goes green when configured)
6. **Lab scenarios are always grounded in the lesson** — no surprises outside the lesson scope
7. **Each lab has a narrative context** (e.g., "You are the network engineer for a small branch office...")
8. **CLI supports**: tab-completion hint, `?` help command, `show` commands with formatted output, `conf t` context switching

---

## Quiz System Design

**Data shape per question:**
```json
{
  "id": "q-001",
  "domain": 1,
  "lesson": 3,
  "difficulty": 2,
  "type": "single",
  "stem": "Which OSI layer is responsible for...?",
  "options": ["A", "B", "C", "D"],
  "correct": [1],
  "explanation": "Layer 3 handles..."
}
```

**Adaptive cursor logic:**
```
difficulty_cursor starts at 1 (Easy-Medium)
correct answer → cursor++ (max 4)
wrong answer   → cursor-- (min 0)
next question selected from pool filtered by cursor tier
```

**Exam question data shape (extends quiz question, adds lab type):**
```json
{
  "id": "eq-045",
  "domain": 3,
  "difficulty": 3,
  "type": "single | multi | drag | fill | lab",
  "stem": "...",
  "options": ["A", "B", "C", "D"],
  "correct": [2],
  "explanation": "...",
  "labConfig": {
    "topology": { ... },
    "objective": "Configure OSPF on R1 and R2 so that PC1 can reach PC2.",
    "acceptedEndStates": [
      { "r1": { "ospf": true, "area0": true }, "r2": { "ospf": true, "area0": true } }
    ]
  }
}
```

**Exam result shape (saved to localStorage history):**
```json
{
  "sessionId": "exam-1711900000",
  "date": "2026-04-01T10:30:00Z",
  "config": { "domains": [1,2,3], "questionCount": 60, "timeLimitMs": 3600000, "includeLabs": true },
  "score": { "raw": 47, "total": 60, "percent": 78.3, "scaled": 820 },
  "passed": false,
  "timeUsedMs": 3120000,
  "domainBreakdown": { "1": 0.92, "2": 0.85, "3": 0.61 },
  "answers": { ... },
  "flags": [...]
}
```
- Score < 80% → fail screen with per-question review, retry CTA
- Score ≥ 80% → pass screen with XP-style celebration, unlock notification

---

## Flashcard System Design

**Card data shape:**
```json
{
  "id": "fc-001",
  "domain": 1,
  "lesson": 2,
  "front": "What is the default administrative distance of OSPF?",
  "back": "110",
  "tags": ["routing", "ospf", "ad"],
  "reviewState": {
    "rating": null,
    "nextReview": null,
    "reviewCount": 0
  }
}
```

**Scheduling logic:**
- Don't Know → nextReview = now (re-queue in session)
- Unsure → nextReview = now + 1 day
- Know It → nextReview = now + 3 days

**Session flow:**
1. Load all cards where nextReview ≤ now OR never reviewed
2. Present one at a time (front face)
3. Student taps/clicks to flip
4. Rates: Know It / Unsure / Don't Know
5. Session ends when queue is empty
6. Summary screen shown

---

## Vault Design

- Persistent sidebar panel or dedicated `/vault` route
- Search bar (debounced, searches term + definition + tags)
- Filter by domain, category
- Each entry is a `VaultCard` component:
  - Short title
  - Content (can include inline code, tables, lists)
  - Tag chips (protocol, command, concept, etc.)
  - "Related Lesson" link

**Vault is pre-populated** from a structured JSON data file built from PDF/book resources. Not dynamic for MVP.

---

## Progression / Unlock Logic

**State shape (persisted to localStorage):**
```json
{
  "userId": "local-user",
  "adminUnlocked": false,
  "domains": {
    "1": {
      "unlocked": true,
      "examPassed": false,
      "lessons": {
        "1": { "theoryRead": true, "simComplete": false, "labP1": false, "labP2": false, "quizScore": null, "passed": false },
        "2": { "unlocked": false }
      }
    }
  },
  "flashcards": { "1": { "fc-001": { "rating": "know", "nextReview": "..." } } },
  "achievements": [],
  "streak": { "current": 3, "lastStudyDate": "2026-03-30" }
}
```

**Unlock rules:**
```
lesson[n].passed === true → lesson[n+1].unlocked = true
allLessons[domain].passed === true → domainExam[domain].available = true
domainExam[domain].passed === true → domain[n+1].unlocked = true
adminUnlocked === true → skip all gates
```

**Admin bypass flow:**
Profile page → "Admin Privileges" button (subtle, not prominent) → password modal → input `admin` → sets `adminUnlocked: true` in state → all lessons/domains become available immediately.

---

## Frontend Tech Stack Recommendation

| Concern | Choice | Rationale |
|---|---|---|
| Framework | **React 18 + Vite** | No SSR needed for frontend-only; Vite gives fastest DX, HMR, and build times |
| Language | **TypeScript** | Non-negotiable for this data complexity |
| Routing | **React Router v6** | File-like nested routing, layout routes, clean data loaders |
| Styling | **Tailwind CSS + CSS Variables** | Speed + theming consistency |
| Animation | **Framer Motion** | Quiz transitions, card flips, lesson reveals, page transitions |
| Simulation (Visual) | **Konva.js (React-Konva)** | Canvas-based, React-friendly, handles complex interactive animations |
| Simulation (Config) | **React Flow** | Node/edge topology rendering, extensible, performant |
| State Management | **Zustand** | Lightweight, no boilerplate, persists easily to localStorage |
| Persistence | **Zustand + zustand/middleware persist** + **idb-keyval** (IndexedDB for flashcard state) | localStorage for progress, IndexedDB for large flashcard datasets |
| Content | **MDX via @mdx-js/react + Vite MDX plugin** | Lesson content in MDX with custom React components |
| Icons | **Lucide React** | Clean, consistent, maintainable |
| Charts/Data Viz | **Recharts** | Exam history score trend, domain radar chart on results screen |
| Font | **Display: Syne / Body: DM Sans** | Loaded via Google Fonts or self-hosted; Syne is distinctive and technical-feeling; DM Sans is clean and readable |
| UI Primitives | **Radix UI** | Accessible, unstyled, composable (modals, dropdowns, tooltips) |
| Code/CLI Display | **xterm.js** | Real terminal emulator feel for CLI labs and exam lab questions |

---

## Frontend Architecture

```
src/
├── main.tsx                   → App entry, React Router provider
├── App.tsx                    → Root layout + router
├── routes/
│   ├── index.tsx              → Dashboard
│   ├── learn/
│   │   ├── index.tsx          → Course Map
│   │   └── [domain]/[lesson]/
│   │       ├── theory.tsx
│   │       ├── simulation.tsx
│   │       ├── lab.tsx
│   │       └── quiz.tsx
│   ├── domain-exam/
│   │   └── [domain].tsx       → Domain Exam (30Q gate)
│   ├── exam/
│   │   ├── index.tsx          → Exam Config Screen
│   │   ├── session.tsx        → Active Exam Session
│   │   └── results/
│   │       └── [sessionId].tsx → Results + Review
│   ├── vault/
│   │   └── index.tsx
│   ├── flashcards/
│   │   ├── index.tsx
│   │   └── [domain].tsx
│   └── profile/
│       └── index.tsx
├── layouts/
│   ├── AppLayout.tsx          → Sidebar + topbar shell (hidden in exam session)
│   └── ExamLayout.tsx         → Full-screen, nav-less exam shell
```

---

## State Management Strategy

**Three Zustand stores:**

### 1. `useProgressStore`
Tracks all lesson/domain/exam completion state. Persisted to localStorage via `persist` middleware.
```ts
{
  domains: Record<string, DomainProgress>
  adminUnlocked: boolean
  achievements: string[]
  streak: StreakState
  actions: { completeLesson, passQuiz, unlockDomain, setAdminUnlock }
}
```

### 2. `useFlashcardStore`
Tracks all flashcard review state. Persisted to IndexedDB via idb-keyval.
```ts
{
  cards: Record<string, FlashcardState>
  sessionQueue: string[]
  actions: { rateCard, startSession, endSession }
}
```

### 4. `useExamStore`
Tracks active exam session state and full exam history. Active session persisted to sessionStorage (survives accidental refresh). History persisted to localStorage.
```ts
{
  // Active session (cleared on results)
  session: {
    config: ExamConfig                    // domains, count, timeLimit, includeLabs
    questions: ExamQuestion[]             // shuffled pool for this session
    answers: Record<string, string[]>     // questionId → selected option(s)
    flags: Set<string>                    // flagged question IDs
    labStates: Record<string, DeviceState> // per lab question CLI state
    startedAt: number                     // timestamp
    submittedAt: number | null
    timeRemainingMs: number
  } | null
  // Exam history
  history: ExamResult[]
  actions: {
    startSession, answerQuestion, flagQuestion,
    submitLabConfig, submitExam, clearSession
  }
}
```
Ephemeral. Tracks current lab session state (current step, command history, phase).
```ts
{
  phase: 1 | 2
  currentStep: number
  commandHistory: string[]
  topologyState: Record<string, DeviceState>
  actions: { submitCommand, advanceStep, completePhase }
}
```

---

## Component System

**Lesson Components:**
- `<LessonLayout>` — scroll container with reading progress bar
- `<CalloutBlock variant="why|analogy|warning|key|realworld">` — colored emphasis blocks
- `<DiagramFrame>` — SVG diagram wrapper with caption
- `<VideoPlaceholder lessonId="...">` — YouTube slot with "Coming Soon" overlay
- `<LessonNav>` — previous/next lesson navigation

**Simulation Components:**
- `<SimulationShell>` — wrapper with mode toggle (Passive/Active), controls bar
- `<VisualSimEngine config={...}>` — Konva canvas simulation
- `<ConfigSimEngine topology={...}>` — React Flow topology
- `<SimLegend items={...}>` — symbol/color legend

**Lab Components:**
- `<LabShell>` — two-panel split layout
- `<LabInstructions steps={...} currentStep={n}>` — Phase 1 step panel
- `<LabObjective>` — Phase 2 scenario text
- `<CLITerminal onCommand={handler}>` — xterm.js terminal
- `<TopologyCanvas topology={...} deviceStates={...}>` — live topology view

**Quiz Components:**
- `<QuizShell>` — full-screen quiz container
- `<QuestionCard question={...}>` — animated question display
- `<DifficultyIndicator cursor={n}>` — subtle visual showing current difficulty
- `<QuizResults score={...} questions={...}>` — results breakdown

**Flashcard Components:**
- `<FlashcardDeck domainId={...}>` — session manager
- `<FlashcardCard front={...} back={...}>` — 3D flip card
- `<RatingButtons>` — Know It / Unsure / Don't Know

**Vault Components:**
- `<VaultSearch>` — debounced search input
- `<VaultCard entry={...}>` — reference card
- `<VaultFilters>` — category + domain filter chips

**Exam Mode Components:**
- `<ExamConfigScreen>` — domain toggles, question count slider, time input, labs toggle, start CTA
- `<ExamShell>` — full-screen layout, global timer, header bar, navigator panel
- `<ExamTimer remaining={ms}>` — countdown display with amber/red threshold states
- `<ExamNavigator questions={...} answers={...} flags={...} current={n}>` — collapsible question grid
- `<ExamQuestionCard question={...}>` — stateless display, no feedback styling
- `<ExamLabQuestion topology={...} objective="...">` — stripped CLI + topology, no hints
- `<ExamResultsScreen session={...}>` — score, pass/fail, domain radar, full review
- `<ExamReviewItem question={...} studentAnswer={...}>` — per-question diff view
- `<ExamHistory results={...}>` — sortable list + Recharts trend line

**Progress Components:**
- `<CourseMap>` — full domain/lesson grid with lock states
- `<LessonNode state="locked|available|inprogress|complete">` — individual lesson card
- `<DomainBlock>` — domain container with progress ring
- `<AchievementToast>` — animated achievement popup

---

## Design System Direction

**Theme: Premium Dark Technical**
- Not hacker. Not sterile. Technical luxury — the kind of UI a senior engineer would be proud to use.

**Colors:**
```css
--bg-base: #0d0f14;           /* Near-black with blue undertone */
--bg-surface: #13161e;        /* Card/panel surface */
--bg-elevated: #1a1e2a;       /* Elevated panel / modal */
--border: #232736;            /* Subtle borders */
--text-primary: #e8eaf2;      /* Main text */
--text-secondary: #8891aa;    /* Muted text */
--accent-blue: #4f8ef7;       /* Primary accent — electric blue */
--accent-teal: #22d3c8;       /* Secondary accent — simulation/lab */
--accent-amber: #f59e0b;      /* Warning / attention */
--accent-green: #22c55e;      /* Success / pass */
--accent-red: #ef4444;        /* Error / fail */
--accent-purple: #a78bfa;     /* Flashcard domain color */
```

**Typography:**
- Display/Headings: `Syne` (700, 800) — distinctive, geometric, technical
- Body: `DM Sans` (400, 500) — readable, modern, approachable
- Mono/CLI: `JetBrains Mono` — terminal and code blocks

**Spacing:** 4px base unit. Tailwind default scale.

**Border radius:** `rounded-lg` (8px) for cards, `rounded-xl` (12px) for modals. Sharp, not bubbly.

**Shadows:** Dark ambient shadows, blue-tinted glow on active/hover states.
```css
--shadow-glow: 0 0 20px rgba(79, 142, 247, 0.15);
```

---

## Motion / Animation Principles

1. **Page transitions:** Fade + slight upward slide (Framer Motion `AnimatePresence`)
2. **Lesson content:** Staggered reveal of sections on scroll entry
3. **Quiz transitions:** Card slides out left on submit, next card enters from right
4. **Flashcard flip:** CSS `transform-style: preserve-3d` + `rotateY(180deg)` on flip
5. **Unlock events:** Scale + glow pulse on newly unlocked lesson node
6. **Achievement toast:** Slide in from top-right, auto-dismiss after 4s
7. **Simulation playback:** Eased motion (ease-in-out), never linear — feels physical
8. **No animation should block interaction** — all are interruptible
9. **Reduced motion:** Respect `prefers-reduced-motion` — all animations have a static fallback

---

## Accessibility Considerations

- All interactive elements keyboard navigable
- Quiz keyboard shortcuts: 1–4 for answer options, Enter to confirm
- ARIA labels on simulation canvas elements (passive descriptions for screen readers)
- Flashcard keyboard: Space to flip, K/U/D for Know/Unsure/Don't Know
- Color is never the sole indicator — icons + text always accompany color states
- Focus rings visible (custom styled, not removed)
- `prefers-reduced-motion` respected across all animation systems
- Vault search: `aria-live` region for result count updates

---

## Security / Frontend Risk Notes

_(Security Engineer lens — frontend-only context)_

1. **Admin bypass is trivially breakable** — hardcoded password `admin` is acceptable for MVP but must be flagged as "not real security." It is UX convenience, not access control. Document this clearly.
2. **No sensitive data is stored** — localStorage/IndexedDB holds only quiz scores and progress flags. No PII risk.
3. **MDX content injection** — if lesson content ever comes from user-editable sources, sanitize MDX. For now, content is authored locally so risk is low.
4. **xterm.js** — the CLI runs no real commands. Ensure the command interpreter never `eval()`s user input. Pattern-match only against a whitelist of known commands.
5. **No API keys in frontend** — if YouTube embeds are added, use `youtube-nocookie.com` domain.
6. **Content Security Policy** — configure `next.config.js` headers to restrict script sources, especially with xterm.js and Konva.js.

---

## MVP Scope

**In MVP:**
- Domain 1 fully built (Network Fundamentals): all lessons with theory, simulations, labs, quizzes
- Domain 2 partially built (2–3 lessons) to prove the unlock flow works across domains
- Full quiz system (lesson + domain exam) with adaptive difficulty
- **Exam Mode**: full config screen, active session with timer + flagging + navigator, results screen, exam history on profile — with question pool from Domain 1+2, and 1 exam lab question
- Flashcard system (Domain 1 deck)
- Vault (Domain 1 + 2 entries)
- Dashboard with progress state + last exam score widget
- Course map with lock/unlock UI
- Profile page with admin bypass + exam history
- Full design system implemented
- Both simulation engines (even if only 2–3 simulations each)
- Lab system (Phase 1 + Phase 2) for 2 lessons

**Not in MVP:**
- Domains 3–6 lesson content
- YouTube video embed (placeholder component only)
- Streak tracking
- Achievement system
- Mobile responsiveness
- Backend / content pipeline

---

## Post-MVP Scope

- Full 6-domain content build-out (requires content pipeline from PDFs)
- YouTube video integration
- Backend + auth (Supabase recommended)
- Mobile responsive layout
- Achievement/badge system
- Streak system with notifications
- Analytics (lesson completion rates, common wrong answers)
- Community features (notes, highlights)
- AI-powered hint system for labs
- Content admin panel (lesson authoring UI)

---

## Build Plan

**Phase 0 — Foundation (Week 1)**
- React 18 + Vite project setup with TypeScript + Tailwind
- React Router v6 configured with nested layout routes
- Design system tokens (CSS variables, Tailwind config)
- Font setup (Syne, DM Sans, JetBrains Mono — self-hosted or Google Fonts)
- Zustand stores scaffolded + localStorage/sessionStorage persistence wired
- App shell (sidebar, topbar, AppLayout) + ExamLayout (full-screen shell) built
- Route structure established (all routes stubbed)
- Radix UI primitives installed

**Phase 1 — Course Map + Lesson Shell (Week 2)**
- Course map page with domain blocks + lesson nodes
- Lock/unlock state visualization
- Lesson layout shell (reading progress, callout components, diagram frame)
- Video placeholder component
- Lesson navigation (prev/next)
- MDX pipeline (@mdx-js/react + Vite plugin) for lesson content

**Phase 2 — Quiz System (Week 3)**
- Question data structure + seed data (Domain 1)
- Adaptive difficulty cursor logic
- Quiz shell UI (single-question focus mode)
- All question types (single, multi, drag, fill-blank)
- Pass/fail screens
- Progress store integration

**Phase 3 — Simulation Engines (Week 4–5)**
- Visual Simulation Engine (Konva.js)
  - Build passive mode player
  - Build active mode interaction layer
  - Wire 2 lesson simulations (OSI flow, ARP)
- Config Simulation Engine (React Flow)
  - Topology renderer from JSON config
  - Device state update system
  - Wire 1 lesson topology (basic switching)

**Phase 4 — Lab System (Week 6)**
- xterm.js terminal integration (lazy-loaded)
- CLI command interpreter (whitelist + regex matcher)
- Phase 1 guided lab (step panel + validation)
- Phase 2 independent lab (end-state validation)
- Topology canvas linked to CLI state

**Phase 5 — Exam Mode (Week 7)**
- ExamConfig screen (domain toggles, sliders, labs toggle)
- ExamShell full-screen layout + ExamLayout route
- ExamTimer with threshold color states
- ExamNavigator panel (flag + answer state grid)
- Exam question renderer (reuses quiz question components, no feedback)
- ExamLabQuestion (stripped CLI + topology, multi-path end-state validation)
- ExamResults screen (score, domain radar via Recharts, full review)
- useExamStore with sessionStorage active session + localStorage history
- Exam history + trend line on Profile page

**Phase 6 — Flashcards + Vault (Week 8)**
- Flashcard session engine (scheduling logic)
- 3D flip card UI
- Domain deck selection
- Vault data structure + seed data
- Vault search + filter UI

**Phase 7 — Dashboard + Profile + Polish (Week 9)**
- Dashboard (progress rings, due cards, last exam score widget, CTA)
- Profile page + exam history + admin bypass
- Achievement toasts
- Framer Motion page transitions
- Accessibility audit
- Performance audit (Vite bundle analysis)

---

## Folder / Project Structure

```
netlearnhub-v2/
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx                           # React entry + Router provider
│   ├── App.tsx                            # Route definitions + layout wiring
│   ├── routes/
│   │   ├── dashboard/
│   │   │   └── index.tsx                 # Dashboard
│   │   ├── learn/
│   │   │   ├── index.tsx                 # Course Map
│   │   │   └── [domain]/[lesson]/
│   │   │       ├── theory.tsx
│   │   │       ├── simulation.tsx
│   │   │       ├── lab.tsx
│   │   │       └── quiz.tsx
│   │   ├── domain-exam/
│   │   │   └── [domain].tsx              # Domain gate exam (30Q)
│   │   ├── exam/
│   │   │   ├── index.tsx                 # Exam Config Screen
│   │   │   ├── session.tsx               # Active Exam (full-screen)
│   │   │   └── results/
│   │   │       └── [sessionId].tsx       # Results + Review
│   │   ├── vault/
│   │   │   └── index.tsx
│   │   ├── flashcards/
│   │   │   ├── index.tsx
│   │   │   └── [domain].tsx
│   │   └── profile/
│   │       └── index.tsx
│   ├── layouts/
│   │   ├── AppLayout.tsx                 # Sidebar + topbar shell
│   │   └── ExamLayout.tsx                # Full-screen, nav-less exam shell
│   ├── components/
│   │   ├── lesson/
│   │   │   ├── CalloutBlock.tsx
│   │   │   ├── DiagramFrame.tsx
│   │   │   ├── VideoPlaceholder.tsx
│   │   │   └── LessonNav.tsx
│   │   ├── simulation/
│   │   │   ├── SimulationShell.tsx
│   │   │   ├── VisualSimEngine.tsx
│   │   │   ├── ConfigSimEngine.tsx
│   │   │   └── SimLegend.tsx
│   │   ├── lab/
│   │   │   ├── LabShell.tsx
│   │   │   ├── CLITerminal.tsx
│   │   │   ├── LabInstructions.tsx
│   │   │   └── TopologyCanvas.tsx
│   │   ├── quiz/
│   │   │   ├── QuizShell.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── QuizResults.tsx
│   │   │   └── DifficultyIndicator.tsx
│   │   ├── exam/
│   │   │   ├── ExamConfigScreen.tsx
│   │   │   ├── ExamShell.tsx
│   │   │   ├── ExamTimer.tsx
│   │   │   ├── ExamNavigator.tsx
│   │   │   ├── ExamQuestionCard.tsx
│   │   │   ├── ExamLabQuestion.tsx
│   │   │   ├── ExamResultsScreen.tsx
│   │   │   ├── ExamReviewItem.tsx
│   │   │   └── ExamHistory.tsx
│   │   ├── flashcard/
│   │   │   ├── FlashcardDeck.tsx
│   │   │   ├── FlashcardCard.tsx
│   │   │   └── RatingButtons.tsx
│   │   ├── vault/
│   │   │   ├── VaultSearch.tsx
│   │   │   └── VaultCard.tsx
│   │   ├── progress/
│   │   │   ├── CourseMap.tsx
│   │   │   ├── LessonNode.tsx
│   │   │   ├── DomainBlock.tsx
│   │   │   └── AchievementToast.tsx
│   │   └── ui/                           # Shared primitives (Button, Modal, Badge, etc.)
│   ├── lib/
│   │   ├── stores/
│   │   │   ├── progressStore.ts
│   │   │   ├── flashcardStore.ts
│   │   │   ├── labStore.ts
│   │   │   └── examStore.ts
│   │   ├── quiz/
│   │   │   └── adaptiveDifficulty.ts
│   │   ├── exam/
│   │   │   ├── examBuilder.ts            # Builds shuffled question pool from config
│   │   │   ├── examScorer.ts             # Scores session, computes scaled score
│   │   │   └── labValidator.ts           # Multi-path end-state validation
│   │   ├── flashcard/
│   │   │   └── scheduler.ts
│   │   └── lab/
│   │       └── commandInterpreter.ts
│   ├── content/
│   │   ├── lessons/
│   │   │   └── domain-1/
│   │   │       └── lesson-1.mdx
│   │   ├── flashcards/
│   │   │   └── domain-1.json
│   │   ├── vault/
│   │   │   └── vault-entries.json
│   │   ├── questions/
│   │   │   ├── domain-1.json            # Lesson quiz + exam question pool
│   │   │   └── exam-labs.json           # Standalone exam lab question pool
│   │   └── simulations/
│   │       └── domain-1/
│   │           └── lesson-1-sim.json
│   ├── styles/
│   │   └── globals.css
│   └── types/
│       ├── lesson.ts
│       ├── quiz.ts
│       ├── exam.ts
│       ├── lab.ts
│       └── flashcard.ts
└── public/
    └── assets/
```

---

## Key Screens to Design First

1. **Dashboard** — progress rings, due flashcards widget, current lesson CTA, last exam score widget, domain overview
2. **Course Map** — the most important UI. Domain blocks, lesson nodes, lock states, visual hierarchy
3. **Theory Lesson** — reading experience, callout blocks, video placeholder, scroll progress
4. **Visual Simulation** — canvas simulation with passive/active toggle, step controls, legend
5. **Lab (Phase 1)** — split-panel: instructions + topology left, CLI terminal right
6. **Quiz (Active)** — focus mode single question, difficulty indicator, progress bar
7. **Exam Config Screen** — domain toggles, sliders, labs toggle, session preview card
8. **Exam Session (Active)** — full-screen, timer, flagging, question navigator, lab question variant
9. **Exam Results** — score/scaled/pass-fail, domain radar, flagged review, full question breakdown
10. **Flashcard Session** — 3D flip card, rating buttons, session progress
11. **Vault** — search + filter + card grid reference experience
12. **Profile** — stats, exam history trend, domain weakness, admin bypass button

---

## Risks / Open Questions

| Risk | Severity | Mitigation |
|---|---|---|
| PDF content extraction is manual for MVP | High | Define a structured lesson template early; manually author Domain 1 content in MDX |
| Konva.js learning curve for simulation engine | Medium | Build a simple proof-of-concept simulation first (ARP flow) before scaling |
| xterm.js bundle size | Medium | Lazy-load via React.lazy() + Suspense, only on lab/exam-lab routes |
| CLI interpreter coverage gaps | Medium | Scope supported commands per lesson explicitly; generic fallback for unrecognized input |
| Exam lab multi-path validation complexity | High | Pre-define all accepted end-states per lab question explicitly in JSON; avoid inferring equivalence |
| Exam session lost on browser crash | Medium | Persist active session to sessionStorage every answer; hydrate on re-entry with resume prompt |
| Admin bypass password visible in source | Low (MVP) | Acceptable for MVP; document clearly for post-MVP auth implementation |
| React Flow + Konva on same page | Low | Only one engine renders per lesson; no conflict expected |
| IndexedDB async in Zustand flashcard store | Medium | Use idb-keyval with async hydration; show loading state on flashcard entry |
| Lesson content quality without backend pipeline | High | Treat Domain 1 as a fully hand-crafted reference lesson; use it to define content schema for future pipeline |
| Mobile layout for lab and exam session | High (post-MVP) | Tab-switch layout on mobile; exclude from MVP scope |
| Vite MDX plugin configuration | Low | @mdx-js/rollup is well-documented; allocate 1 day for pipeline setup and custom component mapping |