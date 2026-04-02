import { Flag, TimerReset } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { RouteCard } from '../../components/ui/RouteCard';
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
        <RouteCard
          eyebrow="Exam Session"
          title="No active session"
          description="Create a mock exam first. Active sessions persist in sessionStorage so accidental refreshes do not wipe the session."
        >
          <Link className="btn-primary" to="/exam">
            Open exam setup
          </Link>
        </RouteCard>
      </section>
    );
  }

  const currentQuestion = session.questions[0];

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
        description="This is the dedicated full-screen shell for the timed experience. Navigator, timer, and lab variants can now be layered into this route."
      >
        <div className="route-actions">
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
        <article className="glass-widget question-card question-card--exam">
          <p className="eyebrow">Question 1 of {session.questions.length}</p>
          <h2 className="section-title">{currentQuestion.stem}</h2>
          <ul className="option-list">
            {currentQuestion.options.map((option) => (
              <li key={option} className="option-pill">
                {option}
              </li>
            ))}
          </ul>
        </article>
      ) : null}
    </section>
  );
}
