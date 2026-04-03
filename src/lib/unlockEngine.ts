import type { DomainId } from '../content/domains';
import { getDomainLessonPreviews } from '../content/domains';
import type { LessonProgress } from '../store/progressStore';

export type UnlockResult = {
  lessonUpdates: Record<string, Partial<LessonProgress>>;
  domainUpdates: Record<string, { status?: string; completionPercent?: number; completedLessons?: number }>;
};

// ---------------------------------------------------------------------------
// Pure unlock computation
// ---------------------------------------------------------------------------

export function computeUnlockState(
  lessons: Record<string, LessonProgress>,
  lessonIndex: number,
  domainId: DomainId,
): boolean {
  // First lesson in any domain is always unlocked
  if (lessonIndex === 0) {
    return true;
  }

  const domainLessons = getDomainLessonPreviews(domainId);

  if (lessonIndex > domainLessons.length) {
    return false;
  }

  // Lesson N unlocks only when Lesson N-1 quiz is passed at 80%+
  const previousLesson = domainLessons[lessonIndex - 1];
  const previousProgress = lessons[previousLesson.id];

  return previousProgress?.status === 'passed' && (previousProgress.quizScore ?? 0) >= 80;
}

// ---------------------------------------------------------------------------
// Compute unlock state after a quiz result
// ---------------------------------------------------------------------------

export function computePostQuizUnlocks(
  lessons: Record<string, LessonProgress>,
  lessonId: string,
  domainId: DomainId,
  passed: boolean,
  score: number,
): UnlockResult {
  const lessonUpdates: Record<string, Partial<LessonProgress>> = {};
  const domainUpdates: Record<string, { status?: string; completionPercent?: number; completedLessons?: number }> = {};

  // Update the current lesson
  lessonUpdates[lessonId] = {
    quizScore: score,
    quizAttempts: (lessons[lessonId]?.quizAttempts ?? 0) + 1,
    status: passed ? 'passed' : 'in-progress',
    progressPercent: passed ? 100 : lessons[lessonId]?.progressPercent ?? 50,
  };

  if (passed) {
    // Unlock the next lesson in the domain
    const domainLessons = getDomainLessonPreviews(domainId);
    const currentIndex = domainLessons.findIndex((l) => l.id === lessonId);

    if (currentIndex >= 0 && currentIndex < domainLessons.length - 1) {
      const nextLesson = domainLessons[currentIndex + 1];
      lessonUpdates[nextLesson.id] = {
        status: 'available',
        progressPercent: 0,
      };
    }

    // Check if all lessons in domain are now passed
    const allLessonsPassed = domainLessons.every((lesson) => {
      if (lesson.id === lessonId) return true;

      const lp = lessons[lesson.id];
      return lp?.status === 'passed';
    });

    if (allLessonsPassed) {
      domainUpdates[domainId] = {
        status: 'complete',
        completionPercent: 100,
        completedLessons: domainLessons.length,
      };
    }
  }

  // Update domain completion based on passed lessons
  const domainLessons = getDomainLessonPreviews(domainId);
  const passedCount = domainLessons.filter((lesson) => {
    if (lesson.id === lessonId) return passed;
    return lessons[lesson.id]?.status === 'passed';
  }).length;

  if (!domainUpdates[domainId]) {
    domainUpdates[domainId] = {};
  }

  domainUpdates[domainId].completedLessons = passedCount;
  domainUpdates[domainId].completionPercent = Math.round((passedCount / domainLessons.length) * 100);

  if (domainUpdates[domainId].status !== 'complete' && passedCount > 0) {
    domainUpdates[domainId].status = 'in-progress';
  }

  return { lessonUpdates, domainUpdates };
}

// ---------------------------------------------------------------------------
// Domain quiz unlock check
// ---------------------------------------------------------------------------

export function canAttemptDomainQuiz(lessons: Record<string, LessonProgress>, domainId: DomainId): boolean {
  const domainLessons = getDomainLessonPreviews(domainId);

  return domainLessons.every((lesson) => lessons[lesson.id]?.status === 'passed');
}
