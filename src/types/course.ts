export type LessonDefinition = {
  id: string;
  title: string;
  summary: string;
  estimatedReadTimeMinutes: number;
};

export type DomainDefinition = {
  id: string;
  title: string;
  weight: number;
  lessons: LessonDefinition[];
};

export type LessonProgress = {
  unlocked: boolean;
  theoryRead: boolean;
  simComplete: boolean;
  labP1: boolean;
  labP2: boolean;
  quizScore: number | null;
  passed: boolean;
};

export type DomainProgress = {
  unlocked: boolean;
  examPassed: boolean;
  lessons: Record<string, LessonProgress>;
};
