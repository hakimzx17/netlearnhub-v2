import { LockKeyhole, UnlockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';

import { LockedState } from '../../components/ui/LockedState';
import { ProgressTrack } from '../../components/ui/ProgressTrack';
import { RouteCard } from '../../components/ui/RouteCard';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { StatusPill } from '../../components/ui/StatusPill';
import { WidgetCard } from '../../components/ui/WidgetCard';
import { courseManifest } from '../../content/course';
import { useProgressStore } from '../../lib/stores/progressStore';

export default function LearnIndexRoute() {
  const adminUnlocked = useProgressStore((state) => state.adminUnlocked);
  const domains = useProgressStore((state) => state.domains);

  return (
    <section className="page-shell page-stack">
      <RouteCard
        eyebrow="Course Map"
        title="Strict lesson progression"
        description="Theory, simulation, lab, and quiz routes are scaffolded for each lesson. Domain gates follow the PRD unlock sequence."
      />

      <div className="domain-grid">
        {courseManifest.map((domain) => {
          const domainProgress = domains[domain.id];
          const domainUnlocked = adminUnlocked || domainProgress?.unlocked;
          const passedLessons = domain.lessons.filter((lesson) => domainProgress?.lessons[lesson.id]?.passed).length;

          return (
            <WidgetCard key={domain.id} className="domain-card">
              <div className="domain-card__header">
                <SectionHeading eyebrow={domain.id.toUpperCase()} title={domain.title} headingLevel="h2" compact />
                <StatusPill tone={domainUnlocked ? 'success' : 'warning'}>
                  {domainUnlocked ? <UnlockKeyhole size={16} /> : <LockKeyhole size={16} />}
                  {domain.weight}%
                </StatusPill>
              </div>

              <ProgressTrack
                value={passedLessons}
                max={domain.lessons.length}
                label={`${passedLessons} of ${domain.lessons.length} lessons passed`}
                tone={domainUnlocked ? 'accent' : 'warning'}
                className="domain-card__progress"
              />

              <div className="lesson-list">
                {domain.lessons.map((lesson) => {
                  const lessonProgress = domainProgress?.lessons[lesson.id];
                  const lessonUnlocked = adminUnlocked || lessonProgress?.unlocked;
                  const lessonStarted = Boolean(
                    lessonProgress &&
                      (lessonProgress.theoryRead ||
                        lessonProgress.simComplete ||
                        lessonProgress.labP1 ||
                        lessonProgress.labP2 ||
                        lessonProgress.quizScore !== null),
                  );
                  const lessonPassed = Boolean(lessonProgress?.passed);
                  const lessonTone = lessonPassed ? 'success' : lessonUnlocked ? (lessonStarted ? 'accent' : 'neutral') : 'warning';
                  const lessonLabel = lessonPassed
                    ? 'Completed'
                    : lessonUnlocked
                      ? lessonStarted
                        ? 'In progress'
                        : 'Available'
                      : 'Locked';

                  return (
                    <div
                      key={lesson.id}
                      className={['lesson-tile', lessonUnlocked ? '' : 'lesson-tile--locked'].filter(Boolean).join(' ')}
                    >
                      <div className="lesson-tile__copy">
                        <h3 className="lesson-tile__title">{lesson.title}</h3>
                        <p className="lesson-tile__summary">{lesson.summary}</p>
                      </div>

                      <div className="lesson-tile__meta">
                        {lessonUnlocked ? (
                          <StatusPill tone={lessonTone}>{lessonLabel}</StatusPill>
                        ) : (
                          <LockedState compact description="Pass the previous lesson quiz to continue." />
                        )}

                        {lessonUnlocked ? (
                          <Link className="btn-secondary" to={`/learn/${domain.id}/${lesson.id}/theory`}>
                            Open lesson
                          </Link>
                        ) : (
                          <span className="btn-ghost lesson-tile__action" aria-label={`${lesson.title} is locked`}>
                            Locked
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </WidgetCard>
          );
        })}
      </div>
    </section>
  );
}
