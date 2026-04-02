import { Link, useParams } from 'react-router-dom';

import { RouteCard } from '../../components/ui/RouteCard';
import { getDomain } from '../../content/course';
import { useProgressStore } from '../../lib/stores/progressStore';

export default function DomainExamRoute() {
  const { domainId } = useParams();
  const domain = getDomain(domainId);
  const recordDomainExamResult = useProgressStore((state) => state.recordDomainExamResult);

  if (!domain) {
    return (
      <section className="page-shell">
        <RouteCard
          eyebrow="Domain Exam"
          title="Domain exam not found"
          description="Open a valid domain route from the course map."
        />
      </section>
    );
  }

  return (
    <section className="page-shell">
      <RouteCard
        eyebrow="Domain Exam"
        title={`${domain.title} checkpoint`}
        description="This route is ready for the 30-question domain gate. The unlock action is already connected to the progress store."
      >
        <div className="route-actions">
          <button type="button" className="btn-secondary" onClick={() => recordDomainExamResult(domain.id, true)}>
            Record passing result
          </button>
          <Link className="btn-primary" to="/learn">
            Back to course map
          </Link>
        </div>
      </RouteCard>
    </section>
  );
}
