import simulationConfig from '../../../../content/simulations/domain-1/lesson-1-sim.json';
import { Link, useParams } from 'react-router-dom';

import { RouteCard } from '../../../../components/ui/RouteCard';
import { getDomain, getLesson } from '../../../../content/course';
import { useProgressStore } from '../../../../lib/stores/progressStore';

export default function LessonSimulationRoute() {
  const { domainId, lessonId } = useParams();
  const domain = getDomain(domainId);
  const lesson = getLesson(domainId, lessonId);
  const markSimulationComplete = useProgressStore((state) => state.markSimulationComplete);

  if (!domain || !lesson) {
    return (
      <section className="page-shell">
        <RouteCard eyebrow="Simulation" title="Simulation not found" description="Open a lesson from the course map first." />
      </section>
    );
  }

  return (
    <section className="page-shell page-stack">
      <RouteCard
        eyebrow={`${domain.title} / Simulation`}
        title={`${lesson.title} simulation shell`}
        description="Konva/visual engine dependencies are installed. This page is the starter shell for passive and active simulation modes."
      >
        <div className="route-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => markSimulationComplete(domain.id, lesson.id)}
          >
            Mark passive walkthrough complete
          </button>
          <Link className="btn-primary" to={`/learn/${domain.id}/${lesson.id}/lab`}>
            Continue to lab
          </Link>
        </div>
      </RouteCard>

      <article className="glass-widget code-card">
        <p className="eyebrow">Sample simulation config</p>
        <pre>{JSON.stringify(simulationConfig, null, 2)}</pre>
      </article>
    </section>
  );
}
