import type { QuizQuestion, QuizQuestionType } from './quiz';
import type { DeviceState } from './lab';

export type ExamDifficultyMix = 'all' | 'hard' | 'exam-realistic';

export type ExamConfig = {
  domains: string[];
  questionCount: number;
  timeLimitMinutes: number;
  includeLabs: boolean;
  difficultyMix: ExamDifficultyMix;
};

export type ExamQuestion = Omit<QuizQuestion, 'type'> & {
  type: QuizQuestionType | 'lab';
};

export type ExamSession = {
  sessionId: string;
  config: ExamConfig;
  questions: ExamQuestion[];
  answers: Record<string, string[]>;
  flags: string[];
  labStates: Record<string, DeviceState>;
  startedAt: number;
  submittedAt: number | null;
  timeRemainingMs: number;
};

export type ExamResult = {
  sessionId: string;
  date: string;
  config: ExamConfig;
  score: {
    raw: number;
    total: number;
    percent: number;
    scaled: number;
  };
  passed: boolean;
  timeUsedMs: number;
  domainBreakdown: Record<string, number>;
  answers: Record<string, string[]>;
  flags: string[];
};
