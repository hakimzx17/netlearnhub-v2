import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { RouteCard } from '../../../../components/ui/RouteCard';
import { getDomain, getLesson } from '../../../../content/course';
import LessonOneContent from '../../../../content/lessons/domain-1/lesson-1.mdx';
import { useProgressStore } from '../../../../lib/stores/progressStore';

export default function LessonTheoryRoute() {
  const { domainId, lessonId } = useParams();
  const domain = getDomain(domainId);
  const lesson = getLesson(domainId, lessonId);
  const markTheoryRead = useProgressStore((state) => state.markTheoryRead);

  useEffect(() => {
    if (domainId && lessonId) {
      markTheoryRead(domainId, lessonId);
    }
  }, [domainId, lessonId, markTheoryRead]);

  if (!domain || !lesson) {
    return (
      <section className="page-shell">
        <RouteCard
          eyebrow="Theory"
          title="Lesson not found"
          description="Use the course map to open a scaffolded lesson route."
        />
      </section>
    );
  }

  return (
    <section className="page-shell page-stack theory-page">
      <RouteCard
        eyebrow={`${domain.title} / Theory`}
        title={lesson.title}
        description={`${lesson.estimatedReadTimeMinutes} minute starter lesson. The MDX pipeline is configured so hand-authored lesson content can be added immediately.`}
      >
        <div className="route-actions">
          <Link className="btn-secondary" to={`/learn/${domain.id}/${lesson.id}/simulation`}>
            Continue to simulation
          </Link>
        </div>
      </RouteCard>

      <article className="glass-widget prose-card">
        {domain.id === 'domain-1' && lesson.id === 'lesson-1' ? (
          <LessonOneContent />
        ) : (
          <p>
            This lesson route is wired and ready for additional MDX files under `src/content/lessons/`.
          </p>
        )}
      </article>
    </section>
  );
}
