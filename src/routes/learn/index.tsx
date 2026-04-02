import { LockKeyhole, UnlockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';

import { RouteCard } from '../../components/ui/RouteCard';
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

          return (
            <article key={domain.id} className="glass-widget domain-card">
              <div className="domain-card__header">
                <div>
                  <p className="eyebrow">{domain.id.toUpperCase()}</p>
                  <h2 className="domain-card__title">{domain.title}</h2>
                </div>
                <span className="metric-pill">
                  {domainUnlocked ? <UnlockKeyhole size={16} /> : <LockKeyhole size={16} />}
                  {domain.weight}%
                </span>
              </div>

              <div className="lesson-list">
                {domain.lessons.map((lesson) => {
                  const lessonProgress = domainProgress?.lessons[lesson.id];
                  const lessonUnlocked = adminUnlocked || lessonProgress?.unlocked;

                  return (
                    <div
                      key={lesson.id}
                      className={['lesson-tile', lessonUnlocked ? '' : 'lesson-tile--locked'].filter(Boolean).join(' ')}
                    >
                      <div>
                        <h3 className="lesson-tile__title">{lesson.title}</h3>
                        <p className="lesson-tile__summary">{lesson.summary}</p>
                      </div>

                      <Link
                        className={lessonUnlocked ? 'btn-secondary' : 'btn-ghost'}
                        to={`/learn/${domain.id}/${lesson.id}/theory`}
                        aria-disabled={!lessonUnlocked}
                        onClick={(event) => {
                          if (!lessonUnlocked) {
                            event.preventDefault();
                          }
                        }}
                      >
                        {lessonUnlocked ? 'Open lesson' : 'Locked'}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
