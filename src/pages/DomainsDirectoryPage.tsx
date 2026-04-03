import { ArrowRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

import { domains, getDomainLessonPreviews } from '../content/domains';
import type { DomainId } from '../content/domains';
import { useProgressStore } from '../store/progressStore';

function getStatusLabel(status: string): string {
  if (status === 'complete') return 'Complete';
  if (status === 'in-progress') return 'In Progress';
  return 'Not started';
}

function getProgressBarClass(status: string): string {
  if (status === 'complete') return 'domain-card__bar-fill domain-card__bar-fill--complete';
  if (status === 'in-progress') return 'domain-card__bar-fill domain-card__bar-fill--progress';
  return 'domain-card__bar-fill';
}

function getCardClass(status: string): string {
  const base = 'domain-card';
  if (status === 'complete') return `${base} domain-card--complete`;
  if (status === 'in-progress') return `${base} domain-card--active`;
  return base;
}

export function DomainsDirectoryPage() {
  const domainProgress = useProgressStore((state) => state.domains);
  const lessonProgress = useProgressStore((state) => state.lessons);

  function getFirstAvailableLessonId(domainId: DomainId): string {
    const lessons = getDomainLessonPreviews(domainId);
    const inProgress = lessons.find((l) => lessonProgress[l.id]?.status === 'in-progress');
    if (inProgress) return inProgress.id;
    const available = lessons.find((l) => lessonProgress[l.id]?.status === 'available');
    if (available) return available.id;
    return lessons[0]?.id ?? '';
  }

  return (
    <section className="domains-directory">
      <header className="domains-directory__header">
        <p className="domains-directory__eyebrow">CCNA 200-301 Curriculum</p>
        <h1>Domains Directory</h1>
        <p className="domains-directory__description">
          Choose a domain to begin. Each domain contains deep-dive lessons, simulations, hands-on labs, and quizzes
          designed to take you from zero to exam-ready.
        </p>
      </header>

      <div className="domains-grid" role="list" aria-label="CCNA domains">
        {domains.map((domain) => {
          const progress = domainProgress[domain.id] ?? {
            status: 'not-started',
            completionPercent: 0,
            completedLessons: 0,
            totalLessons: domain.lessonsTarget,
          };
          const firstLessonId = getFirstAvailableLessonId(domain.id);
          const barWidth = Math.max(progress.completionPercent, progress.status === 'complete' ? 100 : 4);

          return (
            <article
              className={getCardClass(progress.status)}
              key={domain.id}
              role="listitem"
            >
              <div className="domain-card__header">
                <div className="domain-card__identity">
                  <span className="domain-card__badge">{domain.shortLabel}</span>
                  <div>
                    <p className="domain-card__label">Domain {domain.index}</p>
                    <h2 className="domain-card__title">{domain.title}</h2>
                  </div>
                </div>
                <span className="domain-card__weight">{domain.examWeightPercent}%</span>
              </div>

              <p className="domain-card__description">{domain.description}</p>

              <div className="domain-card__meta">
                <div className="domain-card__meta-row">
                  <span className="domain-card__meta-label">Progress</span>
                  <span className="domain-card__meta-value">{progress.completionPercent}%</span>
                </div>
                <div className="domain-card__bar" role="progressbar" aria-valuenow={progress.completionPercent} aria-valuemin={0} aria-valuemax={100}>
                  <span className={getProgressBarClass(progress.status)} style={{ width: `${barWidth}%` }} />
                </div>
                <div className="domain-card__meta-row">
                  <span className="domain-card__status">
                    {progress.status === 'complete' ? (
                      <span className="domain-card__status-icon domain-card__status-icon--complete">✓</span>
                    ) : progress.status === 'in-progress' ? (
                      <span className="domain-card__status-icon domain-card__status-icon--progress">▶</span>
                    ) : (
                      <Lock size={12} />
                    )}
                    {getStatusLabel(progress.status)}
                  </span>
                  <span className="domain-card__lessons">{progress.completedLessons}/{progress.totalLessons} lessons</span>
                </div>
              </div>

              <div className="domain-card__focus">
                {domain.focus.map((item) => (
                  <span className="domain-card__focus-tag" key={item}>{item}</span>
                ))}
              </div>

              <Link
                className="domain-card__action"
                to={`/lesson/${firstLessonId}`}
              >
                {progress.status === 'complete' ? 'Review' : progress.status === 'in-progress' ? 'Resume' : 'Start Domain'}
                <ArrowRight size={16} />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
