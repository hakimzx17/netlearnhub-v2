import { Flag, TimerReset } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { EmptyState } from '../../components/ui/EmptyState';
import { ProgressTrack } from '../../components/ui/ProgressTrack';
import { RouteCard } from '../../components/ui/RouteCard';
import { StatusPill } from '../../components/ui/StatusPill';
import { WidgetCard } from '../../components/ui/WidgetCard';
import { useExamStore } from '../../lib/stores/examStore';

export default function ExamSessionRoute() {
  const navigate = useNavigate();
  const session = useExamStore((state) => state.session);
  const answerQuestion = useExamStore((state) => state.answerQuestion);
  const toggleFlag = useExamStore((state) => state.toggleFlag);
  const submitExam = useExamStore((state) => state.submitExam);
  const clearSession = useExamStore((state) => state.clearSession);

  if (!session) {
    return (
      <section className="page-shell">
        <EmptyState
          eyebrow="Exam Session"
          title="No active session"
          description="Create a mock exam first. Active sessions persist in sessionStorage so accidental refreshes do not wipe the session."
          action={
            <Link className="btn-primary" to="/exam">
              Open exam setup
            </Link>
          }
        />
      </section>
    );
  }

  const currentQuestion = session.questions[0];
  const answeredCount = Object.keys(session.answers).length;
  const timeRemainingMinutes = Math.max(0, Math.ceil(session.timeRemainingMs / 60000));

  const handleSubmit = () => {
    const rawScore = Object.keys(session.answers).length;
    const percent = session.questions.length === 0 ? 0 : (rawScore / session.questions.length) * 100;
    const result = {
      sessionId: session.sessionId,
      date: new Date().toISOString(),
      config: session.config,
      score: {
        raw: rawScore,
        total: session.questions.length,
        percent,
        scaled: Math.round(300 + percent * 7),
      },
      passed: percent >= 82.5,
      timeUsedMs: Date.now() - session.startedAt,
      domainBreakdown: Object.fromEntries(session.config.domains.map((domainId) => [domainId, percent / 100])),
      answers: session.answers,
      flags: session.flags,
    };

    submitExam(result);
    void navigate(`/exam/results/${session.sessionId}`);
  };

  return (
    <section className="page-shell page-stack">
      <RouteCard
        eyebrow="Exam Session"
        title={`${session.questions.length} starter questions`}
        description="This route now carries the dedicated exam shell language: fixed-feeling header pills, progress track, and a clean question surface for later question and lab variants."
      >
        <ProgressTrack value={answeredCount} max={session.questions.length} label={`${answeredCount} of ${session.questions.length} questions answered`} />
        <div className="route-actions">
          <StatusPill tone="warning">{timeRemainingMinutes} min remaining</StatusPill>
          <StatusPill tone="neutral">{session.flags.length} flagged</StatusPill>
          {currentQuestion ? (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => answerQuestion(currentQuestion.id, ['starter-answer'])}
            >
              Save starter answer
            </button>
          ) : null}
          {currentQuestion ? (
            <button type="button" className="btn-secondary" onClick={() => toggleFlag(currentQuestion.id)}>
              <Flag size={16} />
              Toggle flag
            </button>
          ) : null}
          <button type="button" className="btn-primary" onClick={handleSubmit}>
            Submit exam
          </button>
          <button type="button" className="btn-ghost" onClick={clearSession}>
            <TimerReset size={16} />
            Clear session
          </button>
        </div>
      </RouteCard>

      {currentQuestion ? (
        <WidgetCard className="question-card question-card--exam">
          <div className="question-card__meta">
            <StatusPill>Question 1 of {session.questions.length}</StatusPill>
            <StatusPill tone={session.flags.includes(currentQuestion.id) ? 'warning' : 'neutral'}>
              {session.flags.includes(currentQuestion.id) ? 'Flagged for review' : 'Not flagged'}
            </StatusPill>
          </div>
          <h2 className="section-title">{currentQuestion.stem}</h2>
          <ul className="option-list">
            {currentQuestion.options.map((option) => (
              <li key={option} className="option-pill">
                {option}
              </li>
            ))}
          </ul>
        </WidgetCard>
      ) : null}
    </section>
  );
}
