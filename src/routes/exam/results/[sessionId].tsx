import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { RouteCard } from '../../../components/ui/RouteCard';
import { useExamStore } from '../../../lib/stores/examStore';

export default function ExamResultsRoute() {
  const { sessionId } = useParams();
  const history = useExamStore((state) => state.history);
  const hydrateHistory = useExamStore((state) => state.hydrateHistory);
  const result = history.find((entry) => entry.sessionId === sessionId);

  useEffect(() => {
    if (!result) {
      hydrateHistory();
    }
  }, [hydrateHistory, result]);

  if (!result) {
    return (
      <section className="page-shell">
        <RouteCard
          eyebrow="Exam Results"
          title="Result not found"
          description="Run a starter exam session to populate local exam history."
        >
          <Link className="btn-primary" to="/exam">
            Back to exam setup
          </Link>
        </RouteCard>
      </section>
    );
  }

  return (
    <section className="page-shell page-stack">
      <RouteCard
        eyebrow="Exam Results"
        title={`${result.score.scaled} / 1000`}
        description={`Scaled score saved locally on ${new Date(result.date).toLocaleString()}.`}
        accent
      >
        <div className="metric-row">
          <span className="metric-pill">{result.passed ? 'Pass' : 'Retry suggested'}</span>
          <span className="metric-pill">{result.score.percent.toFixed(1)}%</span>
          <span className="metric-pill">{result.config.questionCount} questions</span>
        </div>
      </RouteCard>

      <article className="glass-widget">
        <p className="eyebrow">Selected domains</p>
        <div className="metric-row">
          {result.config.domains.map((domainId) => (
            <span key={domainId} className="metric-pill">
              {domainId}
            </span>
          ))}
        </div>
      </article>
    </section>
  );
}
