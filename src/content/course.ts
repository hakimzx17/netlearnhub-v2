import type { DomainDefinition, LessonDefinition } from '../types/course';

export const courseManifest = [
  {
    id: 'domain-1',
    title: 'Network Fundamentals',
    weight: 20,
    lessons: [
      {
        id: 'lesson-1',
        title: 'OSI Model Foundations',
        summary: 'Start the course with the seven-layer model, encapsulation, and packet travel.',
        estimatedReadTimeMinutes: 12,
      },
      {
        id: 'lesson-2',
        title: 'Ethernet Frames and MAC Learning',
        summary: 'Build on lesson one with frame structure, switching logic, and collision domains.',
        estimatedReadTimeMinutes: 14,
      },
    ],
  },
  {
    id: 'domain-2',
    title: 'Network Access',
    weight: 20,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Switching Basics',
        summary: 'Introduce switching behavior, forwarding decisions, and small-office topology design.',
        estimatedReadTimeMinutes: 10,
      },
      {
        id: 'lesson-2',
        title: 'VLAN Segmentation',
        summary: 'Extend switching into segmentation and the practical reasons VLAN boundaries matter.',
        estimatedReadTimeMinutes: 16,
      },
    ],
  },
] satisfies DomainDefinition[];

export function getDomain(domainId?: string) {
  return courseManifest.find((domain) => domain.id === domainId);
}

export function getLesson(domainId?: string, lessonId?: string) {
  const domain = getDomain(domainId);

  if (!domain) {
    return undefined;
  }

  return domain.lessons.find((lesson) => lesson.id === lessonId);
}

export function getNextLesson(domainId?: string, lessonId?: string): LessonDefinition | undefined {
  const domain = getDomain(domainId);

  if (!domain) {
    return undefined;
  }

  const currentIndex = domain.lessons.findIndex((lesson) => lesson.id === lessonId);

  return currentIndex >= 0 ? domain.lessons[currentIndex + 1] : undefined;
}
