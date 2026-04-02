import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { EmptyState } from '../../../components/ui/EmptyState';
import { RouteCard } from '../../../components/ui/RouteCard';
import { StatusPill } from '../../../components/ui/StatusPill';
import { WidgetCard } from '../../../components/ui/WidgetCard';
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
        <EmptyState
          eyebrow="Exam Results"
          title="Result not found"
          description="Run a starter exam session to populate local exam history."
          action={
            <Link className="btn-primary" to="/exam">
              Back to exam setup
            </Link>
          }
        />
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
          <StatusPill tone={result.passed ? 'success' : 'warning'}>{result.passed ? 'Pass' : 'Retry suggested'}</StatusPill>
          <StatusPill>{result.score.percent.toFixed(1)}%</StatusPill>
          <StatusPill>{result.config.questionCount} questions</StatusPill>
        </div>
      </RouteCard>

      <WidgetCard>
        <p className="eyebrow">Selected domains</p>
        <div className="metric-row">
          {result.config.domains.map((domainId) => (
            <StatusPill key={domainId}>
              {domainId}
            </StatusPill>
          ))}
        </div>
      </WidgetCard>
    </section>
  );
}
