import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { courseManifest } from '../../content/course';
import type { DomainProgress, LessonProgress } from '../../types/course';

type ProgressStore = {
  adminUnlocked: boolean;
  domains: Record<string, DomainProgress>;
  markTheoryRead: (domainId: string, lessonId: string) => void;
  markSimulationComplete: (domainId: string, lessonId: string) => void;
  completeLabPhase: (domainId: string, lessonId: string, phase: 1 | 2) => void;
  recordQuizScore: (domainId: string, lessonId: string, score: number) => void;
  recordDomainExamResult: (domainId: string, passed: boolean) => void;
  setAdminUnlocked: (unlocked: boolean) => void;
  resetProgress: () => void;
};

const createLessonProgress = (unlocked: boolean): LessonProgress => ({
  unlocked,
  theoryRead: false,
  simComplete: false,
  labP1: false,
  labP2: false,
  quizScore: null,
  passed: false,
});

const buildInitialDomains = () =>
  Object.fromEntries(
    courseManifest.map((domain, domainIndex) => [
      domain.id,
      {
        unlocked: domainIndex === 0,
        examPassed: false,
        lessons: Object.fromEntries(
          domain.lessons.map((lesson, lessonIndex) => [
            lesson.id,
            createLessonProgress(domainIndex === 0 && lessonIndex === 0),
          ]),
        ),
      },
    ]),
  ) as Record<string, DomainProgress>;

const initialDomains = buildInitialDomains();

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      adminUnlocked: false,
      domains: initialDomains,
      markTheoryRead: (domainId, lessonId) => {
        set((state) => {
          const domains = structuredClone(state.domains);
          const lesson = domains[domainId]?.lessons[lessonId];

          if (lesson) {
            lesson.theoryRead = true;
          }

          return { domains };
        });
      },
      markSimulationComplete: (domainId, lessonId) => {
        set((state) => {
          const domains = structuredClone(state.domains);
          const lesson = domains[domainId]?.lessons[lessonId];

          if (lesson) {
            lesson.simComplete = true;
          }

          return { domains };
        });
      },
      completeLabPhase: (domainId, lessonId, phase) => {
        set((state) => {
          const domains = structuredClone(state.domains);
          const lesson = domains[domainId]?.lessons[lessonId];

          if (lesson) {
            if (phase === 1) {
              lesson.labP1 = true;
            } else {
              lesson.labP2 = true;
            }
          }

          return { domains };
        });
      },
      recordQuizScore: (domainId, lessonId, score) => {
        set((state) => {
          const domains = structuredClone(state.domains);
          const lesson = domains[domainId]?.lessons[lessonId];

          if (!lesson) {
            return { domains };
          }

          lesson.quizScore = score;
          lesson.passed = score >= 80;

          if (lesson.passed) {
            const domainDefinition = courseManifest.find((domain) => domain.id === domainId);
            const lessonIndex = domainDefinition?.lessons.findIndex((entry) => entry.id === lessonId) ?? -1;
            const nextLesson = lessonIndex >= 0 ? domainDefinition?.lessons[lessonIndex + 1] : undefined;

            if (nextLesson) {
              const nextLessonProgress = domains[domainId]?.lessons[nextLesson.id];

              if (nextLessonProgress) {
                nextLessonProgress.unlocked = true;
              }
            }
          }

          return { domains };
        });
      },
      recordDomainExamResult: (domainId, passed) => {
        set((state) => {
          const domains = structuredClone(state.domains);
          const domain = domains[domainId];

          if (!domain) {
            return { domains };
          }

          domain.examPassed = passed;

          if (passed) {
            const currentIndex = courseManifest.findIndex((entry) => entry.id === domainId);
            const nextDomain = currentIndex >= 0 ? courseManifest[currentIndex + 1] : undefined;

            if (nextDomain) {
              const nextDomainProgress = domains[nextDomain.id];
              const firstLesson = courseManifest[currentIndex + 1]?.lessons[0];

              if (nextDomainProgress) {
                nextDomainProgress.unlocked = true;
                const nextLessonProgress = firstLesson ? nextDomainProgress.lessons[firstLesson.id] : undefined;

                if (nextLessonProgress) {
                  nextLessonProgress.unlocked = true;
                }
              }
            }
          }

          return { domains };
        });
      },
      setAdminUnlocked: (unlocked) => {
        set({ adminUnlocked: unlocked });
      },
      resetProgress: () => {
        set({ adminUnlocked: false, domains: buildInitialDomains() });
      },
    }),
    {
      name: 'netlearnhub.progress.v1',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
