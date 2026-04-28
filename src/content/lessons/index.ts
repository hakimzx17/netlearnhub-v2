import type { LessonDefinition } from '../types';

import { d1NetworkComponents } from './d1-network-components';

const lessons: Record<string, LessonDefinition> = {
  'd1-network-components': d1NetworkComponents,
};

export function getLessonById(lessonId: string): LessonDefinition | null {
  return lessons[lessonId] ?? null;
}

export function getLessonsByDomain(domainId: string): LessonDefinition[] {
  return Object.values(lessons).filter((lesson) => lesson.domainId === domainId);
}

export function getAllLessons(): LessonDefinition[] {
  return Object.values(lessons);
}
