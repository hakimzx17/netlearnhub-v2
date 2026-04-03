import { useParams } from 'react-router-dom';

import { RoutePlaceholderPage } from './RoutePlaceholderPage';

export function SimulationPage() {
  const { id = 'lesson' } = useParams();

  return (
    <RoutePlaceholderPage
      actionLabel="Back to lesson"
      actionTo={`/lesson/${id}`}
      checklist={[
        'Desktop-first route is available in the router.',
        'Simulation shell and controls land in Milestone 3.',
        'This path is already linked from the dashboard and lesson flow.',
      ]}
      description="Simulation routes exist early so the product loop is visible before the bespoke animations are built."
      eyebrow="Simulation route"
      title="Simulation shell placeholder"
    />
  );
}

export function LabPage() {
  const { id = 'lesson' } = useParams();

  return (
    <RoutePlaceholderPage
      actionLabel="Back to lesson"
      actionTo={`/lesson/${id}`}
      checklist={[
        'Lab route is active and linked into the lesson flow.',
        'Desktop-first shell will arrive in Milestone 4.',
        'Progress persistence is already ready for lab completion state.',
      ]}
      description="This is the future CLI and topology canvas route. Milestone 0 only establishes the navigation and page shell."
      eyebrow="Lab route"
      title="Hands-on lab placeholder"
    />
  );
}

export function LessonQuizPage() {
  const { id = 'lesson' } = useParams();

  return (
    <RoutePlaceholderPage
      actionLabel="Review lesson"
      actionTo={`/lesson/${id}`}
      checklist={[
        'Quiz route exists for every lesson URL today.',
        'Unlock logic and scored attempts land in Milestone 2.',
        'Results history already has a home in the persisted progress store.',
      ]}
      description="Milestone 0 wires the route and persistent study shell so the lesson loop is already navigable."
      eyebrow="Lesson quiz route"
      title="Lesson quiz placeholder"
    />
  );
}

export function DomainQuizPage() {
  const { id = 'domain-1' } = useParams();

  return (
    <RoutePlaceholderPage
      actionLabel="Return to domain"
      actionTo={`/domain/${id}`}
      checklist={[
        'Domain quiz route is configured and reachable.',
        'Question pools and scoring logic land in Milestone 2.',
        'The dashboard already reflects domain completion shape from persisted state.',
      ]}
      description="The capstone quiz entry point for each domain is already part of the router and shell."
      eyebrow="Domain quiz route"
      title="Domain quiz placeholder"
    />
  );
}

export function VaultPage() {
  return (
    <RoutePlaceholderPage
      actionLabel="Open CLI reference"
      actionTo="/vault/cli-reference"
      checklist={[
        'Vault landing page route is active.',
        'Category routes are already nested and navigable.',
        'Search, bookmarks, and authored reference content land in Milestone 5.',
      ]}
      description="The permanent reference layer is mapped into the app now so navigation and layout are stable before content authoring begins."
      eyebrow="Vault route"
      title="Vault home placeholder"
    />
  );
}

export function VaultCategoryPage() {
  const { category = 'category' } = useParams();

  return (
    <RoutePlaceholderPage
      actionLabel="Back to Vault"
      actionTo="/vault"
      checklist={[
        `Category slug detected: ${category}`,
        'Fuzzy search and bookmark persistence land in Milestone 5.',
        'The route already supports deep-linking from lessons and quick actions.',
      ]}
      description="Each vault category has a stable URL now, which makes future content linking straightforward."
      eyebrow="Vault category route"
      title="Vault category placeholder"
    />
  );
}

export function FlashcardsPage() {
  return (
    <RoutePlaceholderPage
      actionLabel="Open a deck placeholder"
      actionTo="/flashcards/domain-2"
      checklist={[
        'Flashcard deck picker route is active.',
        'Session flow and SM-2 scheduling land in Milestone 5.',
        'Dashboard quick actions already point into the system.',
      ]}
      description="The review systems stay always accessible in the PRD, so their routes are available from Milestone 0 onward."
      eyebrow="Flashcards route"
      title="Flashcard deck picker placeholder"
    />
  );
}

export function FlashcardSessionPage() {
  const { domainId = 'domain-1' } = useParams();

  return (
    <RoutePlaceholderPage
      actionLabel="Back to decks"
      actionTo="/flashcards"
      checklist={[
        `Deck scope detected: ${domainId}`,
        'The active study session shell lands in Milestone 5.',
        'Persistent progress storage is already available for card state.',
      ]}
      description="Each deck already has a route target so the future review engine can plug in without rewiring navigation."
      eyebrow="Flashcard session route"
      title="Flashcard session placeholder"
    />
  );
}

export function ExamPage() {
  return (
    <RoutePlaceholderPage
      actionLabel="Open exam session placeholder"
      actionTo="/exam/session"
      checklist={[
        'Exam home route is active.',
        'Scoped domain selection and timer logic land in Milestone 6.',
        'The shell already distinguishes long-lived progress from future exam state.',
      ]}
      description="Exam mode is part of the global navigation now, even though the assessment engine is still ahead."
      eyebrow="Exam route"
      title="Exam mode home placeholder"
    />
  );
}

export function ExamSessionPage() {
  return (
    <RoutePlaceholderPage
      actionLabel="View exam results placeholder"
      actionTo="/exam/results"
      checklist={[
        'Exam session route is active.',
        'Timed behavior and mixed-domain question assembly land in Milestone 6.',
        'The router already supports a full start-to-results flow.',
      ]}
      description="The dedicated active-session route is in place so later work can focus on exam behavior instead of shell plumbing."
      eyebrow="Exam session route"
      title="Exam session placeholder"
    />
  );
}

export function ExamResultsPage() {
  return (
    <RoutePlaceholderPage
      actionLabel="Back to exam mode"
      actionTo="/exam"
      checklist={[
        'Results route is live and reachable from the exam session placeholder.',
        'Per-domain breakdowns and weak-area guidance land in Milestone 6.',
        'The route structure now matches the PRD information architecture.',
      ]}
      description="Results already have a stable URL in the product shell, ready for the future scoring and review UI."
      eyebrow="Exam results route"
      title="Exam results placeholder"
    />
  );
}
