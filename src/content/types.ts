import type { DomainId } from './domains';

// ---------------------------------------------------------------------------
// Lesson content models
// ---------------------------------------------------------------------------

export type CalloutType = 'why-matters' | 'exam-trap' | 'remember' | 'real-world' | 'analogy';

export type CalloutBlock = {
  type: CalloutType;
  title: string;
  body: string;
};

export type CLISpotlight = {
  id: string;
  title: string;
  commands: string[];
  explanation: string;
};

export type CheckpointOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type ConceptCheckpoint = {
  id: string;
  question: string;
  options: CheckpointOption[];
  hint?: string;
};

export type LessonSection = {
  id: string;
  heading: string;
  body: string;
  estimatedReadingMinutes: number;
};

export type VisualBlock = {
  id: string;
  type: 'diagram' | 'topology' | 'flow';
  title: string;
  description: string;
  svgContent: string;
};

export type LessonDefinition = {
  id: string;
  domainId: DomainId;
  moduleLabel: string;
  title: string;
  estimatedMinutes: number;
  hook: string;
  sections: LessonSection[];
  callouts: CalloutBlock[];
  cliSpotlights: CLISpotlight[];
  checkpoints: ConceptCheckpoint[];
  visualBlocks: VisualBlock[];
  summaryPoints: string[];
};

// ---------------------------------------------------------------------------
// Module sidebar item
// ---------------------------------------------------------------------------

export type ModuleSidebarItem = {
  id: string;
  moduleLabel: string;
  title: string;
  status: 'completed' | 'active' | 'locked';
};

// ---------------------------------------------------------------------------
// Domain directory card
// ---------------------------------------------------------------------------

export type DomainDirectoryCard = {
  id: DomainId;
  index: number;
  shortLabel: string;
  title: string;
  examWeightPercent: number;
  lessonsTarget: number;
  description: string;
  progressPercent: number;
  completedLessons: number;
  status: 'not-started' | 'in-progress' | 'complete';
  firstLessonId: string;
  isLocked: boolean;
};

// ---------------------------------------------------------------------------
// Simulation metadata
// ---------------------------------------------------------------------------

export type SimulationMetadata = {
  lessonId: string;
  type: string;
  title: string;
  description: string;
  caption: string;
};

// ---------------------------------------------------------------------------
// Lab metadata
// ---------------------------------------------------------------------------

export type LabObjective = {
  id: string;
  description: string;
};

export type LabMetadata = {
  lessonId: string;
  title: string;
  scenario: string;
  objectives: LabObjective[];
  hints: string[];
};

// ---------------------------------------------------------------------------
// Flashcard metadata
// ---------------------------------------------------------------------------

export type FlashcardMetadata = {
  lessonId: string;
  deckId: string;
  cardCount: number;
  title: string;
};

// ---------------------------------------------------------------------------
// Quiz metadata
// ---------------------------------------------------------------------------

export type QuizMetadata = {
  lessonId: string;
  questionCount: number;
  passThreshold: number;
  title: string;
};
