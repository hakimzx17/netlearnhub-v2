import { ArrowRight, Check, ChevronDown, Lock, Play } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { domains, getDomainLessonPreviews } from '../content/domains';
import type { DomainId } from '../content/domains';
import { useProgressStore } from '../store/progressStore';
import type { DomainStatus } from '../store/progressStore';

function getDomainStatusLabel(status: DomainStatus): string {
  if (status === 'complete') {
    return 'Completed';
  }

  if (status === 'in-progress') {
    return 'In Progress';
  }

  return 'Ready to Start';
}

function getDomainActionLabel(status: DomainStatus): string {
  if (status === 'complete') {
    return 'Review Module';
  }

  if (status === 'in-progress') {
    return 'Resume Module';
  }

  return 'Start Module';
}

function getDomainItemClass(status: DomainStatus, isActive: boolean): string {
  return [
    'course-map-item',
    isActive ? 'course-map-item--active' : '',
    status === 'complete' ? 'course-map-item--complete' : '',
    status === 'in-progress' ? 'course-map-item--progress' : '',
    status === 'not-started' ? 'course-map-item--pending' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

function getStatusPillClass(status: DomainStatus): string {
  return [
    'course-map-card__status-pill',
    status === 'complete' ? 'course-map-card__status-pill--complete' : '',
    status === 'in-progress' ? 'course-map-card__status-pill--progress' : '',
    status === 'not-started' ? 'course-map-card__status-pill--pending' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

function getStatusIcon(status: DomainStatus) {
  if (status === 'complete') {
    return <Check size={14} />;
  }

  if (status === 'in-progress') {
    return <Play size={14} />;
  }

  return <Lock size={14} />;
}

function getResumeLessonId(domainId: DomainId, lessonStatuses: ReturnType<typeof useProgressStore.getState>['lessons']): string {
  const lessons = getDomainLessonPreviews(domainId);
  const resumeLesson =
    lessons.find((lesson) => lessonStatuses[lesson.id]?.status === 'in-progress') ??
    lessons.find((lesson) => lessonStatuses[lesson.id]?.status === 'available') ??
    lessons[0];

  return resumeLesson.id;
}

export function DomainPage() {
  const [activeDomainId, setActiveDomainId] = useState<string | null>(null);

  const domainProgress = useProgressStore((state) => state.domains);
  const lessonProgress = useProgressStore((state) => state.lessons);

  const handleToggle = (domainId: string, el: HTMLButtonElement) => {
    const willOpen = domainId !== activeDomainId;
    setActiveDomainId(willOpen ? domainId : null);
    if (willOpen) {
      requestAnimationFrame(() => {
        const item = el.closest('.course-map-item');
        if (item && typeof item.scrollIntoView === 'function') {
          item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }
  };

  return (
    <section className="page course-map-page">
      <header className="course-map-page__header">
        <div>
          <p className="page-header__eyebrow">Curriculum Path</p>
          <h1>CCNA 200-301 Course Map</h1>
          <p className="page-header__description">
            Follow the full linear path across all 6 domains, then expand a module to dive into its detailed study flow.
          </p>
        </div>
      </header>

      <div className="course-map-list">
        {domains.map((domain) => {
          const progress =
            domainProgress[domain.id] ??
            {
              status: 'not-started',
              completionPercent: 0,
              completedLessons: 0,
              totalLessons: domain.lessonsTarget,
            };
          const lessons = getDomainLessonPreviews(domain.id);
          const resumeLessonId = getResumeLessonId(domain.id, lessonProgress);
          const resumeLesson = lessons.find((lesson) => lesson.id === resumeLessonId) ?? lessons[0];
          const isActive = domain.id === activeDomainId;
          const progressWidth = Math.max(progress.completionPercent, progress.status === 'complete' ? 100 : 6);
          const detailsClassName = [
            'course-map-card__details',
            isActive ? 'course-map-card__details--open' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div className={getDomainItemClass(progress.status, isActive)} key={domain.id}>
              <div aria-hidden="true" className="course-map-item__rail">
                <span className="course-map-item__node" />
                  <svg className="course-map-item__connector" viewBox="0 0 140 100">
                    <path className="course-map-item__connector-glow" d="M0 0 V 72 Q 0 86 14 86 H 118" />
                    <path className="course-map-item__connector-line" d="M0 0 V 72 Q 0 86 14 86 H 118" />
                    <path className="course-map-item__connector-arrow" d="M104 76 L118 86 L104 96" />
                  </svg>
              </div>

              <article className="course-map-card">
                <div className="course-map-card__shell">
                  <button
                    aria-controls={`course-map-details-${domain.id}`}
                    aria-expanded={isActive}
                    aria-label={`${isActive ? 'Collapse' : 'Expand'} ${domain.title}`}
                    className="course-map-card__summary"
                    onClick={(e) => handleToggle(domain.id, e.currentTarget)}
                    type="button"
                  >
                    <div className="course-map-card__header">
                      <div>
                        <p className="course-map-card__eyebrow">Domain {domain.index}</p>
                        <h2>{domain.title}</h2>
                      </div>
                      <div className="course-map-card__weight-block">
                        <p className="course-map-card__percent">{domain.examWeightPercent}%</p>
                        <span className="course-map-card__weight-label">Exam Weight</span>
                      </div>
                    </div>

                    <div className="course-map-card__summary-row">
                      <span className="course-map-card__summary-pill">{progress.completionPercent}% complete</span>
                      <span className="course-map-card__summary-pill course-map-card__summary-pill--muted">
                        {progress.totalLessons} lessons
                      </span>
                      <span className="course-map-card__summary-toggle">
                        {isActive ? 'Hide Details' : 'View Details'}
                        <ChevronDown size={16} />
                      </span>
                    </div>
                  </button>

                  <div aria-hidden={!isActive} className={detailsClassName} id={`course-map-details-${domain.id}`}>
                    <div className="course-map-card__details-inner">
                      <div className="course-map-card__status-row">
                        <span>Status</span>
                        <span className={getStatusPillClass(progress.status)}>
                          {getStatusIcon(progress.status)}
                          {getDomainStatusLabel(progress.status)}
                        </span>
                      </div>

                      <div aria-hidden="true" className="course-map-card__meter">
                        <span style={{ width: `${progressWidth}%` }} />
                      </div>

                      <p className="course-map-card__description">{domain.description}</p>

                      <div className="course-map-card__detail-grid">
                        <div className="course-map-card__detail-block">
                          <span>CCNA Blueprint</span>
                          <strong>{domain.examWeightPercent}% of the exam</strong>
                        </div>
                        <div className="course-map-card__detail-block">
                          <span>Lessons Completed</span>
                          <strong>
                            {progress.completedLessons}/{progress.totalLessons}
                          </strong>
                        </div>
                        <div className="course-map-card__detail-block">
                          <span>Next Lesson</span>
                          <strong>
                            {resumeLesson.moduleLabel} {resumeLesson.title}
                          </strong>
                        </div>
                      </div>

                      <ul className="course-map-card__topic-list">
                        {domain.focus.map((focusItem) => (
                          <li key={focusItem}>{focusItem}</li>
                        ))}
                      </ul>

                      <div className="course-map-card__actions">
                        <Link
                          className="course-map-card__action"
                          tabIndex={isActive ? 0 : -1}
                          to={`/lesson/${resumeLesson.id}`}
                        >
                          {getDomainActionLabel(progress.status)} <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
