import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ExamConfig, ExamQuestion, ExamResult, ExamSession } from '../../types/exam';

type ExamStore = {
  session: ExamSession | null;
  history: ExamResult[];
  hydrateHistory: () => void;
  startSession: (config: ExamConfig, questions: ExamQuestion[]) => void;
  answerQuestion: (questionId: string, selectedAnswers: string[]) => void;
  toggleFlag: (questionId: string) => void;
  setTimeRemaining: (timeRemainingMs: number) => void;
  submitExam: (result: ExamResult) => void;
  clearSession: () => void;
};

const historyStorageKey = 'netlearnhub.exam.history.v1';

function readHistory(): ExamResult[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const storedValue = window.localStorage.getItem(historyStorageKey);

  if (!storedValue) {
    return [];
  }

  try {
    return JSON.parse(storedValue) as ExamResult[];
  } catch {
    return [];
  }
}

function writeHistory(history: ExamResult[]) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(historyStorageKey, JSON.stringify(history));
  }
}

export const useExamStore = create<ExamStore>()(
  persist(
    (set) => ({
      session: null,
      history: readHistory(),
      hydrateHistory: () => {
        set({ history: readHistory() });
      },
      startSession: (config, questions) => {
        const sessionId = `exam-${Date.now()}`;

        set({
          session: {
            sessionId,
            config,
            questions,
            answers: {},
            flags: [],
            labStates: {},
            startedAt: Date.now(),
            submittedAt: null,
            timeRemainingMs: config.timeLimitMinutes * 60 * 1000,
          },
        });
      },
      answerQuestion: (questionId, selectedAnswers) => {
        set((state) => ({
          session: state.session
            ? {
                ...state.session,
                answers: { ...state.session.answers, [questionId]: selectedAnswers },
              }
            : null,
        }));
      },
      toggleFlag: (questionId) => {
        set((state) => {
          if (!state.session) {
            return { session: null };
          }

          const hasFlag = state.session.flags.includes(questionId);

          return {
            session: {
              ...state.session,
              flags: hasFlag
                ? state.session.flags.filter((flaggedId) => flaggedId !== questionId)
                : [...state.session.flags, questionId],
            },
          };
        });
      },
      setTimeRemaining: (timeRemainingMs) => {
        set((state) => ({
          session: state.session ? { ...state.session, timeRemainingMs } : null,
        }));
      },
      submitExam: (result) => {
        set((state) => {
          const nextHistory = [...state.history, result];
          writeHistory(nextHistory);

          return {
            history: nextHistory,
            session: null,
          };
        });
      },
      clearSession: () => {
        set({ session: null });
      },
    }),
    {
      name: 'netlearnhub.exam.session.v1',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ session: state.session }),
    },
  ),
);
